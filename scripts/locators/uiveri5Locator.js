/* eslint-disable no-undef */
module.exports = {
  ui5Veri5: function ui5Veri5(ui5Selector, index) {
    if (window.RecordReplay && window._ControlFinder && window.Log) {
      var elems = sap.ui.test._ControlFinder._findElements(ui5Selector);
      if (index !== undefined && index !== null) {
        return elems[index];
      }
      return elems;
    }
  }
};