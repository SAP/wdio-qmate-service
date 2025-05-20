/*
    cyrb53 (c) 2018 bryc (github.com/bryc)
    License: Public domain (or MIT if needed). Attribution appreciated.
    A fast and simple 53-bit string hash function with decent collision resistance.
    Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
*/
const cyrb53 = function (str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export class LocatorDebug {
  static logs: any[];
  static indentation: string;

  public static initializeLogs(ui5Selector: UI5Selector): void {
    this.logs = [];
    this.indentation = "";
    // @ts-ignore
    if (!document.qmateLogHashes) {
      // @ts-ignore
      document.qmateLogHashes = [];
    }

    this.debugLog("QmateLocator Debug Logs for Selector:" + JSON.stringify(ui5Selector));
  }

  private static indent(positive: boolean): void {
    if (positive) this.indentation += "....";
    else this.indentation = this.indentation.substring(0, this.indentation.length - 4);
  }

  public static debugLog(...messages: any[]): void {
    this.logs.push([this.indentation, ...messages]);
  }

  public static beginLog(name: string, elementCount: number): void {
    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before " + name + ":", elementCount);
  }

  public static endLog(name: string, elementCount: number): void {
    LocatorDebug.debugLog("Valid ui5Controls after " + name + ":", elementCount);
    LocatorDebug.indent(false);
  }

  public static printLogs(finalElementCount: number): void {
    if (finalElementCount > 0) {
      return;
    }

    LocatorDebug.debugLog("Result elements:", finalElementCount);

    if (this.sameLogAlreadyPrinted()) {
      return;
    }

    let fullLog: any[] = [];
    for (const log of this.logs) {
      fullLog = fullLog.concat(log);
      fullLog.push("\n");
    }
    console.warn(...fullLog);
  }

  private static sameLogAlreadyPrinted(): boolean {
    // time with 10 second precision as a string
    const now = new Date();
    now.setSeconds(Math.floor(now.getSeconds() / 10) * 10, 0);
    const time = now.toISOString().replace(/T/, " ").replace(/\..+/, "");

    const hash = cyrb53(JSON.stringify(this.logs) + time);
    // @ts-ignore
    if (document.qmateLogHashes.includes(hash)) {
      return true;
    }
    // @ts-ignore
    document.qmateLogHashes.push(hash);
    return false;
  }
}
