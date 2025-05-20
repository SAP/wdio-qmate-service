import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class NextSiblingFilter extends BaseFilter {
  public _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      const nextControl = UI5ControlHandler.findPrevNextControl(control, true);
      if (!nextControl) {
        return false;
      }
      return new ElementFilter().filter(elementProperties, [nextControl]).length > 0;
    });
  }
}
