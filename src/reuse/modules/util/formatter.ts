"use strict";

import { DateFormats } from "./constants/formatter.constants";
import { DateFormatsType } from "./types/formatter.types";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class formatter
 * @memberof util
 */
export class Formatter {
  private ErrorHandler = new ErrorHandler();

  // =================================== STRING ===================================
  /**
   * @function sliceStringAt
   * @memberOf util.formatter
   * @description Slices the given string beginning at a specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring at which the input string is being sliced.
   * @param {number} length - The required length of the returning string (starting at the index of the passed slice point).
   * @returns {String} The sliced string.
   * @example const sliced = util.formatter.sliceStringAt("prefixNR12345postfix", "NR", 7);
   * // returns "NR12345"
   */
  sliceStringAt(input: string, slicePoint: string, length: number): string {
    if (input && slicePoint && length) {
      const index = input.indexOf(slicePoint);
      if (index !== -1) {
        return input.slice(index, index + length);
      } else {
        return this.ErrorHandler.logException(new Error(`Char '${slicePoint}' not found in input '${input}'.`));
      }
    } else {
      return this.ErrorHandler.logException(new Error("Incorrect or missing arguments."));
    }
  }

  /**
   * @function sliceStringAfter
   * @memberOf util.formatter
   * @description Slices the given string after a specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring after which the input string is being sliced.
   * @param {number} length - The required length of the returning string (starting at the index after the passed slice point).
   * @returns {String} The sliced string.
   * @example const sliced = util.formatter.sliceStringAfter("prefixNR12345postfix", "NR", 5);
   * // returns "12345"
   */
  sliceStringAfter(input: string, slicePoint: string, length: number): string {
    if (input && slicePoint && length) {
      let index = input.indexOf(slicePoint);
      if (index !== -1) {
        index = index + slicePoint.length;
        return input.slice(index, index + length);
      }
      return this.ErrorHandler.logException(new Error(`Char '${slicePoint}' not found in input '${input}'.`));
    }
    return this.ErrorHandler.logException(new Error("Incorrect or missing arguments."));
  }

  /**
   * @function trimString
   * @memberOf util.formatter
   * @description Removes whitespace from both sides of the given string.
   * @param {String} input - The input string to trim.
   * @example const trimmed = util.formatter.trimString("   value ");
   * // returns "value"
   */
  trimString(input: string): string {
    if (input) {
      return input.trim();
    }
    return this.ErrorHandler.logException(new Error("Incorrect or missing arguments."));
  }

  /**
   * @function extractNumberFromString
   * @memberOf util.formatter
   * @description Extracts all numbers from a string.
   * @param {String} input - The input string to extract the number.
   * @param {number} [index=0] - If there are multiple numbers in the string you can pass an index to return a specific number.
   * @returns {String} The extracted number.
   * @example const extracted = util.formatter.extractNumberFromString("prefixNR12345postfix");
   * // returns "12345"
   * @example const extracted = util.formatter.extractNumberFromString("first12345 someText second 20 abc", 1);
   * // returns "20"
   */
  extractNumberFromString(input: string, index: number = 0): string {
    if (input) {
      // @ts-ignore
      return input.match(/\d+/g).map(Number)[index].toString();
    }
    return this.ErrorHandler.logException(new Error("Incorrect or missing arguments."));
  }

  /**
   * @function stringifyJSON
   * @memberOf util.formatter
   * @description Converts a JSON object to string.
   * @param {Object} object - The JSON to be converted.
   * @returns {String} The converted JSON object.
   * @example console.log(`Printing the current selector: ${util.formatter.stringifyJSON(selector)}`);
   */
  stringifyJSON(object: object): string {
    try {
      return JSON.stringify(object);
    } catch (error) {
      return this.ErrorHandler.logException(error, "Incorrect JSON object.");
    }
  }

  // =================================== NUMBER ===================================
  /**
   * @function addRemoveLeadingZeros
   * @memberOf util.formatter
   * @description Adds or removes leading zeros to the passed number to format it to the required length.
   * @param {String} number - The number to be formatted.
   * @param {Number} length - The required length of the number.
   * @returns {String} The formatted number.
   * @example const itemNumber = util.formatter.addRemoveLeadingZeros(10, 5);
   */
  addRemoveLeadingZeros(number: string, length: number): string {
    const numberParsed = parseInt(number, 10);
    const zero = "0";
    const char = zero.repeat(length) + numberParsed;
    return char.slice(-length);
  }

