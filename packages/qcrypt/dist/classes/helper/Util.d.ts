export default abstract class Util {
    /**
     * @description Converts the given string to base64.
     * @param string The string to be converted.
     * @returns The base64 encoded string.
     */
    static base64ToUtf8(string: string): string;
    /**
     * @description Converts the given string to base64.
     * @param string The string to be converted.
     * @returns The base64 encoded string.
     */
    static utf8ToBase64(string: string): string;
    /**
     * @description Checks if the given string is base64 encoded.
     * @param string The string to be checked.
     * @returns True if the string is base64 encoded, false otherwise.
     */
    static isBase64(string: string): boolean;
    /**
     * @description Parses the key by encoding.
     * @param key The key to be parsed.
     * @returns The parsed key.
     */
    static parseKeyByEncoding(key: string): string;
    /**
     * @description Normalizes the key by removing spaces and new lines.
     * @param key The key to be normalized.
     * @returns The normalized key.
     */
    static normalizeKey(key: string): string;
    /**
     * @description Retrieves the repository URL from the git configuration.
     * @returns The repository URL.
     */
    static getRepoUrl(): string;
    /**
     * @description Unifies the repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifyRepoUrl(url: string): string;
    /**
     * @description Unifies the HTTP repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifyHTTPUrl(url: string): string;
    /**
     * @description Unifies the SSH repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifySSHUrl(url: string): string;
    /**
     * @description Hashes the host, account, and repository into a consistent format.
     * @param host The repository host.
     * @param account The repository account.
     * @param repo The repository name.
     * @returns The hashed host, account, and repository.
     */
    static hashHostAccountAndRepo(host: string, account: string, repo: string): string;
    /**
     * @description Converts the given string to an array of strings if not yet an array.
     * @param data The string or array of strings.
     * @returns The array of strings.
     */
    static convertStringToArray(data: string | Array<string>): Array<string>;
}
