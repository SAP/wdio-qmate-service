/**
 * @class formatter
 * @memberof util
 */
const Formatter = function () {

  // =================================== STRING ===================================
  /**
   * @function sliceStringAt
   * @memberOf util.formatter
   * @description Slices the given string beginning at a specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring at which the input string is being sliced.
   * @param {Integer} length - The required length of the returning string (starting at the index of the passed slice point).
   * @returns {String} The sliced string.
   * @example const sliced = util.formatter.sliceStringAt("prefixNR12345postfix", "NR", 7);
   * // returns "NR12345"
   */
  this.sliceStringAt = function (input, slicePoint, length) {
    if (input && slicePoint && length) {
      const index = input.indexOf(slicePoint);
      if (index !== -1) {
        return input.slice(index, index + length);
      } else {
        throw new Error(`Char '${slicePoint}' not found in input '${input}'.`);
      }
    } else {
      throw new Error("Function 'sliceStringAt' failed: Incorrect or missing arguments.");
    }
  };

  /**
   * @function sliceStringAfter
   * @memberOf util.formatter
   * @description Slices the given string after a specific substring.
   * @param {String} input - The input string to slice.
   * @param {String} slicePoint - The substring after which the input string is being sliced.
   * @param {Integer} length - The required length of the returning string (starting at the index after the passed slice point).
   * @returns {String} The sliced string.
   * @example const sliced = util.formatter.sliceStringAfter("prefixNR12345postfix", "NR", 5);
   * // returns "12345"
   */
  this.sliceStringAfter = function (input, slicePoint, length) {
    if (input && slicePoint && length) {
      let index = input.indexOf(slicePoint);
      if (index !== -1) {
        index = index + slicePoint.length;
        return input.slice(index, index + length);
      } else {
        throw new Error(`Char '${slicePoint}' not found in input '${input}'.`);
      }
    } else {
      throw new Error("Function 'sliceStringAfter' failed: Incorrect or missing arguments.");
    }
  };

  /**
   * @function trimString
   * @memberOf util.formatter
   * @description Removes whitespace from both sides of the given string.
   * @param {String} input - The input string to trim.
   * @example const trimmed = util.formatter.trimString("   value ");
   * // returns "value"
   */
  this.trimString = function (input) {
    if (input) {
      return input.trim();
    } else {
      throw new Error("Function 'trimString' failed: Incorrect or missing arguments.");
    }
  };

  /**
   * @function extractNumberFromString
   * @memberOf util.formatter
   * @description Extracts all numbers from a string.
   * @param {String} input - The input string to extract the number.
   * @param {Integer} [index=0] - If there are multiple numbers in the string you can pass an index to return a specific number.
   * @returns {String} The extracted number.
   * @example const extracted = util.formatter.extractNumberFromString("prefixNR12345postfix");
   * // returns "12345"
   * @example const extracted = util.formatter.extractNumberFromString("first12345 someText second 20 abc", 1);
   * // returns "20"
   */
  this.extractNumberFromString = function (input, index = 0) {
    if (input) {
      return input.match(/\d+/g).map(Number)[index].toString();
    } else {
      throw new Error("Function 'extractNumberFromString' failed: Incorrect or missing arguments.");
    }
  };

  /**
   * @function stringifyJSON
   * @memberOf util.formatter
   * @description Converts a JSON object to string.
   * @param {Object} object - The JSON to be converted.
   * @returns {String} The converted JSON object.
   * @example console.log(`Printing the current selector: ${util.formatter.stringifyJSON(selector)}`);
   */
  this.stringifyJSON = function (object) {
    try {
      return JSON.stringify(object);
    } catch (error) {
      throw new Error(`Function 'stringifyJSON' failed: Incorrect JSON object. ${error}`);
    }
  };


  // =================================== NUMBER ===================================
  /**
   * @function addRemoveLeadingZeros
   * @memberOf util.formatter
   * @description Adds or removes leading zeros to the passed number to format it to the required length.
   * @param {String} number - The number to be formatted.
   * @param {Number} length - The required length of the number.
   * @returns {String} The formatted number.
   * @example const itemNumber = await util.formatter.addRemoveLeadingZeros(10, 5);
   */
  this.addRemoveLeadingZeros = function (number, length) {
    const string = number.toString(8);
    const zero = "0";
    const char = zero.repeat(length) + string;
    return char.slice(-length);
  };


  // =================================== DATE ===================================
  /**
   * @function formatDate
   * @memberOf util.formatter
   * @description formats date.
   * @param {Date} date - The date object to be formatted.
   * @param {String} format - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object").
   * @returns {String} The formatted date as string.
   * @example const date = new Date(2020, 0, 17);
   * const formattedDate = utilities.formatDate(date, "mm/dd/yyyy");
   * // returns "01/17/2020"
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