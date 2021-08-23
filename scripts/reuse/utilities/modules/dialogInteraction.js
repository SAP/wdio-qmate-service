var path = require("path");
/**
 * @class dialogInteraction
 * @memberof utilities
 */
var DialogInteraction = function () {

  /**
   * @function uploadFiles
   * @memberOf utilities.dialogInteraction
   * @description Uploads all the file/s as mentioned in the Array.
   * @param {Array} files - List of file/s to be uploaded.
   * @example await utilities.dialogInteraction.uploadFile(["path/to/text1.txt", "path/to/text2.txt"]);
   */
  this.uploadFiles = async function (files) {
    var oElem = await non_ui5.common.locator.getElementByCss('input[type="file"]');
    for (var i = 0; i < files.length; i++) {
      await oElem.setValue(path.resolve(files[i]));
    }
  };
};
module.exports = new DialogInteraction();