/**
* @class navigation
* @memberof non_ui5.common
*/
var Navigation = function () {

  /**
  * @function navigateToUrl
  * @memberOf non_ui5.common.navigation
  * @description Navigates to the passed url.
  * @param {String} url - The url to navigate to.
  * @example await non_ui5.common.navigation.navigateToUrl("www.ariba.com");
  */
  this.navigateToUrl = async function (url) {
    if (url) {
      await browser.navigateTo(url);
      const urlLocalHost = await browser.getUrl();
      console.log("Current URL after navigation-->" + urlLocalHost);
    } else {
      throw new Error("Please provide an URL as first argument (must be of type 'string').");
    }
  };

  /**
  * @function navigateToUrlAndRetry
  * @memberOf non_ui5.common.navigation
  * @description Navigates to the passed url.
  * @param {String} url - The url to navigate to.
  * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await non_ui5.common.navigation.navigateToUrlAndRetry("www.ariba.com");
  */
  this.navigateToUrlAndRetry = async function (url, retries, interval) {
    return await utilities.function.retry(this.navigateToUrl, [url], retries, interval, this);
  };

  // Note: missed methods getVyperPath and navigateToVyperPath were skipped
};
module.exports = new Navigation();
