/* eslint-disable no-undef */
/**
* @class
* @namespace messageBox
* @memberof common
*/
const FooterBar = function () {

  /**
  * @function closeMessageBox
  * @memberOf messageBox
  * @description Closes the MessageBox.
  * @example await ui5.common.messageBox.closeMessageBox();
  */
  this.closeMessageBox = async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "icon": "sap-icon://decline" } },
      "ancestorProperties": { "metadata": "sap.m.Popover", "mProperties": { "id": "*messagePopover-popover" } }
    };
    await ui5.common.userInteraction.click(ui5ControlProperties);
  };

  /**
  * @function expectMessageBoxToBeVisible
  * @memberOf messageBox
  * @description Expect the MessageBox to be visible..
  * @example await ui5.common.messageBox.expectMessageBoxToBeVisible();
  */
  this.expectMessageBoxToBeVisible = async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Popover", "mProperties": { "id": "*messagePopover-popover" } }
    };
    await ui5.common.assertion.expectToBeVisible(ui5ControlProperties);
  };

  /**
  * @function isMessageBoxVisible
  * @memberOf messageBox
  * @description returns a boolean if the messageBox is visible.
  * @example await ui5.common.messageBox.isMessageBoxVisible();
  */
  this.isMessageBoxVisible = async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Popover", "mProperties": { "id": "*messagePopover-popover" } }
    };
    return await ui5.common.locator.getValue(ui5ControlProperties, "visible");
  };

  /**
  * @function clickMessageBoxButton
  * @memberOf messageBox
  * @description opens the MessageBox via clicking the button at the footer toolbar.
  * @example await ui5.common.messageBox.clickMessageBoxButton();
  */
  this.clickMessageBoxButton = async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "id": "*showMessages" } }
    };
    await ui5.common.userInteraction.click(ui5ControlProperties);
  };
};
module.exports = new FooterBar();
