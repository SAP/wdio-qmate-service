const { Given, When, Then } = require("@cucumber/cucumber");

const selector = {
  "elementProperties": {
    "viewName": "sap.ui.demo.cart.view.Welcome",
    "metadata": "sap.m.Title",
    "text": [{
      "path": "i18n>promotedTitle"
    }]
  }
};
Given(/^I am on (\w+) page$/, async (intent) => {
  await ui5.common.navigation.navigateToApplication(intent);
});

When(/^I scroll to an element with index (\w+), timeout (\w+) and alignment (.+)$/, async (index, timeout, alignment) => {
  await ui5.common.locator.scrollToElement(selector, index, alignment, timeout);
});

Then("I should see an element", async () => {
  await ui5.common.assertion.expectToBeVisible(selector);
});


const {handleCookiesConsent} = require("@wdio/qmate-service/tests/reuse/utils");

const selectorForDialog = {
  "elementProperties": {
    "metadata": "sap.m.Dialog"
  }
};

Given(/I am on opened confirmation dialog/, async () => {
  await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBoxInitialFocus");
  await handleCookiesConsent();

  const openDialogButton = {
    "elementProperties": {
      "viewName": "sap.m.sample.MessageBoxInitialFocus.V",
      "metadata": "sap.m.Button",
      "text": "Custom action"
    }
  };

  await ui5.common.userInteraction.click(openDialogButton);

    // Check Dialog window opened
  await ui5.common.locator.getDisplayedElement(selectorForDialog);
});

When(/I click (\w+) on confirmation dialog$/, async (button) => {
  if (button.toLowerCase() === "yes") {
    await ui5.common.confirmationDialog.clickYes();
  } else if (button.toLowerCase() === "no") {
    await ui5.common.confirmationDialog.clickYes();
  }
});

Then(/I should check that no confirmation dialog any more, error message is (.*)$/, async (message) => {
    // Check Dialog closed
  try {
    await ui5.common.locator.getDisplayedElement(selectorForDialog);
  } catch (e) {
    await ui5.common.assertion.expectTrue(!!e.message.match(message));
  }
});
