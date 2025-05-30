import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class ChildFilter extends BaseFilter {
  public _doCheckSingle(control: UI5Control): boolean {
    const element = document.getElementById(control.getId());
    if (!element) {
      return false;
    }
    const childControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(element.children);
    const elementFilter = this.filterFactory.getInstance(ElementFilter, this.elementProperties);
    return childControls.some((childControl) => elementFilter.checkSingle(childControl));
  }
}
