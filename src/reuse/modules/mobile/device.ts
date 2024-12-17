"use strict";
// Imports
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

// Types
type hideKeyboardStrategy = "pressKey" | "tapOutside" | "swipeDown" | "";

const ORIENTATION = {
  LANDSCAPE: "LANDSCAPE",
  PORTRAIT: "PORTRAIT",
  UNKNOWN: "UNKNOWN"
} as const;
type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION];

/**
 * @class device
 * @memberof mobile
 */
export class Device {
  private vlf = new VerboseLoggerFactory("mobile", "device");
  private ErrorHandler = new ErrorHandler();

  //==================================Private Methods===============================================
  /**
   * @function isValidPlatform
   * @memberof mobile.device
   * @description Check the mobile platform from the session's capabilities.
   * @returns {boolean} Returns 'true' if the platform in the session's capabilities is either Android or iOS.
   */
  private async isValidPlatform(): Promise<boolean> {
    const vl = this.vlf.initLog(this.isValidPlatform);

    const SUPPORTED_PLATFORMS = ["android", "ios"];
    const platform: string = await browser.capabilities.platformName;
    return SUPPORTED_PLATFORMS.includes(platform.toLowerCase().trim());
  }

  /**
   * @function executionPlatform
   * @memberof mobile.device
   * @description Check the mobile platform from the session's capabilities.
   * @returns {string} Return current execution platform in the session's capabilities.
   */
  private async executionPlatform(): Promise<string> {
    const vl = this.vlf.initLog(this.executionPlatform);
    const platform: string = browser.capabilities.platformName;
    return platform.toLowerCase().trim();
  }

