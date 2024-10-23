"use strict";
import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class device
 * @memberof mobile
 */
export class Device {
  private vlf = new VerboseLoggerFactory("mobile", "device");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function isAppInstalled
   * @memberof mobile.device
   * @description Check wether given package/bundle app is installed or not in the device.
   * @param {string} packageIdorBundleId - Android package Id, or iOS bundle Id.
   * @returns {boolean} Returns true if specified app package/bundled installed in the device, or false.
   * @example await mobile.device.isAppInstalled("com.google.android.apps.maps");
   */
  async isAppInstalled(packageIdOrBundleId: string): Promise<boolean> {
    const vl = this.vlf.initLog(this.isAppInstalled);
    try {
      const isAppInstalledInDevice: boolean = browser.isAppInstalled(packageIdOrBundleId);
      vl.log(`Given app package/bundle id ${packageIdOrBundleId} installed on the device is ${isAppInstalledInDevice.toString()}`);
      return isAppInstalledInDevice;
    } catch (error) {
      return this.ErrorHandler.logException(error, "Error: During isAppInstalled", true);
    }
  }

  /**
   * @function installApp
   * @memberof mobile.device
   * @description Install the appropriate app based on the platform the test is being executed on.
   * @param {string} appPath - Path of the app(.apk, .ipa)
   * @example
   * await mobile.device.installApp("/path/to/your/app.apk");
   * await mobile.device.installApp("/path/to/your/app.ipa");
   */
  async installApp(appPath: string): Promise<void> {
    const vl = this.vlf.initLog(this.installApp);
    const platform: String = await browser.capabilities.platformName;
    try {
      vl.log(`Installing ${platform.toLowerCase()} app...`);
      if (["android", "ios"].includes(platform.toLowerCase().trim())) {
        await browser.installApp(appPath);
        vl.log(`${platform.toLowerCase()} app installed successfully.`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Unsupported platform while installing the app: ${platform.toLowerCase().trim()}`, true);
    }
  }
}
export default new Device();
