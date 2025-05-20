import { Comparator } from "../Comparator";
import { UI5ControlHandler } from "../UI5ControlHandler";
import { ElementPropertiesViewUtils } from "./ElementPropertiesViewUtils";

// --- Comparator and Utility helpers ---

export class ElementPropertiesComparator {
  public static compareMetadata(elementProperties: ElementProperties, control: UI5Control): boolean {
    if (!elementProperties?.metadata) {
      return true;
    }

    const controlMetadata = control.getMetadata().getName();
    const metadata = elementProperties.metadata;
    if (controlMetadata && metadata) {
      return Comparator.compareWithWildCard(metadata, controlMetadata);
    } else {
      return false;
    }
  }

  public static compareToDomProperties(control: UI5Control, properties: ElementProperties): boolean {
    const node = document.getElementById(control.getId?.());
    if (!properties || !node || typeof properties !== "object") {
      return true;
    }

    const nodeAttributes = ElementPropertiesComparator.retrieveNodeAttributes(node);
    for (const [key, value] of Object.entries(properties)) {
      if (!value) {
        return false;
      }
      if (key === "nodeName") {
        const nodeName = node?.nodeName || "";
        if (nodeName.toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      } else {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (!ElementPropertiesComparator.compareAttributeToElementAttributes(key, value[i], nodeAttributes)) {
              return false;
            }
          }
        } else {
          if (!ElementPropertiesComparator.compareAttributeToElementAttributes(key, value, nodeAttributes)) {
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

  public static compareToProperties(elementProperties: ElementProperties, control: UI5Control): boolean {
    if (!elementProperties) {
      return true;
    }
    for (const [key, value] of Object.entries(elementProperties)) {
      if (["domProperties", "metadata", "ancestorProperties", "descendantProperties", "siblingProperties", "mProperties"].includes(key)) {
        continue;
      }

      if (Array.isArray(value)) {
        const isStringVal = typeof value[0] === "string";
        for (const valData of value) {
          if ((isStringVal && !Comparator.compareArrayStrElements(key, valData, control)) || (!isStringVal && !Comparator.compareBindingPathAndModelProperty(key, valData, control))) {
            return false;
          }
        }
      } else if (typeof value === "object") {
        if (!Comparator.compareBindingPathAndModelProperty(key, value, control)) {
          return false;
        }
      } else if (key === "viewName") {
        if (!ElementPropertiesViewUtils.isControlInViewName(control, value as string)) {
          return false;
        }
      } else if (key === "viewId") {
        if (!ElementPropertiesViewUtils.isControlInViewId(control, value as string)) {
          return false;
        }
      } else if (key === "id") {
        if (!Comparator.compareId(control, value as string)) {
          return false;
        }
      } else if (key === "bindingContextPath") {
        const aPaths = UI5ControlHandler.getControlBindingContextPaths(control);
        let bFound = false;
        for (let i = 0; i < aPaths.length; i++) {
          if (aPaths[i] && value && Comparator.compareWithWildCard(value, aPaths[i])) {
            bFound = true;
            break;
          }
        }
        if (!bFound) {
          return false;
        }
      } else if (!Comparator.compareProperty(control, key, value) && !Comparator.compareAggregation(control, key, value) && !Comparator.compareAssociation(control, key, value)) {
        return false;
      }
    }
    return true;
  }
}
