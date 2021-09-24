/**
 * @class navigation
 * @memberof ui5
 */
const Navigation = function () {

  const errorText = "Navigation failed because page didn't load, possible reasons: " +
    "Site is down, or you are using a wrong address. For retrying use 'navigateToApplicationAndRetry'.\n";

  // =================================== MAIN ===================================
  /**
   * @function navigateToApplication
   * @memberOf ui5.navigation
   * @description Navigates to the application via the passed intent. The intent will be added to the baseUrl maintained in the config.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example await ui5.navigation.navigateToApplication("PurchaseOrder-manage");
   */
  this.navigateToApplication = async function (intent, preventPopups = false, verify = false) {
    let urlParams = "";
    if (preventPopups) {
      urlParams = generateUrlParams();
    }

    try {
      await browser.navigateTo(`${browser.config.baseUrl.split("#")[0] + urlParams}#${intent}`);
      const url = await browser.getUrl();
      await common.navigation.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToApplication' failed. For retrying use 'navigateToApplicationAndRetry'.");
      }
      await browser.refresh();
    } catch (error) {
      throw new Error(errorText + error);
    }
  };

  /**
   * @function navigateToApplicationAndRetry
   * @memberOf ui5.navigation
   * @description Navigates to the application via the passed intent, and retries in case it fails.
   * @param {String} intent - The intent of the app.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented. Might not work for specific popups.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await ui5.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage");
   */
  this.navigateToApplicationAndRetry = async function (intent, preventPopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(async (intent, preventPopups) => {
      await this.navigateToApplication(intent, preventPopups, verify);
    }, [intent, preventPopups, verify], retries, interval, this);
  };

  // TODO: why is this needed? navigateToApplication does the refresh internally
  this.navigateToApplicationAndRetryRefresh = async function (intent, preventPopups = true, verify = true, retries, interval) {
    await ui5.navigation.navigateToApplicationAndRetry(intent, preventPopups, verify, retries, interval);
    await util.browser.refresh();
  };

  /**
   * @function navigateToSystemAndApplication
   * @memberOf ui5.navigation
   * @description Navigates within the passed system to the application via the passed intent.
   * @param {String} system - The system url.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [closePopups=false] - Specifies if random popups should be closed after the navigation.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example await ui5.navigation.navigateToSystemAndApplication("super-sensitive.domain.name", "PurchaseOrder-manage");
   */
  this.navigateToSystemAndApplication = async function (system, intent, closePopups = true, verify = false) {
    try {
      await browser.navigateTo(`https://${system}/ui#${intent}`);
      const url = await browser.getUrl();
      await common.navigation.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToSystemAndApplication' failed. For retrying use 'navigateToSystemAndApplicationAndRetry'.");
      }
      if (closePopups) {
        await this.closePopups();
      }
    } catch (error) {
      throw new Error(errorText + error);
    }
  };

  /**
   * @function navigateToSystemAndApplicationAndRetry
   * @memberOf ui5.navigation
   * @description Navigates within the passed system to the application via the passed intent, and retries in case it fails.
   * @param {String} system - The system url.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [closePopups=false] - Specifies if random popups should be closed after the navigation.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await ui5.navigation.navigateToSystemAndApplicationAndRetry("super-sensitive.domain.name", "PurchaseOrder-manage");
   */
  this.navigateToSystemAndApplicationAndRetry = async function (system, intent, closePopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(async (system, intent, closePopups) => {
      await this.navigateToSystemAndApplication(system, intent, closePopups, verify);
    }, [system, intent, closePopups, verify], retries, interval, this);
  };


  // =================================== QUERY ===================================
  /**
   * @function navigateToApplicationWithQueryParams
   * @memberOf ui5.navigation
   * @description Navigates to the application with the passed queryParams via the passed intent.
   * @param {String} intent - The intent of the app.
   * @param {String} queryParams - [OPTIONAL] Add url query params.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example const intent = ui5.appIntents.managePurchaseOrders;
   * const queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.navigation.navigateToApplicationWithQueryParams(intent, queryParams);
   */
  this.navigateToApplicationWithQueryParams = async function (intent, queryParams = "", closePopups = true, verify = false) {
    let url;
    try {
      await browser.url(`${browser.config.baseUrl}${queryParams}#${intent}`);
      url = await browser.getUrl();
      await common.navigation.printCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToApplication' failed. For retrying use 'navigateToApplicationAndRetry'.");
      }
      if (closePopups) {
        await this.closePopups();
      }
      await browser.refresh();
    } catch (error) {
      throw new Error(errorText + error);
    }
  };

  /**
   * @function navigateToApplicationWithQueryParamsAndRetry
   * @memberOf ui5.navigation
   * @description Navigates to the application via the passed intent, and retries in case it fails.
   * @param {String} intent - The intent of the app.
   * @param {String} queryParams - [OPTIONAL] Add url query params.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const intent = ui5.appIntents.managePurchaseOrders;
   * const queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams);
   */
  this.navigateToApplicationWithQueryParamsAndRetry = async function (intent, queryParams, closePopups = true, verify = true, retries, interval) {
    await util.function.retry(async (intent, queryParams, closePopups, verify) => {
      await this.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify);
    }, [intent, queryParams, closePopups, verify], retries, interval, this);
  };


  // =================================== POPUPS ===================================
  /**
   * @function closePopups
   * @memberOf ui5.navigation
   * @description Closes all popups if they occur after navigating to a specific page.
   * @param {Integer} [timeout=15000] - The timeout to wait.
   * @example await ui5.navigation.closePopups();
   */
  this.closePopups = async function (timeout = 15000) {
    await browser.pause(timeout);
    try {
      const popUp1 = await nonUi5.element.getElementByCss(".help4-wrapper button", 0, 2500);
      await popUp1.click();
    } catch (e) {
      util.console.log("First Popup not found.");
    }
    try {
      const popUp2 = await nonUi5.element.getElementById("SAMLDialog", 2500);
      await popUp2.click();
    } catch (e) {
      util.console.log("Second Popup not found.");
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
      await ui5.userInteraction.click(selector, 0, 2500);
    } catch (e) {
      util.console.log("Third Popup not found.");
    }
  };

  // =================================== PRIVATE ===================================
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

};
module.exports = new Navigation();