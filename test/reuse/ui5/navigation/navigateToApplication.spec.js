"use strict";

describe("navigation - navigateToApplication with preventPopups=false", function () {
  it("Execution & Verification", async function () {
    // First navigation - to #Shell-home
    let urlExpected = `${await util.browser.getBaseUrl()}#Shell-home`; // http://localhost:34099/ui#Shell-home

    await ui5.navigation.navigateToApplication("Shell-home"); // preventPopups=false by default
    let button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    let parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    urlExpected = `${await util.browser.getBaseUrl()}#PurchaseOrder-manage`; // http://localhost:34099/ui#PurchaseOrder-manage

    await ui5.navigation.navigateToApplication("PurchaseOrder-manage"); // preventPopups=false by default
    button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

  });
});

describe("navigation - navigateToApplication with preventPopups=true", function () {
  it("Execution & Verification", async function () {
    // First navigation - to #Shell-home
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#Shell-home" - as preventPopups=true
    const queryToClosePopups = "help-readCatalog=false&help-stateUACP=PRODUCTION"; // from private function 'generateUrlParams'
    let urlExpected = `${await util.browser.getBaseUrl()}?${queryToClosePopups}#Shell-home`;

    await ui5.navigation.navigateToApplication("Shell-home", true); // preventPopups=true
    let button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    let parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#PurchaseOrder-manage" - as preventPopups=true
    urlExpected = `${await util.browser.getBaseUrl()}?${queryToClosePopups}#PurchaseOrder-manage`;

    await ui5.navigation.navigateToApplication("PurchaseOrder-manage", true); // preventPopups=true
    button = await nonUi5.element.getById("parseUrl");
    await nonUi5.userInteraction.click(button);

    await common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await nonUi5.element.getById("navigationUrl");
    parsedUrlValue = await nonUi5.element.getValue(parsedUrlElement);

    await common.assertion.expectEqual(urlExpected, parsedUrlValue);

  });
});

describe("navigation - navigateToApplication wrong navigation intent type with/without verification(unhappy case)", function () {
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Execution & Verification", async function () {
    await ui5.navigation.navigateToApplication(application, true);

    await ui5.navigation.navigateToApplication(wrongApplication, false); // verify=false - no verification
    const currentUrl = await browser.getUrl();

    // system first navigates to '<urlToSystem>#%5Bobject%20Object%5D'
    expect(currentUrl).toContain(browser.config.baseUrl + "#[object%20Object]");

    await expect(ui5.navigation.navigateToApplication(wrongApplication, false, true)) // verify = true,
      .rejects.toThrow(/Navigation failed/);
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
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("SomeWrong-intent", true);
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
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("SomeWrongIntentWith&", false);
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