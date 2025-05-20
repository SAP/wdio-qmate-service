import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class SiblingFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }
    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before siblingProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
      return PropertiesFilter.filter(rawElementProperties, aSiblingControls).length > 0;
    });

    LocatorDebug.debugLog("Valid ui5Controls after siblingProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
