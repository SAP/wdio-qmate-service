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
    }
  };

  /**
   * @function clickButton
   * @memberOf ui5.footerBar
   * @description Clicks the button with the given text at the footer bar.
   * @param {Number} text - The text of the button.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.footerBar.clickButton("Ok");
   */
  this.clickButton = async function (text, timeout = 30000) {
    return ui5.userInteraction.click(this.selector.genericButton(text), 0, timeout);
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
   * @memberOf footerBar
   * @description Clicks the 'Messages' button at the footer toolbar.
   * @example await ui5.footerBar.clickMessageBoxButton();
   */
  this.clickMessageBoxButton = async function () {
    return ui5.messageBox.clickMessageBoxButton();
  };
};
module.exports = new FooterBar();