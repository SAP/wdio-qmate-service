import { Element } from "../../../@types/wdio";

export async function resolveCssSelectorOrElement(elementOrSelector: Element | string): Promise<Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a CSS selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await nonUi5.element.getByCss(elementOrSelector);
  } else {
    return elementOrSelector;
  }
}

export async function resolveMobileSelectorOrElement(elementOrSelector: Element | string): Promise<Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a CSS selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await $(elementOrSelector);
  } else {
    return elementOrSelector;
  }
}
