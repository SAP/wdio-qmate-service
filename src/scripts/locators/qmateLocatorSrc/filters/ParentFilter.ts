import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { PropertiesFilter } from "./PropertiesFilter";

export class ParentFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }

    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before parentProperties check:", controls.length);

    const filteredControls = controls.filter((control) => {
      const parentControl = UI5ControlHandler.getUI5Parent(control);
      if (!parentControl) {
        console.error(`The parent control of ${control.getId()} is not valid, please check the control`);
        return false;
      }
      return PropertiesFilter.filter(rawElementProperties, [parentControl]).length > 0;
    });

    LocatorDebug.debugLog("Valid ui5Controls after parentProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
