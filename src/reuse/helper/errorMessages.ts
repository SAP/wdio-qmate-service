export class ErrorMessages {
  public static customErrorWithMessage(functionName: string, message: string): string {
    return `Function '${functionName}' failed with: ${message}`;
  }

  public static customErrorWithoutMessage(functionName: string): string {
    return `Function '${functionName}' failed with: unknown error`;
  }

  public static genericErrorMessage(): string {
    return `Failed due to an exception in the code block`;
  }
}
