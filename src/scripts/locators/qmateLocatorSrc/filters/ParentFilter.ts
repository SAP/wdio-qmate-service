import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class ParentFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    const parentControl = UI5ControlHandler.getUI5Parent(control);
    if (!parentControl) {
      console.error(`The parent control of ${control.getId()} is not valid, please check the control`);
      return false;
    }
    return new ElementFilter().checkSingle(elementProperties, parentControl);
  }
}
