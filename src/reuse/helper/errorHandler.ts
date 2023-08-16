import chalk from "chalk";
import { ErrorMessages } from "../helper/errorMessages";

export interface IErrorHandler {
  logException(error: unknown | Error, customErrorMessage?: string): Promise<never>;
}

export class CustomError extends Error {
  constructor(message: string, displayStack: boolean) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.stack = displayStack ? this._getFormattedStackTrace(this.stack) : "";
  }

  // =================================== HELPER ===================================
  private _getFormattedStackTrace(stack?: string): string {
    if (stack) {
      var stackTrace = stack
        .split("\n")
        .map((line: string) => {
          return line.includes("ErrorHandler.logException") ? "" : line;
        })
        .filter(Boolean)
        .join("\n");
      return stackTrace;
    } else {
      return "";
    }
  }
}

export default class ErrorHandler implements IErrorHandler {
  private logStackTrace: boolean;

  constructor(logStackTrace: boolean = true) {
    this.logStackTrace = logStackTrace;
  }

  public logException(errorObject: unknown | Error, customErrorMessage?: string): never {
    if (errorObject instanceof Error) {
      let functionName = this._retrieveFunctionNameFromStack(errorObject);

      if (customErrorMessage) {
        throw new CustomError(ErrorMessages.customErrorWithMessage(functionName, customErrorMessage), this.logStackTrace);
      } else if (errorObject.message) {
        throw new CustomError(ErrorMessages.customErrorWithMessage(functionName, errorObject.message), this.logStackTrace);
      } else {
        throw new CustomError(ErrorMessages.customErrorWithoutMessage(functionName), this.logStackTrace);
      }
    } else {
      throw new CustomError(ErrorMessages.genericErrorMessage(), this.logStackTrace);
    }
  }

  // =================================== HELPER ===================================

  private _retrieveFunctionNameFromStack(errorObject: unknown | Error): string {
    if (errorObject instanceof Error && errorObject.stack) {
      var stackTrace = errorObject.stack.split("\n");
      const startIndex = stackTrace[1].indexOf("at") + 2;
      const endIndex = stackTrace[1].indexOf("(");
      var functionName = stackTrace[1].substring(startIndex, endIndex).trim();
      return !functionName.toLowerCase().includes("context") ? functionName : "";
    } else {
      return "";
    }
  }
}
