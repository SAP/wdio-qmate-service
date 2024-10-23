import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class ios
 * @memberof mobile
 */
export class Ios {
  private vlf = new VerboseLoggerFactory("mobile", "ios");
  private ErrorHandler = new ErrorHandler();
}
export default new Ios();
