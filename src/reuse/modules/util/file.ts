"use strict";
/**
 * @class file
 * @memberof util
 */
// @ts-ignore
export class File {
  path = require("path");
  pdf = require("pdf-parse");

  // =================================== UPLOAD ===================================
  /**
   * @function upload
   * @memberOf util.file
   * @description Uploads all the file/s by the paths given in the Array.
   * @param {String[]} files - Array with path/s of file/s to be uploaded.
   * @param {Number | Object} [selector=0] - Index or custom selector of uploader control, in case there are more then one present. Default value is index 0.
   * @example await util.file.upload(["path/to/text1.txt", "path/to/text2.txt"]); // uses the default uploader control
   * @example await util.file.upload(["path/to/text1.txt", "path/to/text2.txt"], 1); // upload to second file uploader control on UI screen
   * @example await util.file.upload(["path/to/text1.txt", "path/to/text2.txt"], selector); // upload to file uploader with matching selector
   */
  async upload(files: string[], selector: number | object = 0): Promise<void> {
    let elem;
    if (typeof selector === "number") {
      elem = await nonUi5.element.getByCss('input[type="file"]', selector);
    } else if (typeof selector === "object") {
      const elemId = await ui5.element.getId(selector);
      elem = await nonUi5.element.getByXPath(`.//input[contains(@id,'${elemId}')][@type='file']`);
    }
    if (!elem) {
      throw new Error("No upload input element found with matching index or selector");
    }
    for (const file of files) {
      await elem.setValue(this.path.resolve(file));
    }
  }

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
  async parsePdf(pdfStream: Buffer, renderingMethod: Function = this._renderPage): Promise<String> {
    if (typeof renderingMethod !== "function") {
      throw new Error("Function 'parsePdf' failed: Please provide a custom rendering method as second parameter.");
    }

    const options = {
      pagerender: renderingMethod,
    };
    const data = await this.pdf(pdfStream, options);
    return data.text;
  }

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
  async expectPdfContainsText(pdfStream: Buffer, text: string, renderingMethod: Function = this._renderPage) {
    if (!text) {
      throw new Error("Function 'expectPdfContainsText' failed: Please provide a text as second parameter.");
    }
    const parsedText = await this.parsePdf(pdfStream, renderingMethod);
    return expect(parsedText).toContain(text);
  }

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
  async expectPdfNotContainsText(
    pdfStream: Buffer,
    text: string,
    renderingMethod: Function = this._renderPage
  ): Promise<boolean> {
    if (!text) {
      throw new Error("Function 'expectPdfNotContainsText' failed: Please provide a text as second parameter.");
    }
    const parsedText = await this.parsePdf(pdfStream, renderingMethod);
    return expect(parsedText).not.toContain(text);
  }

  // =================================== HELPER ===================================
  private _renderPage(pageData: any) {
    const render_options = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false,
    };

    return pageData.getTextContent(render_options).then(this._parseText);
  }

  private _parseText(textContent: any) {
    if (textContent === undefined || textContent === null || !textContent.items || !Array.isArray(textContent.items)) {
      return;
    }
    let lastY,
      text = "";
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
}
export default new File();
