import { DomPropertiesComparator } from "../comparators/DomPropertiesComparator";
import { ElementPropertiesComparator } from "../comparators/ElementPropertiesComparator";
import { MetadataComparator } from "../comparators/MetadataComparator";
import { BaseFilter } from "./BaseFilter";

export class PropertiesFilter extends BaseFilter {
  public _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean {
    let pass = MetadataComparator.compareMetadata(elementProperties, control);
    pass &&= ElementPropertiesComparator.compareToProperties(elementProperties, control);
    pass &&= DomPropertiesComparator.compareToDomProperties(elementProperties.domProperties, control);
    return pass;
  }
}
