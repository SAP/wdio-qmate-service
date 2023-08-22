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
  //private logStackTrace: boolean;

  constructor() {}

  public logException(errorObject: unknown | Error, customErrorMessage?: string, logStackTrace: boolean = true): never {
    if (errorObject instanceof Error) {
      let functionName = this._retrieveLastLevelFunctionNameFromStack(errorObject);

      if (customErrorMessage) {
        throw new CustomError(ErrorMessages.customErrorWithMessage(functionName, customErrorMessage), logStackTrace);
      } else if (errorObject.message) {
        let errorMessage = errorObject.message.trim();
        errorMessage = errorMessage.includes(":") ? errorMessage.substring(errorMessage.lastIndexOf(":") + 1).trim() : errorMessage;
        errorMessage = ErrorMessages.customErrorWithMessage(functionName, errorMessage);

        throw new CustomError(errorMessage, logStackTrace);
      } else {
        throw new CustomError(ErrorMessages.customErrorWithoutMessage(functionName), logStackTrace);
      }
    } else {
      throw new CustomError(ErrorMessages.genericErrorMessage(), logStackTrace);
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

  private _retrieveLastLevelFunctionNameFromStack(errorObject: unknown | Error): string {
    if (errorObject instanceof Error && errorObject.stack) {
      const regex = /\bat\s*(.+?)\(/;
      let functionName: string = "block";
      let initFunctionArray: string[] = [];

      let errorStackAfterSplit = errorObject.stack.split("\n");

      for (let i = 0, index = 0; i < errorStackAfterSplit.length; i++) {
        let matchedString = !errorStackAfterSplit[i].includes("node_modules") && errorStackAfterSplit[i].match(regex);

        if (matchedString) {
          initFunctionArray[index] = matchedString[1].trim();

          if (initFunctionArray[index].includes("anonymous")) {
            index = index - 1;
            functionName =
              index < 0
                ? functionName
                : initFunctionArray[index].includes(".")
                ? initFunctionArray[index].substring(initFunctionArray[index].indexOf(".") + 1)
                : initFunctionArray[index];
            break;
          }
          index++;
        }
      }
      return functionName;
    } else {
      return "";
    }
  }
}
