import { LocatorDebug } from "../Debug";
import { ElementPropertiesComparator } from "../utils/ElementPropertiesComparator";

export class PropertiesFilter {
  public static filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || !elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }

    LocatorDebug.beginLog("PropertiesFilter", controls.length);

    const filteredControls = controls.filter((control) => {
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
    LocatorDebug.endLog("PropertiesFilter", filteredControls.length);
    return filteredControls;
  }
}
