"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class navigationBar
 * @memberof ui5
 */
export class NavigationBar {
  private vlf = new VerboseLoggerFactory("ui5", "navigationBar");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function clickBack
   * @memberOf ui5.navigationBar
   * @description Navigates one layer back.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickBack();
   */
  async clickBack(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.clickBack);
    const selector = {
      elementProperties: {
        id: "backBtn"
      }
    };
    try {
      await ui5.userInteraction.click(selector, 0, timeout);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickSapLogo
   * @memberOf ui5.navigationBar
   * @description Clicks at the SAP Logo.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickSapLogo();
   */
  async clickSapLogo(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.clickSapLogo);
    async function clickLogo() {
      const selector = "//a[@id='shell-header-logo']";
      await nonUi5.userInteraction.click(selector, timeout);
    }
    async function clickLogoWebComponent() {
      const selector = ">>>span[class='ui5-shellbar-logo']";
      await nonUi5.userInteraction.click(selector, timeout);
    }
    try {
      await Promise.any([clickLogo(), clickLogoWebComponent()]);
    } catch (error) {
      (error as AggregateError).errors.forEach((err) => {
        this.ErrorHandler.logException(err);
      });
    }
  }

  /**
   * @function clickUserIcon
   * @memberOf ui5.navigationBar
   * @description Clicks at the Account Icon.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickUserIcon();
   */
  async clickUserIcon(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 5000) {
    const vl = this.vlf.initLog(this.clickUserIcon);

    try {
      await scrollAndClickUserIconNew();
      return;
    } catch (error) {
      console.warn("New user icon not found, trying old selector.");
    }

    try {
      await scrollAndClickUserIconOld();
      return;
    } catch (error) {
      this.ErrorHandler.logException(error);
    }

    this.ErrorHandler.logException(
      new Error("Neither old nor new logout button could be clicked.")
    );

    async function scrollAndClickUserIconNew() {
      const selector = ">>>[data-ui5-stable='profile']";
      await nonUi5.userInteraction.scrollToElement(selector, "end");
      await nonUi5.userInteraction.click(selector);
    }

    async function scrollAndClickUserIconOld() {
      const selector = {
        "elementProperties": {
          "metadata": "sap.m.Avatar",
          "id": "*HeaderButton"
        }
      };
      await ui5.userInteraction.scrollToElement(selector, 0, "end");
      await ui5.userInteraction.click(selector, 0, timeout);
    }
  }

  // =================================== ASSERTION ===================================
  /**
   * @function expectPageTitle
   * @memberOf ui5.navigationBar
   * @description Expects the page title of the current page to be the compare value.
   * @param {String} compareValue - The compare value.
   * @example await ui5.navigationBar.expectPageTitle("Home");
   */
  async expectPageTitle(compareValue: string) {
    const vl = this.vlf.initLog(this.expectPageTitle);
    const selector = {
      elementProperties: {
        metadata: "sap.ushell.ui.shell.ShellAppTitle",
        mProperties: {
          text: compareValue
        }
      }
    };
    try {
      await ui5.assertion.expectToBeVisibleInViewport(selector);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function expectShellHeader
   * @memberOf ui5.navigationBar
   * @description Expects the shell header to be visible
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.expectShellHeader();
   */
  async expectShellHeader(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    const vl = this.vlf.initLog(this.expectShellHeader);
    const selector = {
      elementProperties: {
        id: "shell-header"
      }
    };
    try {
      await ui5.assertion.expectToBeVisible(selector, 0, timeout, loadPropertyTimeout);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new NavigationBar();
