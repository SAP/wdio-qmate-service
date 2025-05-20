import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class AncestorFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }
    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before  ancestorProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      return PropertiesFilter.filter(rawElementProperties, UI5ControlHandler.getUI5Ancestors(control)).length > 0;
    });

    LocatorDebug.debugLog("Valid ui5Controls after ancestorProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
