import { AmOrPm, Time } from "../modules/common/types/time.types";


interface TimeComponents {
  hours: string;
  minutes?: string;
  seconds?: string;
}

export class TimeHelper {
  public static updateDateWithTime(date: Date, time: Time): Date {
    if (!this._isValidTime(time)) {
      throw new Error("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
    }
    const { hours, minutes, seconds } = this._extractTimeComponents(time);
    date.setHours(hours
      ? this._adjustTo24HourFormat(Number(hours), this._extractAmPm(time))
      : 0
    );
    date.setMinutes(Number(minutes) || 0);
    date.setSeconds(Number(seconds) || 0);
    return date;
  }

  // =================================== PRIVATE ===================================
  private static _isValidTime(time: Time): boolean {
    const { hours, minutes, seconds } = this._extractTimeComponents(time);
    return this._isValidHours(hours, this._extractAmPm(time))
      && (minutes ? this._isValidMinutes(minutes) : true)
      && (seconds ? this._isValidSeconds(seconds) : true);
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
