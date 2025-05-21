import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class AncestorFilter extends BaseFilter {
  public _doCheckSingle(control: UI5Control): boolean {
    const ancestors = UI5ControlHandler.getUI5Ancestors(control);
    const elementFilter = this.filterFactory.getInstance(ElementFilter, this.elementProperties);
    return ancestors.some((ancestor) => elementFilter.checkSingle(ancestor));
  }
}
