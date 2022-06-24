"use strict";

/**
 * @class navigation
 * @memberof nonUi5
 */
export class Navigation {

  /**
   * @function navigateToApplication
   * @memberOf nonUi5.navigation
   * @description Navigates to the application via the passed relative reference. The path will be added to the baseUrl maintained in the config.
   * @param {String} relativeReference - Relative reference of an application (path, query and fragment)
   * @param {Boolean} [refresh=true] - Refresh the page after navigation.
   * @example await nonUi5.navigation.navigateToApplication("categories");
   */
   async navigateToApplication(relativeReference: string, refresh = true) {
    try {
      await browser.navigateTo(`${browser.config.baseUrl}/${relativeReference}`);
      await util.browser.logCurrentUrl();
      if (refresh) {
        await util.browser.refresh();
      }
    } catch (error) {
      throw new Error("Function navigateToApplication failed: " + error);
    }
  };
}
export default new Navigation();