  // =================================== DATE ===================================
  /**
   * @function formatDate
   * @memberOf util.formatter
   * @description formats date.
   * @param {Date} date - The date object to be formatted.
   * @param {String} format - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "mmm d, yyyy", "datetime", "object").
   * @param {String} [locale="en-US"] - The locale format of the date. E.g. "en-US", "de-DE", etc.
   * @returns {String} The formatted date as string.
   * @example const date = new Date(2020, 0, 17);
   * const formattedDate = util.formatter.formatDate(date, "mm/dd/yyyy");
   * // returns "01/17/2020"
   * @example const date = new Date(2022, 3, 12);
   * const formattedDate = util.formatter.formatDate(date, "mmm dd, yyyy");
   * // returns "Apr 03, 2022"
   */
  formatDate(date: Date, format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType, locale = "en-US"): string | Date {
    if (format) {
      format = format.toLowerCase() as DateFormats;
    }
    let formattedDate: Date | string = date;

    let hour: number | string = date.getHours();
    let min: number | string = date.getMinutes();
    let sec: number | string = date.getSeconds();
    let dd: number | string = date.getDate();
    let mm: number | string = date.getMonth() + 1;
    const month = date.toLocaleString(locale, { month: "short" });
    const yyyy = date.getFullYear();
    let yy: number | string = yyyy % 100;

    sec = sec.toString().padStart(2, "0");
    min = min.toString().padStart(2, "0");
    hour = hour.toString().padStart(2, "0");
    dd = (dd < 10 && format !== DateFormats.MONTH_DAY_YEAR_COMMA_SHORT) ? dd.toString().padStart(2, "0") : dd;  
    mm = mm.toString().padStart(2, "0");
    yy = yy.toString().padStart(2, "0");


    const formatMappings = {
      [DateFormats.MONTH_DAY_YEAR_SLASH]: `${mm}/${dd}/${yyyy}`,
      [DateFormats.DAY_MONTH_YEAR_DOT]: `${dd}.${mm}.${yyyy}`,
      [DateFormats.DAY_MONTH_YEAR_SLASH]: `${dd}/${mm}/${yyyy}`,
      [DateFormats.YEAR_MONTH_DAY_PLAIN]: `${yyyy}${mm}${dd}`,
      [DateFormats.YEAR_MONTH_DAY_SLASH]: `${yyyy}/${mm}/${dd}`,
      [DateFormats.DAY_MONTH_YEAR_TIME_DOT]: `${dd}.${mm}.${yyyy}.${hour}.${min}`,
      [DateFormats.MONTH_DAY_YEAR_COMMA]: `${month} ${dd}, ${yyyy}`,
      [DateFormats.MONTH_DAY_YEAR_COMMA_SHORT]: `${month} ${dd}, ${yyyy}`,
      [DateFormats.DATETIME]: `datetime'${yyyy}-${mm}-${dd}T${hour}:${min}:${sec}'`,
      [DateFormats.OBJECT]: date,
      [DateFormats.GREGORIAN_DOT]: `${dd}.${mm}.${yyyy}`,
      [DateFormats.GREGORIAN_SLASH]: `${mm}/${dd}/${yyyy}`,
      [DateFormats.GREGORIAN_DASH]: `${mm}-${dd}-${yyyy}`,
      [DateFormats.GREGORIAN_DOT_YEAR_FIRST]: `${yyyy}.${mm}.${dd}`,
      [DateFormats.GREGORIAN_SLASH_YEAR_FIRST]: `${yyyy}/${mm}/${dd}`,
      [DateFormats.GREGORIAN_ISO]: `${yyyy}-${mm}-${dd}`,
      [DateFormats.JAPANESE_DOT]: `g.${yy}.${mm}.${dd}`,
      [DateFormats.JAPANESE_SLASH]: `g/${yy}/${mm}/${dd}`,
      [DateFormats.JAPANESE_DASH]: `g-${yy}-${mm}-${dd}`,
      [DateFormats.ISLAMIC_1]: `${yyyy}/${mm}/${dd}`,
      [DateFormats.ISLAMIC_2]: `${yyyy}/${mm}/${dd}`,
      [DateFormats.IRANIAN]: `${yyyy}/${mm}/${dd}`
    };
    
    if (format && formatMappings[format]) {
      formattedDate = formatMappings[format];
    }
    return formattedDate;
  }
}
export default new Formatter();
