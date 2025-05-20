import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class NextSiblingFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = controls.filter((control) => {
      const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
      if (!nextControl) {
        return false;
      }
      return ElementFilter.filter(elementProperties, [nextControl]).length > 0;
    });
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);
    return filteredControls;
  }
}
