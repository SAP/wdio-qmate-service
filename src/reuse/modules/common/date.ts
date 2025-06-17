"use strict";

import { CalculateDates } from "./constants/date.constants";
import { CalculateDatesType } from "./types/date.types";
import { Time } from "./types/time.types";

import { DateFormats } from "../util/constants/formatter.constants";
import { DateFormatsType, DateTimeFormatsType } from "../util/types/formatter.types";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import { TimeHelper } from "../../helper/timeHelper";

/**
 * @class date
 * @memberof common
 */
export class DateModule {
  private vlf = new VerboseLoggerFactory("common", "date");

  // =================================== GET DATES ===================================
  /**
   * @function getToday
   * @memberOf common.date
   * @description Returns the current day in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getToday("mm/dd/yyyy");
   */
  getToday(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getToday);
    const date = new Date();
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getTomorrow
   * @memberOf common.date
   * @description Returns tomorrows date in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getTomorrow("mm/dd/yyyy");
   */
  getTomorrow(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getTomorrow);
    const date = new Date();
    date.setDate(date.getDate() + 1);
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getNextMonth
   * @memberOf common.date
   * @description Returns the current day one month later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextMonth("mm/dd/yyyy");
   */
  getNextMonth(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getTomorrow);
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getPreviousMonth
   * @memberOf common.date
   * @description Returns the current day one month before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousMonth("mm/dd/yyyy");
   */
  getPreviousMonth(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getPreviousMonth);
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getNextYear
   * @memberOf common.date
   * @description Returns the current day one year later in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getNextYear("mm/dd/yyyy");
   */
  getNextYear(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getNextYear);
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getPreviousYear
   * @memberOf common.date
   * @description Returns the current day one year before in the given format.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getPreviousYear("mm/dd/yyyy");
   */
  getPreviousYear(format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getPreviousYear);
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    vl.log(date.toISOString());
    return util.formatter.formatDate(date, format);
  }

  /**
   * @function getSpecific
   * @memberOf common.date
   * @description Returns a specific date in the given format.
   * @param {String} date - A specific date string.
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "datetime", "object").
   * @returns {String} The date in the given format.
   * @example const date = await common.date.getSpecific("2020, 0, 17", "mm/dd/yyyy");
   */
  getSpecific(date: string, format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.getSpecific);
    if (!date) {
      throw new Error("Function 'getSpecific' failed: Please provide a date string ('2020, 0, 17') as first argument.");
    }
    const parsedDate = Date.parse(date);
    const dateObject = new Date(parsedDate);
    vl.log(dateObject.toISOString());
    return util.formatter.formatDate(dateObject, format);
  }

  /**
   * @function calculate
   * @memberOf common.date
   * @description Calculates the date based on the input parameter and returns it in the given format.
   * @param {String} [date="today"] - Supported values: today, tomorrow, nextMonth, previousMonth, nextYear, previousYear
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "mmm dd, yyyy", "mmm d, yyyy", "datetime", "object").
   * @returns {String | Date} The calculated date in the given format.
   * @example const date = await common.date.calculate("today", "mm/dd/yyyy");
   */
  calculate(date: CalculateDatesType = CalculateDates.TODAY, format: DateFormatsType = process.env.USER_SETTINGS_DATE_FORMAT ? (process.env.USER_SETTINGS_DATE_FORMAT as DateFormatsType) : DateFormats.OBJECT): Date | string {
    const vl = this.vlf.initLog(this.calculate);
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
          throw new Error("Function 'calculate' failed: Please provide a valid date string as first argument.");
        }
    }
    return calculatedDate;
  }

  /**
   * @function calculateWithTime
   * @memberOf common.date
   * @description Calculates the date and time based on the input parameter and returns it in the given format.
   * @param {String} [date] - Supported values: "today", "tomorrow", "nextMonth", "previousMonth", "nextYear", "previousYear".
   * If the date is not provided, the current date will be used.
   * @param {String} [time] - The time of day.
   * Supported formats: "HH:MM:SS" (e.g. "10:30:20"), "HH:MM" (e.g. "10:30"), "HH" (e.g. "10").
   * It can also be in 12-hour format with AM/PM (e.g. "10:30 PM", "3 AM").
   * If not provided, the time will default to the start of the day (00:00:00).
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy HH:mm:ss", "dd.mm.yyyy h:mm:ss a", "dd/mm/yyyy HH:mm:ss z", "yyyymmdd h:mm:ss a z", "yyyy/mm/dd HH:mm", "mmm dd, yyyy h:mm a", "mmm d, yyyy HH", "mmm d, yyyy h a", etc; "datetime", "object").
   * @returns  {String | Date} The calculated date and time in the given format.
   * @example const date = common.date.calculateWithTime("today", "10:00");
   * // returns a Date object like "Tue Jun 17 2025 08:17:27 GMT+0200 (Central European Summer Time)"
   * @example const date = common.date.calculateWithTime("today", "10:00:00", "mm/dd/yyyy HH:mm:ss");
   * // returns a string like "06/17/2025 10:00:00"
   * @example const date = common.date.calculateWithTime("nextMonth", "9:00 PM", "mm-dd-yyyy h:mm a");
   * // returns a string like "07-17-2025 9:00 PM"
   * @example const date = common.date.calculateWithTime("previousMonth", "22:00:45", "dd.mm.yyyy HH:mm:ss");
   * // returns a string like "17.05.2025 22:00:45"
   * @example const date = common.date.calculateWithTime("nextYear", "3 AM", "dd/mm/yyyy h a");
   * // returns a string like "17/06/2026 3 AM"
   * @example const date = common.date.calculateWithTime("previousYear", "15:30", "yyyymmdd HH:mm");
   * // returns a string like "20240617 15:30"
   * @example const date = common.date.calculateWithTime("tomorrow", "10:00:50", "mmm dd, yyyy HH:mm:ss z");
   * // returns a string like "Jun 18, 2025 10:00:50 GMT+02:00"
   */
  calculateWithTime(date?: CalculateDatesType, time?: Time, format: DateTimeFormatsType = DateFormats.OBJECT): string | Date {
    const vl = this.vlf.initLog(this.calculateWithTime);
    const startOfDay = this._calculateStartOfDay(date);
    const calculatedTime = time
      ? this._updateDateWithTime(startOfDay, time)
      : startOfDay;
    return util.formatter.formatDateWithTime(calculatedTime, format);
  }

  // =================================== HELPER ===================================
  private _calculateStartOfDay(date: CalculateDatesType = CalculateDates.TODAY): Date {
    let calculatedDate: Date;
    try {
      calculatedDate = this.calculate(date, DateFormats.OBJECT) as Date;
    } catch (error) {
      throw new Error("Function 'calculateWithTime' failed: Please provide a valid date string as first argument.");
    }
    calculatedDate.setHours(0, 0, 0, 0);
    return calculatedDate;
  }

  private _updateDateWithTime(date: Date, time: Time): Date {
    try {
      return TimeHelper.updateDateWithTime(date, time);
    } catch (error) {
      throw new Error(`Function 'calculateWithTime' failed: ${(error as unknown as Error).message}`);
    }
  }
}
export default new DateModule();
