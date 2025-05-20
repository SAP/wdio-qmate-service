import { DomPropertiesComparator } from "../comparators/DomPropertiesComparator";
import { ElementPropertiesComparator } from "../comparators/ElementPropertiesComparator";
import { MetadataComparator } from "../comparators/MetadataComparator";
import { BaseFilter } from "./BaseFilter";

export class PropertiesFilter extends BaseFilter {
  public _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => {
      if (!control || !MetadataComparator.compareMetadata(elementProperties, control) || !ElementPropertiesComparator.compareToProperties(elementProperties, control) || !DomPropertiesComparator.compareToDomProperties(elementProperties.domProperties, control)) {
        return false;
      }
      return true;
    });
  }
}
