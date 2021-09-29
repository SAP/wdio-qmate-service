"use strict";
/**
 * @class footerBar
 * @memberof ui5
 */
const FooterBar = function () {

  this.selectors = {
    genericButton: (text) => {
      return {
        "elementProperties": {
          "metadata": "sap.m.Button",
          "mProperties": {
            "text": text
          }
        },
        "parentProperties": {
          "metadata": "sap.m.OverflowToolbar"
        }
      };
    },
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
   * @function clickButton
   * @memberOf ui5.footerBar
   * @description Clicks the button with the given text at the footer bar.
   * @param {Number} text - The text of the button.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickButton("Ok");
   */
  this.clickButton = async function (text, timeout = 30000) {
    return ui5.userInteraction.click(this.selectors.genericButton(text), 0, timeout);
  };

  /**
   * @function clickApply
   * @memberOf ui5.footerBar
   * @description Clicks the 'Apply' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickApply();
   */
  this.clickApply = async function (timeout = 30000) {
    return this.clickButton("Apply", timeout);
  };

  /**
   * @function clickSave
   * @memberOf ui5.footerBar
   * @description Clicks the 'Save' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickSave();
   */
  this.clickSave = async function (timeout = 30000) {
    return this.clickButton("Save", timeout);
  };

  /**
   * @function clickCreate
   * @memberOf ui5.footerBar
   * @description Clicks the 'Create' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCreate();
   */
  this.clickCreate = async function (timeout = 30000) {
    return this.clickButton("Create", timeout);
  };

  /**
   * @function clickCancel
   * @memberOf ui5.footerBar
   * @description Clicks the 'Cancel' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCancel();
   */
  this.clickCancel = async function (timeout = 30000) {
    return this.clickButton("Cancel", timeout);
  };

  /**
   * @function clickCheck
   * @memberOf ui5.footerBar
   * @description Clicks the 'Check' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCheck();
   */
  this.clickCheck = async function (timeout = 30000) {
    return this.clickButton("Check", timeout);
  };

  /**
   * @function clickOrder
   * @memberOf ui5.footerBar
   * @description Clicks the 'Order' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickOrder();
   */
  this.clickOrder = async function (timeout = 30000) {
    return this.clickButton("Order", timeout);
  };

  /**
   * @function clickPost
   * @memberOf ui5.footerBar
   * @description Clicks the 'Post' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickPost();
   */
  this.clickPost = async function (timeout = 30000) {
    return this.clickButton("Post", timeout);
  };

  /**
   * @function clickAdd
   * @memberOf ui5.footerBar
   * @description Clicks the 'Add' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickAdd();
   */
  this.clickAdd = async function (timeout = 30000) {
    return this.clickButton("Add", timeout);
  };

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
   * @function clickCloseMessageBox
   * @memberOf ui5.messageBox
   * @description Closes the message box by clicking the close icon.
   * @example await ui5.messageBox.clickCloseMessageBox();
   */
  this.clickCloseMessageBox = async function () {
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
    return ui5.element.getValue(this.selectors.messageBox, "visible");
  };

};
module.exports = new FooterBar();