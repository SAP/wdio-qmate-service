/**
* @class formatter
* @memberof utilities
*/
var Formatter = function () {

  /**
   * @function sliceStringAt
   * @memberOf utilities.formatter
   * @description Slices a input string beginning at specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring at which the input string is sliced.
   * @param {Integer} length - The required length of the returning string (starting at the index of the passed slice point).
   * @returns {String} The sliced string.
   * @example let sliced = utilities.formatter.sliceStringAt("prefixNR12345postfix", "NR", 7);
   * // this will return "NR12345"
   */
  this.sliceStringAt = function (input, slicePoint, length) {
    if (input && slicePoint && length) {
      const index = input.indexOf(slicePoint);
      if (index !== -1) {
        return input.slice(index, index + length);
      } else {
        throw new Error(`Slicepoint '${slicePoint}' not found in input '${input}'.`);
      }
    } else {
      throw new Error("Incorrect parameters.");
    }
  };

  /**
   * @function sliceStringAfter
   * @memberOf utilities.formatter
   * @description Slices a input string beginning after a specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring after the input string is sliced.
   * @param {Integer} length - The required length of the returning string (starting at the index after the passed slice point).
   * @returns {String} The sliced string.
   * @example let sliced = utilities.formatter.sliceStringAfter("prefixNR12345postfix", "NR", 5);
   * // this will return "12345"
   */
  this.sliceStringAfter = function (input, slicePoint, length) {
    if (input && slicePoint && length) {
      let index = input.indexOf(slicePoint);
      if (index !== -1) {
        index = index + slicePoint.length;
        return input.slice(index, index + length);
      } else {
        throw new Error(`Slicepoint '${slicePoint}' not found in input '${input}'.`);
      }
    } else {
      throw new Error("Incorrect parameters.");
    }
  };

  /**
   * @function trimString
   * @memberOf utilities.formatter
   * @description Removes whitespace from both sides of a string.
   * @param {String} input - The input string to trim.
   * @example let trimmed = utilities.formatter.trimString("   value ");
   * // this will return "value"
   */
  this.trimString = function (input) {
    if (input) {
      return input.trim();
    } else {
      throw new Error("Incorrect parameters.");
    }
  };

  /**
   * @function extractNumberFromString
   * @memberOf utilities.formatter
   * @description Extracts all numbers from a string.
   * @param {String} input - The input string to extract the number.
   * @param {Integer} index - [OPTIONAL] If there are multiple numbers in the string you can pass an index to return a specific one.
   * Per default it will return the first.
   * @returns {String} The extracted number.
   * @example let extracted = utilities.formatter.extractNumberFromString("prefixNR12345postfix");
   * // this will return "12345"
   * @example let extracted = utilities.formatter.extractNumberFromString("first12345 someText second 20 abc", 1);
   * // this will return "20"
   */
  this.extractNumberFromString = function (input, index = 0) {
    if (input) {
      return input.match(/\d+/g).map(Number)[index].toString();
    } else {
      throw new Error("Incorrect parameters.");
    }
  };

  /**
   * @function stringifyJSON
   * @memberOf utilities.formatter
   * @description Stringifies a JSON.
   * @param {JSON} object - The JSON to stringify.
   * @returns {String} The stringified JSON-Object.
   * @example throw new Error(`No visible element found with selector: ${JSON.stringify(selector)}`);
   * @example console.log(`Printing the current selector: ${utilities.formatter.stringifyJSON(selector)}`);
   */
  this.stringifyJSON = function (object) {
    try {
      return JSON.stringify(object);
    } catch (error) {
      throw new Error(`Incorrect JSON format. Please check for syntax issues. ${error}`);
    }
  };

  /**
   * @function formatDate
   * @memberOf utilities.formatter
   * @description formats date.
   * @param {Date} date - The date object to be formatted.
   * @param {String} format - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object").
   * @returns {String} The formatted date as string.
   * @example const date = new Date(2020, 0, 17);
   * const formattedDate = utilities.formatDate(date, "mm/dd/yyyy");
   * // this will return "01/17/2020"
   */
  this.formatDate = function (date, format) {
    let formattedDate = date;
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
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

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    if (format) {
      format = format.toLowerCase();

      switch (format) {
        case "mm/dd/yyyy":
          formattedDate = `${mm}/${dd}/${yyyy}`;
          break;
        case "dd.mm.yyyy":
          formattedDate = `${dd}.${mm}.${yyyy}`;
          break;
        case "dd/mm/yyyy":
          formattedDate = `${dd}/${mm}/${yyyy}`;
          break;
        case "yyyymmdd":
          formattedDate = `${yyyy}${mm}${dd}`;
          break;
        case "yyyy/mm/dd":
          formattedDate = `${yyyy}/${mm}/${dd}`;
          break;
        case "dd.mm.yyyy.HH.MM":
          formattedDate = `${dd}.${mm}.${yyyy}.${hour}.${min}`;
          break;
        case "datetime":
          formattedDate = `datetime'${yyyy}-${mm}-${dd}T${hour}:${min}:${sec}'`;
          break;
        case "object":
          formattedDate = date;
          break;
        default:
          break;
      }
    }

    return formattedDate;
  };

};
module.exports = new Formatter();
