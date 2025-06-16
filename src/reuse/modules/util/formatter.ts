"use strict";

import { DateFormats, TimeFormats } from "./constants/formatter.constants";
import { DateFormatsType, DateTimeFormatsType, TimeFormatsType } from "./types/formatter.types";
import ErrorHandler from "../../helper/errorHandler";
import { DateTimeFormatParser } from "../../helper/dateTimeFormatParser";

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
  formatDate(date: Date, format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT, locale = "en-US"): string | Date {
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

    if (sec < 10) {
      sec = `0${sec}`;
    }

    if (min < 10) {
      min = `0${min}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (dd < 10 && format !== DateFormats.MONTH_DAY_YEAR_COMMA_SHORT) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    if (format) {
      switch (format) {
        case DateFormats.MONTH_DAY_YEAR_SLASH:
          formattedDate = `${mm}/${dd}/${yyyy}`;
          break;
        case DateFormats.MONTH_DAY_YEAR_DASH:
          formattedDate = `${mm}-${dd}-${yyyy}`;
          break;
        case DateFormats.DAY_MONTH_YEAR_DOT:
          formattedDate = `${dd}.${mm}.${yyyy}`;
          break;
        case DateFormats.DAY_MONTH_YEAR_SLASH:
          formattedDate = `${dd}/${mm}/${yyyy}`;
          break;
        case DateFormats.YEAR_MONTH_DAY_PLAIN:
          formattedDate = `${yyyy}${mm}${dd}`;
          break;
        case DateFormats.YEAR_MONTH_DAY_SLASH:
          formattedDate = `${yyyy}/${mm}/${dd}`;
          break;
        case DateFormats.YEAR_MONTH_DAY_DOT:
          formattedDate = `${yyyy}.${mm}.${dd}`;
          break;
        case DateFormats.YEAR_MONTH_DAY_DASH:
          formattedDate = `${yyyy}-${mm}-${dd}`;
          break;
        case DateFormats.DAY_MONTH_YEAR_TIME_DOT:
          formattedDate = `${dd}.${mm}.${yyyy}.${hour}.${min}`;
          break;
        case DateFormats.MONTH_DAY_YEAR_COMMA:
          formattedDate = `${month} ${dd}, ${yyyy}`;
          break;
        case DateFormats.MONTH_DAY_YEAR_COMMA_SHORT:
          formattedDate = `${month} ${dd}, ${yyyy}`;
          break;
        case DateFormats.DATETIME:
          formattedDate = `datetime'${yyyy}-${mm}-${dd}T${hour}:${min}:${sec}'`;
          break;
        case DateFormats.OBJECT:
          formattedDate = date;
          break;
        case DateFormats.JAPANESE_DOT:
          formattedDate = `${date.toLocaleDateString(locale, { era: "short" })}.${mm}.${dd}`;
          break;
        case DateFormats.JAPANESE_SLASH:
          formattedDate = `${date.toLocaleDateString(locale, { era: "short" })}/${mm}/${dd}`;
          break;
        case DateFormats.JAPANESE_DASH:
          formattedDate = `${date.toLocaleDateString(locale, { era: "short" })}-${mm}-${dd}`;
          break;
        default:
          break;
      }
    }

    return formattedDate;
  }

  formatDateWithTime(date: Date, format: DateTimeFormatsType = DateFormats.OBJECT, locale = "en-US"): string | Date {
    const dateFormat = DateTimeFormatParser.extractDateFormat(format);
    this._validateDateFormat(format, dateFormat);
    const dateFormatted = this.formatDate(date, dateFormat, locale);
    if (this._containsTimeInDateFormat(dateFormat)) {
      return dateFormatted;
    }
    const timeFormatted = this._formatTime(date, format);
    const delimiter = DateTimeFormatParser.extractDelimiter(format);
    return `${dateFormatted}${delimiter}${timeFormatted}`;
  }

  // =================================== HELPER ===================================
  private _validateDateFormat(format: DateTimeFormatsType, dateFormat: DateFormatsType): void {
    if (this._containsTimeInDateFormat(dateFormat) && !(format.toString() === dateFormat.toString())) {
      throw new Error(`Invalid date time format: if you want to use '${dateFormat}' format, please use only '${dateFormat}' without any additional text`);
    }
  }

  private _containsTimeInDateFormat(dateFormat: DateFormatsType): boolean {
    return dateFormat === DateFormats.DATETIME || dateFormat === DateFormats.DAY_MONTH_YEAR_TIME_DOT || dateFormat === DateFormats.OBJECT;
  }

  private _formatTime(date: Date, format: DateTimeFormatsType): string {
    const timeFormat = DateTimeFormatParser.extractTimeFormat(format);
    return timeFormat.replace(/HH|h|mm|ss|a|z/g, (token) => this._replaceTimeFormatToken(date, token));
  }

  private _replaceTimeFormatToken(date: Date, token: string): string {
    switch (token) {
      case "HH":
        return date.getHours().toString().padStart(2, "0");
      case "h":
        return ((date.getHours() % 12) || 12).toString();
      case "mm":
        return date.getMinutes().toString().padStart(2, "0");
      case "ss":
        return date.getSeconds().toString().padStart(2, "0");
      case "a":
        return date.getHours() < 12 ? "AM" : "PM";
      case "z":
        const offset = date.getTimezoneOffset();
        const sign = offset < 0 ? "+" : "-";
        const hours = Math.abs(offset / 60);
        return `GMT${sign}${hours}`;
      default:
        return token;
    }
  }
}
export default new Formatter();
