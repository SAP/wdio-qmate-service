/**
* @class browser
* @memberof utilities
*/
const BrowserUtil = function () {

  /**
   * @function getBaseUrl
   * @memberOf utilities.browser
   * @description Get baseUrl from the configuration file for the current test spec
   * @returns {String}
   * @example const baseUrl = await utilities.browser.getBaseUrl();
   */
  this.getBaseUrl = function () {
    return browser.config.baseUrl;
  };

  /**
   * @function setBaseUrl
   * @memberOf utilities.browser
   * @description Get baseUrl from the configuration file for the current test spec
   * @param {String} baseUrl: base URL to set
   * @example await utilities.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
   */
  this.setBaseUrl = function (baseUrl) {
    browser.config.baseUrl = baseUrl;
  };

  /**
   * @function clearBrowser
   * @memberOf utilities.browser
   * @description Clears the local and session cache and deletes all browser cookies.
   * @param {Boolean} clearLocal - Set to false if you dont want to clear the local cache (Default is true).
   * @param {Boolean} clearSession - Set to false if you dont want to clear the session cache (Default is true).
   * @param {Boolean} clearCookies - Set to false if you dont want to delete all browser cookies (Default is true).
   * @example await utilities.browser.clearBrowser();
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

  /**
   * @function sleep
   * @memberOf utilities.browser
   * @description Browser will sleep for the passed duration.
   * @param {Integer} duration - The time to wait in milliseconds (Default is 10 sec).
   * @example await utilities.browser.sleep(30000);
   */
  this.sleep = async function (duration = 10000) {
    await browser.pause(duration);
  };

  /**
   * @function refresh
   * @memberOf utilities.browser
   * @description Browser will refresh the page.
   * @example await utilities.browser.refresh();
   */
  this.refresh = async function () {
    await browser.refresh();
  };

  /**
   * @function sleepAndCollectCoverage
   * @memberOf utilities.browser
   * @description Collects and stores the coverage information before a hard browser event (logout, clear history),
   * also useful when parallelizing multiple specs and need to aggregate the coverage information
   * @param {Integer} sleep - Stop browser actions for the collection of coverage (Default is 5 secs or 5000 msecs).
   * @example await utilities.browser.sleepAndCollectCoverage(5000);
   */
  this.sleepAndCollectCoverage = function (sleep = 5000) {
    if (browser.params.coverage.status && browser.params.coverage.status !== "false") {
      // Coverage will be collected via @wdio/qmate-code-coverage-service
    } else {
      console.warn("Coverage is disabled. Please enabled the coverage in the config file.");
    }
  };

  /**
   * @function getBrowserName
   * @memberOf utilities.browser
   * @description Returns the name of the current browser.
   * @returns {String} The browser name.
   * @example const browserName = await utilities.browser.getBrowserName();
   */
  this.getBrowserName = function () {
    return browser.capabilities.browserName;
  };

  /**
   * @function executeScript
   * @memberOf utilities.browser
   * @description Executes the specified JS command.
   * @param {String} command - The command to run.
   * @example await utilities.browser.executeScript(command);
   */
  this.executeScript = async function (command) {
    return browser.execute(command);
  };

  /**
   * @function getUI5Version
   * @memberOf utilities.browser
   * @description Get UI5 Version and creation date for ui5 based apps
   * @example await utilities.browser.getUI5Version();
   */
  this.getUI5Version = async function () {
    await browser.waitUntil(async function () {
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
      timeout: browser.config.waitForUI5Timeout,
      timeoutMsg: `Page did not load within timeout ${browser.config.waitForUI5Timeout / 1000}s`,
      interval: 400
    });

    return utilities.browser.executeScript(function () {
      /* eslint-disable no-undef */
      if (sap &&
          sap.ui &&
          sap.ui.getVersionInfo &&
          sap.ui.getVersionInfo()) {
        var sVersion = sap.ui.getVersionInfo().version;
        var sDateTime = sap.ui.getVersionInfo().buildTimestamp;
        var resStr = "UI5 Version: " + sVersion;
        if (sDateTime) {
          var sCreationYear = sDateTime.substring(0, 4);
          var sCreationMonth = sDateTime.substring(4, 6);
          var sCreationDay = sDateTime.substring(6, 8);
          sDateTime = sCreationDay + "/" + sCreationMonth + "/" + sCreationYear;
          resStr += "\nUI5 Build Timestamp: " + sDateTime;
        }
        return resStr;
      } else {
        console.warn("UI5 version information could not be retrieved");
        return null;
      }
    });
  };

  /**
   * @function sendKeys
   * @memberOf utilities.browser
   * @description Executes the set of keystrokes.
   * @param {String} keys - The combination of keys to execute.
   * @example await utilities.browser.sendKeys(protractor.Key.CONTROL, protractor.Key.ALT, "d");
   */
  this.sendKeys = async function (...keys) {
    await browser.sendKeys(keys);
  };
};
module.exports = new BrowserUtil();
