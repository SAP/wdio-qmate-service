import { DecryptionOptions, PrintOptions, SecureData } from "../types/common";
export default abstract class Decrypter {
    static decryptDataForAvailableKey(data: SecureData, decryptionOptions: DecryptionOptions, printOptions: PrintOptions): string;
    static decryptData(data: SecureData, privateKey: string, options: DecryptionOptions): string;
    static retrievePrivateKey(dirname: string): string;
    private static _decryptDataWithPassword;
    private static _printInput;
    private static _printOutput;
}
//# sourceMappingURL=Decrypter.d.ts.map