import { FilterFactory } from "../utils/FilterFactory";
import { LocatorDebug } from "../utils/LocatorDebug";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class PrevSiblingFilter extends BaseFilter {
  public _doCheckSingle(control: UI5Control): boolean {
    const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
    if (!prevControl) {
      return false;
    }
    return this.filterFactory.getInstance(ElementFilter, this.elementProperties).checkSingle(prevControl);
  }
}
