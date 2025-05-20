import { LocatorDebug } from "../utils/LocatorDebug";
import { AncestorFilter } from "./AncestorFilter";
import { DescendantFilter } from "./DescendantFilter";
import { SiblingFilter } from "./SiblingFilter";
import { PropertiesFilter } from "./PropertiesFilter";
import { ChildFilter } from "./ChildFilter";
import { ParentFilter } from "./ParentFilter";
import { PrevSiblingFilter } from "./PrevSiblingFilter";
import { NextSiblingFilter } from "./NextSiblingFilter";
import { BaseFilter } from "./BaseFilter";

export class ElementFilter extends BaseFilter {
  public _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    if (elementProperties.prevSiblingProperties || elementProperties.nextSiblingProperties || elementProperties.childProperties || elementProperties.parentProperties) {
      console.error(`The selector your provided ${JSON.stringify(elementProperties)} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`);
      throw new Error("Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties.");
    }

    let filteredControls = new PropertiesFilter().filter(elementProperties, controls);
    filteredControls = new AncestorFilter().filter(elementProperties.ancestorProperties, filteredControls);
    filteredControls = new DescendantFilter().filter(elementProperties.descendantProperties, filteredControls);
    filteredControls = new SiblingFilter().filter(elementProperties.siblingProperties, filteredControls);
    return filteredControls;
  }

  public filterBySelector(ui5Selector: UI5Selector, controls: UI5Control[]): UI5Control[] {
    let validUi5Controls = this.filter(ui5Selector.elementProperties, controls);
    validUi5Controls = new ParentFilter().filter(ui5Selector.parentProperties, validUi5Controls);
    validUi5Controls = new AncestorFilter().filter(ui5Selector.ancestorProperties, validUi5Controls);
    validUi5Controls = new ChildFilter().filter(ui5Selector.childProperties, validUi5Controls);
    validUi5Controls = new DescendantFilter().filter(ui5Selector.descendantProperties, validUi5Controls);
    validUi5Controls = new SiblingFilter().filter(ui5Selector.siblingProperties, validUi5Controls);
    validUi5Controls = new PrevSiblingFilter().filter(ui5Selector.prevSiblingProperties, validUi5Controls);
    validUi5Controls = new NextSiblingFilter().filter(ui5Selector.nextSiblingProperties, validUi5Controls);
    return validUi5Controls;
  }
}
