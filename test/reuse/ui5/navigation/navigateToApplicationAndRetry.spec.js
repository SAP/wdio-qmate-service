"use strict";

describe("navigation - navigateToApplicationAndRetry with closePopups=true", function () {
  const queryToClosePopups = "help-readCatalog=false&help-stateUACP=PRODUCTION";

  it("Execution & Verification", async function () {
    // First navigation - to #Shell-home
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#Shell-home" - as preventPopups=true
    let urlExpected = `${await util.browser.getBaseUrl()}?${queryToClosePopups}#Shell-home`;

    await ui5.navigation.navigateToApplicationAndRetry("Shell-home"); // closePopups=true by default
    let button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    let parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#PurchaseOrder-manage" - as preventPopups=true
    urlExpected = `${await util.browser.getBaseUrl()}?${queryToClosePopups}#PurchaseOrder-manage`;

    await ui5.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage"); // closePopups=true by default
    button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);
  });
});

describe("navigation - navigateToApplicationAndRetry with closePopups=false", function () {
  it("Execution & Verification", async function () {
    // First navigation - to #Shell-home
    // http://localhost:34099/ui#Shell-home
    let urlExpected = `${await util.browser.getBaseUrl()}#Shell-home`;

    await ui5.navigation.navigateToApplicationAndRetry("Shell-home", false); // closePopups=false
    let button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    let parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    // http://localhost:34099/ui#PurchaseOrder-manage
    urlExpected = `${await util.browser.getBaseUrl()}#PurchaseOrder-manage`;

    await ui5.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage", false); // closePopups=false
    button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);
  });
});
