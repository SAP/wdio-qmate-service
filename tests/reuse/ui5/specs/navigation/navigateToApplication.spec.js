"use strict";

describe("navigation - navigateToApplication with preventPopups=false", function () {
  it("Execution and Verification", async function () {
    // First navigation - to #Shell-home
    let urlExpected = `${await utilities.browser.getBaseUrl()}#Shell-home`; // http://localhost:34099/ui#Shell-home

    await ui5.common.navigation.navigateToApplication("Shell-home"); // preventPopups=false by default
    let button = await non_ui5.common.locator.getElementById("parseUrl");
    await non_ui5.common.userInteraction.click(button);

    await ui5.common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await non_ui5.common.locator.getElementById("navigationUrl");
    let parsedUrlValue = await non_ui5.common.locator.getValue(parsedUrlElement);

    await ui5.common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    urlExpected = `${await utilities.browser.getBaseUrl()}#PurchaseOrder-manage`; // http://localhost:34099/ui#PurchaseOrder-manage

    await ui5.common.navigation.navigateToApplication("PurchaseOrder-manage"); // preventPopups=false by default
    button = await non_ui5.common.locator.getElementById("parseUrl");
    await non_ui5.common.userInteraction.click(button);

    await ui5.common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await non_ui5.common.locator.getElementById("navigationUrl");
    parsedUrlValue = await non_ui5.common.locator.getValue(parsedUrlElement);

    await ui5.common.assertion.expectEqual(urlExpected, parsedUrlValue);

  });
});

describe("navigation - navigateToApplication with preventPopups=true", function () {
  it("Execution and Verification", async function () {
    // First navigation - to #Shell-home
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#Shell-home" - as preventPopups=true
    const queryToClosePopups = "help-readCatalog=false&help-stateUACP=PRODUCTION"; // from private function 'generateUrlParams'
    let urlExpected = `${await utilities.browser.getBaseUrl()}?${queryToClosePopups}#Shell-home`;

    await ui5.common.navigation.navigateToApplication("Shell-home", true); // preventPopups=true
    let button = await non_ui5.common.locator.getElementById("parseUrl");
    await non_ui5.common.userInteraction.click(button);

    await ui5.common.assertion.expectUrlToBe(urlExpected);

    let parsedUrlElement = await non_ui5.common.locator.getElementById("navigationUrl");
    let parsedUrlValue = await non_ui5.common.locator.getValue(parsedUrlElement);

    await ui5.common.assertion.expectEqual(urlExpected, parsedUrlValue);

    // Second navigation - to #PurchaseOrder-manage
    // "http://localhost:34099/ui?help-readCatalog=false&help-stateUACP=PRODUCTION#PurchaseOrder-manage" - as preventPopups=true
    urlExpected = `${await utilities.browser.getBaseUrl()}?${queryToClosePopups}#PurchaseOrder-manage`;

    await ui5.common.navigation.navigateToApplication("PurchaseOrder-manage", true); // preventPopups=true
    button = await non_ui5.common.locator.getElementById("parseUrl");
    await non_ui5.common.userInteraction.click(button);

    await ui5.common.assertion.expectUrlToBe(urlExpected);

    parsedUrlElement = await non_ui5.common.locator.getElementById("navigationUrl");
    parsedUrlValue = await non_ui5.common.locator.getValue(parsedUrlElement);

    await ui5.common.assertion.expectEqual(urlExpected, parsedUrlValue);

  });
});

describe("navigation - navigateToApplication wrong navigation intent type with/without verification(unhappy case)", function () {
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplication(application, true);

    await ui5.common.navigation.navigateToApplication(wrongApplication, false); // verify=false - no verification
    const currentUrl = await browser.getUrl();

    // system first navigates to 'https://qs9-715.wdf.sap.corp/ui#%5Bobject%20Object%5D'
    expect(currentUrl).toContain(browser.config.baseUrl + "#[object%20Object]");

    await expect(ui5.common.navigation.navigateToApplication(wrongApplication, false, true)) // verify = true,
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
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplication("SomeWrong-intent", true);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectUnsupportedNavigationPopup("#SomeWrong-intent");
  });

  it("Clean Up", async function () {
    await ui5.common.session.logout();
  });
});

// Test is unstable - system itself can close the popup
// TODO: discuss local server usage for assertion tests execution
describe.skip("assertion - expectUnsupportedNavigationPopup with '&' (unhappy case, another error popup)", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplication("SomeWrongIntentWith&", false);
  });

  it("Verification", async function () {
    await expect(ui5.common.assertion.expectUnsupportedNavigationPopup("#SomeWrongIntentWith&"))
      .rejects.toThrow(/No visible elements found/);
    const textElement = await ui5.common.locator.getDisplayedElement(selectorForErrorPopupText);
    const text = await textElement.getText();
    await ui5.common.assertion.expectEqual(text, "Could not open app. Please try again later.");
  });

  it("Clean Up", async function () {
    await ui5.common.session.logout();
  });
});