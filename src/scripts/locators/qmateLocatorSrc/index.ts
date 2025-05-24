import { Locator } from "./Locator";

export function locate(ui5Selector: UI5Selector, rootElement: HTMLElement): HTMLElement[] {
  return Locator.locate(ui5Selector, rootElement);
}
