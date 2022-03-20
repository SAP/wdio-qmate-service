"use strict";

/**
 * @class navigation
 * @memberof common
 */
export class Navigation {

  /**
   * @function navigateToUrl
   * @memberOf common.navigation
   * @description Navigates to the passed url.
   * @param {String} url - The url.
   * @example await common.navigation.navigateToUrl("www.sap.com");
   */
  async navigateToUrl (url: string): Promise<void> {
    if (url) {
      await browser.navigateTo(url);
      await util.browser.logCurrentUrl();
    } else {
      throw new Error("Function 'navigateToUrl' failed: Please provide an url as argument.");
    }
  };

  /**
   * @function navigateToUrlAndRetry
   * @memberOf common.navigation
   * @description Navigates to the passed url and retries the function in case of a failure.
   * @param {String} url - The url to navigate to.
   * @param {Integer} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Integer} [interval=5000] - The interval of the retries (ms), can be set in config for all functions under params stepRetriesIntervals.
   * @example await common.navigation.navigateToUrlAndRetry("www.sap.com");
   */
  async navigateToUrlAndRetry (url: string, retries: number = 3, interval: number = 5000): Promise<void> {
    await util.function.retry(this.navigateToUrl, [url], retries, interval, this);
  };

};
export default new Navigation();