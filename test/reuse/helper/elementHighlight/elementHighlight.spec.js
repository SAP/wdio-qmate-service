"use strict";

const elementHighlight = require("../../../../lib/reuse/helper/elementHighlight").default;

describe("elementHighlight - elementHighlight - 'Default' button to highlight", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    element = await nonUi5.element.getById("Default", 2000);
    const elementHighlightConfig = await elementHighlight.getElementHighlightData("click");
    if (elementHighlightConfig.enable) await nonUi5.element.highlight(element, elementHighlightConfig.duration, elementHighlightConfig.color);
  });

  it("Verification", async function () {
    const cssText = await nonUi5.element.getAttributeValue(element, "style");
    common.assertion.expectTrue(cssText.includes("box-shadow: inherit"));
  });
});

describe("elementHighlight - elementHighlight - 'Default' button not to highlight", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    element = await nonUi5.element.getById("Default", 2000);
    const elementHighlightConfig = await elementHighlight.getElementHighlightData("click");
    elementHighlightConfig.enable = false;
    if (elementHighlightConfig.enable) await nonUi5.element.highlight(element, elementHighlightConfig.duration, elementHighlightConfig.color);
  });

  it("Verification", async function () {
    await util.browser.sleep(3000);
    const cssText = await nonUi5.element.getAttributeValue(element, "style");
    common.assertion.expectTrue(cssText === null);
  });
});

describe("elementHighlight - elementHighlight - Incorrect method type", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    await expect(async () => {
      await elementHighlight.getElementHighlightData(1);
    }).rejects.toThrow("Please provide the method name 'ui5.userInteraction.click/1' in string format");
  });
});

describe("elementHighlight - elementHighlight - actions key missing from highlight config", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elementHighlightConfig = browser.config.params.highlightElements;
    delete elementHighlightConfig["actions"];
    browser.config.params.highlightElements = elementHighlightConfig;
    await expect(async () => {
      await elementHighlight.getElementHighlightData("click");
    }).rejects.toThrow("Please specify the actions key in element highlight config object");
  });
});

describe("elementHighlight - elementHighlight - Highlight the 'click' action just by specifying the actions as '*' in config", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elementHighlightConfig = browser.config.params.highlightElements;
    elementHighlightConfig["actions"] = ["*"];
    browser.config.params.highlightElements = elementHighlightConfig;
    element = await nonUi5.element.getById("Default", 2000);
    const highlightConfig = await elementHighlight.getElementHighlightData("click");
    if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
  });

  it("Verification", async function () {
    await util.browser.sleep(3000);
    const cssText = await nonUi5.element.getAttributeValue(element, "style");
    common.assertion.expectTrue(cssText.includes("box-shadow: inherit"));
  });
});

describe("elementHighlight - elementHighlight - Highlight the 'fill' action just by specifying the actions as '*' in config", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 2000);
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    const elementHighlightConfig = browser.config.params.highlightElements;
    elementHighlightConfig["actions"] = ["*"];
    browser.config.params.highlightElements = elementHighlightConfig;
    const highlightConfig = await elementHighlight.getElementHighlightData("fill");
    if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
  });

  it("Verification", async function () {
    await util.browser.sleep(3000);
    const cssText = await nonUi5.element.getAttributeValue(element, "style");
    common.assertion.expectTrue(cssText.includes("box-shadow: inherit"));
  });
});

describe("elementHighlight - elementHighlight - 'Default' button to highlight with default color red", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elementHighlightConfig = browser.config.params.highlightElements;
    elementHighlightConfig["actions"] = ["ui5.userInteraction.click", "ui5.userInteraction.fill"];
    delete elementHighlightConfig["color"];
    browser.config.params.highlightElements = elementHighlightConfig;
    element = await nonUi5.element.getById("Default", 2000);
    const highlightConfig = await elementHighlight.getElementHighlightData("click");
    if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
  });

  it("Verification", async function () {
    await util.browser.sleep(3000);
    const cssText = await nonUi5.element.getAttributeValue(element, "style");
    common.assertion.expectTrue(cssText.includes("box-shadow: inherit"));
  });
});
