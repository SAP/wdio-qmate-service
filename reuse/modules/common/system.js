const operatingSystem = require("os");
/**
 * @class system
 * @memberof common
 */
const System = function () {

  /**
   * @function getOS
   * @memberOf common.system
   * @description Returns the current operating system.
   * @returns {String} AIX | Android | MacOS | FreeBSD | Linux | OpenBSD | Windows | SunOS
   * @example const os = await common.system.getOS();
   */
  this.getOS = async function () {
    const platform = operatingSystem.platform();
    let result;
    switch (platform) {
      case "aix":
        result = "AIX";
        break;
      case "android":
        result = "Android";
        break;
      case "darwin":
        result = "MacOS";
        break;
      case "freebsd":
        result = "FreeBSD";
        break;
      case "linux":
        result = "Linux";
        break;
      case "openbsd":
        result = "OpenBSD";
        break;
      case "sunos":
        result = "SunOS";
        break;
      case "win32":
        result = "Windows";
        break;
      default:
        result = "unknown platform";
    }
    return result;
  };

};
module.exports = new System();