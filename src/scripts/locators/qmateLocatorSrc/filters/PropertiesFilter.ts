import { ElementPropertiesComparator } from "../utils/ElementPropertiesComparator";
import { BaseFilter } from "./BaseFilter";

export class PropertiesFilter extends BaseFilter {
  public doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
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
  }
}
