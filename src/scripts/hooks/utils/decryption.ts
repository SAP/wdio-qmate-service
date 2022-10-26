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
        privateKey = privateKey.replace(/\\n/gm, "\n");
        privateKey = privateKey.replace(/\\s/gm, " ");
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

  decryptSecureData(privateKey: string, input: string | Array<string>, options?: {base64Output: boolean, base64Input: boolean}) {
    // input data can either be as single value or array of values for different keys
    if (typeof input === "string") {
      input = [input];
    }

    let decryptedDataByKey: any;
    let decryptError: any;

    for (const data of input) {
      try {
        const dataEncoded = options?.base64Input ? this._base64ToUtf8(data) : data;
        const decryptedDataByRepoName = Buffer.from(this._decryptDataWithRepoName(Buffer.from(dataEncoded, "hex")), "base64");

        decryptedDataByKey = this.crypto.privateDecrypt(
          {
            key: this._parseKeyByEncoding(privateKey),
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
      return options?.base64Output ? this._utf8ToBase64(decryptedDataByKey.toString()) : decryptedDataByKey.toString();
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
    const [hostAndAccount, repo] = url.replace("git@", "").trim().split("/");
    const [host, account] = hostAndAccount.split(":");
    const repoTrimmed = repo.endsWith(".git") ? repo.slice(0, -4): repo;
    return this._hashHostAccountAndRepo(host, account, repoTrimmed);
  }

  private _unifyHTTPUrl(url: string) {
    const urlWithoutProtocol = url.replace(/((\bhttp\b)|(\bhttps\b)):\/\//, "").trim();
    const [host, account, repo] = urlWithoutProtocol.split("/");
    const repoTrimmed = repo.endsWith(".git") ? repo.slice(0, -4): repo;
    return this._hashHostAccountAndRepo(host, account, repoTrimmed);
  }

  private _hashHostAccountAndRepo(host: string, account: string, repo: string) {
    return this.crypto.createHash("sha256").update(`${host}${account}${repo}`).digest("hex");
  }

  private _parseKeyByEncoding(key: string): string {
    const utf8Regex = /-*(BEGIN|END)\s\w*\s(PRIVATE|PUBLIC)\sKEY-*/gm;
    if (utf8Regex.test(key)) {
      return key;
    } else {
      console.log("Key was processed in base64 format");
      return this._base64ToUtf8(key);
    }
  }

  private _base64ToUtf8(string: string): string {
    return Buffer.from(string, "base64").toString("utf-8");
  }

  private _utf8ToBase64(string: string): string {
    return Buffer.from(string, "utf-8").toString("base64");
  }

}
export default new Decryption();
