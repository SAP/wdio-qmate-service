import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class Ios
 * @memberof Mobile
 */
export class Ios {
  private vlf = new VerboseLoggerFactory("mobile", "ios");
  private ErrorHandler = new ErrorHandler();
}
export default new Ios();
