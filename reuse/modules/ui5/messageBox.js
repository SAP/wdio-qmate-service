/**
 * @class
 * @namespace messageBox
 * @memberof ui5
 */
const MessageBox = function () {

  this.selectors = {
    messageBoxButton: {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "id": "*showMessages"
        }
      }
    },
    messageBoxCloseButton: {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "icon": "sap-icon://decline"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.Popover",
        "mProperties": {
          "id": "*messagePopover-popover"
        }
      }
    },
    messageBox: {
      "elementProperties": {
        "metadata": "sap.m.Popover",
        "mProperties": {
          "id": "*messagePopover-popover"
        }
      }
    }
  };

  // =================================== ACTIONS ===================================
  /**
   * @function clickMessageBoxButton
   * @memberOf ui5.messageBox
   * @description Opens the message box by clicking the button at the footer bar.
   * @example await ui5.messageBox.clickMessageBoxButton();
   */
  this.clickMessageBoxButton = async function () {
    return ui5.userInteraction.click(this.selectors.messageBoxButton);
  };

  /**
   * @function closeMessageBox
   * @memberOf ui5.messageBox
   * @description Closes the message box.
   * @example await ui5.messageBox.closeMessageBox();
   */
  this.closeMessageBox = async function () {
    return ui5.userInteraction.click(this.selectors.messageBoxCloseButton);
  };


  // =================================== ASSERTIONS ===================================
  /**
   * @function expectMessageBoxToBeVisible
   * @memberOf ui5.messageBox
   * @description Expects the MessageBox to be visible.
   * @example await ui5.messageBox.expectMessageBoxToBeVisible();
   */
  this.expectMessageBoxToBeVisible = async function () {
    return ui5.assertion.expectToBeVisible(this.selectors.messageBox);
  };

  /**
   * @function isMessageBoxVisible
   * @memberOf ui5.messageBox
   * @description Determines if the messageBox is visible.
   * @returns {Boolean} Bool value if the element is visible or not.
   * @example await ui5.messageBox.isMessageBoxVisible();
   */
  this.isMessageBoxVisible = async function () {
    return ui5.locator.getValue(this.selectors.messageBox, "visible");
  };

};
module.exports = new MessageBox();