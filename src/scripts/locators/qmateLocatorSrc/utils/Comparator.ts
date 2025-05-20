import { UI5ControlHandler } from "../utils/UI5ControlHandler";

export class Comparator {
  private static isNullish(value: any): boolean {
    return value === null || value === undefined;
  }

  private static convertToString(value: any): string {
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

  public static compareId(control: UI5Control, expectedId: string): boolean {
    const controlID = control.getId?.();
    if (!expectedId) {
      return true;
    }
    if (controlID) {
      return Comparator.compareWithWildCard(expectedId, controlID);
    } else {
      return false;
    }
  }

  public static compareProperty(control: UI5Control, key: string, value: string): boolean {
    const controlVal = UI5ControlHandler.getControlProperty(control, key);
    if (!Comparator.isNullish(controlVal) && !Comparator.isNullish(value)) {
      return Comparator.compareWithWildCard(value, controlVal);
    } else if (Comparator.isNullish(controlVal) && value) {
      return false;
    }
    return true;
  }

  public static compareAggregation(control: UI5Control, key: string, value: any): boolean {
    const controlVal = UI5ControlHandler.getAggregationProperty(control, key);
    if (!Comparator.isNullish(controlVal) && value) {
      return Comparator.compareWithWildCard(value, controlVal);
    } else if (Comparator.isNullish(controlVal) && value) {
      return false;
    }
    return true;
  }

  public static compareAssociation(control: UI5Control, key: string, value: any): boolean {
    const controlVal = UI5ControlHandler.getAssociationProperty(control, key);
    if (!Comparator.isNullish(controlVal) && value) {
      return Comparator.compareWithWildCard(value, controlVal);
    } else if (Comparator.isNullish(controlVal) && value) {
      return false;
    }
    return true;
  }

  public static compareBindingPathAndModelProperty(key: string, value: any, control: UI5Control): boolean {
    const extrPath = UI5ControlHandler.extractBindingPathAndModelProperty(value);

    const bindingInfo = ([] as BindingInfo[])
      .concat(UI5ControlHandler.getBindDataForProperty(control, key) || [])
      .concat(UI5ControlHandler.getBindDataForAggregation(control, key) || [])
      .concat(UI5ControlHandler.getBindDataForAssociation(control, key) || []);

    if (!extrPath.path && bindingInfo.length >= 0) return true;
    if (extrPath.path && bindingInfo.length === 0) return false;

    return bindingInfo.some((info) => {
      if (extrPath.model && info.model) {
        return Comparator.compareWithWildCard(extrPath.model, info.model) && Comparator.compareWithWildCard(extrPath.path, info.path);
      }
      return Comparator.compareWithWildCard(extrPath.path, info.path);
    });
  }

  public static compareArrayStrElements(key: string, elemId: any, control: UI5Control): boolean {
    const values: any[] = UI5ControlHandler.getAssociationProperty(control, key) || UI5ControlHandler.getAggregationProperty(control, key) || UI5ControlHandler.getControlProperty(control, key) || [];

    if (!values.length && elemId) return false;
    if (!values.length && !elemId) return true;
    if (values.length && !elemId) return false;

    const elemIdStr = Comparator.convertToString(elemId).toLowerCase();

    return values.some((elem) => {
      let elemStr = elem;
      if (typeof elem === "object" && typeof elem.getId === "function") {
        elemStr = elem.getId();
      }
      elemStr = Comparator.convertToString(elemStr).toLowerCase();
      return Comparator.compareWithWildCard(elemIdStr, elemStr);
    });
  }
}
