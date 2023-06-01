"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class file
 * @memberof util
 */

export class File {
  private vlf = new VerboseLoggerFactory("util", "file");

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
    const vl = this.vlf.initLog(this.upload);
    let elem;

    try {
      if (typeof selector === "string") {
        elem = await $(selector);
      } else if (typeof selector === "object") {
        const elemId = await ui5.element.getId(selector);
        elem = await nonUi5.element.getByXPath(`.//input[contains(@id,'${elemId}')][@type='file']`);
      }

      for (const file of files) {
        const filePath = this.path.resolve(file);
        vl.log(`Uploading file with a path ${filePath}`);
        const remoteFilePath = await browser.uploadFile(filePath);
        await elem.addValue(remoteFilePath);
      }
    } catch (error) {
      throw new Error(`Function 'upload' failed': ${error}`);
    }
  }
  
  /**
   * @function uploadWebGui
   * @memberOf util.file
   * @description Uploads all the file/s by the paths given in the Array for SAP WebGUI apps.
   * @param {String[]} files - Array with path/s of file/s to be uploaded.
   * @param {String | Object} selector - Custom selector of the input element
   * @example await util.file.uploadWebGui(["path/to/text1.txt"], "INPUT[title='External file name']");
   */
  async uploadWebGui(files: Array<string>, selector: any) {
    const vl = this.vlf.initLog(this.uploadWebGui);
    try {
      if (typeof selector === "string") {
        const elem = await nonUi5.element.getByCss(selector);
        await nonUi5.userInteraction.click(elem);
      } else if (typeof selector === "object") {
        await ui5.userInteraction.click(selector);
      }
      await common.userInteraction.pressF4();
      const okButton = await nonUi5.element.getByCss("DIV[id='UpDownDialogChoose']")
      await nonUi5.assertion.expectToBeVisible(okButton);
      const fileInput = await nonUi5.element.getByXPath(".//input[@id='webgui_filebrowser_file_upload'][@type='file']", 0, 30000, true);
      let remoteFiles = "";
      for (const file of files) {
        const filePath = this.path.resolve(file);
        vl.log(`Uploading file with a path ${filePath}`);
        const remoteFilePath = await browser.uploadFile(filePath);
        if (remoteFiles) {
          remoteFiles = remoteFiles + "\n";
        }
        remoteFiles = remoteFiles + remoteFilePath;
      }
      await fileInput.addValue(remoteFiles);
    } catch (error) {
      throw new Error(`Function 'uploadWebGui' failed': ${error}`);
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
    const vl = this.vlf.initLog(this.parsePdf);
    if (typeof renderingMethod !== "function") {
      throw new Error("Function 'parsePdf' failed: Please provide a custom rendering method as second parameter.");
    }

    const options = {
      pagerender: renderingMethod
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
    const vl = this.vlf.initLog(this.expectPdfContainsText);
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
  async expectPdfNotContainsText(pdfStream: Buffer, text: string, renderingMethod: Function = this._renderPage): Promise<boolean> {
    const vl = this.vlf.initLog(this.expectPdfNotContainsText);
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
    };

    const render_options = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false
    };
    return pageData.getTextContent(render_options).then(_parseText);
  }
}
export default new File();
