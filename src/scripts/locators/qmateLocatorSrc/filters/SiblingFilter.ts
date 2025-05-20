import { LocatorDebug } from "../Debug";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementFilter } from "./ElementFilter";

export class SiblingFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    LocatorDebug.beginLog("SiblingFilter", controls.length);
    const filteredControls = controls.filter((control) => {
      const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
      return ElementFilter.filter(elementProperties, aSiblingControls).length > 0;
    });
    LocatorDebug.endLog("SiblingFilter", filteredControls.length);

    return filteredControls;
  }
}
