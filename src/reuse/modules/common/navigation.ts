"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class navigation
 * @memberof common
 */
export class Navigation {
  private vlf = new VerboseLoggerFactory("common", "navigation");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function navigateToUrl
   * @memberOf common.navigation
   * @description Navigates to the passed url.
   * @param {String} url - The url.
   * @example await common.navigation.navigateToUrl("www.sap.com");
   */
  async navigateToUrl(url: string): Promise<void> {
    const vl = this.vlf.initLog(this.navigateToUrl);
    if (url) {
      await browser.navigateTo(url);
      await util.browser.logCurrentUrl();
    } else {
      this.ErrorHandler.logException(new Error("Please provide an url as argument."))
    }
  }

  /**
   * @function navigateToUrlAndRetry
   * @memberOf common.navigation
   * @description Navigates to the passed url and retries the function in case of a failure.
   * @param {String} url - The url to navigate to.
   * @param {Integer} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Integer} [interval=5000] - The interval of the retries (ms), can be set in config for all functions under params stepRetriesIntervals.
   * @example await common.navigation.navigateToUrlAndRetry("www.sap.com");
   */
  async navigateToUrlAndRetry(url: string, retries: number = 3, interval: number = 5000): Promise<void> {
    try {
      const vl = this.vlf.initLog(this.navigateToUrl);
      await util.function.retry(this.navigateToUrl, [url], retries, interval, this);
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }
}
export default new Navigation();
