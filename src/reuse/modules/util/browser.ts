"use strict";
/**
 * @class browser
 * @memberof util
 */
export class Browser {
  // =================================== URL ===================================
  /**
   * @function getBaseUrl
   * @memberOf util.browser
   * @description Retrieves the baseUrl from the configuration file.
   * @returns {String} The baseUrl.
   * @example const baseUrl = util.browser.getBaseUrl();
   */
  getBaseUrl(): string {
    return browser.config.baseUrl;
  }

  /**
   * @function setBaseUrl
   * @memberOf util.browser
   * @description Sets or overwrites the baseUrl in the configuration file.
   * @param {String} baseUrl: base URL to set
   * @example await util.browser.setBaseUrl("https://www.sap.com");
   */
  setBaseUrl(baseUrl: string): void {
    browser.config.baseUrl = baseUrl;
  }

  /**
   * @function logCurrentUrl
   * @memberOf util.browser
   * @description Displays the current URL in the console.
   * @example await util.browser.logCurrentUrl();
   */
  async logCurrentUrl(): Promise<void> {
    const url = await browser.getUrl();
    util.console.info("Current URL: " + url);
  }

  /**
   * @function getCurrentUrl
   * @memberOf util.browser
   * @description Returns the current URL
   * @example await util.browser.getCurrentUrl();
   */
  async getCurrentUrl(): Promise<string> {
    return browser.getUrl();
  }

  // =================================== ACTIONS ===================================
  /**
   * @function resetFocus
   * @memberOf util.browser
   * @description Resets the focus in case it set for a specific element.
   * @example await util.browser.resetFocus();
   */
  async resetFocus(): Promise<void> {
    await util.browser.executeScript("if (document.activeElement) { document.activeElement.blur(); }");
  }

  /**
   * @function sleep
   * @memberOf util.browser
   * @description Sleeps (pauses execution) for the passed duration.
   * @param {Number} [duration=1000] - The time to pause (ms).
   * @example await util.browser.sleep(30000);
   */
  async sleep(duration: number = 10000): Promise<void> {
    await browser.pause(duration);
  }

  /**
   * @function collectCoverage
   * @memberOf util.browser
   * @description Trigger collection of coverage by coverage service.
   * @example await util.browser.collectCoverage();
   */
  async collectCoverage(): Promise<void> {
    if (browser.config.params && browser.config.params.coverage && (browser.config.params.coverage.status === true || browser.config.params.coverage.status === "true")) {
      await browser.collectCoverage();
    } else {
      util.console.warn("Coverage is disabled. Please enable coverage in config file.");
    }
  }

  /**
   * @function sleepAndCollectCoverage
   * @memberOf util.browser
   * @description Trigger collection of coverage by coverage service.
   * @param {Number} [duration=1000] - The time to pause (ms).
   * @example await util.browser.sleepAndCollectCoverage(3000);
   */
  async sleepAndCollectCoverage(duration: number = 5000): Promise<void> {
    if (browser.config.params && browser.config.params.coverage && (browser.config.params.coverage.status === true || browser.config.params.coverage.status === "true")) {
      await this.sleep(duration);
      await browser.collectCoverage();
    } else {
      util.console.warn("Coverage is disabled. Please enable coverage in config file.");
    }
  }

  /**
   * @function refresh
   * @memberOf util.browser
   * @description Refreshes the page.
   * @example await util.browser.refresh();
   */
  async refresh(): Promise<void> {
    await browser.refresh();
  }

  /**
   * @function clearBrowser
   * @memberOf util.browser
   * @description Clears the local and session cache and deletes all browser cookies.
   * @param {Boolean} [clearLocal=true] - Specifies if the local cache will be cleared.
   * @param {Boolean} [clearSession=true] - Specifies if the session cache will be cleared.
   * @param {Boolean} [clearCookies=true] - Specifies if the cookies will be cleared.
   * @example await util.browser.clearBrowser();
   */
  async clearBrowser(clearLocal: boolean = true, clearSession: boolean = true, clearCookies: boolean = true): Promise<void> {
    if (clearLocal) {
      await browser.execute("window.localStorage.clear()");
    }
    if (clearSession) {
      await browser.execute("window.sessionStorage.clear()");
    }
    if (clearCookies) {
      await browser.deleteCookies();
    }
  }

  // =================================== LOGGING ===================================
  /**
   * @function getBrowserName
   * @memberOf util.browser
   * @description Retrieves the name of the current browser.
   * @returns {String} The browser name.
   * @example const browserName = util.browser.getBrowserName();
   */
  getBrowserName(): string {
    return browser.capabilities.browserName;
  }

