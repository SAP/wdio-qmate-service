export default abstract class Util {
    static base64ToUtf8(string: string): string;
    static utf8ToBase64(string: string): string;
    static parseKeyByEncoding(key: string): string;
    static getRepoUrl(): string;
    static unifyRepoUrl(url: string): string;
    static unifyHTTPUrl(url: string): string;
    static unifySSHUrl(url: string): string;
    static hashHostAccountAndRepo(host: string, account: string, repo: string): string;
    static convertStringToArray(data: string | Array<string>): Array<string>;
}
//# sourceMappingURL=Util.d.ts.map