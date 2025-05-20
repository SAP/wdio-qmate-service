import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class SiblingFilter extends BaseFilter {
  public _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
      return new ElementFilter().filter(elementProperties, aSiblingControls).length > 0;
    });
  }
}
