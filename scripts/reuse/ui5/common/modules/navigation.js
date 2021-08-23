/**
* @class  navigation
* @memberof ui5.common
*/
const Navigation = function () {

  function generateUrlParams() {
    let urlParams;
    let prefix;

    if (browser.config.baseUrl.includes("ui?")) {
      prefix = "&";
    } else {
      prefix = "?";
    }

    if (browser.config.baseUrl.includes("help-readCatalog=false") && browser.config.baseUrl.includes("help-stateUACP=PRODUCTION")) {
      urlParams = "";
    } else {
      if (browser.config.baseUrl.includes("help-readCatalog=false") && !browser.config.baseUrl.includes("help-stateUACP=PRODUCTION")) {
        urlParams = "help-stateUACP=PRODUCTION";
      } else if (!browser.config.baseUrl.includes("help-readCatalog=false") && browser.config.baseUrl.includes("help-stateUACP=PRODUCTION")) {
        urlParams = "help-readCatalog=false";
      } else {
        urlParams = "help-readCatalog=false&help-stateUACP=PRODUCTION";
      }
    }

    return prefix + urlParams;
  }

  /**
  * @function closePopups
  * @memberOf ui5.common.navigation
  * @description Closes all popups if they occure after navigating to a specific page.
  * @param {Integer} timeout - The timeout to wait (default value: 15 sec).
  * @example await ui5.common.navigation.closePopups();
  */
  this.closePopups = async function (timeout = 15000) {
    await browser.pause(timeout);
    try {
      const popUp1 = await non_ui5.common.locator.getElementByCss(".help4-wrapper button", 0, 2500);
      await popUp1.click();
    } catch (e) {
      console.log("First Popup not found.");
    }
    try {
      const popUp2 = await non_ui5.common.locator.getElementById("SAMLDialog", 2500);
      await popUp2.click();
    } catch (e) {
      console.log("Second Popup not found.");
    }
    try {
      const selector = {
        "elementProperties": {
          "metadata": "sap.m.Button",
          "text": "Close"
        },
        "ancestorProperties": {
          "metadata": "sap.m.Dialog",
          "id": "*SAMLDialog*"
        }
      };
      await ui5.common.userInteraction.click(selector, 0, 2500);
    } catch (e) {
      console.log("Third Popup not found.");
    }
  };

  this.navigateTo = async function (intent, closePopups = true) {
    console.warn("Deprecation Warning! Please use function 'navigateToIntent' instead. This function will be removed in the future.");
    return this.navigateToApplication(intent, closePopups);
  };

  /**
  * @function navigateToApplication
  * @memberOf ui5.common.navigation
  * @description Navigates to the application via the passed intent.
  * @param {String} intent - The intent of the app.
  * @param {Boolean} preventPopups - [OPTIONAL] Set to 'true' to prevent popups during navigation. Default is 'false'.
  * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'.
  * @example await ui5.common.navigation.navigateToApplication("PurchaseOrder-manage", false);
  * @example let intent = ui5.common.appIntents.managePurchaseOrders;
  * await ui5.common.navigation.navigateToApplication(intent);
  */
  this.navigateToApplication = async function (intent, preventPopups = false, verify = false) {
    let urlParams;
    if (preventPopups) {
      urlParams = generateUrlParams();
    } else {
      urlParams = "";
    }

    try {
      await browser.navigateTo(`${browser.config.baseUrl.split("#")[0] + urlParams}#${intent}`);
      const url = await browser.getUrl();
      await this.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("navigateToApplication() - Navigation failed, for retrying use navigateToApplicationAndRetry function");
      }
      // (comment from vyperForAll) will be removed after systems are fixed again!!
      await browser.refresh();
    } catch (error) {
      throw new Error("Navigation failed because page didn't load, possible reasons: " +
        "Site is down, or you are using wrong address. For retrying use navigateToApplicationAndRetry function.\n" + error);
    }
  };

  /**
  * @function navigateToApplicationAndRetry
  * @memberOf ui5.common.navigation
  * @description Navigates to the application via the passed intent, and retries in case it fails.
  * @param {String} intent - The intent of the app.
  * @param {Boolean} closePopups - [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'.
  * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'.
  * @example await ui5.common.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage", false);
  * @example let intent = ui5.common.appIntents.managePurchaseOrders;
  * await ui5.common.navigation.navigateToApplicationAndRetry(intent);
  */
  this.navigateToApplicationAndRetry = async function (intent, closePopups = true, verify = true, retries, interval) {
    return await utilities.function.retry(async (intent, closePopups) => {
      await this.navigateToApplication(intent, closePopups, verify);
    }, [intent, closePopups, verify], retries, interval, this);
  };

  /**
   * @function navigateToApplicationWithQueryParams
   * @memberOf ui5.common.navigation
   * @description Navigates to the application via the passed intent.
   * @param {String} intent - The intent of the app.
   * @param {String} queryParams - [OPTIONAL] Add url query params.
   * @param {Boolean} closePopups - [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'.
   * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'.
   * @example let intent = ui5.common.appIntents.managePurchaseOrders;
   * let queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.common.navigation.navigateToApplicationWithQueryParams(intent, queryParam);
   */
  this.navigateToApplicationWithQueryParams = async function (intent, queryParams = "", closePopups = true, verify = false) {
    let url;
    try {
      await browser.url(`${browser.config.baseUrl}${queryParams}#${intent}`);
      url = await browser.getUrl();
      await this.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Navigation failed, for retrying use navigateToApplicationWithQueryParamsAndRetry function");
      }
      if (closePopups) {
        await this.closePopups();
      }
      await browser.refresh();
    } catch (error) {
      throw new Error("Navigation failed because page didn't load, possible reasons: Site is down, or you are using wrong address. For retrying use navigateToApplicationAndRetry function.\n" + error);
    }
  };

  /**
   * @function navigateToApplicationWithQueryParamsAndRetry
   * @memberOf ui5.common.navigation
   * @description Navigates to the application via the passed intent, and retries in case it fails.
   * @param {String} intent - The intent of the app.
   * @param {String} queryParams - [OPTIONAL] Add url query params.
   * @param {Boolean} closePopups - [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'.
   * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example await ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry("PurchaseOrder-manage", false);
   * @example let intent = ui5.common.appIntents.managePurchaseOrders;
   * let queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams);
   */
  this.navigateToApplicationWithQueryParamsAndRetry = async function (intent, queryParams, closePopups = true, verify = true, retries, interval) {
    return await utilities.function.retry(async (intent, queryParams, closePopups, verify) => {
      await this.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify);
    }, [intent, queryParams, closePopups, verify], retries, interval, this);
  };

  /**
   * @function navigateToApplicationAndRetryRefresh
   * @memberOf ui5.common.navigation
   * @description Navigates to the application via the passed intent.
   * @param {String} intent - The intent of the app.
   * @param {Boolean} preventPopups - [OPTIONAL] Set to 'true' to prevent popups during navigation. Default is 'false'.
   * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'.
   * @param {Integer} retries - [OPTIONAL] The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - [OPTIONAL] The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage", false);
   * @example let intent = ui5.common.appIntents.managePurchaseOrders;
   * await ui5.common.navigation.navigateToApplicationAndRetryRefresh(intent);
   */
  this.navigateToApplicationAndRetryRefresh = async function (intent, preventPopups = true, verify = true, retries, interval) {
    await ui5.common.navigation.navigateToApplicationAndRetry(intent, preventPopups, verify, retries, interval);
    await utilities.browser.refresh();
  };

  /**
  * @function navigateToSystemAndApplication
  * @memberOf ui5.common.navigation
  * @description Navigates within the passed system to the application via the passed intent.
  * @param {String} system - The system url to navigate.
  * @param {String} intent - The intent of the app.
  * @param {Boolean} closePopups - [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'.
  * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'.
  * @example let intent = ui5.common.appIntents.managePurchaseOrders;
  * await ui5.common.navigation.navigateToSystemAndApplication("cc2-715.wdf.sap.corp", intent);
  */
  this.navigateToSystemAndApplication = async function (system, intent, closePopups = true, verify = false) {
    try {
      await browser.navigateTo(`https://${system}/ui#${intent}`);
      const url = await browser.getUrl();
      await this.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("navigateToSystemAndApplication() - Navigation failed, for retrying use navigateToSystemAndApplicationAndRetry function");
      }
      if (closePopups) {
        await this.closePopups();
      }
    } catch (error) {
      throw new Error("Navigation failed because page didn't load, possible reasons: " +
        "Site is down, or you are using wrong address. For retrying use navigateToApplicationAndRetry function.\n" + error);
    }
  };


  /**
  * @function navigateToSystemAndApplicationAndRetry
  * @memberOf ui5.common.navigation
  * @description Navigates within the passed system to the application via the passed intent, and retries in case it fails.
  * @param {String} system - The system url to navigate.
  * @param {String} intent - The intent of the app.
  * @param {Boolean} closePopups - [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'.
  * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @param {Boolean} verify - [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'.
  * @example let intent = ui5.common.appIntents.managePurchaseOrders;
  * await ui5.common.navigation.navigateToSystemAndApplicationAndRetry("cc2-715.wdf.sap.corp", intent);
  */
  this.navigateToSystemAndApplicationAndRetry = async function (system, intent, closePopups = true, verify = true, retries, interval) {
    return await utilities.function.retry(async (system, intent, closePopups) => {
      await this.navigateToSystemAndApplication(system, intent, closePopups, verify);
    }, [system, intent, closePopups, verify], retries, interval, this);
  };

  /**
  * @function navigateToUrl
  * @memberOf ui5.common.navigation
  * @description Navigates to the passed url.
  * @param {String} url - The url to navigate to.
  * @example await ui5.common.navigation.navigateToUrl("www.ariba.com");
  */
  this.navigateToUrl = async function (url) {
    await browser.navigateTo(url);
    await this.printCurrentUrl();
  };

  /**
  * @function printCurrentUrl
  * @memberOf ui5.common.navigation
  * @description Displays the current URL in the console.
  * @example await ui5.common.navigation.printCurrentUrl();
  */
  this.printCurrentUrl = async function () {
    const url = await browser.getUrl();
    console.log("Current URL: " + url);
  };
};
module.exports = new Navigation();
