import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class ChildFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }

    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before childProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId());
      if (!parentElement) {
        return false;
      }
      const aAllChildrenNodes = parentElement.children;
      const aValidControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(aAllChildrenNodes);
      const aChildrenControls: any[] = PropertiesFilter.filter(rawElementProperties, aValidControls);

      return aChildrenControls.length > 0;
    });
    LocatorDebug.debugLog("Valid ui5Controls after childProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
