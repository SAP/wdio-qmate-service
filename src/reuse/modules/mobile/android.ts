// Imports
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

// Types
type KeyName = "back" | "home" | "volumeUp" | "volumeDown" | "VolumeMute" | "power" | "enter" | "space" | "delete" | "menu" | "search" | "camera" | "focus" | "notification" | "call" | "calendar" | "recent" | "settings";

/**
 * @class android
 * @memberof mobile
 */
export class Android {
  private vlf = new VerboseLoggerFactory("mobile", "android");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function pressKeyByName
   * @memberof mobile.android
   * @description Simulate pressing a hardware key on the android device (e.g., back button, home button, etc.),
   * @param {string} keyName - The name of the key (e.g., "back", "home", "volumeUp", etc.)
   * @example await mobile.device.pressKeyByName("back");
   * @example await mobile.device.pressKeyByName("home");
   */
  async pressKeyByName(keyName: KeyName): Promise<void> {
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
   * @memberof mobile.android
   * @description Simulate pressing a hardware key on the android device (e.g., back button, home button, etc.),
   * @param {string} keyCode - The code of the key (e.g., 4 (back), 3 (home) , etc.)
   * @example await mobile.android.pressKeyByCode(4);
   * @see https://developer.android.com/reference/android/view/KeyEvent
   */
  async pressKeyByCode(keyCode: number): Promise<void> {
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
