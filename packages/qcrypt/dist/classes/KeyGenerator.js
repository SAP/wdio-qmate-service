"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const crypto_1 = __importDefault(require("crypto"));
// Constants
const common_1 = require("../constants/common");
class KeyGenerator {
    // ========================== Public functions ==========================
    /**
     * @description Generates a key pair and prints it to the console.
     * @param options Key generation options.
     */
    static generateKeyPair(options) {
        this._printInput(options);
        const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync(common_1.KEY_TYPE, { modulusLength: 2048 });
        const publicKeyExported = publicKey.export({ type: common_1.KEY_EXPORT_TYPE, format: common_1.KEY_EXPORT_FORMAT });
        const privateKeyExported = privateKey.export({ type: common_1.KEY_EXPORT_TYPE, format: common_1.KEY_EXPORT_FORMAT });
        const publicKeyFormatted = options.useBase64Encoding ? Buffer.from(publicKeyExported, "utf8").toString("base64") : publicKeyExported;
        const privateKeyFormatted = options.useBase64Encoding ? Buffer.from(privateKeyExported, "utf8").toString("base64") : privateKeyExported;
        this._printOutput(publicKeyFormatted, privateKeyFormatted);
    }
    // ========================== Private functions ==========================
    /**
     * @description Prints the input options to the console.
     * @param options Key generation options.
     */
    static _printInput(options) {
        if (options.useBase64Encoding) {
            console.log("\n===========OPTIONS==========================================================");
            if (options.useBase64Encoding) {
                console.log("\x1b[33m - Output data is displayed in base64 format.\x1b[0m");
            }
            console.log("==========================================================================");
        }
    }
    /**
     * @description Prints the generated key pair to the console.
     * @param publicKey The generated public key.
     * @param privateKey The generated private key.
     */
    static _printOutput(publicKey, privateKey) {
        console.log("\n===========OUTPUT=========================================================");
        console.log("Public Key ⬎");
        console.log(`\x1b[32m${publicKey}\x1b[0m\n`);
        console.log("Private Key ⬎");
        console.log(`\x1b[33m${privateKey}\x1b[0m`);
        console.log("==========================================================================");
    }
}
exports.default = KeyGenerator;
