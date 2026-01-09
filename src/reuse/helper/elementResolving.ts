import { GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../modules/constants";

export async function resolveCssSelectorOrElement(elementOrSelector: WebdriverIO.Element | string, timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<WebdriverIO.Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a CSS selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await nonUi5.element.getByCss(elementOrSelector, 0, timeout);
  } else {
    return elementOrSelector;
  }
}

export async function resolveMobileSelectorOrElement(elementOrSelector: WebdriverIO.Element | string): Promise<WebdriverIO.Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await $(elementOrSelector).getElement();
  } else {
    return elementOrSelector;
  }
}
