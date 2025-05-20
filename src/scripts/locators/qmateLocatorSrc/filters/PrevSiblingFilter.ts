import { LocatorDebug } from "../utils/LocatorDebug";
import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class PrevSiblingFilter extends BaseFilter {
  public doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      const prevControl = UI5ControlHandler.findPrevNextControl(control, false);
      if (!prevControl) {
        return false;
      }
      return ElementFilter.filter(elementProperties, [prevControl]).length > 0;
    });
  }
}
