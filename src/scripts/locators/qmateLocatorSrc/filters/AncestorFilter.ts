import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class AncestorFilter extends BaseFilter {
  public doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      return ElementFilter.filter(elementProperties, UI5ControlHandler.getUI5Ancestors(control)).length > 0;
    });
  }
}
