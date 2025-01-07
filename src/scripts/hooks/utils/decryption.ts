import path from "path";

import { Decrypter } from "qcrypt";

class Decryption {
  initDecryptFunction() {
    try {
      const privateKey = Decrypter.retrievePrivateKey(path.resolve(__dirname, "../../../.."));
      global.util.data.privateKeyFound = true;
      global.util.data.decrypt = (input) => {
        return Decrypter.decryptData(input, privateKey, { useBase64Input: false, useBase64Output: false, includeRepoUrl: true });
      };
    } catch (error) {
      global.util.data.decrypt = function () {
        throw new Error("Function 'decrypt' failed: No private key found.");
      };
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
}
export default new Decryption();
