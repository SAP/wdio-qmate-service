import { EncodedData, EncryptionOptions, PrintOptions, PublicKey } from "../types/common";
export default abstract class Encrypter {
    /**
     * @description Retrieves public keys from the file system and encrypts data for all of them.
     * @param data Data to be encrypted.
     * @param encryptionOptions Encryption options.
     * @param printOptions Print options defining if the input and output is logged or not.
     */
    static encryptDataForAvailableKeys(data: string, encryptionOptions: EncryptionOptions, printOptions: PrintOptions): Array<EncodedData>;
    /**
     * @description Encrypts data for all passed public keys.
     * @param data Data to be encrypted.
     * @param encryptionOptions Encryption options.
     * @param publicKeys Public keys for encryption.
     */
    static encryptDataForMultipleKeys(data: string, encryptionOptions: EncryptionOptions, publicKeys: Array<PublicKey>): Array<EncodedData>;
    /**
     * @description Retrieves the public keys from the file system.
     * @param keyPath Path to the directory containing the public key.
     * @returns An array containing public key objects.
     */
    private static _retrievePublicKeys;
    /**
     * @description Encrypts the given data with the provided public key and options.
     * @param data Data to be encrypted.
     * @param publicKey Public key for encryption.
     * @param options Encryption options.
     * @returns The encrypted data.
     */
    private static _encryptData;
    /**
     * @description Encrypts data using AES-256-CBC encryption and PBKDF2 key derivation. The key is derived from the repo URL or a static password.
     * @param data Data to be encrypted.
     * @param options Encryption options.
     * @returns The AES encrypted data.
     */
    private static _encryptDataWithPassword;
    /**
     * @description Prints the input options and data to the console.
     * @param options Encryption options.
     * @param data Data to be encrypted.
     */
    private static _printInput;
    /**
     * @description Prints the output data and metadata to the console for multiple pieces of data.
     * @param encodedDataList An array of encoded data objects containing root and encodedData.
     */
    private static _printOutput;
}
