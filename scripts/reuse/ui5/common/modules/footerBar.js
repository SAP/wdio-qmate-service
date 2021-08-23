/**
* @class footerBar
* @memberof ui5.common
*/
const FooterBar = function () {

  /**
  * @function clickApply
  * @memberOf ui5.common.footerBar
  * @description Triggers apply by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickApply();
  */
  this.clickApply = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Apply" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickSave
  * @memberOf ui5.common.footerBar
  * @description Triggers save by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickSave();
  */
  this.clickSave = async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.m.Button",
        "id": "*activate"
      }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
   * @function clickCreate
   * @memberOf ui5.common.footerBar
   * @description Triggers create by clicking the button at the footer toolbar.
   * @example await ui5.common.footerBar.clickCreate();
   */
  this.clickCreate = async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.m.Button",
        "id": "*activate"
      }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickCancel
  * @memberOf ui5.common.footerBar
  * @description Triggers cancel by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickCancel();
  */
  this.clickCancel = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Cancel" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickCheck
  * @memberOf ui5.common.footerBar
  * @description Triggers check by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickCheck();
  */
  this.clickCheck = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Check" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickOrder
  * @memberOf ui5.common.footerBar
  * @description Triggers order by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickOrder();
  */
  this.clickOrder = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Order" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickPost
  * @memberOf ui5.common.footerBar
  * @description Triggers post by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickPost();
  */
  this.clickPost = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Post" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickAdd
  * @memberOf ui5.common.footerBar
  * @description Triggers add by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickAdd();
  */
  this.clickAdd = async function () {
    const selector = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Emphasized", "text": [{ "path": "i18n>addButtonText" }] } }
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
  * @function clickMessageBoxButton
  * @memberOf footerBar
  * @description Triggers the MessageBox by clicking the button at the footer toolbar.
  * @example await ui5.common.footerBar.clickMessageBoxButton();
  */
  this.clickMessageBoxButton = async function () {
    return ui5.common.messageBox.clickMessageBoxButton();
  };
};
module.exports = new FooterBar();
