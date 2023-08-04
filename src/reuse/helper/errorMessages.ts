export class ErrorMessages {
  public static numberFormatErrorMessage(functionName: string): string {
    return `Error: Function '${functionName}' failed with : Please provide the input as number`;
  }

  public static fileNotFoundErrorMessage(functionName: string): string {
    return `Error: Function '${functionName}' failed with : Please provide the file path along with proper file extension`;
  }

  public static customErrorWithMessage(functionName: string, message: string): string {
    return `Error: Function '${functionName}' failed with : ${message}`;
  }

  public static customErrorWithoutMessage(functionName: string): string {
    return `Error: Function '${functionName}' failed with unknown error`;
  }

  public static genericErrorMessage(): string {
    return `Error: Failed due to the exception occurred at the block`;
  }
}
