import { Comparator } from "./Comparator";

export class DomPropertiesComparator {
  public static compareToDomProperties(properties: ElementProperties, control: UI5Control): boolean {
    const node = document.getElementById(control.getId?.());
    if (!properties || !node || typeof properties !== "object") {
      return true;
    }

    const nodeAttributes = DomPropertiesComparator.retrieveNodeAttributes(node);
    for (const [key, value] of Object.entries(properties)) {
      if (key === "nodeName") {
        const nodeName = node?.nodeName || "";
        if (nodeName.toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      } else {
        let valueArray = value;
        if (!Array.isArray(value)) {
          valueArray = [value];
        }
        for (let i = 0; i < valueArray.length; i++) {
          if (!DomPropertiesComparator.compareAttributeToElementAttributes(key, valueArray[i], nodeAttributes)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private static retrieveNodeAttributes(node: HTMLElement): Map<string, string> {
    const domProperties = new Map();
    const attributes: any[] | NamedNodeMap = node.attributes || [];
    for (let i = 0; i < attributes.length; i++) {
      domProperties.set(attributes[i].nodeName, attributes[i].nodeValue);
    }
    return domProperties;
  }

  private static compareAttributeToElementAttributes(key: string, value: any, nodeAttributes: Map<string, string>): boolean {
    if (!key || !value || !nodeAttributes) return false;
    const actualValue = nodeAttributes.get(key)?.toString();
    return Comparator.compareWithWildCard(value, actualValue);
  }
}
