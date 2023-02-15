"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class errorDialog
 * @memberof ui5
 */
export class ErrorDialog {
  private vlf = new VerboseLoggerFactory("ui5", "errorDialog");

  selectors = {
    errorDialog: {
      elementProperties: {
        metadata: "sap.m.Bar"
      },
      ancestorProperties: {
        metadata: "sap.m.Dialog",
        icon: "sap-icon://error"
      }
    },
    closeButton: {
      elementProperties: {
        metadata: "sap.m.Button",
        text: "Close"
      }
    }
  };

  /**
   * @function expectToBeVisible
   * @memberOf ui5.errorDialog
   * @description Expects that the error dialog is visible on the page.
   * @example await ui5.errorDialog.expectToBeVisible();
   */
  async expectToBeVisible() {
    const vl = this.vlf.initLog(this.expectToBeVisible);
    await ui5.assertion.expectToBeVisible(this.selectors.errorDialog);
  }

  /**
   * @function clickClose
   * @memberOf ui5.errorDialog
   * @description Clicks the 'Close' button at the error dialog.
   * @example await ui5.errorDialog.clickClose();
   */
  async clickClose() {
    const vl = this.vlf.initLog(this.clickClose);
    await ui5.userInteraction.click(this.selectors.closeButton);
  }
}
export default new ErrorDialog();
