import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class DescendantFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId?.());
      if (!parentElement) {
        return false;
      }
      const childrenControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(parentElement.children);
      for (const childControl of childrenControls) {
        if (ElementFilter.filter(elementProperties, [childControl]).length > 0) {
          return true;
        }
      }

      if (this.filter(elementProperties, childrenControls).length > 0) {
        return true;
      }
      return false;
    });
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);
    return filteredControls;
  }
}
