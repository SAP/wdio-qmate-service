import chalk from "chalk";
import { ErrorMessages } from "../helper/errorMessages";

export interface IErrorHandler {
  logException(error: Error): Promise<never>;
}

export class CustomError extends Error {
  constructor(message: string, name: string, stack?: string) {
    super(message);
    this.message = message;
    this.name = name;
    this.stack = stack;
  }
}

export default class ErrorHandler implements IErrorHandler {
  private logStackTrace?: boolean;

  constructor(logStackTrace: boolean = true) {
    this.logStackTrace = logStackTrace;
  }

  public async logException(errorObject: Error): Promise<never> {
    if (errorObject) {
      let stackTraceDefault = "";
      let functionName = this._retrieveFunctionNameFromStack(errorObject);
      let stackTrace = this._getFormattedStackTrace(errorObject);

      if (this.logStackTrace === true) stackTraceDefault = stackTrace;

      if (errorObject.message) {
        throw new CustomError(ErrorMessages.customErrorWithMessage(functionName, errorObject.message), errorObject.name, stackTraceDefault);
      } else {
        throw new CustomError(ErrorMessages.customErrorWithoutMessage(functionName), errorObject.name, stackTraceDefault);
      }
    } else {
      throw new CustomError(ErrorMessages.genericErrorMessage(),"Error");
    }
  }

  // =================================== HELPER ===================================

  private _retrieveFunctionNameFromStack(errorObject: Error): string {
    if (errorObject.stack) {
      var stack = errorObject.stack.split("\n");
      const startIndex = stack[1].indexOf("at") + 2;
      const endIndex = stack[1].indexOf("(");
      var functionName = stack[1].substring(startIndex, endIndex).trim();
      return !functionName.toLowerCase().includes("context") ? functionName : "";
    }
    return "";
  }

  private _getFormattedStackTrace(errorObject: Error): string {
    if (errorObject.stack) {
      var stack = errorObject.stack
        .split("\n")
        .map((line: string) => line.replace(/\s+at\s+/, ""))
        .slice(1)
        .join("\n\r");
      return stack;
    }
    return "";
  }
}
