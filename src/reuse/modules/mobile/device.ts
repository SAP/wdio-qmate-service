"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class device
 * @memberof Mobile
 */
export class Device {
  private vlf = new VerboseLoggerFactory("mobile", "device");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function isAppInstalled
   * @memberOf mobile.device
   * @description Check wether given package/bundle app is installed or not in the device.
   * @param {string} packageIdorBundleId - Android package Id, or iOS bundle Id.
   * @returns {boolean} Returns true if specified app package/bundled installed in the device, or false.
   * @example await mobile.device.isAppInstalled("com.google.android.apps.maps");
   */
  async isAppInstalled(packageIdorBundleId: string): Promise<boolean> {
    const vl = this.vlf.initLog(this.isAppInstalled);
    try {
      const isAppInstalledinDevice: boolean = browser.isAppInstalled(packageIdorBundleId);
      vl.log(`Given app package/bundle id ${packageIdorBundleId} installed on the device is ${isAppInstalledinDevice.toString()}`);
      return isAppInstalledinDevice;
    } catch (error) {
      return this.ErrorHandler.logException(error, 'Error: During isAppInstalled', true);
    }
  }

/**
   * @function installAppForPlatform
   * @memberOf mobile.device
   * @description Install the appropriate app based on the platform the test is being executed on.
   * @param {string} appPath - Path of the app(.apk, .ipa)
   * @example 
   * await mobile.device.installAppForPlatform("/path/to/your/app.apk");
   * await mobile.device.installAppForPlatform("/path/to/your/app.ipa");
   */
async installAppForPlatform(appPath: string): Promise<void> {
  const vl = this.vlf.initLog(this.installAppForPlatform);
  const platform = await browser.capabilities.platformName;
  try {
      if (platform.toLowerCase() === 'android') {
          vl.log("Installing Android app...");
          await browser.installApp(appPath);
          vl.log("Android app installed successfully.");
      } else if (platform.toLowerCase() === 'ios') {
          vl.log("Installing iOS app...");
          await browser.installApp(appPath);
          vl.log("iOS app installed successfully.");
      } else {
          throw new Error(`Unsupported platform while installing the app: ${platform}`);
      }
  } catch (error) {
      this.ErrorHandler.logException(error, 'Error: During installAppForPlatform', true);
  }
}

/**
   * @function pressKeyByNameInAndroid
   * @memberOf mobile.device
   * @description Simulate pressing a hardware key on the device (e.g., back button, home button, etc.), 
   * and it specific to Android devices
   * @param {string} keyName - The name of the key (e.g., "back", "home", "volumeUp", etc.)
   * @example 
   * await mobile.device.pressKeyByNameInAndroid("back");
   * await mobile.device.pressKeyByNameInAndroid("home");
   * await mobile.device.pressKeyByNameInAndroid("volumeUp");
   * await mobile.device.pressKeyByNameInAndroid("volumeDown");
   * await mobile.device.pressKeyByNameInAndroid("power");
   * await mobile.device.pressKeyByNameInAndroid("enter");
   * await mobile.device.pressKeyByNameInAndroid("space");
   * await mobile.device.pressKeyByNameInAndroid("delete");
   * await mobile.device.pressKeyByNameInAndroid("menu");
   * await mobile.device.pressKeyByNameInAndroid("search");
   * await mobile.device.pressKeyByNameInAndroid("camera");
   * await mobile.device.pressKeyByNameInAndroid("focus");
   * await mobile.device.pressKeyByNameInAndroid("notification");
   */
async pressKeyByNameInAndroid(keyName: string): Promise<void> {
  const vl = this.vlf.initLog(this.pressKeyByNameInAndroid);

  const keyCodeMap: { [key: string]: number } = {
      back: 4,
      home: 3,
      volumeUp: 24,
      volumeDown: 25,
      power: 26,
      enter: 66,
      space: 62,
      delete: 67,
      menu: 82,
      search: 84,
      camera: 27,
      focus: 80,
      notification: 83,
  };

  try {
    const keyCode = keyCodeMap[keyName.toLowerCase()];
    if (keyCode !== undefined) {
      vl.log(`Pressing key: ${keyName} (code: ${keyCode})`);
      await browser.pressKeyCode(keyCode);
    } else {
        throw new Error(`Key code for "${keyName}" not found.`);
    }
  }catch(error){
    return this.ErrorHandler.logException(error, 'Error: During pressKeyByNameInAndroid in Android', true);
  }
}



}

export default new Device();