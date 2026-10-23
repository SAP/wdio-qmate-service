"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { Ui5ExtensionMocker } from "../../../scripts/hooks/utils/Ui5ExtensionMocker";

/**
 * @class browser
 * @memberof util
 */
export class Browser {
  private vlf = new VerboseLoggerFactory("util", "browser");
  private specLogPrefix = "@SPEC: ";
  private ErrorHandler = new ErrorHandler();
  private _frameContext: any = null;

  // =================================== URL ===================================
  /**
   * @function getBaseUrl
   * @memberOf util.browser
   * @description Retrieves the baseUrl from the configuration file.
   * @returns {String} The baseUrl.
   * @example const baseUrl = util.browser.getBaseUrl();
   */
  getBaseUrl(): string {
    const vl = this.vlf.initLog(this.getBaseUrl);
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
    const vl = this.vlf.initLog(this.setBaseUrl);
    browser.config.baseUrl = baseUrl;
  }

  /**
   * @function logCurrentUrl
   * @memberOf util.browser
   * @description Displays the current URL in the console.
   * @example await util.browser.logCurrentUrl();
   */
  async logCurrentUrl(): Promise<void> {
    const vl = this.vlf.initLog(this.logCurrentUrl);
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
    const vl = this.vlf.initLog(this.getCurrentUrl);
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
    const vl = this.vlf.initLog(this.resetFocus);
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
    const vl = this.vlf.initLog(this.sleep);
    await browser.pause(duration);
  }

  /**
   * @function collectCoverage
   * @memberOf util.browser
   * @description Trigger collection of coverage by coverage service.
   * @example await util.browser.collectCoverage();
   */
  async collectCoverage(): Promise<void> {
    const vl = this.vlf.initLog(this.collectCoverage);
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
    const vl = this.vlf.initLog(this.sleepAndCollectCoverage);
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
    const vl = this.vlf.initLog(this.refresh);
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
    const vl = this.vlf.initLog(this.clearBrowser);
    if (clearLocal) {
      await browser.execute(() => window.localStorage.clear());
    }
    if (clearSession) {
      await browser.execute(() => window.sessionStorage.clear());
    }
    if (clearCookies) {
      await browser.deleteCookies();
    }
  }

