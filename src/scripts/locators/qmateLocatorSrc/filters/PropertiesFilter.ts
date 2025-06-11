import { DomPropertiesComparator } from "../comparators/DomPropertiesComparator";
import { ElementPropertiesComparator } from "../comparators/ElementPropertiesComparator";
import { MetadataComparator } from "../comparators/MetadataComparator";
import { BaseFilter } from "./BaseFilter";

export class PropertiesFilter extends BaseFilter {
  public doCheckSingle(control: UI5Control): boolean {
    let pass = MetadataComparator.compareMetadata(this.elementProperties, control);
    pass &&= ElementPropertiesComparator.compareToProperties(this.elementProperties, control);
    pass &&= DomPropertiesComparator.compareToDomProperties(this.elementProperties.domProperties, control);
    return pass;
  }
}
