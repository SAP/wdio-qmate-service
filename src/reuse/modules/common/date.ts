"use strict";

import { CalculateDates } from "./constants/date.constants";
import { CalculateDatesType } from "./types/date.types";

import { DateFormats } from "../util/constants/formatter.constants";
import { DateFormatsType } from "../util/types/formatter.types";

/**
 * @class date
 * @memberof common
 */
export class DateModule {

  // =================================== GET DATES ===================================
  /**
   * @function getToday
   * @memberOf common.date
   * @description Returns the current day in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getToday("mm/dd/yyyy");
   */
  getToday (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getTomorrow
   * @memberOf common.date
   * @description Returns tomorrows date in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getTomorrow("mm/dd/yyyy");
   */
  getTomorrow (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getNextMonth
   * @memberOf common.date
   * @description Returns the current day one month later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextMonth("mm/dd/yyyy");
   */
  getNextMonth (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousMonth
   * @memberOf common.date
   * @description Returns the current day one month before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousMonth("mm/dd/yyyy");
   */
  getPreviousMonth (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getNextYear
   * @memberOf common.date
   * @description Returns the current day one year later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextYear("mm/dd/yyyy");
   */
  getNextYear (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousYear
   * @memberOf common.date
   * @description Returns the current day one year before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousYear("mm/dd/yyyy");
   */
  getPreviousYear (format: DateFormatsType = DateFormats.OBJECT): Date | string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return util.formatter.formatDate(date, format);
  };

  /**
   * @function getSpecific
   * @memberOf common.date
   * @description Returns a specific date in the given format.
   * @param {String} date - A specific date string.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getSpecific("2020, 0, 17", "mm/dd/yyyy");
   */
  getSpecific (date: string, format: DateFormatsType = DateFormats.OBJECT): Date | string {
    if (!date) {
      throw new Error("Function 'getSpecific' failed: Please provide a date string ('2020, 0, 17') as first argument.");
    }
    const parsedDate = Date.parse(date);
    const dateObject = new Date(parsedDate);
    return util.formatter.formatDate(dateObject, format);
  };

  /**
   * @function calculate
   * @memberOf common.date
   * @description Calculates the date based on the input parameter and returns it in the given format.
   * @param {String} [date="today"] - Supported values: today, tomorrow, nextMonth, previousMonth, nextYear, previousYear
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object").
   * @returns {String} The calculated date in the given format.
   * @example const date = await common.date.calculate("today", "mm/dd/yyyy");
   */
  calculate (date: CalculateDatesType = CalculateDates.TODAY, format: DateFormatsType = DateFormats.OBJECT): Date | string {
    if (date === null) {
      date = CalculateDates.TODAY;
    }
    if (format === null) {
      format = DateFormats.OBJECT;
    }

    let calculatedDate;

    switch (date) {
      case CalculateDates.TODAY:
        calculatedDate = this.getToday(format);
        break;
      case CalculateDates.TOMORROW:
        calculatedDate = this.getTomorrow(format);
        break;
      case CalculateDates.NEXT_MONTH:
        calculatedDate = this.getNextMonth(format);
        break;
      case CalculateDates.PREVIOUS_MONTH:
        calculatedDate = this.getPreviousMonth(format);
        break;
      case CalculateDates.NEXT_YEAR:
        calculatedDate = this.getNextYear(format);
        break;
      case CalculateDates.PREVIOUS_YEAR:
        calculatedDate = this.getPreviousYear(format);
        break;
      default:
        try {
          calculatedDate = this.getSpecific(date, format);
        } catch (error) {
          throw new Error("Function 'calculate' failed: Please provide a valid date string as first argument.")
        }
    }
    return calculatedDate;
  };
};
export default new DateModule();
