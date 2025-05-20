import { LocatorDebug } from "../utils/LocatorDebug";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class DescendantFilter extends BaseFilter {
  public doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      const parentElement = document.getElementById(control.getId?.());
      if (!parentElement) {
        return false;
      }
      const childrenControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(parentElement.children);
      for (const childControl of childrenControls) {
        if (ElementFilter.filter(elementProperties, [childControl]).length > 0) {
          return true;
        }
      }

      if (this.filter(elementProperties, childrenControls).length > 0) {
        return true;
      }
      return false;
    });
  }
}
