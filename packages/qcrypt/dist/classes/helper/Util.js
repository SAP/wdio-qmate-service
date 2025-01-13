"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const child_process_1 = __importDefault(require("child_process"));
const crypto_1 = __importDefault(require("crypto"));
class Util {
    /**
     * @description Converts the given string to base64.
     * @param string The string to be converted.
     * @returns The base64 encoded string.
     */
    static base64ToUtf8(string) {
        if (!this.isBase64(string)) {
            throw new Error("Invalid base64 format. Please provide a valid base64 encoded string.");
        }
        return Buffer.from(string, "base64").toString("utf-8");
    }
    /**
     * @description Converts the given string to base64.
     * @param string The string to be converted.
     * @returns The base64 encoded string.
     */
    static utf8ToBase64(string) {
        return Buffer.from(string, "utf-8").toString("base64");
    }
    /**
     * @description Checks if the given string is base64 encoded.
     * @param string The string to be checked.
     * @returns True if the string is base64 encoded, false otherwise.
     */
    static isBase64(string) {
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return base64Regex.test(string);
    }
    /**
     * @description Parses the key by encoding.
     * @param key The key to be parsed.
     * @returns The parsed key.
     */
    static parseKeyByEncoding(key) {
        const utf8Regex = /-*(BEGIN|END)\s\w*\s(PUBLIC|PRIVATE)\sKEY-*/;
        return utf8Regex.test(key) ? key : this.base64ToUtf8(key);
    }
    /**
     * @description Normalizes the key by removing spaces and new lines.
     * @param key The key to be normalized.
     * @returns The normalized key.
     */
    static normalizeKey(key) {
        return key.replace(/\\n/gm, "\n").replace(/\\s/gm, " ");
    }
    /**
     * @description Retrieves the repository URL from the git configuration.
     * @returns The repository URL.
     */
    static getRepoUrl() {
        try {
            return child_process_1.default.execSync("git config --get remote.origin.url").toString().trim();
        }
        catch (_a) {
            throw new Error("Please execute from a valid git repository.");
        }
    }
    /**
     * @description Unifies the repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifyRepoUrl(url) {
        const httpsRegex = /https?:\/\/.+/;
        const sshRegex = /git@.*:.+/;
        if (httpsRegex.test(url)) {
            return this.unifyHTTPUrl(url);
        }
        else if (sshRegex.test(url)) {
            return this.unifySSHUrl(url);
        }
        else {
            throw new Error("Repo URL is not valid.");
        }
    }
    /**
     * @description Unifies the HTTP repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifyHTTPUrl(url) {
        const [host, account, repo] = url.replace(/https?:\/\//, "").split("/");
        return this.hashHostAccountAndRepo(host, account, repo.replace(/\.git$/, ""));
    }
    /**
     * @description Unifies the SSH repository URL into a consistent hash format.
     * @param url The repository URL.
     * @returns The hashed URL.
     */
    static unifySSHUrl(url) {
        const [hostAccount, repo] = url.replace("git@", "").split(":");
        const [host, account] = hostAccount.split("/");
        return this.hashHostAccountAndRepo(host, account, repo.replace(/\.git$/, ""));
    }
    /**
     * @description Hashes the host, account, and repository into a consistent format.
     * @param host The repository host.
     * @param account The repository account.
     * @param repo The repository name.
     * @returns The hashed host, account, and repository.
     */
    static hashHostAccountAndRepo(host, account, repo) {
        return crypto_1.default.createHash("sha256").update(`${host}${account}${repo}`).digest("hex");
    }
    /**
     * @description Converts the given string to an array of strings if not yet an array.
     * @param data The string or array of strings.
     * @returns The array of strings.
     */
    static convertStringToArray(data) {
        if (typeof data === "string") {
            data = [data];
        }
        return data;
    }
}
exports.default = Util;