  /**
   * @function getUI5Version
   * @memberOf util.browser
   * @description Gets the UI5 version and creation date for UI5 based applications.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await util.browser.getUI5Version();
   */
  async getUI5Version(timeout: number = browser.config.waitForUI5Timeout || 5000) {
    await browser.waitUntil(
      async function () {
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
      },
      {
        timeout: timeout,
        timeoutMsg: `Can not retrieve UI5 version within timeout ${timeout / 1000}s`,
        interval: 400,
      }
    );

    // @ts-ignore
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
          version: version,
          timestamp: timestamp,
        };
      } else {
        util.console.warn("UI5 version information could not be retrieved.");
        return null;
      }
    });
  }

  /**
   * @function logUI5Version
   * @memberOf util.browser
   * @description Logs the UI5 version and creation date for UI5 based applications to the console.
   * @example await util.browser.logUI5Version();
   */
  async logUI5Version() {
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
        // @ts-ignore
        process.env.UI5_VERSION_LOGGED = true;
      }
    }
  }

  // =================================== EXECUTION ===================================
  /**
   * @function executeScript
   * @memberOf util.browser
   * @description Executes the specified JavaScript command.
   * @param {String} command - The command to execute.
   * @returns {Any} The result from the executed function.
   * @example await util.browser.executeScript(command);
   */
  async executeScript(command: string): Promise<any> {
    return browser.execute(command);
  }

  // =================================== WINDOW HANDLING ===================================
  /**
   * @function switchToNewWindow
   * @memberOf util.browser
   * @description Switches to the window or tab with the given title.
   * @param {String|RegExp} titleOrUrl - Window title or url of the expected window or tab (can be either a string or part of it as regular expression).
   * @param {Number} [timeout=10000] - The timeout to wait (ms).
   * @example await util.browser.switchToNewWindow("SAP - Home");
   * @example await util.browser.switchToNewWindow(/Home/);
   * @example await util.browser.switchToNewWindow("www.sap.com");
   */
  async switchToNewWindow(titleOrUrl: string | RegExp, timeout: number = 10000) {
    try {
      await browser.waitUntil(
        async () => {
          await browser.switchWindow(titleOrUrl);
          return this._verifyTitleOrUrl(titleOrUrl);
        },
        {
          timeout: timeout,
          timeoutMsg: `Could not verify successful switch after ${timeout / 1000}s.`,
        }
      );
    } catch (error) {
      throw new Error(`Function 'switchToNewWindow' failed: ${error}`);
    }
  }

  /**
   * @function switchToWindow
   * @memberOf util.browser
   * @description Switches to the passed window.
   * @param {Object} handle - The window handle.
   * @example await util.browser.switchToWindow(originalWindowHandle);
   */
  async switchToWindow(handle: object) {
    await browser.switchToWindow(handle);
  }

  /**
   * @function getCurrentWindow
   * @memberOf util.browser
   * @description Returns the current window handle.
   * @returns {Object} The window handle.
   * @example const originalWindowHandle = await util.browser.getCurrentWindow();
   */
  async getCurrentWindow(): Promise<any> {
    return browser.getWindowHandle();
  }

  /**
   * @function switchToIframe
   * @memberOf util.browser
   * @description Switches to the passed iframe.
   * @param {String} selector - The CSS selector describing the iframe element.
   * @example await util.browser.switchToIframe("iframe[id='frame01']");
   */
  async switchToIframe(selector: string) {
    await nonUi5.element.waitToBeVisible(selector);
    const frame = await $(selector);
    await browser.switchToFrame(frame);
  }

  /**
   * @function switchToDefaultContent
   * @memberOf util.browser
   * @description Switches to the default content of the HTML page.
   * @example await util.browser.switchToDefaultContent();
   */
  async switchToDefaultContent() {
    await browser.switchToFrame(null);
  }

  /**
   * @function back
   * @memberOf util.browser
   * @description Go one step back in browser history.
   * @example await util.browser.back();
   */
  async back() {
    return browser.back();
  }

  // =================================== HELPER ===================================
  private async _verifyTitleOrUrl(titleOrUrl: string | RegExp): Promise<boolean> {
    const title: string = await browser.getTitle();
    const url: string = await util.browser.getCurrentUrl();

    if (titleOrUrl instanceof RegExp) {
      if (titleOrUrl.test(title) || titleOrUrl.test(url)) return true;
    } else {
      if (titleOrUrl === title || titleOrUrl === url) return true;
    }

    return false;
  }
}

export default new Browser();
