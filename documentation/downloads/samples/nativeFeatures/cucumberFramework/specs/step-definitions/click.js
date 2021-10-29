const { Given, When, Then } = require("@cucumber/cucumber");
const {handleCookiesConsent} = require("@wdio/qmate-service/tests/helper/utils");

const selectorForDialog = {
  "elementProperties": {
    "metadata": "sap.m.Dialog"
  }
};

Given(/I am on opened confirmation dialog/, async () => {
  await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBoxInitialFocus");
  await handleCookiesConsent();

  const openDialogButton = {
    "elementProperties": {
      "viewName": "sap.m.sample.MessageBoxInitialFocus.V",
      "metadata": "sap.m.Button",
      "text": "Custom action"
    }
  };

  await ui5.userInteraction.click(openDialogButton);

    // Check Dialog window opened
  await ui5.element.getDisplayed(selectorForDialog);
});

When(/I click (\w+) on confirmation dialog$/, async (button) => {
  if (button.toLowerCase() === "yes") {
    await ui5.confirmationDialog.clickYes();
  } else if (button.toLowerCase() === "no") {
    await ui5.confirmationDialog.clickNo();
  }
});

Then(/I should check that no confirmation dialog any more, error message is (.*)$/, async (message) => {
  try {
    await ui5.element.getDisplayed(selectorForDialog);
  } catch (e) {
    await common.assertion.expectTrue(!!e.message.match(message));
  }
});

