import { ControlFinder } from "./ControlFinder";
import { UI5ControlDataInjector } from "./UI5ControlDataInjector";
import { LocatorDebug } from "./Debug";
import { ElementFilter } from "./filters/ElementFilter";
export class Locator {
  public static locate(ui5Selector: UI5Selector, index: any, opt_parentElement: HTMLElement): HTMLElement[] {
    LocatorDebug.initializeLogs(ui5Selector);
    try {
      this.checkSelector(ui5Selector);

      // Check if the UI5 library is loaded
      if (!sap.ui?.getCore?.()) {
        console.error("This is not an UI5 App, please use other locators");
        throw new Error("This is not an UI5 App, please use other locators");
      }

      const ui5Controls = ControlFinder.retrieveUI5Controls(ui5Selector, index, opt_parentElement);
      LocatorDebug.debugLog("Total ui5Controls:", ui5Controls.length);
      const validUi5Controls = this.checkControls(ui5Controls, ui5Selector);
      LocatorDebug.debugLog("Valid ui5Controls:", validUi5Controls.length);

      const resultElements = this.filterByIndex(validUi5Controls, index)
        .map((control) => {
          const domElement = document.getElementById(control.getId?.());
          UI5ControlDataInjector.injectDataForProperties(domElement, control);
          return domElement;
        })
        .filter((element) => element) as HTMLElement[];
      LocatorDebug.debugLog("Result elements:", resultElements.length);
      if (resultElements.length === 0) {
        LocatorDebug.printLogs();
      }
      return resultElements;
    } catch (error: any) {
      console.error("Error in locator:", error.stack);
      throw error;
    }
  }

  private static checkControls(controls: UI5Control[], ui5Selector: UI5Selector): UI5Control[] {
    return ElementFilter.filterBySelector(ui5Selector, controls);
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

  private static filterByIndex(aControls: UI5Control[], index: any): any[] {
    if (!index === null && !index === undefined) {
      if (typeof index === "object" && index.nodeType) {
        return aControls;
      } else if (index <= aControls.length - 1 && index >= 0) {
        return [aControls[index]];
      } else {
        return [];
      }
    }
    return aControls;
  }
}
