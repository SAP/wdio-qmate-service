import { DateFormats, TimeFormats } from "../constants/formatter.constants";

export type DateFormatsType = `${DateFormats}`;
export type TimeFormatsType = `${TimeFormats}`;
export type DateTimeDelimiter = string;
export type DateTimeFormatsType = `${DateFormats}${DateTimeDelimiter}${TimeFormats}` | DateFormats.OBJECT | DateFormats.DATETIME;
