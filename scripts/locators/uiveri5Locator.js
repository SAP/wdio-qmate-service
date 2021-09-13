/* eslint-disable no-undef */
module.exports = {
  ui5Veri5: function ui5Veri5(ui5Selector, index) {
    if (window.RecordReplay) {
      var elems = [];
      sap.ui.test.RecordReplay.findAllDOMElementsByControlSelector(ui5Selector).then(function(elemsArray, err){
        elems = elemsArray;
        if (index !== undefined && index !== null) {
          return elems[index];
        }
      });
      return elems;
    }
  }
};