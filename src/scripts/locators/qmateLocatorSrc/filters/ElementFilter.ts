import { LocatorDebug } from "../Debug";
import { AncestorFilter } from "./AncestorFilter";
import { DescendantFilter } from "./DescendantFilter";
import { SiblingFilter } from "./SiblingFilter";
import { PropertiesFilter } from "./PropertiesFilter";
import { ChildFilter } from "./ChildFilter";
import { ParentFilter } from "./ParentFilter";
import { PrevSiblingFilter } from "./PrevSiblingFilter";
import { NextSiblingFilter } from "./NextSiblingFilter";

export class ElementFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    // needed for backward compatibility
    let elementProperties = rawElementProperties;
    if (rawElementProperties && typeof rawElementProperties.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      } as ElementProperties;
      delete elementProperties.mProperties;
    }

    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    if (elementProperties.prevSiblingProperties || elementProperties.nextSiblingProperties || elementProperties.childProperties || elementProperties.parentProperties) {
      console.error(`The selector your provided ${JSON.stringify(elementProperties)} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`);
      throw new Error("Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties.");
    }

    LocatorDebug.beginLog("ElementFilter", controls.length);

    let filteredControls = PropertiesFilter.filter(elementProperties, controls);
    filteredControls = AncestorFilter.filter(elementProperties.ancestorProperties, filteredControls);
    filteredControls = DescendantFilter.filter(elementProperties.descendantProperties, filteredControls);
    filteredControls = SiblingFilter.filter(elementProperties.siblingProperties, filteredControls);

    LocatorDebug.endLog("ElementFilter", filteredControls.length);

    return filteredControls;
  }

  public static filterBySelector(ui5Selector: UI5Selector, controls: UI5Control[]): UI5Control[] {
    let validUi5Controls = ElementFilter.filter(ui5Selector.elementProperties, controls);
    validUi5Controls = ParentFilter.filter(ui5Selector.parentProperties, validUi5Controls);
    validUi5Controls = AncestorFilter.filter(ui5Selector.ancestorProperties, validUi5Controls);
    validUi5Controls = ChildFilter.filter(ui5Selector.childProperties, validUi5Controls);
    validUi5Controls = DescendantFilter.filter(ui5Selector.descendantProperties, validUi5Controls);
    validUi5Controls = SiblingFilter.filter(ui5Selector.siblingProperties, validUi5Controls);
    validUi5Controls = PrevSiblingFilter.filter(ui5Selector.prevSiblingProperties, validUi5Controls);
    validUi5Controls = NextSiblingFilter.filter(ui5Selector.nextSiblingProperties, validUi5Controls);
    return validUi5Controls;
  }
}
