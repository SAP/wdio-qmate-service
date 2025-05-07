import { ErrorMessages } from "../helper/errorMessages";

export interface IErrorHandler {
  logException(error: unknown | Error, customErrorMessage?: string): Promise<never>;
}

enum Modules {
  Node_modules = "node_modules",
  Node = "node",
  Mocha = "mocha"
}

export class QmateError extends Error {
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
  public logException(errorObject: unknown | Error, customErrorMessage?: string, logStackTrace: boolean = true): never {
    if (errorObject instanceof Error) {
      let functionName = this._retrieveLastLevelFunctionNameFromStack(errorObject);

      if (customErrorMessage) {
        let errorMessage = ErrorMessages.customErrorWithMessage(functionName, this._formatStackMessage(customErrorMessage));
        throw new QmateError(errorMessage, logStackTrace);
      } else if (errorObject.message) {
        let errorMessage = ErrorMessages.customErrorWithMessage(functionName, this._formatStackMessage(errorObject.message));
        throw new QmateError(errorMessage, logStackTrace);
      } else {
        throw new QmateError(ErrorMessages.customErrorWithoutMessage(functionName), logStackTrace);
      }
    } else {
      throw new QmateError(ErrorMessages.genericErrorMessage(), logStackTrace);
    }
  }

  // =================================== HELPER ===================================

  private _retrieveLastLevelFunctionNameFromStack(errorObject: unknown | Error): string {
    if (errorObject instanceof Error && errorObject.stack) {
      const regex = /\bat\s*(.+?)\(/;
      let functionName: string = "block";
      let initFunctionArray: string[] = [];

      let errorStackAfterSplit = errorObject.stack.split("\n");

      for (let i = 0, index = 0; i < errorStackAfterSplit.length; i++) {
        let matchedString = !this._isThirdPartyModuleIncludedInStack(errorStackAfterSplit[i]) && errorStackAfterSplit[i].match(regex);

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
          }
          index++;
        }
      }
      return functionName;
    } else {
      return "";
    }
  }

  private _isThirdPartyModuleIncludedInStack(line: string): boolean {
    if (line) {
      let module = Object.values(Modules);
      for (let i = 0; i < module.length; i++) {
        if (line.toLowerCase().trim().includes(module[i])) {
          return true;
        }
      }
    }
    return false;
  }

  private _formatStackMessage(errorMessage: string): string {
    errorMessage = errorMessage.trim();
    return errorMessage.match(/\b(Function|function)\s*'([a-zA-Z_-]*)'\s*failed with\s*\b:/)
      ? errorMessage.replaceAll(errorMessage.substring(0, errorMessage.indexOf(":") + 1), "").trim()
      : errorMessage;
  }
}
