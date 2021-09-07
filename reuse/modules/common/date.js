/**
 * @class date
 * @memberof common
 */
const DateModule = function () {

  // =================================== GET DATES ===================================
  /**
   * @function getToday
   * @memberOf common.date
   * @description Returns the current day in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getToday("mm/dd/yyyy");
   */
  this.getToday = function (format = "object") {
    const date = new Date();
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getTomorrow
   * @memberOf common.date
   * @description Returns tomorrows date in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getTomorrow("mm/dd/yyyy");
   */
  this.getTomorrow = function (format = "object") {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getNextMonth
   * @memberOf common.date
   * @description Returns the current day one month later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextMonth("mm/dd/yyyy");
   */
  this.getNextMonth = function (format = "object") {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousMonth
   * @memberOf common.date
   * @description Returns the current day one month before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousMonth("mm/dd/yyyy");
   */
  this.getPreviousMonth = function (format = "object") {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getNextYear
   * @memberOf common.date
   * @description Returns the current day one year later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextYear("mm/dd/yyyy");
   */
  this.getNextYear = function (format = "object") {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousYear
   * @memberOf common.date
   * @description Returns the current day one year before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousYear("mm/dd/yyyy");
   */
  this.getPreviousYear = function (format = "object") {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return common.formatter.formatDate(date, format);
  };

  /**
   * @function getSpecificDate
   * @memberOf common.date
   * @description Returns a specific date in the given format.
   * @param {String} date - A specific date string.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getSpecificDate("2020, 0, 17", "mm/dd/yyyy");
   */
  this.getSpecificDate = function (date, format = "object") {
    if (!date) {
      throw new Error("Function 'getSpecificDate' failed: Please provide a date string ('2020, 0, 17') as first argument.");
    }
    const parsedDate = Date.parse(date);
    const dateObject = new Date(parsedDate);
    return common.formatter.formatDate(dateObject, format);
  };

  /**
   * @function calculateDate
   * @memberOf common.date
   * @description Calculates the date based on the input parameter and returns it in the given format.
   * @param {String} [date="today"] - Supported values: today, tomorrow, nextMonth, previousMonth, nextYear, lastYear
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object").
   * @returns {String} The calculated date in the given format.
   * @example const date = await common.date.calculateDate("today", "mm/dd/yyy");
   */
  this.calculateDate = function (date = "today", format = "object") {
    if (date === null) {
      date = "today";
    }
    if (format === null) {
      format = "object";
    }

    let calculatedDate;

    switch (date) {
      case "today":
        calculatedDate = this.getToday(format);
        break;
      case "tomorrow":
        calculatedDate = this.getTomorrow(format);
        break;
      case "nextMonth":
        calculatedDate = this.getNextMonth(format);
        break;
      case "previousMonth":
        calculatedDate = this.getPreviousMonth(format);
        break;
      case "nextYear":
        calculatedDate = this.getNextYear(format);
        break;
      case "previousYear":
        calculatedDate = this.getPreviousYear(format);
        break;
      default:
        calculatedDate = this.getSpecificDate(date, format);
    }
    return calculatedDate;
  };
};
module.exports = new DateModule();