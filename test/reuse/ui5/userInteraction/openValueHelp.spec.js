const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

const valueHelpSelector = {
  "elementProperties": {
    "metadata": "sap.m.Input",
    "id": "sampleComp-sap.ui.comp.sample.smartfield.SmartFieldWithValueHelp---IDView--idDeliveryTransport-input"
  }
};

const datePickerSelector = {
  "elementProperties": {
    "metadata": "sap.m.DatePicker",
    "id": "sampleComp-sap.ui.comp.sample.smartfield.SmartFieldWithValueHelp---IDView--idCreationDate-datePicker"
  }
};

const valueHelpDialogTitle = {
  "elementProperties": {
    "metadata": "sap.m.Title",
    "id": "sampleComp-sap.ui.comp.sample.smartfield.SmartFieldWithValueHelp---IDView--idDeliveryTransport-input-valueHelpDialog-title"
  }
};

describe("userInteraction - openValueHelp - use valid valuehelp icon button", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.valuehelpdialog.ValueHelpDialog/sample/sap.ui.comp.sample.smartfield.SmartFieldWithValueHelp`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.openValueHelp(valueHelpSelector);
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisible(valueHelpDialogTitle);
    await common.userInteraction.pressEscape();
  });
});

describe("userInteraction - openValueHelp - use datepicker icon button (unhappy case)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.valuehelpdialog.ValueHelpDialog/sample/sap.ui.comp.sample.smartfield.SmartFieldWithValueHelp`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution && Verification", async function () {
    await expect(ui5.userInteraction.openValueHelp(datePickerSelector, 0, 3_000))
      .rejects.toThrowError(/Element with CSS .* not found./);
  });
});