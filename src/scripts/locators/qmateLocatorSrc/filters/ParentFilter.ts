import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class ParentFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    LocatorDebug.beginLog("ParentFilter", controls.length);
    const filteredControls = controls.filter((control) => {
      const parentControl = UI5ControlHandler.getUI5Parent(control);
      if (!parentControl) {
        console.error(`The parent control of ${control.getId()} is not valid, please check the control`);
        return false;
      }
      return ElementFilter.filter(elementProperties, [parentControl]).length > 0;
    });
    LocatorDebug.endLog("ParentFilter", filteredControls.length);
    return filteredControls;
  }
}
