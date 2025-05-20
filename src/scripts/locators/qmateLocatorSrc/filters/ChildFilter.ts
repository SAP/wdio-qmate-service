import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class ChildFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = controls.filter((control) => {
      const parentElement = document.getElementById(control.getId());
      if (!parentElement) {
        return false;
      }
      const aAllChildrenNodes = parentElement.children;
      const aValidControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(aAllChildrenNodes);
      const aChildrenControls: any[] = ElementFilter.filter(elementProperties, aValidControls);

      return aChildrenControls.length > 0;
    });
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);
    return filteredControls;
  }
}
