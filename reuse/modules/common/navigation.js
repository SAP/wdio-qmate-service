/**
 * @class navigation
 * @memberof common
 */
const Navigation = function () {

  /**
   * @function navigateToUrl
   * @memberOf common.navigation
   * @description Navigates to the passed url.
   * @param {String} url - The url.
   * @example await common.navigation.navigateToUrl("www.sap.com");
   */
  this.navigateToUrl = async function (url) {
    if (url) {
      await browser.navigateTo(url);
      await this.printCurrentUrl();
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
  this.navigateToUrlAndRetry = async function (url, retries = 3, interval = 5000) {
    return await util.function.retry(this.navigateToUrl, [url], retries, interval, this);
  };

  /**
   * @function printCurrentUrl
   * @memberOf common.navigation
   * @description Displays the current URL in the console.
   * @example await common.navigation.printCurrentUrl();
   */
  this.printCurrentUrl = async function () {
    const url = await browser.getUrl();
    util.console.info("Current URL: " + url);
  };

};
module.exports = new Navigation();