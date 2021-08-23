/**
* @class confirmationDialog
* @memberof ui5.common
*/
const ConfirmationDialog = function () {

  /**
  * @function clickOk
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "OK" button at the confirmation dialog.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickOk();
  */
  this.clickOk = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "OK" } },
      "parentProperties": { "metadata": "sap.m.AssociativeOverflowToolbar", "mProperties": {} }
    };
    await ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickCancel
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "Cancel" button at the confirmation dialog.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickCancel();
  */
  this.clickCancel = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Cancel" } }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickYes
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "Yes" button at the confirmation dialog.
  * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickYes();
  */
  this.clickYes = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Yes" } },
      "parentProperties": { "metadata": "sap.m.AssociativeOverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickNo
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "Yes" button at the confirmation dialog.
  * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickNo();
  */
  this.clickNo = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "No" } },
      "parentProperties": { "metadata": "sap.m.AssociativeOverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickDelete
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "Delete" button at the confirmation dialog.
  * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickDelete();
  */
  this.clickDelete = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Delete" } }
    };
    await ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickRevokeApproval
  * @memberOf ui5.common.confirmationDialog
  * @description clicks the "Revoke Approval" button at the confirmation dialog.
  * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.confirmationDialog.clickRevokeApproval();
  */
  this.clickRevokeApproval = async function (timeout = 30000) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Revoke Approval" } },
      "parentProperties": { "metadata": "sap.m.AssociativeOverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties, 0, timeout);
  };

  /**
  * @function clickCreate
  * @memberOf ui5.common.confirmationDialog
  * @description Clicks the create button in the confirmation dialog
  * @example await ui5.common.confirmationDialog.clickCreate();
  */
  this.clickCreate = async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Emphasized", "text": "Create" } },
      "parentProperties": { "metadata": "sap.m.AssociativeOverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties);
  };

};
module.exports = new ConfirmationDialog();
