import { LocatorDebug } from "../utils/LocatorDebug";

export class ControlFinder {
  public static retrieveUI5Controls(selector: UI5Selector, rootElement: HTMLElement): UI5Control[] {
    const nodes = ControlFinder.retrieveNodesFromBody(selector, rootElement) || [];
    return ControlFinder.retrieveValidUI5Controls(nodes);
  }

  private static retrieveNodesFromBody(selector: UI5Selector, rootElement: HTMLElement): Element[] {
    // build smart css selector if possible
    let cssSelector = "*";
    if (selector.elementProperties?.id) {
      if (selector.elementProperties.id.includes("*") && !selector.elementProperties.id.substring(1, selector.elementProperties.id.length - 1).includes("*")) {
        const idWithoutWildcards = selector.elementProperties.id.replaceAll("*", "");
        LocatorDebug.debugLog("shortened id is '", idWithoutWildcards, "' from '", selector.elementProperties.id, "'");
        cssSelector = `*[id*="${idWithoutWildcards}"]`;
      }
    }

    if (rootElement) {
      return Array.from(rootElement.querySelectorAll(cssSelector));
    }

    const sapBodies = Array.from(document.getElementsByClassName("sapUiBody"));
    return sapBodies.reduce((acc, body) => {
      return acc.concat(Array.from(body.querySelectorAll(cssSelector)));
    }, []);
  }

  private static retrieveValidUI5Controls(nodes: Element[]): UI5Control[] {
    return nodes.map((node) => ControlFinder.getUI5Control(node.getAttribute("id"))).filter((element) => element) as UI5Control[];
  }

  public static getUI5Control(id: string | null | undefined): UI5Control | null {
    return (sap.ui.core?.Element?.getElementById||sap.ui.getCore().byId)(id);
  }
}
