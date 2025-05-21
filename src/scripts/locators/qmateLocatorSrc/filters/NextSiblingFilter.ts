import { FilterFactory } from "../utils/FilterFactory";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class NextSiblingFilter extends BaseFilter {
  public _doCheckSingle(control: UI5Control): boolean {
    const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
    if (!nextControl) {
      return false;
    }
    return this.filterFactory.getInstance(ElementFilter, this.elementProperties).checkSingle(nextControl);
  }
}
