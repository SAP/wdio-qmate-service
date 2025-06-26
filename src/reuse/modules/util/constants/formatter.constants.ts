export enum DateFormats {
  MONTH_DAY_YEAR_SLASH = "mm/dd/yyyy",
  MONTH_DAY_YEAR_DASH = "mm-dd-yyyy",
  DAY_MONTH_YEAR_DOT = "dd.mm.yyyy",
  DAY_MONTH_YEAR_SLASH = "dd/mm/yyyy",
  YEAR_MONTH_DAY_PLAIN = "yyyymmdd",
  YEAR_MONTH_DAY_SLASH = "yyyy/mm/dd",
  YEAR_MONTH_DAY_DOT = "yyyy.mm.dd",
  YEAR_MONTH_DAY_DASH = "yyyy-mm-dd",
  DAY_MONTH_YEAR_TIME_DOT = "dd.mm.yyyy.hh.mm",
  MONTH_DAY_YEAR_COMMA = "mmm dd, yyyy",
  MONTH_DAY_YEAR_COMMA_SHORT = "mmm d, yyyy",
  DATETIME = "datetime",
  OBJECT = "object",
  JAPANESE_DOT = "g.yy.mm.dd",
  JAPANESE_SLASH = "g/yy/mm/dd",
  JAPANESE_DASH = "g-yy-mm-dd",
};

export enum TimeFormats {
  HOUR_MINUTE_SECOND = "HH:mm:ss",
  HOUR_MINUTE_SECOND_AM_PM = "h:mm:ss a",
  HOUR_MINUTE_SECOND_GMT = "HH:mm:ss z",
  HOUR_MINUTE_SECOND_AM_PM_GMT = "h:mm:ss a z",
  HOUR_MINUTE = "HH:mm",
  HOUR_MINUTE_AM_PM = "h:mm a",
  HOUR = "HH",
  HOUR_AM_PM = "h a"
};
