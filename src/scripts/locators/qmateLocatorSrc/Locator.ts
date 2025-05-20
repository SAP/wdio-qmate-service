import { ControlFinder } from "./ControlFinder";
import { UI5ControlDataInjector } from "./UI5ControlDataInjector";
import { LocatorDebug } from "./Debug";
import { ElementFilter } from "./filters/ElementFilter";
export class Locator {
  public static locate(ui5Selector: UI5Selector): HTMLElement[] {
    LocatorDebug.initializeLogs(ui5Selector);
    try {
      this.checkSelector(ui5Selector);
      this.checkUI5Loaded();

      const ui5Controls = ControlFinder.retrieveUI5Controls(ui5Selector);
      const validUi5Controls = this.filterControlsBySelector(ui5Controls, ui5Selector);
      const resultElements = this.convertControlsToHTMLElements(validUi5Controls);
      LocatorDebug.printLogs(resultElements.length);

      return resultElements;
    } catch (error: any) {
      console.error("Error in locator:", error.stack);
      throw error;
    }
  }

  private static filterControlsBySelector(controls: UI5Control[], ui5Selector: UI5Selector): UI5Control[] {
    LocatorDebug.debugLog("Total ui5Controls:", controls.length);
    const validControls = ElementFilter.filterBySelector(ui5Selector, controls);
    LocatorDebug.debugLog("Valid ui5Controls:", validControls.length);
    return validControls;
  }

  private static checkSelector(ui5Selector: UI5Selector): void {
    if (!ui5Selector) {
      console.error(`The selector your provided ${ui5Selector} is undefined/null, please provide a valid selector`);
      throw new Error(`The selector your provided ${ui5Selector} is undefined/null, please provide a valid selector`);
    }

    if (!ui5Selector.elementProperties) {
      console.error(`The selector your provided ${JSON.stringify(ui5Selector)} does not contain elementProperties, please provide a valid selector with elementProperties`);
      throw new Error(`The selector your provided ${JSON.stringify(ui5Selector)} does not contain elementProperties, please provide a valid selector with elementProperties`);
    }
  }

  private static checkUI5Loaded() {
    if (!sap.ui?.getCore?.()) {
      console.error("This is not an UI5 App, please use other locators");
      throw new Error("This is not an UI5 App, please use other locators");
    }
  }

  private static convertControlsToHTMLElements(controls: UI5Control[]) {
    return controls
      .map((control) => {
        const domElement = document.getElementById(control.getId?.());
        UI5ControlDataInjector.injectDataForProperties(domElement, control);
        return domElement;
      })
      .filter(Boolean) as HTMLElement[];
  }
}
