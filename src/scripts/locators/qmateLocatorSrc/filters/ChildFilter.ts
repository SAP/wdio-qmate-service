import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class ChildFilter extends BaseFilter {
  public _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      const parentElement = document.getElementById(control.getId());
      if (!parentElement) {
        return false;
      }
      const aAllChildrenNodes = parentElement.children;
      const aValidControls = UI5ControlHandler.retrieveValidUI5ControlsSubElements(aAllChildrenNodes);
      const aChildrenControls: any[] = new ElementFilter().filter(elementProperties, aValidControls);

      return aChildrenControls.length > 0;
    });
  }
}
