import { DateFormats, TimeFormats } from "../modules/util/constants/formatter.constants";
import { DateFormatsType, DateTimeDelimiter, DateTimeFormatsType, TimeFormatsType } from "../modules/util/types/formatter.types";

export class DateTimeFormatParser {
  public static extractDateFormat(format: DateTimeFormatsType): DateFormatsType {
    const matchingFormats = Object.values(DateFormats).filter((f) => format.startsWith(f));
    if (matchingFormats.length === 0) {
      throw new Error("Invalid date format provided.");
    }
    const longestMatch = matchingFormats.reduce((a, b) => (a.length > b.length ? a : b));
    return longestMatch as DateFormatsType;
  }

  public static extractTimeFormat(format: DateTimeFormatsType): TimeFormatsType {
    const timeFormat = Object.values(TimeFormats).find((f) => format.endsWith(f));
    if (!timeFormat) {
      throw new Error("Invalid time format provided.");
    }
    return timeFormat as TimeFormatsType;
  }

  public static extractDelimiter(format: DateTimeFormatsType): DateTimeDelimiter {
    const dateFormat = this.extractDateFormat(format);
    const timeFormat = this.extractTimeFormat(format);
    return format.slice(dateFormat.length, -timeFormat.length);
  }
}
