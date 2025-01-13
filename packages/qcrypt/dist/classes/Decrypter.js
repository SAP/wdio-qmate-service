"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const Util_1 = __importDefault(require("./helper/Util"));
const ErrorHandler_1 = __importDefault(require("./helper/ErrorHandler"));
// Constants
const common_1 = require("../constants/common");
class Decrypter {
    // ========================== Public functions ==========================
    /**
     * @description Retrieves the private key from the file system and decrypts data using it.
     * @param data Data to be decrypted.
     * @param decryptionOptions Decryption options.
     * @returns Decrypted data.
     */
    static decryptDataForAvailableKey(data, decryptionOptions, printOptions) {
        if (printOptions === null || printOptions === void 0 ? void 0 : printOptions.printInput) {
            this._printInput(data, decryptionOptions);
        }
        const commonKeyPath = path_1.default.resolve(__dirname, "../keys");
        const privateKey = this.retrievePrivateKey(commonKeyPath);
        const decryptedData = this.decryptData(data, privateKey, decryptionOptions);
        if (printOptions === null || printOptions === void 0 ? void 0 : printOptions.printOutput) {
            this._printOutput(decryptedData);
        }
        return decryptedData;
    }
    /**
     * @description Decrypts data using the passed private key.
     * @param data Data to be decrypted. Can either be as single value or array of values for different keys.
     * @param privateKey Private key.
     * @param options Decryption options.
     * @returns Decrypted data.
     */
    static decryptData(data, privateKey, options) {
        let encodedData;
        let decryptedDataByKey;
        let decryptedDataByRepoName;
        const decryptErrors = [];
        data = Util_1.default.convertStringToArray(data);
        for (const [index, value] of data.entries()) {
            // Convert base64 encoded data to utf8
            try {
                encodedData = options.useBase64Input ? Util_1.default.base64ToUtf8(value) : value;
            }
            catch (error) {
                decryptErrors.push(new Error(`\n - Invalid input data format at index ${index}. ${error.message}`));
                continue;
            }
            // Decrypt data with password
            try {
                decryptedDataByRepoName = Buffer.from(this._decryptDataWithPassword(encodedData, options), "base64");
            }
            catch (error) {
                const errorMessage = ErrorHandler_1.default.handleDecryptDataWithPasswordError(error, options);
                decryptErrors.push(new Error(`\n - Decryption with password failed for data at index ${index}. ${errorMessage}`));
                continue;
            }
            // Decrypt data with private key
            try {
                decryptedDataByKey = crypto_1.default.privateDecrypt({
                    key: Util_1.default.parseKeyByEncoding(privateKey),
                    padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256"
                }, decryptedDataByRepoName);
            }
            catch (error) {
                const errorMessage = ErrorHandler_1.default.handleDecryptDataWithPrivateKeyError(error);
                decryptErrors.push(new Error(`\n - Decryption with private key failed for data at index ${index}. ${errorMessage}`));
            }
        }
        // Return the decrypted data if successful
        if (decryptedDataByKey) {
            return options.useBase64Output ? Util_1.default.utf8ToBase64(decryptedDataByKey.toString()) : decryptedDataByKey.toString();
        }
        else {
            throw new Error(`${ErrorHandler_1.default.DECRYPTION_ERROR_MESSAGE}: ${decryptErrors.map((error) => error.message).join(" ")}`);
        }
    }
    /**
     * @description Retrieves the private key from the current working directory, env var or the given path.
     * @param keyPath Path to the directory containing the private key.
     * @returns Private key.
     */
    static retrievePrivateKey(keyPath) {
        let privateKey;
        if (fs_1.default.existsSync(path_1.default.resolve(process.cwd(), common_1.PRIVATE_KEY_NAME))) {
            privateKey = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), common_1.PRIVATE_KEY_NAME), "utf8");
        }
        else if (process.env.QMATE_PRIVATE_KEY) {
            privateKey = Util_1.default.normalizeKey(process.env.QMATE_PRIVATE_KEY);
        }
        else if (fs_1.default.existsSync(path_1.default.resolve(keyPath, common_1.PRIVATE_KEY_NAME))) {
            privateKey = fs_1.default.readFileSync(path_1.default.resolve(keyPath, common_1.PRIVATE_KEY_NAME), "utf8");
        }
        if (!privateKey) {
            throw new Error(`${ErrorHandler_1.default.NO_PRIVATE_KEY_ERROR_MESSAGE}.`);
        }
        // Clear the private key from the environment variables after use
        process.env.QMATE_PRIVATE_KEY = "";
        return privateKey;
    }
    // ========================== Private functions ==========================
    /**
     * @description Decrypts data using a password.
     * @param data Data to be decrypted.
     * @returns Decrypted data.
     */
    static _decryptDataWithPassword(data, options) {
        let secretKey;
        if (options.includeRepoUrl) {
            const repoUrl = Util_1.default.getRepoUrl();
            const repoUrlContractHashed = Util_1.default.unifyRepoUrl(repoUrl);
            secretKey = crypto_1.default.pbkdf2Sync(repoUrlContractHashed, common_1.SALT, common_1.ITERATIONS, common_1.KEY_LENGTH, common_1.DIGEST);
        }
        else {
            secretKey = crypto_1.default.pbkdf2Sync(common_1.STATIC_PASSWORD, common_1.SALT, common_1.ITERATIONS, common_1.KEY_LENGTH, common_1.DIGEST);
        }
        try {
            const decipher = crypto_1.default.createDecipheriv(common_1.ALGORITHM, secretKey, common_1.IV);
            let decryptedData = decipher.update(data, "hex", "utf8");
            decryptedData += decipher.final("utf8");
            return decryptedData;
        }
        catch (error) {
            ErrorHandler_1.default.handleAndThrowError(error);
        }
    }
    /**
     * @description Prints the input options and data to the console.
     * @param options Decryption options.
     * @param data Data to be encrypted.
     */
    static _printInput(data, options) {
        console.log("\n===========INPUT==========================================================");
        if (options.includeRepoUrl || options.useBase64Input || options.useBase64Output) {
            console.log("Options:");
            if (options.includeRepoUrl) {
                console.log("\x1b[33m - Using repo URL in key derivation.\x1b[0m");
            }
            if (options.useBase64Input) {
                console.log("\x1b[33m - Input data is processed as base64 format.\x1b[0m");
            }
            if (options.useBase64Output) {
                console.log("\x1b[33m - Output data is displayed in base64 format.\x1b[0m");
            }
            console.log("");
        }
        if (data instanceof Array) {
            console.log("Input Data:");
            console.log("\x1b[33mMultiple data entries found. Trying to decrypt the data with the first key matching one of the entries.\x1b[0m");
        }
        console.log("==========================================================================\n");
    }
    /**
     * @description Prints the decrypted data.
     * @param decryptedData Decrypted data.
     */
    static _printOutput(decryptedData) {
        console.log("\n===========OUTPUT=========================================================");
        console.log("Decrypted Data ⬎");
        console.log(`\x1b[32m${decryptedData}\x1b[0m\n`);
        console.log("==========================================================================");
    }
}
exports.default = Decrypter;
