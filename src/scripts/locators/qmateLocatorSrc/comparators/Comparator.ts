export class Comparator {
  public static convertToString(value: any): string {
    return (value ?? "").toString();
  }

  public static compareWithWildCard(sWild: string, value: any, toLowerCase: boolean = false): boolean {
    const strWild = toLowerCase ? Comparator.convertToString(sWild).trim().toLowerCase() : Comparator.convertToString(sWild).trim();
    const strValue = toLowerCase ? Comparator.convertToString(value).trim().toLowerCase() : Comparator.convertToString(value).trim();
    const regexStr = "^" + strWild.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, ".*") + "$";
    const regex = new RegExp(regexStr);
    return regex.test(strValue);
  }
}
