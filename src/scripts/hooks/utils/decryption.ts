class Decryption {

  private crypto = require("crypto");
  private childProcess = require("child_process");

  initDecryptFunction () {
    const privateKey = process.env.QMATE_PRIVATE_KEY;
    if (privateKey) {
      // @ts-ignore
      process.env.PRIVATEKEY_FOUND = true;
    }

    global.util.data.decrypt = (input: string) => {
      if (privateKey) {
        try {
          let decryptedData = this.decryptLocal(Buffer.from(input, "hex"));

          decryptedData = this.crypto.privateDecrypt({
            key: privateKey,
            padding: this.crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
          },
          Buffer.from(decryptedData, "base64")
          );
          return decryptedData.toString();
        } catch (error) {
          throw new Error(`Function 'decrypt' failed: ${error}`);
        }
      } else {
        throw new Error("Function 'decrypt' failed: No private key found.");
      }
    };

    process.env.QMATE_PRIVATE_KEY = "";
  };

  private decryptLocal(data: Buffer) {
    const repoUrl = this.childProcess.execSync("git config --get remote.origin.url").toString();
    const salt = "72hdh393987f0hdc";
    const secretKey = this.crypto.pbkdf2Sync(repoUrl, salt, 100000, 32, "sha512");

    const iv = "203efccd80e94d9f";
    const decipher = this.crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

    let decryptedPassword = decipher.update(data, "hex", "utf-8");
    decryptedPassword += decipher.final("utf8");

    return decryptedPassword;
  }

};
export default new Decryption();