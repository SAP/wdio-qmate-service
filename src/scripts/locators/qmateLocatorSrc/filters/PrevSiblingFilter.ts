import { LocatorDebug } from "../utils/LocatorDebug";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class PrevSiblingFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
    if (!prevControl) {
      return false;
    }
    return new ElementFilter().checkSingle(elementProperties, prevControl);
  }
}
