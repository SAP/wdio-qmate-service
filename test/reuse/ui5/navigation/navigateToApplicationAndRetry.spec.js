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

describe("navigation - navigateToApplicationAndRetry wrong navigation intent type with/without verification(unhappy case)", function () {
  const wrongApplication = {
    strange: "intent"
  };
  const application = "Shell-home";

  it("Execution & Verification", async function () {
    await ui5.navigation.navigateToApplicationAndRetry(application, false, true); // closePopups=false, verify=true

    await ui5.navigation.navigateToApplicationAndRetry(wrongApplication, false, false); // closePopups=false, verify=false - no verification
    const currentUrl = await browser.getUrl();

    // system first navigates to '<urlToSystem>#%5Bobject%20Object%5D'
    expect(currentUrl).toContain(browser.config.baseUrl + "#[object%20Object]");

    await expect(ui5.navigation.navigateToApplicationAndRetry(wrongApplication, false, true)) // verify = true,
      .rejects.toThrow(/failed/);
  });
});


const selectorForErrorPopupText = {
  "elementProperties": {
    "metadata": "sap.m.Text",
    "ancestorProperties": {
      "elementProperties": {
        "metadata": "sap.m.Dialog",
        "type": "Message",
        "state": "Error"
      }
    }
  }
};

// Test is unstable - system itself can close the popup
// TODO: discuss local server usage for assertion tests execution
describe.skip("assertion - expectUnsupportedNavigationPopup", function () {
  it("Preparation", async function () {
    await ui5.navigation.navigateToApplicationAndRetry("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplicationAndRetry("SomeWrong-intent", false);
  });

  it("Verification", async function () {
    await ui5.assertion.expectUnsupportedNavigationPopup("#SomeWrong-intent");
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});

// Test is unstable - system itself can close the popup
// TODO: discuss local server usage for assertion tests execution
describe.skip("assertion - expectUnsupportedNavigationPopup with '&' (unhappy case, another error popup)", function () {
  it("Preparation", async function () {
    await ui5.navigation.navigateToApplicationAndRetry("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplicationAndRetry("SomeWrongIntentWith&", false);
  });

  it("Verification", async function () {
    await expect(ui5.assertion.expectUnsupportedNavigationPopup("#SomeWrongIntentWith&"))
      .rejects.toThrow(/No visible elements found/);
    const textElement = await ui5.element.getDisplayed(selectorForErrorPopupText);
    const text = await textElement.getText();
    await common.assertion.expectEqual(text, "Could not open app. Please try again later.");
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});