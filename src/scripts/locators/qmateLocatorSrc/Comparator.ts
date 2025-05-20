import { UI5ControlHandler } from "./UI5ControlHandler";

export class Comparator {
  private static isNullish(value: any): boolean {
    return value === null || value === undefined;
  }

  private static convertToString(value: any): string {
    if (this.isNullish(value)) {
      return "";
    }
    return value.toString();
  }

  public static compareWithWildCard(sWild: string, value: any): boolean {
    if (this.isNullish(sWild) && this.isNullish(value)) return true;

    const strWild = this.convertToString(sWild).trim();
    const strValue = this.convertToString(value);

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
      return this.compareWithWildCard(expectedId, controlID);
    } else {
      return false;
    }
  }

  public static compareProperty(control: UI5Control, key: string, value: string): boolean {
    const controlVal = UI5ControlHandler.getControlProperty(control, key);
    if (!this.isNullish(controlVal) && !this.isNullish(value)) {
      return Comparator.compareWithWildCard(value, controlVal);
    } else if (this.isNullish(controlVal) && value) {
      return false;
    }
    return true;
  }

  public static compareAggregation(control: UI5Control, key: string, value: any): boolean {
    const controlVal = UI5ControlHandler.getAggregationProperty(control, key);
    if (!this.isNullish(controlVal) && value) {
      return this.compareWithWildCard(value, controlVal);
    } else if (this.isNullish(controlVal) && value) {
      return false;
    }
    return true;
  }

  public static compareAssociation(control: UI5Control, key: string, value: any): boolean {
    const controlVal = UI5ControlHandler.getAssociationProperty(control, key);
    if (!this.isNullish(controlVal) && value) {
      return this.compareWithWildCard(value, controlVal);
    } else if (this.isNullish(controlVal) && value) {
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
        return this.compareWithWildCard(extrPath.model, info.model) && this.compareWithWildCard(extrPath.path, info.path);
      }
      return this.compareWithWildCard(extrPath.path, info.path);
    });
  }

  public static compareArrayStrElements(key: string, elemId: any, control: UI5Control): boolean {
    const values: any[] = UI5ControlHandler.getAssociationProperty(control, key) || UI5ControlHandler.getAggregationProperty(control, key) || UI5ControlHandler.getControlProperty(control, key) || [];

    if (!values.length && elemId) return false;
    if (!values.length && !elemId) return true;
    if (values.length && !elemId) return false;

    const elemIdStr = this.convertToString(elemId).toLowerCase();

    return values.some((elem) => {
      let elemStr = elem;
      if (typeof elem === "object" && typeof elem.getId === "function") {
        elemStr = elem.getId();
      }
      elemStr = this.convertToString(elemStr).toLowerCase();
      return this.compareWithWildCard(elemIdStr, elemStr);
    });
  }
}
