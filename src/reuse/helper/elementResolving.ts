import { Element } from "../../../@types/wdio";
import { GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../modules/constants";

export async function resolveCssSelectorOrElement(elementOrSelector: Element | string, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a CSS selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await nonUi5.element.getByCss(elementOrSelector, 0, timeout);
  } else {
    return elementOrSelector;
  }
}

export async function resolveMobileSelectorOrElement(elementOrSelector: Element | string): Promise<Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await $(elementOrSelector);
  } else {
    return elementOrSelector;
  }
}
