export class Comparator {
  public static isNullish(value: any): boolean {
    return value === null || value === undefined;
  }

  public static convertToString(value: any): string {
    if (Comparator.isNullish(value)) {
      return "";
    }
    return value.toString();
  }

  public static compareWithWildCard(sWild: string, value: any): boolean {
    if (Comparator.isNullish(sWild) && Comparator.isNullish(value)) return true;

    const strWild = Comparator.convertToString(sWild).trim();
    const strValue = Comparator.convertToString(value);

    if (!strWild || !strWild.includes("*")) {
      return strWild === strValue;
    }

    const wildParts = strWild.split("*").filter(Boolean);
    let lastIndex = 0;

    for (const part of wildParts) {
      const idx = strValue.indexOf(part, lastIndex);
      if (idx === -1) return false;
      lastIndex = idx + part.length;
    }

    return true;
  }
}
