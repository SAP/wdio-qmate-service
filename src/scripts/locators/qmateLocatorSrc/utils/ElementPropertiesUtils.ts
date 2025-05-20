export class ElementPropertiesUtils {
  public static undefinedOrEmptyObject(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }
}
