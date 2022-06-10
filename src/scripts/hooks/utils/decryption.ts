class Decryption {
  private path = require("path");
  private fs = require("fs");
  private crypto = require("crypto");
  private childProcess = require("child_process");

  initDecryptFunction() {
    try {
      const privateKey = this.retrievePrivateKey(this.path.resolve(__dirname, "../../.."));
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
    } catch (error) {
      privateKey = process.env.QMATE_PRIVATE_KEY;

      if (!privateKey) {
        try {
          privateKey = this.fs.readFileSync(this.path.resolve(dirname, "private.key"), "utf8");
        } catch (error) {
          throw new Error(`Decryption failed: ${error}`);
        }
      }
    }

    process.env.QMATE_PRIVATE_KEY = "";
    return privateKey;
  }

  decryptSecureData(privateKey: string, input: string) {
    try {
      const decryptedDataByRepoName = Buffer.from(this._decryptDataWithRepoName(Buffer.from(input, "hex")), "base64");

      const decryptedDataByKey = this.crypto.privateDecrypt(
        {
          key: privateKey,
          padding: this.crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        decryptedDataByRepoName
      );

      return decryptedDataByKey.toString();
    } catch (error) {
      throw new Error(`Function 'decrypt' failed: ${error}`);
    }
  }

  private _decryptDataWithRepoName(data: Buffer) {
    let repoUrl;
    try {
      repoUrl = this.childProcess.execSync("git config --get remote.origin.url").toString();
    } catch (error) {
      throw new Error("Please execute from a valid git repository.");
    }

    const salt = "72hdh393987f0hdc";
    const secretKey = this.crypto.pbkdf2Sync(repoUrl, salt, 100000, 32, "sha512");

    const iv = "203efccd80e94d9f";
    const decipher = this.crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
  }
}
export default new Decryption();
