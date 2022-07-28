"use strict";
/**
 * @class footerBar
 * @memberof ui5
 */
export class FooterBar {

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
   * @param {String} text - The text of the button.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickButton("Ok");
   */
  async clickButton (text: string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return ui5.userInteraction.click(this.selectors.genericButton(text), 0, timeout);
  };

  /**
   * @function clickApply
   * @memberOf ui5.footerBar
   * @description Clicks the 'Apply' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickApply();
   */
  async clickApply (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Apply", timeout);
  };

  /**
   * @function clickSave
   * @memberOf ui5.footerBar
   * @description Clicks the 'Save' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickSave();
   */
  async clickSave (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Save", timeout);
  };

  /**
   * @function clickCreate
   * @memberOf ui5.footerBar
   * @description Clicks the 'Create' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCreate();
   */
  async clickCreate (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Create", timeout);
  };

  /**
   * @function clickCancel
   * @memberOf ui5.footerBar
   * @description Clicks the 'Cancel' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCancel();
   */
  async clickCancel (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Cancel", timeout);
  };

  /**
   * @function clickCheck
   * @memberOf ui5.footerBar
   * @description Clicks the 'Check' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickCheck();
   */
  async clickCheck (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Check", timeout);
  };

  /**
   * @function clickOrder
   * @memberOf ui5.footerBar
   * @description Clicks the 'Order' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickOrder();
   */
  async clickOrder (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Order", timeout);
  };

  /**
   * @function clickPost
   * @memberOf ui5.footerBar
   * @description Clicks the 'Post' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickPost();
   */
  async clickPost (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Post", timeout);
  };

  /**
   * @function clickAdd
   * @memberOf ui5.footerBar
   * @description Clicks the 'Add' button at the footer toolbar.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickAdd();
   */
  async clickAdd (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    return this.clickButton("Add", timeout);
  };

  /**
   * @function clickMessageBoxButton
   * @memberOf ui5.messageBox
   * @description Opens the message box by clicking the button at the footer bar.
   * @example await ui5.messageBox.clickMessageBoxButton();
   */
  async clickMessageBoxButton () {
    return ui5.userInteraction.click(this.selectors.messageBoxButton);
  };

  /**
   * @function clickCloseMessageBox
   * @memberOf ui5.messageBox
   * @description Closes the message box by clicking the close icon.
   * @example await ui5.messageBox.clickCloseMessageBox();
   */
  async clickCloseMessageBox () {
    return ui5.userInteraction.click(this.selectors.messageBoxCloseButton);
  };


  // =================================== ASSERTIONS ===================================
  /**
   * @function expectMessageBoxToBeVisible
   * @memberOf ui5.messageBox
   * @description Expects the MessageBox to be visible.
   * @example await ui5.messageBox.expectMessageBoxToBeVisible();
   */
  async expectMessageBoxToBeVisible () {
    return ui5.assertion.expectToBeVisible(this.selectors.messageBox);
  };

  /**
   * @function isMessageBoxVisible
   * @memberOf ui5.messageBox
   * @description Determines if the messageBox is visible.
   * @returns {Boolean} Bool value if the element is visible or not.
   * @example await ui5.messageBox.isMessageBoxVisible();
   */
  async isMessageBoxVisible () {
    // TODO: check
    //@ts-ignore
    return ui5.element.getValue(this.selectors.messageBox, "visible");
  };

};
export default new FooterBar();