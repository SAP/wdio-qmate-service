import { Comparator } from "./Comparator";

export class DomPropertiesComparator {
  public static compareToDomProperties(properties: ElementProperties, control: UI5Control): boolean {
    const node = document.getElementById(control.getId?.());
    if (!properties || !node || typeof properties !== "object") {
      return true;
    }

    const nodeAttributes = DomPropertiesComparator.retrieveNodeAttributes(node);
    return Object.entries(properties).every(([key, value]) => {
      if (key === "nodeName") {
        return Comparator.compareWithWildCard(node?.nodeName, value, true);
      }
      const valueArray = Array.isArray(value) ? value : [value];
      return valueArray.some(val =>
        DomPropertiesComparator.compareAttributeToElementAttributes(key, val, nodeAttributes)
      );
    });
  }

  private static retrieveNodeAttributes(node: HTMLElement): Map<string, string> {
    return new Map(Array.from(node.attributes, a => [a.nodeName, a.nodeValue ?? ""]));
  }

  private static compareAttributeToElementAttributes(key: string, value: any, nodeAttributes: Map<string, string>): boolean {
    return Comparator.compareWithWildCard(value, nodeAttributes.get(key));
  }
}
