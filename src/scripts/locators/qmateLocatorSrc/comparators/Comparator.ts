export class Comparator {
  // Public
  public static compareWithWildCard(sWild: string, value: any, toLowerCase: boolean = false): boolean {
    const strWild = toLowerCase ? Comparator.convertToString(sWild).trim().toLowerCase() : Comparator.convertToString(sWild).trim();
    const strValue = toLowerCase ? Comparator.convertToString(value).trim().toLowerCase() : Comparator.convertToString(value).trim();
    const regex = new RegExp("^" + strWild.replace(/[-\/\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*") + "$");
    return regex.test(strValue);
  }

  // Private
  private static convertToString(value: any): string {
    return (value ?? "").toString();
  }
}
