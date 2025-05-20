import { LocatorDebug } from "./Debug";

export class ControlFinder {
  public static retrieveUI5Controls(selector: UI5Selector): UI5Control[] {
    const nodes = this.retrieveNodesFromBody(selector) || [];
    return this.retrieveValidUI5Controls(nodes);
  }

  private static isInt(value: any): boolean {
    return !isNaN(value) && (parseFloat(value) | 0) === parseFloat(value);
  }

  private static retrieveNodesFromBody(selector: UI5Selector): Element[] {
    // build smart css selector if possible
    let cssSelector = "*";
    if (selector.elementProperties?.id) {
      if (selector.elementProperties.id.includes("*") && !selector.elementProperties.id.substring(1, selector.elementProperties.id.length - 1).includes("*")) {
        const idWithoutWildcards = selector.elementProperties.id.replaceAll("*", "");
        LocatorDebug.debugLog("shortened id is '", idWithoutWildcards, "' from '", selector.elementProperties.id, "'");
        cssSelector = `*[id*="${idWithoutWildcards}"]`;
      }
    }

    const sapBodies = Array.from(document.getElementsByClassName("sapUiBody"));
    return sapBodies.reduce((acc, body) => {
      return acc.concat(Array.from(body.querySelectorAll(cssSelector)));
    }, []);
  }

  private static retrieveValidUI5Controls(nodes: Element[]): UI5Control[] {
    return nodes.map((node) => this.getUI5Control(node.getAttribute("id"))).filter((element) => element) as UI5Control[];
  }

  public static getUI5Control(id: string | null | undefined): UI5Control | null {
    return sap.ui.core.Element.getElementById(id);
  }
}
