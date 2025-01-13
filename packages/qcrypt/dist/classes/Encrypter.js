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
class Encrypter {
    // ========================== Public functions ==========================
    /**
     * @description Retrieves public keys from the file system and encrypts data for all of them.
     * @param data Data to be encrypted.
     * @param encryptionOptions Encryption options.
     * @param printOptions Print options defining if the input and output is logged or not.
     */
    static encryptDataForAvailableKeys(data, encryptionOptions, printOptions) {
        if (printOptions === null || printOptions === void 0 ? void 0 : printOptions.printInput) {
            this._printInput(data, encryptionOptions);
        }
        const commonKeyPath = path_1.default.resolve(__dirname, "../keys");
        const publicKeys = this._retrievePublicKeys(commonKeyPath);
        const encryptedData = this.encryptDataForMultipleKeys(data, encryptionOptions, publicKeys);
        if (printOptions === null || printOptions === void 0 ? void 0 : printOptions.printOutput) {
            this._printOutput(encryptedData);
        }
        return encryptedData;
    }
    /**
     * @description Encrypts data for all passed public keys.
     * @param data Data to be encrypted.
     * @param encryptionOptions Encryption options.
     * @param publicKeys Public keys for encryption.
     */
    static encryptDataForMultipleKeys(data, encryptionOptions, publicKeys) {
        const encodedDataAggregated = [];
        data = encryptionOptions.useBase64Input ? Util_1.default.base64ToUtf8(data) : data;
        for (const pk of publicKeys) {
            let encryptedData;
            try {
                encryptedData = this._encryptData(data, pk.key, encryptionOptions);
            }
            catch (error) {
                ErrorHandler_1.default.handleAndThrowError(error, `Encryption failed`);
            }
            const encodedData = encryptionOptions.useBase64Output ? Util_1.default.utf8ToBase64(encryptedData) : encryptedData;
            encodedDataAggregated.push({ root: pk.root, encodedData });
        }
        return encodedDataAggregated;
    }
    // ========================== Private functions ==========================
    /**
     * @description Retrieves the public keys from the file system.
     * @param keyPath Path to the directory containing the public key.
     * @returns An array containing public key objects.
     */
    static _retrievePublicKeys(keyPath) {
        const publicKeys = [];
        try {
            const publicKey = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), common_1.PUBLIC_KEY_NAME), "utf8");
            publicKeys.push({ root: "cwd", key: publicKey });
        }
        catch (_a) {
            // Do nothing
        }
        try {
            const publicKey = fs_1.default.readFileSync(path_1.default.resolve(keyPath, common_1.PUBLIC_KEY_NAME), "utf8");
            publicKeys.push({ root: "qmate", key: publicKey });
        }
        catch (_b) {
            // Do nothing
        }
        if (publicKeys.length < 1) {
            throw new Error(`${ErrorHandler_1.default.NO_PUBLIC_KEY_ERROR_MESSAGE}.`);
        }
        return publicKeys;
    }
    /**
     * @description Encrypts the given data with the provided public key and options.
     * @param data Data to be encrypted.
     * @param publicKey Public key for encryption.
     * @param options Encryption options.
     * @returns The encrypted data.
     */
    static _encryptData(data, publicKey, options) {
        try {
            const encryptedDataByKey = crypto_1.default.publicEncrypt({
                key: Util_1.default.parseKeyByEncoding(publicKey),
                padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256"
            }, Buffer.from(data));
            return this._encryptDataWithPassword(encryptedDataByKey.toString("base64"), options);
        }
        catch (error) {
            ErrorHandler_1.default.handleAndThrowError(error);
        }
    }
    /**
     * @description Encrypts data using AES-256-CBC encryption and PBKDF2 key derivation. The key is derived from the repo URL or a static password.
     * @param data Data to be encrypted.
     * @param options Encryption options.
     * @returns The AES encrypted data.
     */
    static _encryptDataWithPassword(data, options) {
        let key;
        if (options.includeRepoUrl) {
            const repoUrl = Util_1.default.getRepoUrl();
            const repoUrlContractHashed = Util_1.default.unifyRepoUrl(repoUrl);
            key = crypto_1.default.pbkdf2Sync(repoUrlContractHashed, common_1.SALT, common_1.ITERATIONS, common_1.KEY_LENGTH, common_1.DIGEST);
        }
        else {
            key = crypto_1.default.pbkdf2Sync(common_1.STATIC_PASSWORD, common_1.SALT, common_1.ITERATIONS, common_1.KEY_LENGTH, common_1.DIGEST);
        }
        const cipher = crypto_1.default.createCipheriv(common_1.ALGORITHM, key, common_1.IV);
        let encryptedData = cipher.update(data, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    }
    /**
     * @description Prints the input options and data to the console.
     * @param options Encryption options.
     * @param data Data to be encrypted.
     */
    static _printInput(data, options) {
        console.log("\n===========INPUT==========================================================");
        if (options.includeRepoUrl || options.useBase64Output || options.useBase64Input) {
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
        console.log(`Input Data: ${data}`);
        console.log("==========================================================================\n");
    }
    /**
     * @description Prints the output data and metadata to the console for multiple pieces of data.
     * @param encodedDataList An array of encoded data objects containing root and encodedData.
     */
    static _printOutput(encodedDataList) {
        console.log("\n===========OUTPUT=========================================================");
        console.log(`Processing Info:`);
        // Iterate through the array and print details for each entry
        encodedDataList.forEach(({ root, encodedData }) => {
            const rootMessage = root === "cwd" ? "current working directory" : "qmate module";
            console.log(`\x1b[33m - Public key is used from ${rootMessage}.\x1b[0m\n`);
            console.log("Encrypted Data ⬎");
            console.log(`\x1b[32m${encodedData}\x1b[0m\n`);
        });
        console.log("==========================================================================");
    }
}
exports.default = Encrypter;
