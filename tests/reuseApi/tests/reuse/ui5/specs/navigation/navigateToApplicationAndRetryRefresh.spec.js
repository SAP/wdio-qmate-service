"use strict";
const queryToClosePopups = "help-readCatalog=false&help-stateUACP=PRODUCTION"; // from private function 'generateUrlParams'

describe("navigation - navigateToApplicationAndRetryRefresh with preventPopups=false", function () {
  it("Preparation", async function () {
    // First navigation - to #Shell-home
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#Shell-home" - as preventPopups=true

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("Shell-home", false);
    const urlExpected = `${await utilities.browser.getBaseUrl()}#Shell-home`;
    await ui5.common.assertion.expectUrlToBe(urlExpected);
  });

  it("Execution", async function () {
    // Second navigation - to #PurchaseOrder-manage
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage", false);
  });

  it("Verification", async function () {
    const urlExpected = `${await utilities.browser.getBaseUrl()}#PurchaseOrder-manage`;
    await ui5.common.assertion.expectUrlToBe(urlExpected);
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh with preventPopups=true", function () {
  it("Preparation", async function () {
    // First navigation - to #Shell-home
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#Shell-home" - as preventPopups=true

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("Shell-home"); // preventPopups = true by default
    const urlExpected = `${await utilities.browser.getBaseUrl()}?${queryToClosePopups}#Shell-home`;

    await ui5.common.assertion.expectUrlToBe(urlExpected);
  });

  it("Execution", async function () {
    // Second navigation - to #PurchaseOrder-manage
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage");
  });

  it("Verification", async function () {
    const urlExpected = `${await utilities.browser.getBaseUrl()}?${queryToClosePopups}#PurchaseOrder-manage`;
    await ui5.common.assertion.expectUrlToBe(urlExpected);
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh wrong navigation intent type in url with/without verification(unhappy case)", function () {
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(application, false);

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false, false); // preventPopups = false, verify = false
    const urlExpected = `${await utilities.browser.getBaseUrl()}#[object%20Object]`;
    await ui5.common.assertion.expectUrlToBe(urlExpected);

    await expect(ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false)) // preventPopups = false, verify = true by default
      .rejects.toThrow(/Navigation failed/);
  });
});
