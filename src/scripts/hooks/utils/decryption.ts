class Decryption {
  private path = require("path");
  private fs = require("fs");
  private crypto = require("crypto");
  private childProcess = require("child_process");

  initDecryptFunction() {
    try {
      const privateKey = this.retrievePrivateKey(this.path.resolve(__dirname, "../../../.."));
      global.util.data.privateKeyFound = true;
      global.util.data.decrypt = (input) => {
        return this.decryptSecureData(privateKey, input);
      };
    } catch (error) {
      global.util.data.decrypt = function () {
        throw new Error("Function 'decrypt' failed: No private key found.");
      };
    }
  }

  retrievePrivateKey(dirname: string) {
    let privateKey;

    try {
      privateKey = this.fs.readFileSync(this.path.resolve(process.cwd(), "private.key"), "utf8");
      console.log("\n[private key is used from current working directory]\n");
    } catch (error) {
      if (process.env.QMATE_PRIVATE_KEY) {
        privateKey = process.env.QMATE_PRIVATE_KEY;
        console.log("\n[private key is used from env var]\n");
      } else {
        try {
          privateKey = this.fs.readFileSync(this.path.resolve(dirname, "private.key"), "utf8");
          console.log("\n[default private key is used]\n");
        } catch (error) {
          throw new Error(`No private key found: ${error}`);
        }
      }
    }

    process.env.QMATE_PRIVATE_KEY = "";
    return privateKey;
  }

  decryptSecureData(privateKey: string, input: string | Array<string>) {
    // input data can either be as single value or array of values for different keys
    if (typeof input === "string") {
      input = [input];
    }

    let decryptedDataByKey: any;
    let decryptError: any;

    for (const data of input) {
      try {
        const decryptedDataByRepoName = Buffer.from(this._decryptDataWithRepoName(Buffer.from(data, "hex")), "base64");

        decryptedDataByKey = this.crypto.privateDecrypt(
          {
            key: privateKey,
            padding: this.crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
          },
          decryptedDataByRepoName
        );
      } catch (error) {
        decryptError = error;
      }
    }

    if (decryptedDataByKey) {
      return decryptedDataByKey.toString();
    } else {
      throw new Error(`Function 'decrypt' failed: ${decryptError}`);
    }
  }

  decryptSauceConfig(config: Record<string, any>) {
    try {
      config.user = util.data.decrypt(config.user);
    } catch (error) {
      // do nothing, user was not encrypted
    }
    try {
      config.key = util.data.decrypt(config.key);
    } catch (error) {
      // do nothing, key was not encrypted
    }
  }

  private _decryptDataWithRepoName(data: Buffer) {
    let repoUrl;
    try {
      repoUrl = this.childProcess.execSync("git config --get remote.origin.url").toString();
    } catch (error) {
      throw new Error("Please execute from a valid git repository.");
    }

    const repoUrlContractHashed = this._unifyRepoUrl(repoUrl);

    console.log(repoUrlContractHashed)

    const salt = "72hdh393987f0hdc";
    const secretKey = this.crypto.pbkdf2Sync(repoUrlContractHashed, salt, 100000, 32, "sha512");

    const iv = "203efccd80e94d9f";
    const decipher = this.crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

    let decryptedData = decipher.update(data, "hex", "utf8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
  }

  private _unifyRepoUrl(url: string): string {
    const httpsRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;
    const sshRegex = /git@.*:.*\/.*.git/gm;

    if (url.match(httpsRegex)) {
      return this._unifyHTTPUrl(url);
    } else if (url.match(sshRegex)) {
      return this._unifySSHUrl(url);
    } else {
      throw new Error("Repo url is not valid");
    }
  }

  private _unifySSHUrl(url: string) {
    const [hostAndAccount, repo] = url.replace("git@", "").split("/");
    const [host, account] = hostAndAccount.split(":");
    console.log(host,account,repo);
    return this._hashHostAccountAndRepo(host, account, repo);
  }

  private _unifyHTTPUrl(url: string) {
    const urlWithoutProtocol = url.replace(/((\bhttp\b)|(\bhttps\b)):\/\//, "");
    const [host, account, repo] = urlWithoutProtocol.split("/");
    console.log(host,account,repo);
    return this._hashHostAccountAndRepo(host, account, repo);
  }

  private _hashHostAccountAndRepo(host: string, account: string, repo: string) {
    return this.crypto.createHash("sha256").update(`${host}${account}${repo}`).digest("hex");
  }
}
export default new Decryption();
