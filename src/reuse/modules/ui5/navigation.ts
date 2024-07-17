"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

interface Popup {
  name: string;
  selector: string;
}

interface QueryParam {
  key: string;
  value: string;
}

/**
 * @class navigation
 * @memberof ui5
 */
export class Navigation {
  private vlf = new VerboseLoggerFactory("ui5", "navigation");
  private ErrorHandler = new ErrorHandler();

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
    const vl = this.vlf.initLog(this.navigateToApplication);

    const baseUrlNormalized = this._normalizeQueryString(browser.config.baseUrl);
    const intentNormalized = this._normalizeQueryString(intent);

    let queryParams: Array<QueryParam> = [];

    // Check if intent has query params and extract them from the intent
    queryParams = queryParams.concat(this._extractQueryParams(intent));

    // Check if baseUrl has query params and extract them from the baseUrl
    queryParams = queryParams.concat(this._extractQueryParams(browser.config.baseUrl));

    // Add prevent popup url params if not already present
    if (preventPopups) {
      queryParams = queryParams.concat(this._getPreventPopupParams(queryParams));
    }

    // Construct the url with the intent and query params
    let constructedParams = this._constructUrlParams(queryParams);
    if (constructedParams !== "") constructedParams = `?${constructedParams}`;
    const urlWithParams = `${baseUrlNormalized}${constructedParams}#${intentNormalized}`;
    vl.log(`Url with params: ${urlWithParams}`);

    try {
      await browser.navigateTo(urlWithParams);

      const url = await browser.getUrl();
      await util.browser.logCurrentUrl();

      if (url && !url.includes(intent) && verify) {
        new Error("Failed to verify successful navigation.");
      }

      if (refresh) {
        await util.browser.refresh();
      }
    } catch (error) {
      this.ErrorHandler.logException(error, this.errorText);
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
    const vl = this.vlf.initLog(this.navigateToApplicationAndRetry);
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
    const vl = this.vlf.initLog(this.navigateToSystemAndApplication);
    try {
      await browser.navigateTo(`https://${system}/ui#${intent}`);
      const url = await browser.getUrl();
      await util.browser.logCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        this.ErrorHandler.logException(new Error("For retrying use 'navigateToSystemAndApplicationAndRetry'."));
      }
      if (closePopups) {
        await this.closePopups();
      }
    } catch (error) {
      this.ErrorHandler.logException(error, this.errorText);
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
    const vl = this.vlf.initLog(this.navigateToSystemAndApplicationAndRetry);
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
    const vl = this.vlf.initLog(this.navigateToApplicationWithQueryParams);
    let url;
    try {
      let parsedQueryParams = "";
      if (queryParams) {
        if (queryParams.startsWith("?")) {
          parsedQueryParams = queryParams;
        } else {
          parsedQueryParams = `?${queryParams}`;
        }
      }

      await browser.url(`${browser.config.baseUrl}${parsedQueryParams}#${intent}`);
      url = await browser.getUrl();
      await util.browser.logCurrentUrl();
      if (url && url.indexOf(intent) === -1 && verify) {
        this.ErrorHandler.logException(new Error("For retrying use 'navigateToSystemAndApplicationAndRetry'."));
      }
      if (closePopups) {
        await ui5.navigation.closePopups();
      }
      await browser.refresh();
    } catch (error) {
      this.ErrorHandler.logException(error, this.errorText);
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
    const vl = this.vlf.initLog(this.navigateToApplicationWithQueryParamsAndRetry);
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
    const vl = this.vlf.initLog(this.closePopups);
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
    const popupHandlers = popups.map((popup) => this._closePopup(popup, timeout));
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
    const vl = this.vlf.initLog(this.expectUnsupportedNavigationPopup);
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
  private _extractQueryParams(input: string): Array<QueryParam> {
    const queryParams: Array<QueryParam> = [];
    const queryParts = input.split("?");

    if (queryParts.length > 1) {
      queryParams.push(...this._mapQueryParams(queryParts[1]));
    }

    return queryParams;
  }

  private _normalizeQueryString(input: string): string {
    const queryParts = input.split("?");
    return queryParts[0];
  }

  private _constructUrlParams(queryParams: QueryParam[]): string {
    return queryParams.map((param) => `${param.key}=${param.value}`).join("&");
  }

  private _getPreventPopupParams(queryParams: Array<QueryParam>): Array<QueryParam> {
    const combinedQueryParams: Array<QueryParam> = [];

    const READ_CATALOG_PARAM = "help-readCatalog";
    const STATE_UACP_PARAM = "help-stateUACP";

    const hasReadCatalog = queryParams.some((param) => param.key === READ_CATALOG_PARAM);
    const hasStateUACP = queryParams.some((param) => param.key === STATE_UACP_PARAM);

    if (!hasReadCatalog) {
      combinedQueryParams.push({ key: READ_CATALOG_PARAM, value: "false" });
    }
    if (!hasStateUACP) {
      combinedQueryParams.push({ key: STATE_UACP_PARAM, value: "PRODUCTION" });
    }

    return combinedQueryParams;
  }

  private _mapQueryParams(params: string): Array<QueryParam> {
    return params.split("&").map((param) => {
      const [key, value] = param.split("=");
      return { key, value };
    });
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
