import { Locator } from "./Locator";

export function locate(
  ui5Selector: UI5Selector,
  index: any,
  opt_parentElement: HTMLElement
): HTMLElement[] {
  return Locator.locate(ui5Selector, index, opt_parentElement);
}
