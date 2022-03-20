/* eslint-disable no-undef */
module.exports = {
  ui5Veri5: function ui5Veri5(ui5Selector, index) {
    if (window.RecordReplay) {
      let elems = [];
      return sap.ui.test.RecordReplay.findAllDOMElementsByControlSelector({selector: ui5Selector})
        .then(function (elemsArray) {
          elems = elemsArray;
          if (index !== undefined && index !== null) {
            return elems[index];
          }
          return elems;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};