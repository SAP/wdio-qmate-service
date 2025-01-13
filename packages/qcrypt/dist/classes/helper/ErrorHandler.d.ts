import { DecryptionOptions } from "../../types/common";
export default abstract class ErrorHandler {
    static UNKNOWN_ERROR_MESSAGE: string;
    static NO_PUBLIC_KEY_ERROR_MESSAGE: string;
    static NO_PRIVATE_KEY_ERROR_MESSAGE: string;
    static INVALID_PRIVATE_KEY_ERROR_MESSAGE: string;
    static DECRYPTION_ERROR_MESSAGE: string;
    static handleAndThrowError(error: Error | unknown, customMessage?: string): never;
    static handleDecryptDataWithPasswordError(error: Error, options: DecryptionOptions): string;
    static handleDecryptDataWithPrivateKeyError(error: Error): string;
}
