"use strict";
/**
 * @class confirmationDialog
 * @memberof ui5
 */
export class ConfirmationDialog {

  selectors = {
    genericButton: (text: string) => {
      return {
        "elementProperties": {
          "metadata": "sap.m.Button",
          "mProperties": {
            "text": text
          }
        },
        "parentProperties": {
          "metadata": "sap.m.AssociativeOverflowToolbar"
        }
      };
    }
  };

  /**
   * @function clickButton
   * @memberOf ui5.confirmationDialog
   * @description Clicks the button with the given text at the confirmation dialog.
   * @param {String} text - The text of the button.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickButton("Ok");
   */
  async clickButton (text: string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return ui5.userInteraction.click(this.selectors.genericButton(text), 0, timeout);
  };

  /**
   * @function clickOk
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "OK" button at the confirmation dialog.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickOk();
   */
  async clickOk (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    // @ts-ignore
    return this.clickButton(/ok/gi, timeout);
  };

  /**
   * @function clickCancel
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Cancel" button at the confirmation dialog.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickCancel();
   */
  async clickCancel (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Cancel", timeout);
  };

  /**
   * @function clickYes
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Yes" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickYes();
   */
  async clickYes (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Yes", timeout);
  };

  /**
   * @function clickNo
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Yes" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickNo();
   */
  async clickNo (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("No", timeout);
  };

  /**
   * @function clickCreate
   * @memberOf ui5.confirmationDialog
   * @description Clicks the create button in the confirmation dialog
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickCreate();
   */
  async clickCreate (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Create", timeout);
  };

  /**
   * @function clickDelete
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Delete" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickDelete();
   */
  async clickDelete (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Delete", timeout);
  };

  /**
   * @function clickRevokeApproval
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Revoke Approval" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickRevokeApproval();
   */
  async clickRevokeApproval (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Revoke Approval", timeout);
  };

};
export default new ConfirmationDialog();