  /**
   * @function reloadSession
   * @memberOf util.browser
   * @description Clears the browser session, and creates a new one. Use in cases where util.browser.clearBrowser doesn't invalidate login session.
   * @example await util.browser.reloadSession();
   */
  async reloadSession(): Promise<void> {
    const vl = this.vlf.initLog(this.reloadSession);
    await browser.reloadSession();
    if (browser.isBidi && browser.config.qmate?.enableUi5ExtensionMocking !== false) {
      await browser.mockClearAll();
      await Ui5ExtensionMocker.mockRequests();
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
    const vl = this.vlf.initLog(this.getBrowserName);
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
    const vl = this.vlf.initLog(this.getUI5Version);
    await browser.waitUntil(
      async function () {
        // eslint-disable-next-line no-return-await
        return await browser.execute(function () {
          try {
            // @ts-ignore
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
        interval: 400
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
          timestamp: timestamp
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
    const vl = this.vlf.initLog(this.logUI5Version);
    let logUI5Version;
    if (browser.config.params && browser.config.params.logUI5Version !== undefined) {
      logUI5Version = browser.config.params.logUI5Version;
    } else {
      logUI5Version = true;
    }

    if (logUI5Version !== false && !process.env.UI5_VERSION_LOGGED) {
      const ui5Version = await this.getUI5Version(5000);
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
   * @param {String | Function} command - The command to execute.
   * @returns {Any} The result from the executed function.
   * @example await util.browser.executeScript(command);
   */
  async executeScript(command: string | Function, ...args: Array<any>): Promise<any> {
    const vl = this.vlf.initLog(this.executeScript);
    return browser.execute(command, ...args);
  }

  // =================================== WAITING ===================================
  /**
   * @function waitUntil
   * @memberOf util.browser
   * @description Waits until the specified function returns true or the timeout is reached.
   * @param {Function} condition - The function to wait for.
   * @param {Object} [options] - Options for the wait.
   * @param {Number} [options.timeout] - The timeout to wait (ms).
   * @param {String} [options.timeoutMsg] - The message to display if the timeout is reached.
   * @param {Number} [options.interval] - The interval to check the function (ms).
   * @returns {Promise<void>} Resolves when the function returns true or the timeout is reached.
   * @example await util.browser.waitUntil(async () => await ui5.element.isVisible(selector), { timeout: 5000, timeoutMsg: "Element not visible" });
   */
  async waitUntil(condition: Function, options: { timeout?: number; timeoutMsg?: string; interval?: number } = {}): Promise<void> {
    const vl = this.vlf.initLog(this.waitUntil);
    return browser.waitUntil(condition, options);
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
    const vl = this.vlf.initLog(this.switchToNewWindow);
    try {
      if ((browser as any).isBidi) {
        // browser.switchWindow() is removed in BiDi; iterate handles via switchToWindow instead
        await browser.waitUntil(
          async () => {
            const handles = await browser.getWindowHandles();
            for (const handle of handles) {
              await browser.switchToWindow(handle);
              if (await this._verifyTitleOrUrl(titleOrUrl)) return true;
            }
            return false;
          },
          {
            timeout: timeout,
            timeoutMsg: `Could not verify successful switch after ${timeout / 1000}s.`
          }
        );
      } else {
        await browser.waitUntil(
          async () => {
            await browser.switchWindow(titleOrUrl);
            return this._verifyTitleOrUrl(titleOrUrl);
          },
          {
            timeout: timeout,
            timeoutMsg: `Could not verify successful switch after ${timeout / 1000}s.`
          }
        );
      }
    } catch (error) {
      this.ErrorHandler.logException(error);
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
    const vl = this.vlf.initLog(this.switchToWindow);
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
    const vl = this.vlf.initLog(this.getCurrentWindow);
    return browser.getWindowHandle();
  }

  /**
   * @function closeWindow
   * @memberOf util.browser
   * @description Closes the current top-level browsing context. Once done, if there are no more top-level browsing contexts open, the WebDriver session itself is closed.
   * @example await util.browser.closeWindow();
   */
  async closeWindow() {
    const vl = this.vlf.initLog(this.closeWindow);
    await browser.closeWindow();
  }

  /**
   * @function switchToIframe
   * @memberOf util.browser
   * @description Switches to the passed iframe.
   * @param {String} selector - The CSS selector describing the iframe element.
   * @example await util.browser.switchToIframe("iframe[id='frame01']");
   */
  async switchToIframe(selector: string) {
    const vl = this.vlf.initLog(this.switchToIframe);
    // Reset stale frame context before operating on a new page.
    this._frameContext = null;
    await nonUi5.element.waitToBeVisible(selector);
    if (browser.isBidi) {
      const [topCtx] = await browser.browsingContexts();
      // Poll the BiDi context tree until a child context appears for this iframe.
      // frame({ id }) resolves in one tree walk without any internal waitUntil,
      // avoiding the 300s block that frame(element) and frame({ selector }) both carry.
      const timeout = (browser.options as any).waitforTimeout ?? 30000;
      const contextId: string = await browser.waitUntil(
        async () => {
          const { contexts } = await (browser as any).browsingContextGetTree({ root: topCtx.contextId });
          const children: Array<{ context: string; url: string }> = contexts[0]?.children ?? [];
          return children.length > 0 ? children[0].context : false;
        },
        { timeout, interval: 500, timeoutMsg: `No BiDi child context appeared for iframe "${selector}" within ${timeout}ms` }
      );
      this._frameContext = await topCtx.frame({ id: contextId });
      // ponytail: wdio ContextManager tracks the "current context" for foreignContextId() checks
      // inside isClickable/isDisplayed. Without this, it thinks we're still in top-level context,
      // causing isClickable() to call element.execute() → waitForExist() → 300s timeout on
      // elements whose selector is a strategyRef object (from custom$$).
      this._setBidiCurrentContext(contextId);
    } else {
      const frame = await $(selector);
      await browser.switchFrame(frame);
    }
  }

  /**
   * @function switchToDefaultContent
   * @memberOf util.browser
   * @description Switches to the default content of the HTML page.
   * @example await util.browser.switchToDefaultContent();
   */
  async switchToDefaultContent() {
    const vl = this.vlf.initLog(this.switchToDefaultContent);
    if (browser.isBidi) {
      this._frameContext = null;
      // ponytail: reset ContextManager so it re-initializes to top-level on next access
      this._setBidiCurrentContext(undefined);
    } else {
      await browser.switchFrame(null);
    }
  }

  private _setBidiCurrentContext(contextId: string | undefined): void {
    // getContextManager lives in @wdio/local-runner/node_modules/webdriverio — not in our
    // direct deps, so find it in the require cache at runtime (it's loaded by the wdio runner).
    // Must match local-runner specifically: @wdio/snapshot, @wdio/cli, @wdio/sauce-service all
    // ship their own webdriverio copy with an independent sessionManager Map, so updating those
    // creates a garbage ContextManager that nobody reads.
    const cache = (require as any).cache as Record<string, { exports: any }>;
    let found = false;
    for (const [key, mod] of Object.entries(cache)) {
      if (key.includes("local-runner") && key.includes("/webdriverio/build/index.js") && mod?.exports?.getContextManager) {
        try {
          const cm = mod.exports.getContextManager(browser);
          cm.setCurrentContext(contextId);
          console.log(`[qmate bidi] setCurrentContext(${contextId}) via ${key.slice(-80)}`);
          found = true;
        } catch (e) {
          console.log(`[qmate bidi] setCurrentContext failed: ${e}`);
        }
        break;
      }
    }
    if (!found) {
      console.log(`[qmate bidi] WARN: could not find local-runner webdriverio in require.cache (keys: ${Object.keys(cache).filter(k => k.includes("webdriverio")).join(", ").slice(0, 200)})`);
    }
  }

  /**
   * @function getContext
   * @memberOf util.browser
   * @description Returns the active browsing context (frame in BiDi, or browser in Classic/top-level).
   * @returns The active context to use for element queries.
   * @example const ctx = util.browser.getContext(); await ctx.$('button').click();
   */
  getContext(): any {
    return this._frameContext ?? browser;
  }

  /**
   * @function back
   * @memberOf util.browser
   * @description Go one step back in browser history.
   * @example await util.browser.back();
   */
  async back() {
    const vl = this.vlf.initLog(this.back);
    return browser.back();
  }

  /**
   * @function forward
   * @memberOf util.browser
   * @description Go one step ahead in browser history.
   * @example await util.browser.forward();
   */
  async forward() {
    const vl = this.vlf.initLog(this.forward);
    return browser.forward();
  }

  // =================================== LOGGER ===================================
  /**
   * @function log
   * @memberOf util.browser
   * @description add log message to browser logs, can be viewed in the html report
   * @param {String} message string - The message to be logged.
   * @example await util.browser.log("Created PO 123456");
   */
  async log(message: string = "") {
    const vl = this.vlf.initLog(this.log);
    message = this.specLogPrefix + message;
    await browser.execute((message: string) => console.log(message), message);
  }

  /**
   * @function warn
   * @memberOf util.browser
   * @description add warning message to browser logs, can be viewed in the html report
   * @param {String} message string - The warning message to be logged.
   * @example await util.browser.warn("This is a warning message");
   */
  async warn(message: string = "") {
    const vl = this.vlf.initLog(this.warn);
    message = this.specLogPrefix + message;
    await browser.execute((message: string) => console.warn(message), message);
  }

  /**
   * @function error
   * @memberOf util.browser
   * @description add error message to browser logs, can be viewed in the html report
   * @param {String} message string - The error message to be logged.
   * @example await util.browser.error("This is an error message");
   */
  async error(message: string) {
    const vl = this.vlf.initLog(this.error);
    message = this.specLogPrefix + message;
    await browser.execute((message: string) => console.error(message), message);
  }

  // =================================== HELPER ===================================
  private async _verifyTitleOrUrl(titleOrUrl: string | RegExp): Promise<boolean> {
    const vl = this.vlf.initLog(this._verifyTitleOrUrl);
    const title: string = await browser.getTitle();
    const url: string = await util.browser.getCurrentUrl();

    if (titleOrUrl instanceof RegExp) {
      if (titleOrUrl.test(title) || titleOrUrl.test(url)) return true;
    } else {
      if (titleOrUrl === title || titleOrUrl === url) return true;
    }

    return false;
  }

  /**
   * @function isMobile
   * @memberOf util.browser
   * @description Indicates a mobile session
   * @returns {boolean} Return true if its a mobile session driver.
   * @example await util.browser.isMobile();
   */
  async isMobile(): Promise<boolean> {
    const vl = this.vlf.initLog(this.isMobile);
    vl.log("Indicates is a mobile session? or browser session");
    return browser.isMobile();
  }

  /**
   * @function isAndroid
   * @memberOf util.browser
   * @description Indicates a mobile session
   * @returns {boolean} Return true if its a Android session driver.
   * @example await util.browser.isAndroid();
   */
  async isAndroid(): Promise<boolean> {
    const vl = this.vlf.initLog(this.isAndroid);
    vl.log("Indicates is a Android session? or iOS session");
    return browser.isAndroid();
  }

  /**
   * @function isIos
   * @memberOf util.browser
   * @description Indicates an iOS session
   * @returns {boolean} Return true if its a iOS session driver.
   * @example await util.browser.isIos();
   */
  async isIos(): Promise<boolean> {
    const vl = this.vlf.initLog(this.isIos);
    vl.log("Indicates is a iOS session? or Android session");
    return browser.isIOS();
  }
}
export default new Browser();
