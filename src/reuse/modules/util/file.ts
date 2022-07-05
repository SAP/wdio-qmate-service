"use strict";
/**
 * @class file
 * @memberof util
 */

export class File {
  path = require("path");
  pdf = require("pdf-parse");

  // =================================== UPLOAD ===================================
  /**
   * @function upload
   * @memberOf util.file
   * @description Uploads all the file/s by the paths given in the Array.
   * @param {String[]} files - Array with path/s of file/s to be uploaded.
   * @param {String} [selector="input[type='file']"] - Custom selector of uploader control (in case there are more then one present). 
   * @example await util.file.upload(["path/to/text1.txt", "path/to/text2.txt"]); // uses the default uploader control
   * @example await util.file.upload(["path/to/text1.txt", "path/to/text2.txt"], "input[id='myUpload']"); // upload to file uploader with matching selector
   */
  async upload(files: Array<string>, selector: string = "input[type = 'file']") {   
    let elem;

    try {
      if (typeof selector === "string") {
        elem = await $(selector);
        const isDisplayed = await elem.isDisplayed();

        if (!isDisplayed) {
          await browser.execute(function (selector: string) {
            // @ts-ignore
            document.querySelector(selector).style.visibility = "visible";
          }, selector);
          await elem.waitForDisplayed();
        }

      } else if (typeof selector === "object") {
        const elemId = await ui5.element.getId(selector);
        elem = await nonUi5.element.getByXPath(`.//input[contains(@id,'${elemId}')][@type='file']`);
      }

      for (const file of files) {
        const filePath = this.path.resolve(file);
        const remoteFilePath = await browser.uploadFile(filePath);
        await elem.setValue(remoteFilePath);
      }

    } catch (error) {
      throw new Error(`Function 'upload' failed': ${error}`);
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
  async parsePdf(pdfStream: Buffer, renderingMethod: Function = this._renderPage): Promise<String> {
    if (typeof renderingMethod !== "function") {
      throw new Error("Function 'parsePdf' failed: Please provide a custom rendering method as second parameter.");
    }

    const options = {
      pagerender: renderingMethod,
    };
    // @ts-ignore
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
  private async _renderPage(pageData: any) {

    // should be in scope of render page due to library specific implementation
    const _parseText = function (textContent: any) {
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

    const render_options = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false,
    };
    return pageData.getTextContent(render_options).then(_parseText);
  }


}
export default new File();
