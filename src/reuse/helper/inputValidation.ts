export function validateValue(value: any): void {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error("value is invalid. It must be of type 'string' or 'number'");
  }
}
