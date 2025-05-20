import { ControlFinder } from "./utils/ControlFinder";
import { UI5ControlDataInjector } from "./utils/UI5ControlDataInjector";
import { LocatorDebug } from "./utils/LocatorDebug";
import { ElementFilter } from "./filters/ElementFilter";
export class Locator {
  public static locate(ui5Selector: UI5Selector, rootElement: HTMLElement): HTMLElement[] {
    LocatorDebug.initializeLogs(ui5Selector);
    try {
      Locator.checkSelector(ui5Selector);
      Locator.checkUI5Loaded();

      const ui5Controls = ControlFinder.retrieveUI5Controls(ui5Selector, rootElement);
      const validUi5Controls = Locator.filterControlsBySelector(ui5Controls, ui5Selector);
      const resultElements = UI5ControlDataInjector.convertAndInjectDataForProperties(validUi5Controls);

      LocatorDebug.printLogs(resultElements.length);

      return resultElements;
    } catch (error: any) {
      console.error("Error in locator:", error.stack);
      throw error;
    }
  }

  private static filterControlsBySelector(controls: UI5Control[], ui5Selector: UI5Selector): UI5Control[] {
    LocatorDebug.debugLog("Total ui5Controls:", controls.length);
    const validControls = new ElementFilter().filterBySelector(ui5Selector, controls);
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
}
