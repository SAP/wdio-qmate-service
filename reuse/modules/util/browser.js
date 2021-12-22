"use strict";
/**
 * @class browser
 * @memberof util
 */
const Browser = function () {

  // =================================== URL ===================================
  /**
   * @function getBaseUrl
   * @memberOf util.browser
   * @description Retrieves the baseUrl from the configuration file.
   * @returns {String} The baseUrl.
   * @example const baseUrl = await util.browser.getBaseUrl();
   */
  this.getBaseUrl = function () {
    return browser.config.baseUrl;
  };

  /**
   * @function setBaseUrl
   * @memberOf util.browser
   * @description Sets or overwrites the baseUrl in the configuration file.
   * @param {String} baseUrl: base URL to set
   * @example await util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
   */
  this.setBaseUrl = function (baseUrl) {
    browser.config.baseUrl = baseUrl;
  };

  /**
   * @function logCurrentUrl
   * @memberOf util.browser
   * @description Displays the current URL in the console.
   * @example await util.browser.logCurrentUrl();
   */
  this.logCurrentUrl = async function () {
    const url = await browser.getUrl();
    util.console.info("Current URL: " + url);
  };

  /**
   * @function getCurrentUrl
   * @memberOf util.browser
   * @description Returns the current URL
   * @example await util.browser.getCurrentUrl();
   */
  this.getCurrentUrl = async function () {
    return browser.getUrl();
  };

  // =================================== ACTIONS ===================================
  /**
   * @function resetFocus
   * @memberOf util.browser
   * @description Resets the focus in case it set for a specific element.
   * @example await util.browser.resetFocus();
   */
  this.resetFocus = async function () {
    await util.browser.executeScript("if (document.activeElement) { document.activeElement.blur(); }");
  };

  /**
   * @function sleep
   * @memberOf util.browser
   * @description Sleeps (pauses execution) for the passed duration.
   * @param {Number} [duration=1000] - The time to pause (ms).
   * @example await util.browser.sleep(30000);
   */
  this.sleep = async function (duration = 10000) {
    await browser.pause(duration);
  };

  /**
   * @function collectCoverage
   * @memberOf util.browser
   * @description Trigger collection of coverage by coverage service.
   * @example await util.browser.collectCoverage();
   */
  this.collectCoverage = async function () {
    if (browser.config.params && browser.config.params.coverage && (
      browser.config.params.coverage.status === true || browser.config.params.coverage.status === "true")) {
      await browser.collectCoverage();
    } else {
      util.console.warn("Coverage is disabled. Please enable coverage in config file.");
    }
  };

  /**
   * @function sleepAndCollectCoverage
   * @memberOf util.browser
   * @description Trigger collection of coverage by coverage service.
   * @param {Number} [duration=1000] - The time to pause (ms).
   * @example await util.browser.sleepAndCollectCoverage(3000);
   */
  this.sleepAndCollectCoverage = async function (duration = 5000) {
    if (browser.config.params && browser.config.params.coverage && (
      browser.config.params.coverage.status === true || browser.config.params.coverage.status === "true")) {
      await this.sleep(duration);
      await browser.collectCoverage();
    } else {
      util.console.warn("Coverage is disabled. Please enable coverage in config file.");
    }
  };

  /**
   * @function refresh
   * @memberOf util.browser
   * @description Refreshes the page.
   * @example await util.browser.refresh();
   */
  this.refresh = async function () {
    await browser.refresh();
  };

  /**
   * @function clearBrowser
   * @memberOf util.browser
   * @description Clears the local and session cache and deletes all browser cookies.
   * @param {Boolean} [clearLocal=true] - Specifies if the local cache will be cleared.
   * @param {Boolean} [clearSession=true] - Specifies if the session cache will be cleared.
   * @param {Boolean} [clearCookies=true] - Specifies if the cookies will be cleared.
   * @example await util.browser.clearBrowser();
   */
  this.clearBrowser = async function (clearLocal = true, clearSession = true, clearCookies = true) {
    if (clearLocal) {
      const localStorage = await browser.getLocalStorage();
      localStorage.clear();
    }
    if (clearSession) {
      const sessionStorage = await browser.getSessionStorage();
      sessionStorage.clear();
    }
    if (clearCookies) {
      browser.deleteAllCookies();
    }
  };


  // =================================== LOGGING ===================================
  /**
   * @function getBrowserName
   * @memberOf util.browser
   * @description Retrieves the name of the current browser.
   * @returns {String} The browser name.
   * @example const browserName = await util.browser.getBrowserName();
   */
  this.getBrowserName = function () {
    return browser.capabilities.browserName;
  };

  /**
   * @function getUI5Version
   * @memberOf util.browser
   * @description Gets the UI5 version and creation date for UI5 based applications.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await util.browser.getUI5Version();
   */
  this.getUI5Version = async function (timeout = browser.config.waitForUI5Timeout || 30000) {
    await browser.waitUntil(async function () {
      // eslint-disable-next-line no-return-await
      return await browser.execute(function () {
        try {
          if (window && window.sap && window.sap.ui) {
            return true;
          } else {
            return false;
          }
        } catch (oError) {
          return false;
        }
      });
    }, {
      timeout: timeout,
      timeoutMsg: `Page did not load within timeout ${timeout / 1000}s`,
      interval: 400
    });

    return util.browser.executeScript(function () {
      /* eslint-disable no-undef */
      if (sap && sap.ui && sap.ui.getVersionInfo && sap.ui.getVersionInfo()) {
        const version = sap.ui.getVersionInfo().version;

        let timestamp = sap.ui.getVersionInfo().buildTimestamp;
        if (timestamp) {
          const creationYear = timestamp.substring(0, 4);
          const creationMonth = timestamp.substring(4, 6);
          const creationDay = timestamp.substring(6, 8);
          timestamp = creationDay + "/" + creationMonth + "/" + creationYear;
        }

        return {
          "version": version,
          "timestamp": timestamp
        };
      } else {
        util.console.warn("UI5 version information could not be retrieved.");
        return null;
      }
    });
  };

  /**
   * @function logUI5Version
   * @memberOf util.browser
   * @description Logs the UI5 version and creation date for UI5 based applications to the console.
   * @example await util.browser.logUI5Version();
   */
  this.logUI5Version = async function () {
    let logUI5Version;
    if (browser.config.params && browser.config.params.logUI5Version !== undefined) {
      logUI5Version = browser.config.params.logUI5Version;
    } else {
      logUI5Version = true;
    }

    if (logUI5Version !== false && !process.env.UI5_VERSION_LOGGED) {
      const ui5Version = await this.getUI5Version();
      util.console.log("");
      util.console.info(`UI5 Version:\t${ui5Version.version}`);
      util.console.info(`UI5 Timestamp:\t${ui5Version.timestamp}`);
      util.console.log("");

      if (logUI5Version !== "always") {
        process.env.UI5_VERSION_LOGGED = true;
      }
    }
  };

  // =================================== EXECUTION ===================================
  /**
   * @function executeScript
   * @memberOf util.browser
   * @description Executes the specified JavaScript command.
   * @param {String} command - The command to execute.
   * @returns {Any} The result from the executed function.
   * @example await util.browser.executeScript(command);
   */
  this.executeScript = async function (command) {
    return browser.execute(command);
  };


  // =================================== WINDOW HANDLING ===================================
  //@TODO: refactor whole functions
  //@TODO: need to be updated - would be good to return all handles getWindowHandles() in array
  /**
   * @function waitForWindows
   * @memberOf util.browser
   * @example await util.browser.waitForWindows();
   */
  this.waitForWindows = async function (expectedWindowsNumber, retries = 50, waitInternal = 1000) {
    try {
      const windowHandles = await browser.getWindowHandles();
      //if(!windowHandles) return await this.waitForWindow(expectedWindowsNumber, retries, waitInternal);
      util.console.log("Windows length -->" + windowHandles.length);
      if (windowHandles.length === expectedWindowsNumber) {
        return expect(true).toEqual(true); //@TODO: change to promise resolve 
      }
      retries--;
      await browser.pause(waitInternal);
      if (retries < 1) {
        util.console.error("Function 'waitForWindows' failed: Timeout reached, increase the retries, window was not loaded fully.");
        return expect(true).toEqual(false); //@TODO: change to promise reject 
      }
      return await this.waitForWindows(expectedWindowsNumber, retries, waitInternal);
    } catch (error) {
      util.console.error(`Function 'waitForWindows' failed: ${error}`);
    }
  };

  // better to use this.switchToWindow
  /**
   * @function switchToNewWindow
   * @memberOf util.browser
   * @description Switches the window.
   * @param {String} originalHandle - The main window handle.
   * @param {String} windowTitle - Window Title to be expected
   * @example await util.browser.switchToNewWindow(originalHandle,);
   */
  this.switchToNewWindow = async function (originalHandle, windowTitle) {
    const windowHandles = await browser.getWindowHandles();

    for (let i = 0; i < windowHandles.length; i++) {
      await (async (idx) => {
        try {
          if (windowHandles[idx] !== originalHandle) {
            try {
              console.log("Switching window" + windowHandles[idx]);
              await browser.switchToWindow(windowHandles[idx]);
              await browser.executeScript("window.focus();", []);
              if (windowTitle) {
                const title = await browser.getTitle();
                if (title === windowTitle) {
                  return expect(true).toEqual(true);
                }
                throw new Error("Function 'switchToNewWindow' failed.");
              } else {
                return expect(true).toEqual(true);
              }
            } catch (error) {
              util.console.warn("Retrying 'switchToNewWindow'."); //@TODO: check for endeless recursion
              return await this.switchToNewWindow(originalHandle, windowTitle);
            }
          }
        } catch (e) {
          util.console.warn("Function 'switchToNewWindow': Could not get Title. Window already closed.");
        }
      })(i);
    }
  };

  /**
   * @function switchToWindow
   * @memberOf util.browser
   * @description Switches to the passed window.
   * @param {Object} handle - The window handle.
   * @example await util.browser.switchToWindow(originalWindowHandle);
   */
  this.switchToWindow = async function (handle) {
    await browser.switchToWindow(handle);
  };

  /**
   * @function getCurrentWindow
   * @memberOf util.browser
   * @description Returns the current window handle.
   * @returns {Object} The window handle.
   * @example await util.browser.getCurrentWindow();
   */
  this.getCurrentWindow = async function () {
    return browser.getWindowHandle();
  };

};
module.exports = new Browser();