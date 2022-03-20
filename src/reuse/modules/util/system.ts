"use strict";
/**
 * @class system
 * @memberof util
 */
export class System {
  operatingSystem = require("os");

  /**
   * @function getOS
   * @memberOf util.system
   * @description Returns the current operating system.
   * @returns {String} AIX | Android | MacOS | FreeBSD | Linux | OpenBSD | Windows | SunOS
   * @example const os = await util.system.getOS();
   */
  async getOS (): Promise<string> {
    const platform = this.operatingSystem.platform();
    switch (platform) {
      case "aix":
        return "AIX";
      case "android":
        return "Android";
      case "darwin":
        return "MacOS";
      case "freebsd":
        return "FreeBSD";
      case "linux":
        return "Linux";
      case "openbsd":
        return "OpenBSD";
      case "sunos":
        return "SunOS";
      case "win32":
        return "Windows";
      default:
        return "unknown platform";
    }
  };

};
export default new System();