import { LocatorDebug } from "../Debug";
import { ElementPropertiesUtils } from "../utils/ElementPropertiesUtils";
import { AncestorFilter } from "./AncestorFilter";
import { DescendantFilter } from "./DescendantFilter";
import { SiblingFilter } from "./SiblingFilter";
import { ElementPropertiesComparator } from "../utils/ElementPropertiesComparator";

export class PropertiesFilter {
  public static filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!rawElementProperties || ElementPropertiesUtils.undefinedOrEmptyObject(rawElementProperties) || controls.length === 0) {
      return controls;
    }

    LocatorDebug.indent(true);
    LocatorDebug.debugLog("Valid ui5Controls before initial elementProperties check:", controls.length);

    // needed for backward compatibility
    let elementProperties = rawElementProperties;
    if (typeof rawElementProperties.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      };
      delete elementProperties.mProperties;
    }

    if (elementProperties.prevSiblingProperties || elementProperties.nextSiblingProperties || elementProperties.childProperties || elementProperties.parentProperties) {
      console.error(`The selector your provided ${JSON.stringify(elementProperties)} contains childProperties, parentProperties, prevSiblingProperties or nextSiblingProperties, please provide a valid selector without these properties`);
      throw new Error("Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties.");
    }

    let filteredControls = controls.filter((control) => {
      if (!control) {
        return false;
      }
      if (!ElementPropertiesComparator.compareMetadata(elementProperties, control)) {
        return false;
      }
      if (!ElementPropertiesComparator.compareToProperties(elementProperties, control)) {
        return false;
      }
      if (!ElementPropertiesComparator.compareToDomProperties(control, elementProperties.domProperties)) {
        return false;
      }
      return true;
    });

    LocatorDebug.debugLog("Valid ui5Controls after initial elementProperties check:", filteredControls.length);

    filteredControls = AncestorFilter.filter(elementProperties.ancestorProperties, filteredControls);

    filteredControls = DescendantFilter.filter(elementProperties.descendantProperties, filteredControls);

    filteredControls = SiblingFilter.filter(elementProperties.siblingProperties, filteredControls);
    LocatorDebug.debugLog("Valid ui5Controls after extended elementProperties check:", filteredControls.length);
    LocatorDebug.indent(false);
    return filteredControls;
  }
}
