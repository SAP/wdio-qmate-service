"use strict";

import {
  VerboseLoggerFactory
} from "../../helper/verboseLogger";

/**
 * @class file
 * @memberof util
 */

export class File {
  private vlf = new VerboseLoggerFactory("util", "file");

  path = require("path");
  pdf = require("pdf-parse");
  fs = require("fs");
  excelUtils = require('xlsx');
  os = require("os");

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
  async upload(files: Array < string > , selector: string = "input[type = 'file']") {
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
  async parsePdf(pdfStream: Buffer, renderingMethod: Function = this._renderPage): Promise < String > {
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
  async expectPdfNotContainsText(pdfStream: Buffer, text: string, renderingMethod: Function = this._renderPage): Promise < boolean > {
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

  // =================================== Excel ===================================
  /**
   * @function getExcelData
   * @memberof util.file
   * @description - It returns the excel data based on the conversion type which is passed
   * @param {string} filePath - File path is required
   * @param {string} fileName - File Name is required
   * @param {number} sheetIndex - sheetIndex is required
   * @param {string} conversionType - Value for this are [json, csv, txt]
   * @example await util.file.getExcelData('/Users/i553858/MyWork', 'test.xlx');
   */
  async getExcelData(filePath: string, fileName: string, sheetIndex: number = 0, conversionType: string = "json"): Promise < string > {
    let downloadDir;
    const vl = this.vlf.initLog(this.getExcelData);
    if (this.fs.existsSync(filePath) && !(filePath == undefined && fileName == undefined))
      downloadDir = filePath + this.path.sep;
    else
      downloadDir = this.os.homedir() + this.path.sep + "Downloads";
    vl.log(`download directory path:${downloadDir}`)
    let fileNamepath = await this.getAbsoluteFilePath(downloadDir, fileName);
    if (fileNamepath === null)
      throw new Error(`given file name doesn't exist in the directory:${downloadDir}${this.path.sep}${fileName}`)
    let workbook = this.excelUtils.readFile(fileNamepath);
    let sheetList = workbook.SheetNames;
    if (sheetIndex > (sheetList.length - 1) || sheetIndex < 0)
      throw new Error("Passed sheet index is not matched with the excel sheet")
    var sheet = workbook.Sheets[sheetList[sheetIndex]]
    return this.getConversionData(conversionType, sheet);
  };

  /**
   * @function getFileAbsolutePath
   * @memberof util.file
   * @description - It is used to get the absolute file path for the given file
   * @param {string} directory - Required directory name
   * @param {string} fileName - Name of the file is required
   * @example await util.file.getAbsoluteFilePath('/Users','test.xls');
   */
  async getAbsoluteFilePath(directory: string, fileName: string): Promise < any > {
    try {
      const vl = this.vlf.initLog(this.getAbsoluteFilePath);
      var stats = this.fs.statSync(directory);
      if (stats.isDirectory()) {
        let fileList = this.fs.readdirSync(directory)
        for (let i = 0; i < fileList.length; i++) {
          let downloadDir = directory + this.path.sep + fileList[i]
          let filePath = await this.getAbsoluteFilePath(downloadDir, fileName)
          if (filePath !== null)
            return filePath
        }
      } else {
        let fileNameAfterParse = this.path.parse(directory).base;
        if (stats.isFile() && (this.path.extname(fileNameAfterParse).includes(".xls") && fileNameAfterParse === fileName))
          return directory;
      }
    } catch (error) {
      throw new Error(`Error in getting the filepath for given file \n ${error}`)
    }
    return null;
  }

  private getConversionData(conversionType: string, sheet: string): string {
    let excelData;
    switch (conversionType.toLowerCase().trim()) {
      case "json":
        excelData = this.excelUtils.utils.sheet_to_json(sheet)
        break;
      case "csv":
        excelData = this.excelUtils.utils.sheet_to_csv(sheet)
        break;
      case "txt":
        excelData = this.excelUtils.utils.sheet_to_txt(sheet)
        break;
      default:
        throw new Error("Passed conversion type is not supported")
    }
    return excelData
  }
}
export default new File();