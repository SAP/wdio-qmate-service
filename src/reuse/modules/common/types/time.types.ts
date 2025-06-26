import { CalculateTimeAnchors } from "../constants/date.constants";

export type AmOrPm = "AM" | "PM" | "";

export type Time = `${number}:${number}:${number}` | `${number}:${number}:${number} ${AmOrPm}`
  | `${number}:${number}` | `${number}:${number} ${AmOrPm}`
  | `${number}` | `${number} ${AmOrPm}` | CalculateTimeAnchors;
