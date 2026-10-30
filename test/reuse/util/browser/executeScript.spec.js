"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - executeScript", function () {
  const aboutDialogSelector = {
    elementProperties: {
      viewName: "sap.ui.documentation.sdk.view.App",
      metadata: "sap.m.Image",
      id: "aboutDialogFragment--aboutLogoSAP"
    }
  };

  it("Preparation", async function () {
    await browser.url(browser.config.baseUrl);
    await handleCookiesConsent();
  });
  it("Execution", async function () {
    let selector = {
      elementProperties: {
        id: "*aboutMenuButton",
        metadata: "sap.f.gen.ui5.webcomponents_fiori.dist.ShellBarItem",
        viewName: "sap.ui.documentation.sdk.view.App"
      }
    };
    await ui5.userInteraction.click(selector);
    selector = {
      elementProperties: {
        id: "*menuItem-about",
        metadata: "sap.f.gen.ui5.webcomponents.dist.MenuItem",
        viewName: "sap.ui.documentation.sdk.view.App"
      }
    };
    await ui5.userInteraction.click(selector);
    await ui5.element.getDisplayed(aboutDialogSelector);
    await util.browser.executeScript("document.location.reload()");
  });

  it("Verification", async function () {
    await expect(ui5.element.getDisplayed(aboutDialogSelector, 0, 3000)).rejects.toThrow(/No visible elements found with selector/);
  });
});

describe("browser - executeScript - active frame", function () {
  beforeEach(async function () {
    const html = '<title>top-level</title><iframe id="scriptFrame" srcdoc="<title>frame</title><p>Frame content</p>"></iframe>';
    await browser.url(`data:text/html,${encodeURIComponent(html)}`);
    await util.browser.switchToIframe("#scriptFrame");
  });

  afterEach(async function () {
    await util.browser.switchToDefaultContent();
  });

  it("executes string scripts in the active frame with arguments", async function () {
    const result = await util.browser.executeScript("return document.title + arguments[0];", "-result");
    expect(result).toEqual("frame-result");
  });

  it("awaits async function results in the active frame", async function () {
    const result = await util.browser.executeScript(async (suffix) => {
      return document.title + await Promise.resolve(suffix);
    }, "-async");
    expect(result).toEqual("frame-async");
  });
});
