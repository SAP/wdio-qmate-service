import { DomPropertiesComparator } from "../comparators/DomPropertiesComparator";
import { ElementPropertiesComparator } from "../comparators/ElementPropertiesComparator";
import { MetadataComparator } from "../comparators/MetadataComparator";
import { BaseFilter } from "./BaseFilter";

export class PropertiesFilter extends BaseFilter {
  public doCheckSingle(control: UI5Control): boolean {
    const props = this.elementProperties as ElementProperties;
    let pass = MetadataComparator.compareMetadata(props, control);
    pass &&= ElementPropertiesComparator.compareToProperties(props, control);
    pass &&= DomPropertiesComparator.compareToDomProperties(props.domProperties, control);
    return pass;
  }
}
