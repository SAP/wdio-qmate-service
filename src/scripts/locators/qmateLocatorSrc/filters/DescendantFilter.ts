import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class DescendantFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }

    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before descendantProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId?.());
      if (!parentElement) {
        return false;
      }
      const childrenControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(parentElement.children);
      for (const childControl of childrenControls) {
        if (PropertiesFilter.filter(rawElementProperties, [childControl]).length > 0) {
          return true;
        }
      }

      if (this.filter(rawElementProperties, childrenControls).length > 0) {
        return true;
      }
      return false;
    });
    LocatorDebug.debugLog("Valid ui5Controls after descendantProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
