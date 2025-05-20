import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class PrevSiblingFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = controls.filter((control) => {
      const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
      if (!prevControl) {
        return false;
      }
      return ElementFilter.filter(elementProperties, [prevControl]).length > 0;
    });
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);
    return filteredControls;
  }
}
