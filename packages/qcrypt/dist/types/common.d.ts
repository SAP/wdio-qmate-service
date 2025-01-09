export interface EncryptionOptions {
    includeRepoUrl: boolean;
    useBase64Output: boolean;
    useBase64Input: boolean;
}
export interface DecryptionOptions {
    includeRepoUrl: boolean;
    useBase64Output: boolean;
    useBase64Input: boolean;
}
export interface KeyGenerationOptions {
    useBase64Encoding: boolean;
}
export interface PrintOptions {
    printInput: boolean;
    printOutput: boolean;
}
export interface PublicKey {
    root: KeyRoot;
    key: string;
}
export interface EncodedData {
    root: KeyRoot;
    encodedData: string;
}
export type KeyRoot = "cwd" | "qmate";
export type SecureData = string | Array<string>;
