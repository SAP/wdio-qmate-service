import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class SiblingFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
    const elementFilter = new ElementFilter();
    return aSiblingControls.some((siblingControl) => elementFilter.checkSingle(elementProperties, siblingControl));
  }
}
