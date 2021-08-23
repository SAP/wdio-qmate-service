/**
* @class iconTabBar
* @memberof ui5.common
*/
const IconTabBar = function () {

  /**
  * @function switchTab
  * @memberOf ui5.common.iconTabBar
  * @description switches the current tab to the one with the passed value.
  * @param {String} value - The text value of the tab to switch to.
  * @example await ui5.common.iconTabBar.switchTab("Items");
  */
  this.switchTab = async function (value) {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.IconTabFilter", "mProperties": { "text": value } },
      "parentProperties": { "metadata": "sap.m.IconTabHeader", "mProperties": {} }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties);
  };

};
module.exports = new IconTabBar();
