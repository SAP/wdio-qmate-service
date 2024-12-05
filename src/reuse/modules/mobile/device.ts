"use strict";
// Imports
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

// Types
type hideKeyboardStrategy = "pressKey" | "tapOutside" | "swipeDown" | "";

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
   * @param {string} appPackageOrBundleId - Android package Id, or iOS bundle Id.
   * @returns {boolean} Returns 'true' if specified app package/bundled installed in the device, or 'false'.
   * @example
   * await mobile.device.isAppInstalled("com.google.android.apps.maps");
   * await mobile.device.isAppInstalled("com.apple.AppStore")
   */
  async isAppInstalled(appPackageOrBundleId: string): Promise<boolean> {
    const vl = this.vlf.initLog(this.isAppInstalled);

    let isAppInstalledInDevice: boolean = false;
    const platform: string = await browser.capabilities.platformName;
    try {
      if (["android", "ios"].includes(platform.toLowerCase().trim())) {
        isAppInstalledInDevice = browser.isAppInstalled(appPackageOrBundleId);
        vl.log(`${platform.toLowerCase()} app installed successfully.`);
      } else {
        console.error(`Unsupported platform ${platform.toLowerCase().trim()} while checking the is app installed or not`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: Failed at is app installed", true);
    }
    return isAppInstalledInDevice;
  }

  /**
   * @function installApp
   * @memberof mobile.device
   * @description Install the appropriate app based on the platform the test is being executed on.
   * @param {string} appPath - Path of the app(.apk, .ipa)
   * @returns {Promise<void>}
   * @example
   * await mobile.device.installApp("/path/to/your/app.apk");
   * await mobile.device.installApp("/path/to/your/app.ipa");
   */
  async installApp(appPath: string): Promise<void> {
    const vl = this.vlf.initLog(this.installApp);

    const platform: string = await browser.capabilities.platformName;
    try {
      vl.log(`Installing ${platform.toLowerCase()} app...`);
      if (["android", "ios"].includes(platform.toLowerCase().trim())) {
        await browser.installApp(appPath);
        vl.log(`${platform.toLowerCase()} app installed successfully.`);
      } else {
        console.error(`Unsupported platform ${platform.toLowerCase().trim()} while installing app`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed installing the app: ${platform.toLowerCase().trim()}`, true);
    }
  }

  /**
   * @function switchToContext
   * @memberof mobile.device
   * @description Switch to the specified( WEBVIEW | NATIVE_APP ) context if available.
   * @param {string} [targetContext='WEBVIEW'] The name of the target context.
   * @param {number} [timeout=5000] Maximum time to wait for the web context to appear, milliseconds.
   * @returns {Promise<boolean>} Returns 'true' if the context is successfully switched, otherwise 'false'.
   * @example
   * await mobile.device.switchToContext();
   * await mobile.device.switchToContext("NATIVE_APP", 1000);
   */
  async switchToContext(targetContext: string = "WEBVIEW", timeout: number = 5000): Promise<boolean> {
    const vl = this.vlf.initLog(this.switchToContext);

    try {
      const isWebContextAvailable = await browser.waitUntil(
        async () => {
          // Get all available contexts
          const contexts: string[] = await browser.getContexts();
          return contexts.some((context) => context.includes(targetContext));
        },
        {
          timeout,
          timeoutMsg: `Context "${targetContext}" not found within ${timeout}ms`
        }
      );

      if (isWebContextAvailable) {
        const contexts: string[] = await browser.getContexts();
        // Find and switch to the target context
        for (const context of contexts) {
          if (context.includes(targetContext)) {
            await browser.switchContext(context);
            vl.log(`Switched to ${context} context successfully...`);
            console.log(`Switched to ${context} context successfully...`);
            return true;
          }
        }
      } else {
        vl.log(`Context ${targetContext} is not available.`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to switch context`, true);
    }
    return false;
  }

  /**
   * @function closeApplication
   * @memberof mobile.device
   * @description Close the currently active mobile application.
   * @returns {Promise<void>}
   * @example
   * await mobile.device.closeApplication();
   */
  async closeApplication(): Promise<void> {
    const vl = this.vlf.initLog(this.closeApplication);

    try {
      await browser.closeApp();
      vl.log("The application has been closed successfully.");
      console.log("The application has been closed successfully.");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to close the application`, true);
      console.error("Failed to close the application:", error);
    }
  }

  /**
   * @function queryAppState
   * @memberof mobile.device
   * @description Queries the state of the application (e.g., running, background, not installed) on the mobile device(Android or iOS).
   * @param {string} appPackageOrBundleId - Package name (Android) or bundle ID (iOS) of the application.
   * @returns {Promise<number>} - The app state:
   *  0 - Not running,
   *  1 - Not installed,
   *  2 - Running in the background (not suspended),
   *  3 - Running in the background (suspended),
   *  4 - Running in the foreground.
   * @example
   * await mobile.device.queryAppState("com.google.android.apps.maps");
   * await mobile.device.queryAppState("com.apple.AppStore");
   */
  async queryAppState(appPackageOrBundleId: string): Promise<number> {
    const vl = this.vlf.initLog(this.queryAppState);

    const platform: string = await browser.capabilities.platformName;
    let appState: number = -1;
    try {
      vl.log(`Querying the app ${platform.toLowerCase()} state...`);
      if (["android", "ios"].includes(platform.toLowerCase().trim())) {
        appState = await browser.queryAppState(appPackageOrBundleId);
        vl.log(`Application state for ${appPackageOrBundleId} : ${appState}`);
        console.log(`Application state for ${appPackageOrBundleId} : ${appState}`);
      } else {
        console.error(`Unsupported platform while query app state: ${platform.toLowerCase().trim()}`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to query app state for ${appPackageOrBundleId}:`, true);
      console.error(`Failed to query app state for ${appPackageOrBundleId}:`, error);
    }
    return appState;
  }

  /**
   * @function launchApp
   * @memberof mobile.device
   * @description Launches the app for both iOS and Android with a parameterized app identifier.
   * @param {string} appPackageOrBundleId - The Android package name or iOS bundle ID of the application.
   * @returns {Promise<void>} Resolves when the app is successfully launched.
   * @example
   * await mobile.device.launchApp("com.google.android.apps.maps");
   * await mobile.device.launchApp("com.apple.AppStore");
   */
  async launchApp(appPackageOrBundleId: string): Promise<void> {
    const vl = this.vlf.initLog(this.launchApp);

    const platform: string = await browser.capabilities.platformName;
    try {
      vl.log(`Launching ${platform.toLowerCase()} app...`);
      if (["android", "ios"].includes(platform.toLowerCase().trim())) {
        await browser.activateApp(appPackageOrBundleId);
        console.log(`${platform.toLowerCase()} App launched successfully with given ${appPackageOrBundleId} Package/bundle ID`);
        vl.log(`${platform.toLowerCase()} App launched successfully with given ${appPackageOrBundleId} Package/bundle ID`);
      } else {
        console.error(`Unsupported platform while launching the app: ${platform.toLowerCase().trim()}`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to launchApp`, true);
      console.error("Error: Failed to launchApp", error);
    }
  }

  /**
   * @function switchToLandscape
   * @memberof mobile.device
   * @description Switches the device orientation to landscape mode.
   * @returns {Promise<void>} Resolves when the orientation is successfully switched.
   * @example
   * await mobile.device.switchToLandscape();
   */
  async switchToLandscapeOrientation(): Promise<void> {
    const vl = this.vlf.initLog(this.switchToLandscape);

    try {
      const currentOrientation = await browser.getOrientation();
      if (currentOrientation === "LANDSCAPE") {
        vl.log("Device is already in landscape mode.");
        console.log("Device is already in landscape mode.");
        return;
      }

      console.log("Switching device orientation to landscape...");
      await browser.setOrientation("LANDSCAPE");
      console.log("Device orientation successfully switched to landscape.");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to switch device orientation to landscape`, true);
      console.error("Failed to switch device orientation to landscape:", error);
    }
  }

  /**
   * @function switchToPortrait
   * @memberof mobile.device
   * @description Switches the device orientation to portrait mode.
   * @returns {Promise<void>} Resolves when the orientation is successfully switched.
   * @example
   * await mobile.device.switchToPortrait();
   */
  async switchToPortraitOrientation(): Promise<void> {
    const vl = this.vlf.initLog(this.switchToPortrait);

    try {
      const currentOrientation = await browser.getOrientation();
      if (currentOrientation === "PORTRAIT") {
        vl.log("Device is already in portrait mode.");
        console.log("Device is already in portrait mode.");
        return;
      }

      console.log("Switching device orientation to portrait...");
      await browser.setOrientation("PORTRAIT");
      console.log("Device orientation successfully switched to portrait.");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to switch device orientation to portrait`, true);
      console.error("Failed to switch device orientation to portrait:", error);
    }
  }

  /**
   * @function getCurrentOrientation
   * @memberof mobile.device
   * @description Switches the device orientation to portrait mode.
   * @returns {Promise<string>} Resolves when the orientation is successfully switched.
   * @example
   * await mobile.device.getCurrentOrientation();
   */
  async getCurrentOrientation(): Promise<string> {
    const vl = this.vlf.initLog(this.getCurrentOrientation);

    let orientation = "UNKNOWN"; // Default value
    try {
      orientation = await browser.getOrientation();
      vl.log(`Current device orientation: ${orientation}`);
      console.log(`Current device orientation: ${orientation}`);
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to get the current device orientation`, true);
      console.error("Failed to get the current device orientation", error);
    }
    return orientation;
  }

  /**
   * @function hideKeyboard
   * @memberof mobile.device
   * @description Hides the keyboard on both Android and iOS using specific strategies with timeout.
   * @param {string} strategy - Strategy to use for hiding the keyboard ('pressKey', 'tapOutside', 'swipeDown').
   * @param {string} key - Key to press if using the 'pressKey' strategy (e.g., 'Done', 'Enter').
   * @param {number} keyCode - Key code for Android (optional).
   * @param {number} timeout - Timeout in milliseconds for retrying to hide the keyboard (default: 5000ms).
   * @returns {Promise<void>}
   */
  async hideKeyboard(strategy: hideKeyboardStrategy, key?: string, keyCode?: number, timeout: number = 5000): Promise<void> {
    const vl = this.vlf.initLog(this.hideKeyboard);

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        if (await util.browser.isAndroid()) {
          console.log("Hiding keyboard on Android.");
          vl.log("Hiding keyboard on Android.");
          await browser.hideKeyboard(strategy, key, keyCode);
        } else if (await util.browser.isIos()) {
          console.log("Hiding keyboard on iOS.");
          vl.log("Hiding keyboard on iOS.");
          await browser.execute("mobile: hideKeyboard", { strategy });
        } else {
          console.warn("Unsupported platform: Unable to hide the keyboard.");
          return;
        }
        console.log("Keyboard hidden successfully.");
        return; // Exit if the keyboard is successfully hidden
      } catch (error) {
        console.warn("Failed to hide the keyboard. Retrying...", error);
        // Wait briefly before retrying
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    console.error(`Failed to hide the keyboard within the timeout of ${timeout}ms.`);
  }

  /**
   * @function hideKeyboard
   * @memberof mobile.device
   * @description Checks if the keyboard is visible or not on the mobile device.
   * @returns {Promise<boolean>}
   */
  async isKeyboardVisible(): Promise<boolean> {
    const vl = this.vlf.initLog(this.isKeyboardVisible);

    let isKeyboardVisible: boolean = false;
    try {
      if (await util.browser.isAndroid()) {
        vl.log("check if the screen height is reduced due to the keyboard");
        // For Android, check if the screen height is reduced due to the keyboard
        const windowRect = await browser.getWindowRect();
        const screenSize = await browser.getWindowSize();
        // If the visible height is less, keyboard is visible
        vl.log("if visible height is less, keyboard is visible");
        isKeyboardVisible = windowRect.height < screenSize.height;
        return isKeyboardVisible;
      } else if (await util.browser.isIos()) {
        // For iOS, check if the keyboard is displayed via Appium's mobile API
        const isKeyboardShown = await browser.execute("mobile: isKeyboardShown");
        isKeyboardVisible = isKeyboardShown === true; // Returns true if the keyboard is visible
        return isKeyboardVisible;
      } else {
        console.warn("Unsupported platform: Unable to detect keyboard visibility.");
        return false;
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to get the is keyboard visible`, true);
      console.error("Failed to get the is keyboard visible", error);
    }
    return isKeyboardVisible;
  }
}
export default new Device();
