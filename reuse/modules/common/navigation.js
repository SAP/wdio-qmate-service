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
    await browser.navigateTo(url);
    await this.printCurrentUrl();
  };

  /**
   * @function printCurrentUrl
   * @memberOf common.navigation
   * @description Displays the current URL in the console.
   * @example await common.navigation.printCurrentUrl();
   */
  this.printCurrentUrl = async function () {
    const url = await browser.getUrl();
    common.console.info("Current URL: " + url);
  };

};
module.exports = new Navigation();