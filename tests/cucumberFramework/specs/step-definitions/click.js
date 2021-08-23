const { Given, When, Then } = require("@cucumber/cucumber");
const {handleCookiesConsent} = require("@wdio/vyper-service/tests/reuseApi/tests/utils");

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
    await ui5.common.confirmationDialog.clickNo();
  }
});

Then(/I should check that no confirmation dialog any more, error message is (.*)$/, async (message) => {
  try {
    await ui5.common.locator.getDisplayedElement(selectorForDialog);
  } catch (e) {
    await ui5.common.assertion.expectTrue(!!e.message.match(message));
  }
});

