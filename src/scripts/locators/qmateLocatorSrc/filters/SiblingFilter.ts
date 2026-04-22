import { UI5ControlHandler } from "../utils/UI5ControlHandler";
import { BaseFilter } from "./BaseFilter";
import { ElementFilter } from "./ElementFilter";

export class SiblingFilter extends BaseFilter {
  public doCheckSingle(control: UI5Control): boolean {
    if (Array.isArray(this.elementProperties)) {
      return this.elementProperties.every((props) => {
        return this.filterFactory.getInstance(SiblingFilter, props).checkSingle(control);
      });
    }
    const aSiblingControls = UI5ControlHandler.findSiblingControls(control);
    const elementFilter = this.filterFactory.getInstance(ElementFilter, this.elementProperties);
    return aSiblingControls.some((siblingControl) => elementFilter.checkSingle(siblingControl));
  }
}
