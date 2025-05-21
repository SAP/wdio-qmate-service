import { Comparator } from "./Comparator";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";

export class ElementPropertiesComparator {
  public static compareToProperties(elementProperties: ElementProperties, control: UI5Control): boolean {
    return Object.entries(elementProperties ?? {}).every(([key, value]) => {
      if (["domProperties", "metadata", "ancestorProperties", "descendantProperties", "siblingProperties", "mProperties"].includes(key)) {
        return true;
      }

      if (key === "viewName") {
        return ElementPropertiesComparator.isControlInViewName(control, value as string);
      }
      if (key === "viewId") {
        return ElementPropertiesComparator.isControlInViewId(control, value as string);
      }
      if (key === "id") {
        return ElementPropertiesComparator.compareId(control, value as string);
      }
      if (key === "bindingContextPath") {
        return UI5ControlHandler.getControlBindingContextPaths(control).some((path) => Comparator.compareWithWildCard(value, path));
      }

      if (Array.isArray(value)) {
        return value.every((val: any) => {
          if (typeof val === "string") {
            return ElementPropertiesComparator.compareArrayStrElements(key, val, control);
          } else {
            return ElementPropertiesComparator.compareBindingPathAndModelProperty(key, val, control);
          }
        });
      }

      if (typeof value === "object") {
        return ElementPropertiesComparator.compareBindingPathAndModelProperty(key, value, control);
      }

      return ElementPropertiesComparator.compareProperty(control, key, value);
    });
  }

  private static isControlInViewName(control: UI5Control, viewName: string): boolean {
    return this.getAncestorViews(control).some((controlToCheck) => {
      return Comparator.compareWithWildCard(viewName, controlToCheck.getViewName?.());
    });
  }

  private static isControlInViewId(control: UI5Control, sViewId: string): boolean {
    return this.getAncestorViews(control).some((controlToCheck) => {
      return Comparator.compareWithWildCard(sViewId, controlToCheck.getId());
    });
  }

  private static getAncestorViews(control: UI5Control): UI5Control[] {
    return [control].concat(UI5ControlHandler.getUI5Ancestors(control)).filter((ancestor) => {
      return ancestor instanceof sap.ui.core.mvc.View;
    });
  }

  private static compareId(control: UI5Control, expectedId: string): boolean {
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

  private static compareProperty(control: UI5Control, key: string, value: string): boolean {
    const controlVal = UI5ControlHandler.getControlProperty(control, key);
    return Comparator.compareWithWildCard(value, controlVal);
  }

  private static compareBindingPathAndModelProperty(key: string, value: any, control: UI5Control): boolean {
    const extrPath = UI5ControlHandler.extractBindingPathAndModelProperty(value);
    if (!extrPath.path) return true;

    const bindingInfo = UI5ControlHandler.getBindDataForProperty(control, key);

    return bindingInfo.some((info) => {
      if (extrPath.model && info.model) {
        return Comparator.compareWithWildCard(extrPath.model, info.model) && Comparator.compareWithWildCard(extrPath.path, info.path);
      }
      return Comparator.compareWithWildCard(extrPath.path, info.path);
    });
  }

  private static compareArrayStrElements(key: string, elemId: any, control: UI5Control): boolean {
    const values: any[] = UI5ControlHandler.getControlProperty(control, key) || [];

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
