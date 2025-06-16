import { DateFormats, TimeFormats } from "../constants/formatter.constants";

export type DateFormatsType = `${DateFormats}`;
export type TimeFormatsType = `${TimeFormats}`;
export type DateTimeFormatsType = `${DateFormats} ${TimeFormats}` | DateFormats.OBJECT;
