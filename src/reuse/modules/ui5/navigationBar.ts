"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { GLOBAL_DEFAULT_WAIT_INTERVAL, GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../constants";

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
  async clickBack(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
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
  async clickSapLogo(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.clickSapLogo);
    async function clickLogo() {
      const selector = "//a[@id='shell-header-logo']";
      await nonUi5.userInteraction.click(selector, 500);
    }
    async function clickLogoWebComponent() {
      const selector = "//*[contains(local-name(),'ui5-shellbar-branding')]";
      await nonUi5.userInteraction.click(selector, 500);
    }
    try {
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([clickLogo(), clickLogoWebComponent()]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: "SAP Logo not clickable",
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickUserIcon
   * @memberOf ui5.navigationBar
   * @description Clicks at the Account Icon.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickUserIcon();
   */
  async clickUserIcon(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.clickUserIcon);

    async function clickUserIconOld() {
      const selector = {
        elementProperties: {
          metadata: "sap.m.Avatar",
          id: "*HeaderButton"
        }
      };
      await ui5.userInteraction.click(selector, 0, 2500);
    }

    async function clickUserIconNew() {
      // TODO: to remove '>>>' after support for v9 is implemented (v9 supports shadow root without '>>>')
      const selector = ">>>[data-ui5-stable='profile']";
      await nonUi5.userInteraction.click(selector, 2500);
    }

    async function clickUserIconNewNew() {
      const selector = {
        elementProperties: {
          viewName: "sap.ushell.components.shell.ShellBar.view.ShellBar",
          metadata: "sap.ushell.gen.ui5.webcomponents.dist.Avatar",
          id: "userActionsMenuHeaderButton"
        }
      };
      await ui5.userInteraction.click(selector, 0, 2500);
    }

    try {
      // attempt clicking both old and new user icons
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([clickUserIconOld(), clickUserIconNew(), clickUserIconNewNew()]);
            return true;
          } catch (error) {
            // Ignore error and continue to next promise
            return false;
          }
        },
        {
          timeout: timeout,
          timeoutMsg: `Could not click User Icon in ${+timeout / 1000}s`,
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    } catch (error) {
      this.ErrorHandler.logException(error);
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
  async expectShellHeader(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
