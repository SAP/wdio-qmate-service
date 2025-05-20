import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class PrevSiblingFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }
    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before prevSiblingProperties check:", controls.length);
    const filteredControls = controls.filter((control) => {
      const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
      if (!prevControl) {
        return false;
      }
      return PropertiesFilter.filter(rawElementProperties, [prevControl]).length > 0;
    });

    LocatorDebug.debugLog("Valid ui5Controls after prevSiblingProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
