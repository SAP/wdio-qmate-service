"use strict";
const queryToAvoidPopups = "help-readCatalog=false&help-stateUACP=PRODUCTION"; // 'navigateToApplication()' method will provide you special url to avoid pop-ups.

describe("navigation - navigateToApplicationWithQueryParams with query param in url", function () {
  const query = "?sap-language=RU";
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplicationWithQueryParams(intent, `${query}&${queryToAvoidPopups}`, true);
  });

  it("Verification", async function () {
    // Note: currentUrl can contain system specific query params
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(intent);
    expect(currentUrl).toContain(query);
    expect(currentUrl).toContain(browser.config.baseUrl);
  });
});

describe("navigation - navigateToApplicationWithQueryParams with non-existing param in url", function () {
  const query = "?unknownParam=value";
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplication(intent, true);
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplicationWithQueryParams(intent, `${query}&${queryToAvoidPopups}`, true);
    await ui5.common.navigation.closePopups();
  });


  it("Verification", async function () {
    // Note: currentUrl can contain system specific query params
    const currentUrl = await browser.getUrl();

    expect(currentUrl).toContain(query);
    expect(currentUrl).toContain(intent);
    expect(currentUrl).toContain(browser.config.baseUrl);
  });
});

describe("navigation - navigateToApplicationWithQueryParams with empty param in url", function () {
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home");
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplicationWithQueryParams(intent);
  });

  it("Verification", async function () {
    // Note: currentUrl can contain system specific query params
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(intent);
    expect(currentUrl).toContain(browser.config.baseUrl);
  });

  it("Clean Up", async function () {
    await ui5.common.session.logout();
  });
});