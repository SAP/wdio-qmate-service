import { EncodedData, EncryptionOptions, PrintOptions, PublicKey } from "../types/common";
export default abstract class Encrypter {
    static encryptDataForAvailableKeys(data: string, encryptionOptions: EncryptionOptions, printOptions: PrintOptions): Array<EncodedData>;
    static encryptDataForMultipleKeys(data: string, encryptionOptions: EncryptionOptions, publicKeys: PublicKey[]): Array<EncodedData>;
    private static _retrievePublicKeys;
    private static _encryptData;
    private static _encryptDataWithPassword;
    private static _printInput;
    private static _printOutput;
}
//# sourceMappingURL=Encrypter.d.ts.map