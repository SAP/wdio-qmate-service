import { CalculateTimeAnchors } from "../modules/common/constants/date.constants";
import { AmOrPm, Time } from "../modules/common/types/time.types";

interface TimeComponents {
  hours: string;
  minutes?: string;
  seconds?: string;
}

export class TimeHelper {
  public static updateDateWithTime(date: Date, time: Time): Date {
    if (this._isValidTimeAnchor(time)) {
      return this._updateDateWithTimeAnchor(date, time as CalculateTimeAnchors);
    }
    if (this._isValidTimeValue(time)) {
      return this._updateDateWithTimeValue(date, time);
    }
    throw new Error("Please provide a valid time string as second argument.");
  }

  // =================================== PRIVATE ===================================
  private static _isValidTimeValue(time: Time): boolean {
    const { hours, minutes, seconds } = this._extractTimeComponents(time);
    return this._isValidHours(hours, this._extractAmPm(time))
      && (minutes ? this._isValidMinutes(minutes) : true)
      && (seconds ? this._isValidSeconds(seconds) : true);
  }

  private static _updateDateWithTimeAnchor(date: Date, time: CalculateTimeAnchors): Date {
    switch (time) {
      case CalculateTimeAnchors.CURRENT_TIME:
        this._updateDateWithCurrentTime(date);
        break;
      case CalculateTimeAnchors.START_OF_DAY:
        this._updateDateWithStartOfDay(date);
        break;
      case CalculateTimeAnchors.END_OF_DAY:
        this._updateDateWithEndOfDay(date);
        break;
      default:
        throw new Error(`Unsupported time anchor: ${time}`);
    }
    return date;
  }

  private static _updateDateWithTimeValue(date: Date, time: Time): Date {
    const { hours, minutes, seconds } = this._extractTimeComponents(time);
    date.setHours(hours
      ? this._adjustTo24HourFormat(Number(hours), this._extractAmPm(time))
      : 0
    );
    date.setMinutes(Number(minutes) || 0);
    date.setSeconds(Number(seconds) || 0);
    return date;
  }

  private static _updateDateWithCurrentTime(date: Date): void {
    const now = new Date();
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);
  }

  private static _updateDateWithStartOfDay(date: Date): void {
    date.setHours(0, 0, 0, 0);
  }

  private static _updateDateWithEndOfDay(date: Date): void {
    date.setHours(23, 59, 59, 999);
  }

  private static _isValidTimeAnchor(time: Time): boolean {
    return Object.values(CalculateTimeAnchors).includes(time as CalculateTimeAnchors);
  }

  private static _extractTimeComponents(time: Time): TimeComponents {
    const [hours, minutes, seconds] = time.replace(/AM|PM/i, "").trim().split(":");
    return { hours, minutes, seconds };
  }

  private static _adjustTo24HourFormat(hours: number, amPm: AmOrPm): number {
    if (amPm === "PM" && hours < 12) {
      return hours + 12;
    }
    if (amPm === "AM" && hours === 12) {
      return 0;
    }
    return hours;
  }

  private static _isValidHours(hours: string, amPm: AmOrPm): boolean {
    const hoursRegex = /^(2[0-3]|[01]?[0-9])$/; // 00-23
    return (hoursRegex.test(hours) && (
      amPm ? Number(hours) <= 12 : true
    )
    );
  }

  private static _isValidMinutes(minutes: string): boolean {
    const minutesRegex = /^([0-5]?[0-9])$/; // 00-59
    return minutesRegex.test(minutes);
  }

  private static _isValidSeconds(seconds: string): boolean {
    const secondsRegex = /^([0-5]?[0-9])$/; // 00-59
    return secondsRegex.test(seconds);
  }

  private static _extractAmPm(time: Time): AmOrPm {
    const match = time.toUpperCase().match(/AM|PM/i);
    return match ? (match[0] as "AM" | "PM") : "";
  }
}
