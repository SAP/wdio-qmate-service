import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class Android
 * @memberof Mobile
 */
export class Android {
  private vlf = new VerboseLoggerFactory("mobile", "android");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function pressKeyByName
   * @memberOf mobile.android
   * @description Simulate pressing a hardware key on the android device (e.g., back button, home button, etc.),
   * @param {string} keyName - The name of the key (e.g., "back", "home", "volumeUp", etc.)
   * @example
   * await mobile.device.pressKeyByName("back");
   * await mobile.device.pressKeyByName("home");
   * await mobile.device.pressKeyByName("volumeUp");
   * await mobile.device.pressKeyByName("volumeDown");
   * await mobile.device.pressKeyByName("power");
   * await mobile.device.pressKeyByName("enter");
   * await mobile.device.pressKeyByName("space");
   * await mobile.device.pressKeyByName("delete");
   * await mobile.device.pressKeyByName("menu");
   * await mobile.device.pressKeyByName("search");
   * await mobile.device.pressKeyByName("camera");
   * await mobile.device.pressKeyByName("focus");
   * await mobile.device.pressKeyByName("notification");
   */
  async pressKeyByName(keyName: string): Promise<void> {
    const vl = this.vlf.initLog(this.pressKeyByName);

    const keyCodeMap: { [key: string]: number } = {
      back: 4,
      home: 3,
      volumeUp: 24,
      volumeDown: 25,
      VolumeMute: 164,
      power: 26,
      enter: 66,
      space: 62,
      delete: 67,
      menu: 82,
      search: 84,
      camera: 27,
      focus: 80,
      notification: 83,
      call: 5,
      calendar: 208,
      recent: 312,
      settings: 176
    };

    try {
      const keyCode = keyCodeMap[keyName.toLowerCase()];
      if (keyCode !== undefined) {
        vl.log(`Pressing key: ${keyName} (code: ${keyCode})`);
        await browser.pressKeyCode(keyCode);
      } else {
        throw new Error(`Key code for "${keyName}" not found.`);
      }
    } catch (error) {
      return this.ErrorHandler.logException(error, "Error: During pressKeyByName in Android", true);
    }
  }

  /**
   * @function pressKeyByCode
   * @memberOf mobile.android
   * @description Simulate pressing a hardware key on the android device (e.g., back button, home button, etc.),
   * @param {string} keyCode - The code of the key (e.g., "back", "home", "volumeUp", etc.)
   * @example
   */
  async pressKeyByCode(keyCode: Number): Promise<void> {
    const vl = this.vlf.initLog(this.pressKeyByCode);
    try {
      vl.log(`Pressing key by code: ${keyCode}`);
      await browser.pressKeyCode(keyCode);
    } catch (error) {
      return this.ErrorHandler.logException(error, "Error: During pressKeyByCode in Android", true);
    }
  }
}
export default new Android();
