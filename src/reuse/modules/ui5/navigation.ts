"use strict";

interface Popup {
  name: string;
  selector: string;
}

/**
 * @class navigation
 * @memberof ui5
 */
export class Navigation {
  errorText = "Navigation failed because page didn't load, possible reasons: " + "Site is down, or you are using a wrong address. For retrying use 'navigateToApplicationAndRetry'.\n";

  // =================================== MAIN ===================================
  /**
   * @function navigateToApplication
   * @memberOf ui5.navigation
   * @description Navigates to the application via the passed intent. The intent will be added to the baseUrl maintained in the config.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @param {Boolean} [refresh=false] - Refresh the page after navigation.
   * @example await ui5.navigation.navigateToApplication("PurchaseOrder-manage");
   */
  async navigateToApplication(intent: string, preventPopups = false, verify = false, refresh = true) {
    let urlParams = "";
    if (preventPopups) {
      urlParams = this._generateUrlParams();
    }

    try {
      await browser.navigateTo(`${browser.config.baseUrl.split("#")[0] + urlParams}#${intent}`);
      const url = await browser.getUrl();
      await util.browser.logCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToApplication' failed. For retrying use 'navigateToApplicationAndRetry'.");
      }
      if (refresh) {
        await util.browser.refresh();
      }
    } catch (error) {
      throw new Error(this.errorText + error);
    }
  }

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
  async navigateToApplicationAndRetry(intent: string, preventPopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(
      async (intent: string, preventPopups: boolean) => {
        await this.navigateToApplication(intent, preventPopups, verify);
      },
      [intent, preventPopups, verify],
      retries,
      interval,
      this
    );
  }

  /**
   * @function navigateToSystemAndApplication
   * @memberOf ui5.navigation
   * @description Navigates within the passed system to the application via the passed intent.
   * @param {String} system - The system url.
   * @param {String} intent - The intent of the application.
   * @param {Boolean} [closePopups=false] - Specifies if random popups should be closed after the navigation.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example await ui5.navigation.navigateToSystemAndApplication("yourFioriLaunchpad.domain", "PurchaseOrder-manage");
   */
  async navigateToSystemAndApplication(system: string, intent: string, closePopups = true, verify = false) {
    try {
      await browser.navigateTo(`https://${system}/ui#${intent}`);
      const url = await browser.getUrl();
      await util.browser.logCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToSystemAndApplication' failed. For retrying use 'navigateToSystemAndApplicationAndRetry'.");
      }
      if (closePopups) {
        await this.closePopups();
      }
    } catch (error) {
      throw new Error(this.errorText + error);
    }
  }

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
   * @example await ui5.navigation.navigateToSystemAndApplicationAndRetry("yourFioriLaunchpad.domain", "PurchaseOrder-manage");
   */
  async navigateToSystemAndApplicationAndRetry(system: string, intent: string, closePopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(
      async (system: string, intent: string, closePopups: boolean) => {
        await this.navigateToSystemAndApplication(system, intent, closePopups, verify);
      },
      [system, intent, closePopups, verify],
      retries,
      interval,
      this
    );
  }

  /**
   * @function navigateToApplicationWithQueryParams
   * @memberOf ui5.navigation
   * @description Navigates to the application with the passed queryParams via the passed intent.
   * @param {String} intent - The intent of the app.
   * @param {String} queryParams - [OPTIONAL] Add url query params.
   * @param {Boolean} [preventPopups=false] - Specifies if random popup appearance should be prevented.
   * @param {Boolean} [verify=false] - Specifies if the url should be asserted after the navigation.
   * @example const intent = "PurchaseOrder-manage"
   * const queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.navigation.navigateToApplicationWithQueryParams(intent, queryParams);
   */
  async navigateToApplicationWithQueryParams(intent: string, queryParams = "", closePopups = true, verify = false) {
    let url;
    try {
      await browser.url(`${browser.config.baseUrl}${queryParams}#${intent}`);
      url = await browser.getUrl();
      await util.browser.logCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        throw new Error("Verification of function 'navigateToApplication' failed. For retrying use 'navigateToApplicationAndRetry'.");
      }
      if (closePopups) {
        await ui5.navigation.closePopups();
      }
      await browser.refresh();
    } catch (error) {
      throw new Error(this.errorText + error);
    }
  }

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
   * @example const intent = "PurchaseOrder-manage"
   * const queryParams = "?sap-language=EN&responderOn=true";
   * await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams);
   */
  async navigateToApplicationWithQueryParamsAndRetry(intent: string, queryParams: string, closePopups = true, verify = true, retries = 3, interval = 5000) {
    await util.function.retry(
      async (intent: string, queryParams: string, closePopups: boolean, verify: boolean) => {
        await this.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify);
      },
      [intent, queryParams, closePopups, verify],
      retries,
      interval,
      this
    );
  }

  // =================================== POPUPS ===================================
  /**
   * @function closePopups
   * @memberOf ui5.navigation
   * @description Closes all popups if they occur after navigating to a specific page.
   * @param {Number} [timeout=30000] - The timeout to wait.
   * @example await ui5.navigation.closePopups();
   */
  async closePopups(timeout = 30000) {
    const popups = [
      {
        name: "Help Dialog",
        selector: ".help4-wrapper button"
      },
      {
        name: "SAML Dialog",
        selector: "BUTTON[class='sapMBtnBase sapMBtn sapMDialogEndButton sapMBarChild']"
      }
    ];
    const popupHandlers = popups.map(popup => this._closePopup(popup, timeout));
    return Promise.all(popupHandlers);
  }

  // =================================== ASSERTION ===================================
  /**
   * @function expectUnsupportedNavigationPopup
   * @memberOf ui5.navigation
   * @description Expects navigation to an app that is not supported.
   * This can be the case for Mocked tests when the application does not exist or when the app is not included in a role.
   * @param {String} navigationTarget - The selector describing the element.
   * @example await ui5.navigation.expectUnsupportedNavigationPopup("#SupplierInvoice-display?FiscalYear=1234&SupplierInvoice=1234567890");
   */
  async expectUnsupportedNavigationPopup(navigationTarget: string) {
    const unsupportedNavigationPopup = {
      elementProperties: {
        metadata: "sap.m.Dialog",
        type: "Message",
        state: "Error"
      }
    };
    await ui5.assertion.expectToBeVisible(unsupportedNavigationPopup);

    const moreDetailsButton = {
      elementProperties: {
        metadata: "sap.m.Link",
        ancestor: unsupportedNavigationPopup
      }
    };
    await ui5.userInteraction.click(moreDetailsButton);

    const selector = {
      elementProperties: {
        metadata: "sap.m.FormattedText",
        ancestorProperties: unsupportedNavigationPopup
      }
    };
    const detailsTextElement = await ui5.element.getDisplayed(selector);
    const dataHtmlText = await detailsTextElement.getAttribute("data-htmltext");
    const stringExists = await dataHtmlText.includes(navigationTarget.replace(/&/g, "&amp;"));

    return common.assertion.expectTrue(stringExists);
  }

  // =================================== HELPER ===================================
  private _generateUrlParams() {
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

  private async _closePopup(popup: Popup, timeout: number = 30000): Promise<void> {
    try {
      const elem = await nonUi5.element.getByCss(popup.selector, 0, timeout);
      await nonUi5.userInteraction.click(elem);
      util.console.log(`${popup.name} was closed.`);
    } catch (error) {
      util.console.log(`${popup.name} not found.`);
    }
  }
}
export default new Navigation();
