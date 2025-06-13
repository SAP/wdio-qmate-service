"use strict";

import { CalculateDates } from "./constants/date.constants";
import { CalculateDatesType } from "./types/date.types";

import { DateFormats } from "../util/constants/formatter.constants";
import { DateFormatsType } from "../util/types/formatter.types";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";

type Time =  `${number}:${number}:${number}` | `${number}:${number}:${number} ${"AM" | "PM"}`
  | `${number}:${number}` | `${number}:${number} ${"AM" | "PM"}`
  | `${number}` | `${number} ${"AM" | "PM"}`;

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
   * @param {String} [date] - Supported values: today, tomorrow, nextMonth, previousMonth, nextYear, previousYear
   * @param {String} [time] - The time in "HH:MM:SS" format (e.g., "10:00", "10:30:20", "15").
   * @returns  {Date} The calculated date and time in the given format.
   * @example const date = await common.date.calculateWithTime("today", "10:00");
   */
  calculateWithTime(date?: CalculateDatesType, time?: Time): Date {
    const vl = this.vlf.initLog(this.calculateWithTime);
    if (!date) {
      return new Date();
    }
    const startOfDay = this._calculateStartOfDay(date);
    return time
      ? this._updateDateWithTime(startOfDay, time)
      : startOfDay;
  }

  private _calculateStartOfDay(date: CalculateDatesType): Date {
    let calculatedDate: Date;
    try {
      calculatedDate = this.calculate(date, DateFormats.OBJECT) as Date;
    } catch (error) {
      throw new Error("Function 'calculateWithTime' failed: Please provide a valid date string as first argument.");
    }
    calculatedDate.setHours(0, 0, 0, 0);
    return calculatedDate;
  }

  private _updateDateWithTime(date: Date, time: string): Date {
    if (!this._isValidTime(time)) {
      throw new Error("Function 'calculateWithTime' failed: Please provide a valid time string as a second argument.");
    }
    const [hours, minutes, seconds] = this._removeAmPm(time).split(":").map(Number);
    if (hours) {
      date.setHours(hours);
    }
    if (minutes) {
      date.setMinutes(minutes);
    }
    if (seconds) {
      date.setSeconds(seconds);
    }
    return date;
  }

  private _isValidTime(time: string): boolean {
    const hoursRegex = /^(2[0-3]|[01]?[0-9])$/; // 00-23
    const minutesRegex = /^([0-5]?[0-9])$/; // 00-59
    const secondsRegex = /^([0-5]?[0-9])$/; // 00-59
    const [hours, minutes, seconds] = this._removeAmPm(time).split(":");
    if (hours && !hoursRegex.test(hours)) {
      return false;
    }
    if (minutes && !minutesRegex.test(minutes)) {
      return false;
    }
    if (seconds && !secondsRegex.test(seconds)) {
      return false;
    }
    return true;
  }

  private _removeAmPm(time: string): string {
    return time.replace(/AM|PM/i, "").trim();
  }
}
export default new DateModule();
