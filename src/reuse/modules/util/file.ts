"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import * as path from "path";
import pdfParse from "pdf-parse";
import * as fs from "fs";
import * as xlsx from "xlsx";
import * as os from "os";

/**
 * @class file
 * @memberof util
 */

export class File {
  private vlf = new VerboseLoggerFactory("util", "file");

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
        const filePath = path.resolve(file);
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
  async parsePdf(pdfStream: Buffer, renderingMethod: Function = this._renderPage): Promise<String> {
    const vl = this.vlf.initLog(this.parsePdf);
    if (typeof renderingMethod !== "function") {
      throw new Error("Function 'parsePdf' failed: Please provide a custom rendering method as second parameter.");
    }

    const options = {
      pagerender: renderingMethod
    };
    // @ts-ignore
    const data = await pdfParse(pdfStream, options);
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

  // =================================== EXCEL ===================================
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
  async getExcelData(filePath: string, fileName: string, sheetIndex: number = 0, conversionType: string = "json"): Promise<any> {
    const vl = this.vlf.initLog(this.getExcelData);

    const downloadDir = filePath && fs.existsSync(filePath) ? filePath + path.sep : os.homedir() + path.sep + "Downloads";
    vl.log(`Download directory path: ${downloadDir}`);

    const fileNamePath = await this.findFilePathRecursively(downloadDir, fileName);
    if (!fileNamePath) {
      throw new Error(`The specified file '${fileName}' doesn't exist in the directory: ${downloadDir}`);
    }

    const workbook = xlsx.readFile(fileNamePath);
    const sheetList = workbook.SheetNames;
    if (sheetIndex < 0 || sheetIndex > sheetList.length - 1) {
      throw new Error(`The specified sheet index '${sheetIndex}' is invalid for the Excel file.`);
    }

    const sheetName = sheetList[sheetIndex];
    const sheet = workbook.Sheets[sheetName];

    return this._convertSheet(conversionType, sheet);
  }

  // =================================== FILEPATH ===================================
  /**
   * @function findFilePathRecursively
   * @memberof util.file
   * @description - Returns the absolute path of the file with the given filename. Searches Recursively for the file within the given directory.
   * @param {string} directory - The name of the directory.
   * @param {string} fileName - The name of the file.
   * @example await util.file.findFilePathRecursively("/Users","test.xls");
   */
  async findFilePathRecursively(directory: string, fileName: string): Promise<any> {
    const vl = this.vlf.initLog(this.findFilePathRecursively);

    try {
      const fileList = fs.readdirSync(directory);

      for (const file of fileList) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          const recursiveFilePath = await this.findFilePathRecursively(filePath, fileName);
          if (recursiveFilePath !== null) {
            return recursiveFilePath;
          }
        } else if (stats.isFile()) {
          const parsedFileName = path.parse(filePath).base;

          if (path.extname(parsedFileName).includes(".xls") && parsedFileName === fileName) {
            return filePath;
          }
        }
      }
    } catch (error) {
      throw new Error(`Error in getting the file path for the given directory and filename.\n${error}`);
    }

    return null;
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

  private _convertSheet(conversionType: string, sheet: xlsx.WorkSheet): string | Array<any> {
    let excelData;

    switch (conversionType.toLowerCase().trim()) {
      case "json":
        excelData = xlsx.utils.sheet_to_json(sheet);
        break;
      case "csv":
        excelData = xlsx.utils.sheet_to_csv(sheet);
        break;
      case "txt":
        excelData = xlsx.utils.sheet_to_txt(sheet);
        break;
      default:
        throw new Error("Passed conversion type is not supported");
    }

    return excelData;
  }
}
export default new File();