  //==================================Public Methods================================================
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
    try {
      if (await this.isValidPlatform()) {
        isAppInstalledInDevice = browser.isAppInstalled(appPackageOrBundleId);
        vl.log(`${await this.executionPlatform()} app installed successfully.`);
      } else {
        vl.log(`Unsupported platform while checking the is app installed or not`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: Could not determine if app is installed, The provided package name is invalid.", true);
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

    try {
      vl.log(`Installing ${await this.executionPlatform()} app...`);
      if (await this.isValidPlatform()) {
        await browser.installApp(appPath);
        vl.log(`${await this.executionPlatform()} app installed successfully.`);
      } else {
        vl.log(`Unsupported platform ${await this.executionPlatform()} while installing app`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Unable to install app. The provided app path ${appPath} does not exist`, true);
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
      let target = this.getTargetContextAvailable(targetContext, timeout);
      if (typeof target === "string") {
        await browser.switchContext(target);
        vl.log(`Switched to ${target} context successfully...`);
        return true;
      } else {
        vl.log(`Switched to ${target} context not successful, it may be null`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: No contexts available, Could not switch to ${targetContext} context 'INVALID_CONTEXT'. `, true);
    }
    return false;
  }

  /**
   * Checks if the specified target context is available within a given timeout.
   *
   * This method retrieves the list of available contexts and determines if a context
   * that matches the `targetContext` string is present. If the target context is found,
   * it returns the context name; otherwise, it returns `null`.
   *
   * @param {string} [targetContext="WEBVIEW"] - The name of the target context to check for.
   *   Common examples are "WEBVIEW" or "NATIVE_APP".
   * @param {number} [timeout=5000] - The maximum time, in milliseconds, to wait for the target
   *   context to become available.
   * @returns {Promise<string | null>} - The name of the target context if found, or `null` if
   *   the context is not available within the timeout.
   * @example
   * const context = await getTargetContextAvailable("WEBVIEW", 10000);
   * const context = await getTargetContextAvailable("NATIVE_APP", 10000);
   */
  async getTargetContextAvailable(targetContext: string = "WEBVIEW", timeout: number = 5000): Promise<string | null> {
    const vl = this.vlf.initLog(this.getTargetContextAvailable);

    try {
      let availableContexts: string[] = [];
      const isContextAvailable = await browser.waitUntil(
        async () => {
          // Get all available contexts
          availableContexts = await browser.getContexts();
          return availableContexts.some((context) => context.includes(targetContext));
        },
        {
          timeout,
          timeoutMsg: `Target Context "${targetContext}" not found within ${timeout}ms`
        }
      );

      if (isContextAvailable) {
        const target = availableContexts.find((context) => context.includes(targetContext));
        vl.log(`Target Context "${target}" is available.`);
        return target || null;
      } else {
        vl.log(`Target Context ${targetContext} is not available.`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: No contexts available, Failed to check is target ${targetContext} context available`, true);
    }
    return null;
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
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Unable to close app, the app is not currently running`, true);
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

    let appState: number = -1;
    try {
      vl.log(`Querying the ${await this.executionPlatform()} app state...`);
      if (await this.isValidPlatform()) {
        appState = await browser.queryAppState(appPackageOrBundleId);
        vl.log(`Application state for ${appPackageOrBundleId} : ${appState}`);
      } else {
        vl.log(`Unsupported platform while query app state: ${await this.executionPlatform()}`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Unable to query app state, the package name ${appPackageOrBundleId} is invalid or does not exist.`, true);
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

    try {
      vl.log(`Launching ${await this.executionPlatform()} app...`);
      if (await this.isValidPlatform()) {
        await browser.activateApp(appPackageOrBundleId);
        vl.log(`${await this.executionPlatform()} App launched successfully with given ${appPackageOrBundleId} Package/bundle ID`);
      } else {
        vl.log(`Unsupported platform while launching the app: ${await this.executionPlatform()}`);
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Unable to launch the app, the package name ${appPackageOrBundleId} is invalid or does not exist.`, true);
    }
  }

  /**
   * @function switchToLandscapeOrientation
   * @memberof mobile.device
   * @description Switches the device orientation to landscape mode.
   * @returns {Promise<void>} Resolves when the orientation is successfully switched.
   * @example
   * await mobile.device.switchToLandscapeOrientation();
   */
  async switchToLandscapeOrientation(): Promise<void> {
    const vl = this.vlf.initLog(this.switchToLandscapeOrientation);

    try {
      const currentOrientation = await browser.getOrientation();
      if (currentOrientation === ORIENTATION.LANDSCAPE) {
        vl.log("Device is already in landscape mode.");
        return;
      }

      vl.log("Switching device orientation to landscape...");
      await browser.setOrientation(ORIENTATION.LANDSCAPE);
      vl.log("Device orientation successfully switched to landscape.");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Could not change device orientation, Invalid argument: The orientation must be 'LANDSCAPE'.`, true);
    }
  }

  /**
   * @function switchToPortraitOrientation
   * @memberof mobile.device
   * @description Switches the device orientation to portrait mode.
   * @returns {Promise<void>} Resolves when the orientation is successfully switched.
   * @example
   * await mobile.device.switchToPortraitOrientation();
   */
  async switchToPortraitOrientation(): Promise<void> {
    const vl = this.vlf.initLog(this.switchToPortraitOrientation);

    try {
      const currentOrientation = await browser.getOrientation();
      if (currentOrientation === ORIENTATION.PORTRAIT) {
        vl.log("Device is already in portrait mode.");
        return;
      }

      vl.log("Switching device orientation to portrait...");
      await browser.setOrientation(ORIENTATION.PORTRAIT);
      vl.log("Device orientation successfully switched to portrait.");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Could not change device orientation, Invalid argument: The orientation must be 'PORTRAIT`, true);
    }
  }

  /**
   * @function getCurrentOrientation
   * @memberof mobile.device
   * @description Returns the device current orientation (PORTRAIT or LANDSCAPE)
   * @returns {Promise<Orientation>} The current device orientation.
   * @example
   * await mobile.device.getCurrentOrientation();
   */
  async getCurrentOrientation(): Promise<Orientation> {
    const vl = this.vlf.initLog(this.getCurrentOrientation);

    let orientation = ORIENTATION.UNKNOWN; // Default value
    try {
      orientation = await browser.getOrientation();
      vl.log(`Current device orientation: ${orientation}`);
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Could not get the current device orientation`, true);
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
   * @param {number} [timeout=5000] - Timeout in milliseconds for retrying to hide the keyboard.
   * @returns {Promise<void>}
   * @example
   * await mobile.device.hideKeyboard();
   * await mobile.device.hideKeyboard('tapOutside');
   * await mobile.device.hideKeyboard('swipeDown');
   * //Android only, Sends a specific key code, like 66 for "Enter."
   * await mobile.device.hideKeyboard('pressKey', undefined, 66);
   * await mobile.device.hideKeyboard('pressKey', 'Done');
   */
  async hideKeyboard(strategy?: hideKeyboardStrategy, key?: string, keyCode?: number, timeout: number = 5000): Promise<void> {
    const vl = this.vlf.initLog(this.hideKeyboard);

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        if (await util.browser.isAndroid()) {
          vl.log("Hiding keyboard on Android.");
          await browser.hideKeyboard(strategy, key, keyCode);
        } else if (await util.browser.isIos()) {
          vl.log("Hiding keyboard on iOS.");
          await browser.execute("mobile: hideKeyboard", { strategy });
        } else {
          vl.log("Unsupported platform: Unable to hide the keyboard.");
          return;
        }
        vl.log("Keyboard hidden successfully.");
        return; // Exit if the keyboard is successfully hidden
      } catch (error) {
        // Wait briefly before retrying
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.ErrorHandler.logException(error, `Error: Failed to hide the keyboard, Retrying...`, true);
      }
    }
    vl.log(`Failed to hide the keyboard within the timeout of ${timeout}ms.`);
  }

  /**
   * @function isKeyboardVisible
   * @memberof mobile.device
   * @description Checks if the keyboard is visible or not on the mobile device.
   * @returns {Promise<boolean>} Returns 'true' if the keyboard is visible on the mobile view.
   * @example
   * await mobile.device.isKeyboardVisible();
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
      } else if (await util.browser.isIos()) {
        // For iOS, check if the keyboard is displayed via Appium's mobile API
        const isKeyboardShown = await browser.execute("mobile: isKeyboardShown");
        isKeyboardVisible = isKeyboardShown === true; // Returns true if the keyboard is visible
      } else {
        vl.log("Unsupported platform: Unable to detect keyboard visibility.");
        return false;
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: Failed to get the is keyboard visible`, true);
    }
    return isKeyboardVisible;
  }

  /**
   * @function isPlatformSupported
   * @memberof mobile.device
   * @description Determine if the current platform is supported, if the current device platform is either Android or iOS.
   * @returns {Promise<boolean>} If neither Android nor iOS is detected (e.g., Windows, Linux, or web), the condition evaluates to false
   * @example
   * await mobile.device.isPlatformSupported();
   */
  async isPlatformSupported(): Promise<boolean> {
    return (await util.browser.isAndroid()) || (await util.browser.isIos());
  }
}
export default new Device();
