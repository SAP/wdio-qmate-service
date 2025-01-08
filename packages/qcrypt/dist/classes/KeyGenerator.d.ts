import { KeyGenerationOptions } from "../types/common";
export default abstract class KeyGenerator {
    /**
     * @description Generates a key pair and prints it to the console.
     * @param options Key generation options.
     */
    static generateKeyPair(options: KeyGenerationOptions): void;
    /**
     * @description Prints the input options to the console.
     * @param options Key generation options.
     */
    private static _printInput;
    /**
     * @description Prints the generated key pair to the console.
     * @param publicKey The generated public key.
     * @param privateKey The generated private key.
     */
    private static _printOutput;
}
