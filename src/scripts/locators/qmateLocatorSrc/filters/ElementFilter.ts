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
  protected doFiltering(controls: UI5Control[]): UI5Control[] {
    this.checkElementProperties();
    const props = this.elementProperties as ElementProperties;
    let filteredControls = this.filterFactory.getInstance(PropertiesFilter, props).filter(controls);
    filteredControls = this.filterFactory.getInstance(AncestorFilter, props.ancestorProperties).filter(filteredControls);
    filteredControls = this.filterFactory.getInstance(DescendantFilter, props.descendantProperties).filter(filteredControls);
    filteredControls = this.filterFactory.getInstance(SiblingFilter, props.siblingProperties).filter(filteredControls);
    return filteredControls;
  }

  public doCheckSingle(control: UI5Control): boolean {
    this.checkElementProperties();
    const props = this.elementProperties as ElementProperties;
    let pass = this.filterFactory.getInstance(PropertiesFilter, props).checkSingle(control);
    pass &&= this.filterFactory.getInstance(AncestorFilter, props.ancestorProperties).checkSingle(control);
    pass &&= this.filterFactory.getInstance(DescendantFilter, props.descendantProperties).checkSingle(control);
    pass &&= this.filterFactory.getInstance(SiblingFilter, props.siblingProperties).checkSingle(control);
    return pass;
  }

  private checkElementProperties(): void {
    const props = this.elementProperties as ElementProperties;
    if (props?.prevSiblingProperties || props?.nextSiblingProperties || props?.childProperties || props?.parentProperties) {
      console.error(`The selector your provided ${JSON.stringify(props)} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`);
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
