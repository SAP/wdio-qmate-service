"use strict";

describe("navigation - navigateToApplicationWithQueryParamsAndRetry with query param in url", function () {
  const query = "?sap-language=RU";
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    const urlExpected = `${await util.browser.getBaseUrl()}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExpected);
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, query, false);
  });

  it("Verification", async function () {
    const urlExpected = `${await util.browser.getBaseUrl()}${query}#${intent}`;
    await common.assertion.expectUrlToBe(urlExpected);
  });
});

describe("navigation - navigateToApplicationWithQueryParamsAndRetry with wrong param in url", function () {
  const query = "unknownParam=value"; // query without '?' mark
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    const urlExpected = `${await util.browser.getBaseUrl()}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExpected);
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, query, false);
  });


  it("Verification", async function () {
    const urlExpected = `${await util.browser.getBaseUrl()}${query}#${intent}`;
    await common.assertion.expectUrlToBe(urlExpected);

    // if 'query' includes no "?", url will be interpreted as another (unsupported) mount
    await expect(nonUi5.element.getById("parseUrl"))
      .rejects.toThrow(/Element with id "parseUrl" not found/);
  });
});

describe("navigation - navigateToApplicationWithQueryParamsAndRetry with empty param in url", function () {
  const intent = "PurchaseOrder-manage";

  it("Preparation", async function () {
    await ui5.navigation.navigateToApplication("Shell-home");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, "", false);
  });

  it("Verification", async function () {
    // No query
    const urlExpected = `${await util.browser.getBaseUrl()}#${intent}`;
    await common.assertion.expectUrlToBe(urlExpected);
  });
});