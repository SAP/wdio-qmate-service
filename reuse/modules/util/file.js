"use strict";
/**
 * @class file
 * @memberof util
 */
const File = function () {

  const path = require("path");
  // const pdf = require("pdf-parse");


  // =================================== UPLOAD ===================================
  /**
   * @function upload
   * @memberOf util.file
   * @description Uploads all the file/s by the paths given in the Array.
   * @param {String[]} files - Array with path/s of file/s to be uploaded.
   * @param {Number | Object} selector - second parameter can be a index or selector of uploader control, default value of index is 0
   * @example await util.file.uploadFile(["path/to/text1.txt", "path/to/text2.txt"]);
   * @example await util.file.uploadFile(["path/to/text1.txt", "path/to/text2.txt"], 1); //upload to second fileuploader control on ui screen
   * @example await util.file.uploadFile(["path/to/text1.txt", "path/to/text2.txt"], selector); //upload to file uploader with matching selector
   */
  this.upload = async function (files, selector = 0) {
    let elem;
    if (typeof selector === "number"){
      elem = await nonUi5.element.getByCss('input[type="file"]', selector);
    } else if (typeof selector === "object"){
      const elemId = await ui5.element.getId(selector);
      elem = await nonUi5.element.getByXPath(`.//input[contains(@id,'${elemId}')][@type='file']`);
    }
    if (!elem){
      throw new Error("No upload input element found with matching index or selector");
    }
    for (const file of files) {
      await elem.setValue(path.resolve(file));
    }
  };


  // =================================== PDF ===================================
  /**
   * @function parsePdf
   * @memberOf util.file
   * @description Parses the text from PDF stream. Returned text can be asserted to verify the PDF document content.
   * @param {Buffer} pdfStream - PDF stream to be downloaded.
   * @param {Function} renderingMethod - Function to customize the parsing process.
   * @returns {String} The parsed PDF text.
   * @see <a href="TODO">Parse PDF</a>
   * @example await util.file.parsePdf(pdfStream, customRenderingMethod);
   */
  this.parsePdf = async function (pdfStream, renderingMethod = _renderPage) {
    if (typeof renderingMethod !== "function") {
      throw new Error("Function 'parsePdf' failed: Please provide a custom rendering method as second parameter.");
    }

    const options = {
      pagerender: renderingMethod
    };
    // const data = await pdf(pdfStream, options);
    // return data.text;
  };

  /**
   * @function expectPdfContainsText
   * @memberOf util.file
   * @description Parses the PDF and checks for given text to be contained in PDF.
   * @param {Buffer} pdfStream - PDF stream to be downloaded.
   * @param {String} text - The expected text.
   * @param {Function} renderingMethod - Function to customize the parsing process.
   * @see <a href="TODO">Parse pdf</a> 
   * @example await util.file.expectPdfContainsText(pdfStream, "abc");
   */
  this.expectPdfContainsText = async function (pdfStream, text, renderingMethod = _renderPage) {
    if (!text) {
      throw new Error("Function 'expectPdfContainsText' failed: Please provide a text as second parameter.");
    }
    const parsedText = await this.parsePdf(pdfStream, renderingMethod);
    return expect(parsedText).toContain(text);
  };

  /**
   * @function expectPdfNotContainsText
   * @memberOf util.file
   * @description Parses the PDF and checks for given text not to be contained in PDF.
   * @param {Buffer} pdfStream - PDF stream to be downloaded
   * @param {String} text - The text expected to be not contained in the PDF.
   * @param {Function} renderingMethod - Function to customize the parsing process.
   * @see <a href="TODO">Parse pdf</a>
   * @example await util.file.expectPdfNotContainsText(pdfStream, "abc");
   */
  this.expectPdfNotContainsText = async function (pdfStream, text, renderingMethod = _renderPage) {
    if (!text) {
      throw new Error("Function 'expectPdfNotContainsText' failed: Please provide a text as second parameter.");
    }
    const parsedText = await this.parsePdf(pdfStream, renderingMethod);
    return expect(parsedText).not.toContain(text);
  };


  // =================================== HELPER ===================================
  function _renderPage(pageData) {
    const render_options = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false
    };

    return pageData.getTextContent(render_options).then(_parseText);
  }

  function _parseText(textContent) {
    if (textContent === undefined || textContent === null || !textContent.items || !Array.isArray(textContent.items)) {
      return;
    }
    let lastY, text = "";
    for (const item of textContent.items) {
      if (Array.isArray(item.transform) && item.transform.length === 6) {
        if (lastY == item.transform[5] || !lastY) {
          text += " " + item.str;
        } else {
          text += "\n" + item.str;
        }
        lastY = item.transform[5];
      }
    }
    return text;
  }

};
module.exports = new File();