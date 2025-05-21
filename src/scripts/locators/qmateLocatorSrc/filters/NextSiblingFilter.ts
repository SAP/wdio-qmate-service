import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class NextSiblingFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
    if (!nextControl) {
      return false;
    }
    return new ElementFilter().checkSingle(elementProperties, nextControl);
  }
}
