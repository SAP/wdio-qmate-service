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
    await browser.navigateTo(browser.config.baseUrl);
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
