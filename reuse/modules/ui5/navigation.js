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
      urlParams = _generateUrlParams();
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

  /**
   * @function navigateToSystemAndApplication
   * @memberOf ui5.navigation
   * @description Navigates within the passed system to the application via the passed intent.
   * @param {String} system - The system url.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [closePopups=false] - Specifies if random popups should be closed after the navigation.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example await ui5.navigation.navigateToSystemAndApplication("cc2-715.wdf.sap.corp", "PurchaseOrder-manage");
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
   * @example await ui5.navigation.navigateToSystemAndApplicationAndRetry("cc2-715.wdf.sap.corp", "PurchaseOrder-manage");
   */
  this.navigateToSystemAndApplicationAndRetry = async function (system, intent, closePopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(async (system, intent, closePopups) => {
      await this.navigateToSystemAndApplication(system, intent, closePopups, verify);
    }, [system, intent, closePopups, verify], retries, interval, this);
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
  function _generateUrlParams() {
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