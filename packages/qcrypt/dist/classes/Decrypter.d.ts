import { DecryptionOptions, PrintOptions, SecureData } from "../types/common";
export default abstract class Decrypter {
    /**
     * @description Retrieves the private key from the file system and decrypts data using it.
     * @param data Data to be decrypted.
     * @param decryptionOptions Decryption options.
     * @returns Decrypted data.
     */
    static decryptDataForAvailableKey(data: SecureData, decryptionOptions: DecryptionOptions, printOptions: PrintOptions): string;
    /**
     * @description Decrypts data using the passed private key.
     * @param data Data to be decrypted. Can either be as single value or array of values for different keys.
     * @param privateKey Private key.
     * @param options Decryption options.
     * @returns Decrypted data.
     */
    static decryptData(data: SecureData, privateKey: string, options: DecryptionOptions): string;
    /**
     * @description Retrieves the private key from the current working directory, env var or the given path.
     * @param keyPath Path to the directory containing the private key.
     * @returns Private key.
     */
    static retrievePrivateKey(keyPath: string): string;
    /**
     * @description Decrypts data using a password.
     * @param data Data to be decrypted.
     * @returns Decrypted data.
     */
    private static _decryptDataWithPassword;
    /**
     * @description Prints the input options and data to the console.
     * @param options Decryption options.
     * @param data Data to be encrypted.
     */
    private static _printInput;
    /**
     * @description Prints the decrypted data.
     * @param decryptedData Decrypted data.
     */
    private static _printOutput;
}
