import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class DescendantFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    const parentElement = document.getElementById(control.getId?.());
    if (!parentElement) {
      return false;
    }
    const childControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(parentElement.children);
    const elementFilter = new ElementFilter();
    let foundMatch = childControls.some((childControl) => elementFilter.checkSingle(elementProperties, childControl));
    foundMatch ||= childControls.some((childControl) => this.checkSingle(elementProperties, childControl));
    return foundMatch;
  }
}
