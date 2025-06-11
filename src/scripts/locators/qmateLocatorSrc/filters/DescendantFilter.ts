import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class DescendantFilter extends BaseFilter {
  public doCheckSingle(control: UI5Control): boolean {
    const parentElement = document.getElementById(control.getId?.());
    if (!parentElement) {
      return false;
    }
    const childControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(parentElement.children);
    const elementFilter = this.filterFactory.getInstance(ElementFilter, this.elementProperties);
    let foundMatch = childControls.some((childControl) => elementFilter.checkSingle(childControl));
    foundMatch ||= childControls.some((childControl) => this.checkSingle(childControl));
    return foundMatch;
  }
}
