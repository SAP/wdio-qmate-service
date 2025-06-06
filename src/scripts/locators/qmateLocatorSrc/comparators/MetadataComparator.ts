import { Comparator } from "./Comparator";

export class MetadataComparator {
  public static compareMetadata(elementProperties: ElementProperties, control: UI5Control): boolean {
    const controlMetadata = control.getMetadata().getName();
    const metadata = elementProperties.metadata;
    return metadata === undefined || Comparator.compareWithWildCard(metadata, controlMetadata);
  }
}
