"use strict";

const initialUrl = "https://sap.github.io/wdio-qmate-service/";
const newUrl = "https://squidfunk.github.io/mkdocs-material/";
const initialPageTitle = "Qmate Service";
const newPagTitle = "Material for MkDocs";
const selector = "a[href='https://squidfunk.github.io/mkdocs-material/']";

describe("browser - switchToNewWindow - title", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(initialUrl);
    await nonUi5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    await util.browser.switchToNewWindow(newPagTitle);
  });

  it("Verification 1", async function () {
    const currentTitle = await browser.getTitle();
    common.assertion.expectEqual(currentTitle, newPagTitle);
  });

  it("Execution 2", async function () {
    await util.browser.switchToNewWindow(initialPageTitle);
  });

  it("Verification 2", async function () {
    const currentTitle = await browser.getTitle();
    common.assertion.expectEqual(currentTitle, initialPageTitle);
  });
});

describe("browser - switchToNewWindow - title (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(initialUrl);
    await nonUi5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    const titleRegExp = /Material/;
    await util.browser.switchToNewWindow(titleRegExp);
  });

  it("Verification 1", async function () {
    const titleAct = await browser.getTitle();
    const titleExp = newPagTitle;
    common.assertion.expectEqual(titleAct, titleExp);
  });
});

describe("browser - switchToNewWindow - url", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(initialUrl);
    await nonUi5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await util.browser.switchToNewWindow(newUrl);
  });

  it("Verification", async function () {
    const currentUrl = await util.browser.getCurrentUrl();
    common.assertion.expectEqual(currentUrl, newUrl);
  });
});

describe("browser - switchToNewWindow - url (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(initialUrl);
    await nonUi5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    const urlRegExp = /squidfunk/;
    await util.browser.switchToNewWindow(urlRegExp);
  });

  it("Verification", async function () {
    const urlExp = newUrl;
    const urlAct = await util.browser.getCurrentUrl();
    common.assertion.expectEqual(urlAct, urlExp);
  });
});

describe("browser - switchToNewWindow - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(initialUrl);
    await nonUi5.userInteraction.click(selector);
  });

  it("Execution & Verification", async function () {
    await expect(util.browser.switchToNewWindow("Wrong Title")).rejects.toThrow(/Function 'switchToNewWindow' failed with/);
  });
});
