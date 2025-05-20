import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class NextSiblingFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }
    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before nextSiblingProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
      if (!nextControl) {
        return false;
      }
      return PropertiesFilter.filter(rawElementProperties, [nextControl]).length > 0;
    });

    LocatorDebug.debugLog("Valid ui5Controls after nextSiblingProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
