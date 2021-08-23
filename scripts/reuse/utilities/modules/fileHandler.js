/* eslint-disable no-console */
const pdf = require("pdf-parse");
// Private method to parse pdf
function render_page(pageData) {
  const render_options = {
    //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
    normalizeWhitespace: false,
    //do not attempt to combine same line TextItem's. The default value is `false`.
    disableCombineTextItems: false
  };

  return pageData.getTextContent(render_options).then(_parseText);
}

function _parseText(textContent) {
  if (textContent === undefined || textContent === null || !textContent.items || !Array.isArray(textContent.items)) {
    return;
  }
  //console.log(JSON.stringify(textContent));
  let lastY, text = "";
  for (const item of textContent.items) {
    if (Array.isArray(item.transform) && item.transform.length === 6) {
      if (lastY == item.transform[5] || !lastY) {
        text += " " + item.str;
      }
      else {
        text += "\n" + item.str;
      }
      lastY = item.transform[5];
    }
  }
  return text;
}

/**
* @class fileHandler
* @memberof utilities
*/
var FileHandler = function () {
  /**
  * @function parsePdf
  * @memberOf utilities.fileHandler
  * @description parses the text from PDF docs, returned text can be asserted to verify its pdf document content
  * @param {Buffer} pdfStream - pdf stream to be downloaded
  * @param {Function} renderMethod - a function to customize the parsing process
  * @see <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a>
  * @example await utilities.fileHandler.parsePdf(pdfStream, customRenderer);
  */
  this.parsePdf = async function (pdfStream, renderMethod = render_page) {
    if (typeof renderMethod !== "function") {
      throw new Error("Function parsePdf failed. Please provide a custom render message as second parameter.");
    }

    const options = {
      pagerender: renderMethod
    };
    const data = await pdf(pdfStream, options);
    return data.text;
  };

  /**
  * @function expectPdfContainsText
  * @memberOf utilities.fileHandler
  * @description parses the pdf and checks for given text to be present in pdf
  * @param {Buffer} pdfStream - pdf stream to be downloaded
  * @param {String} text - text to be present
  * @param {Function} renderMethod - a function to customize the parsing process
  * @see <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a> 
  * @example await utilities.fileHandler.expectPdfContainsText(pdfStream, "text");
  */
  this.expectPdfContainsText = async function (pdfStream, text, renderMethod = render_page) {
    if (text === undefined || text === null) {
      throw new Error("Function expectPdfContainsText failed. Please provide text as second parameter.");
    }

    const parsedText = await this.parsePdf(pdfStream, renderMethod);

    return await expect(parsedText).toContain(text);
  };

  /**
  * @function expectPdfNotContainsText
  * @memberOf utilities.fileHandler
  * @description parses the pdf and checks for given text not to be present in pdf
  * @param {Buffer} pdfStream - pdf stream to be downloaded
  * @param {String} text - text not to be present
  * @param {Function} renderMethod - a function to customize the parsing process.
  * @see <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a>
  * @example await utilities.fileHandler.expectPdfNotContainsText(pdfStream, "text");
  */
  this.expectPdfNotContainsText = async function (pdfStream, text, renderMethod = render_page) {

    if (text === undefined || text === null) {
      throw new Error("Function expectPdfNotContainsText failed. Please provide text as second parameter.");
    }

    const parsedText = await this.parsePdf(pdfStream, renderMethod);

    return await expect(parsedText).not.toContain(text);
  };

};
module.exports = new FileHandler();
