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
    const logoWebComponentSelector = "//*[contains(local-name(),'ui5-shellbar-branding')]";
    async function clickLogoWebComponent() {
      await nonUi5.userInteraction.click(logoWebComponentSelector, 500);
    }
    async function clickLogoS4HanaCloud() {
      // same selector as for web component, but make it a deep selector to handle cases where element is within shadow root
      await nonUi5.userInteraction.click(`>>>${logoWebComponentSelector}`, 500);
    }
    try {
      await browser.waitUntil(
        async () => {
          try {
            await Promise.any([clickLogo(), clickLogoWebComponent(), clickLogoS4HanaCloud()]);
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
    const iterationTimeout = Math.min(timeout, 1000);

    async function clickWebComponentUserProfile() {
      // TODO: to remove '>>>' after support for v9 is implemented (v9 supports shadow root without '>>>')
      const selector = ">>>[data-ui5-stable='profile']";
      await nonUi5.userInteraction.click(selector, iterationTimeout);
    }

    async function clickShellBarUserAvatar() {
      // This selector stands for every element with metadata:
      // "sap.ushell.gen.ui5.webcomponents.dist.Avatar",
      // "sap.f.gen.ui5.webcomponents.dist.Avatar",
      // "sap.m.Avatar"
      const selector = {
        elementProperties: {
          metadata: "sap.*.Avatar",
          id: "*HeaderButton"
        }
      };
      const id = await ui5.element.getId(selector, 0, iterationTimeout);
      await util.browser.executeScript((id: string) => {
        sap.ui.getCore().byId(id).firePress();
      }, id);
    }

    try {
      await browser.waitUntil(
        async () => {
          const results = await Promise.allSettled([clickWebComponentUserProfile(), clickShellBarUserAvatar()]);
          return results.some((r) => r.status === "fulfilled");
        },
        {
          timeout: timeout,
          timeoutMsg: `Could not click User Icon in ${+timeout / 1000}s`,
          interval: GLOBAL_DEFAULT_WAIT_INTERVAL
        }
      );
    } catch (e) {
      this.ErrorHandler.logException(e);
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
