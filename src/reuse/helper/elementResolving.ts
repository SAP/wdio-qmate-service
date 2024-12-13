
export async function resolveCssSelectorOrElement(elementOrSelector: WebdriverIO.Element | string): Promise<WebdriverIO.Element> {
  if (!elementOrSelector) {
    throw new Error("Please provide an element or a CSS selector as first argument.");
  }

  if (typeof elementOrSelector === "string") {
    return await nonUi5.element.getByCss(elementOrSelector);
  } else {
    return elementOrSelector;
  }
}
