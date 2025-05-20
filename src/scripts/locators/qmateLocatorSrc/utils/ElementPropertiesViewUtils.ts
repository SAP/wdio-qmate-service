import { Comparator } from "./Comparator";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";

export class ElementPropertiesViewUtils {
  public static isControlInViewName(control: UI5Control | undefined, viewName: string): boolean {
    if (!control || !sap.ui.core.mvc.View) {
      return false;
    }

    const controlsToCheck = [control].concat(UI5ControlHandler.getUI5Ancestors(control));
    for (const controlToCheck of controlsToCheck) {
      if (
        controlToCheck instanceof sap.ui.core.mvc.View &&
        // @ts-ignore
        Comparator.compareWithWildCard(viewName, controlToCheck.getViewName())
      ) {
        return true;
      }
    }
    return false;
  }

  public static isControlInViewId(control: UI5Control | undefined, sViewId: string): boolean {
    if (!control || !sap.ui.core.mvc.View) {
      return false;
    }

    const controlsToCheck = [control].concat(UI5ControlHandler.getUI5Ancestors(control));
    for (const controlToCheck of controlsToCheck) {
      if (controlToCheck instanceof sap.ui.core.mvc.View && Comparator.compareWithWildCard(sViewId, controlToCheck.getId())) {
        return true;
      }
    }
    return false;
  }
}
