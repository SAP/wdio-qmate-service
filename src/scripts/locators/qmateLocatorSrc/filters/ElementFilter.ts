import { AncestorFilter } from "./AncestorFilter";
import { DescendantFilter } from "./DescendantFilter";
import { SiblingFilter } from "./SiblingFilter";
import { PropertiesFilter } from "./PropertiesFilter";
import { ChildFilter } from "./ChildFilter";
import { ParentFilter } from "./ParentFilter";
import { PrevSiblingFilter } from "./PrevSiblingFilter";
import { NextSiblingFilter } from "./NextSiblingFilter";
import { BaseFilter } from "./BaseFilter";
import { FilterFactory } from "../utils/FilterFactory";

export class ElementFilter extends BaseFilter {
  protected _doFiltering(controls: UI5Control[]): UI5Control[] {
    this.checkElementProperties();

    let filteredControls = this.filterFactory.getInstance(PropertiesFilter, this.elementProperties).filter(controls);
    filteredControls = this.filterFactory.getInstance(AncestorFilter, this.elementProperties?.ancestorProperties).filter(filteredControls);
    filteredControls = this.filterFactory.getInstance(DescendantFilter, this.elementProperties?.descendantProperties).filter(filteredControls);
    filteredControls = this.filterFactory.getInstance(SiblingFilter, this.elementProperties?.siblingProperties).filter(filteredControls);
    return filteredControls;
  }

  public _doCheckSingle(control: UI5Control): boolean {
    this.checkElementProperties();

    let pass = this.filterFactory.getInstance(PropertiesFilter, this.elementProperties).checkSingle(control);
    pass &&= this.filterFactory.getInstance(AncestorFilter, this.elementProperties?.ancestorProperties).checkSingle(control);
    pass &&= this.filterFactory.getInstance(DescendantFilter, this.elementProperties?.descendantProperties).checkSingle(control);
    pass &&= this.filterFactory.getInstance(SiblingFilter, this.elementProperties?.siblingProperties).checkSingle(control);
    return pass;
  }

  private checkElementProperties(): void {
    if (this.elementProperties?.prevSiblingProperties || this.elementProperties?.nextSiblingProperties || this.elementProperties?.childProperties || this.elementProperties?.parentProperties) {
      console.error(`The selector your provided ${JSON.stringify(this.elementProperties)} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`);
      throw new Error("Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties.");
    }
  }

  public static filterBySelector(ui5Selector: UI5Selector, controls: UI5Control[]): UI5Control[] {
    const filterFactory = new FilterFactory();
    let validUi5Controls = filterFactory.getInstance(ElementFilter, ui5Selector.elementProperties).filter(controls);
    validUi5Controls = filterFactory.getInstance(ParentFilter, ui5Selector.parentProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(AncestorFilter, ui5Selector.ancestorProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(ChildFilter, ui5Selector.childProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(DescendantFilter, ui5Selector.descendantProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(SiblingFilter, ui5Selector.siblingProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(PrevSiblingFilter, ui5Selector.prevSiblingProperties).filter(validUi5Controls);
    validUi5Controls = filterFactory.getInstance(NextSiblingFilter, ui5Selector.nextSiblingProperties).filter(validUi5Controls);
    return validUi5Controls;
  }
}
