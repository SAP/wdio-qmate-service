import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class AncestorFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = controls.filter((control) => {
      return ElementFilter.filter(elementProperties, UI5ControlHandler.getUI5Ancestors(control)).length > 0;
    });
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }
}
