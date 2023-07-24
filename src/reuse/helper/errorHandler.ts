import chalk from "chalk";
import { ErrorMessages } from "../helper/errorMessages";

export interface LogException {
  logException(error: Error): Promise<never>;
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError:";
    this.stack = "";
  }
}

export default class ErrorHandler implements LogException {
  private logStackTrace?: boolean;

  constructor(logStackTrace: boolean = true) {
    this.logStackTrace = logStackTrace;
  }

  public async logException(errorDetails: Error): Promise<never> {
    if (errorDetails) {
      let functionName = this._retrieveFunctionNameFromStack(errorDetails);
      let stackTrace = this._getFormattedStackTrace(errorDetails);

      stackTrace = this.logStackTrace === true ? stackTrace : "";

      if (errorDetails.message) {
        throw new CustomError(ErrorMessages.customErrorWithMessage(functionName, errorDetails.message) + "\n" + stackTrace);
      } else {
        throw new CustomError(ErrorMessages.customErrorWithoutMessage(functionName) + "\n" + stackTrace);
      }
    } else {
      throw new CustomError(chalk.red(ErrorMessages.genericErrorMessage()));
    }
  }

  // =================================== HELPER ===================================

  private _retrieveFunctionNameFromStack(errorDetails: Error): string {
    if (errorDetails.stack) {
      var stack = errorDetails.stack.split("\n");
      const startIndex = stack[1].indexOf("at") + 2;
      const endIndex = stack[1].indexOf("(");
      var functionName = stack[1].substring(startIndex, endIndex).trim();
      return !functionName.toLowerCase().includes("context") ? functionName : "";
    }
    return "";
  }

  private _getFormattedStackTrace(errorDetails: Error): string {
    if (errorDetails.stack) {
      var stack = errorDetails.stack
        .split("\n")
        .map((line: string) => line.replace(/\s+at\s+/, ""))
        .slice(1)
        .join("\n");
      return stack;
    }
    return "";
  }
}
