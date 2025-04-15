const path = require("path");
const { handleCookiesConsent } = require("../../../helper/utils");

const selectorTest = {
  "elementProperties": {
    "metadata": "sap.m.Link",
    "text": "test.txt"
  },
  "siblingProperties": {
    "metadata": "sap.ui.core.Icon",
    "src": "sap-icon://document-text",
    "alt": "test.txt"
  }
};
const selectorTest2 = {
  "elementProperties": {
    "metadata": "sap.m.Link",
    "text": "test2.txt"
  },
  "siblingProperties": {
    "metadata": "sap.ui.core.Icon",
    "src": "sap-icon://document-text",
    "alt": "test2.txt"
  }
};

const files = [];
files.push(path.resolve(__dirname, "./testFiles/test.txt"), path.resolve(__dirname, "./testFiles/test2.txt"));

describe("file - upload - default selector", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await util.file.upload(files);
  });

  it("Verification", async function () {
    await ui5.element.getDisplayed(selectorTest);
    await ui5.element.getDisplayed(selectorTest2);
  });
});

describe("file - upload - custom selector - UI5", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const customSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.UploadCollection.Page",
        "metadata": "sap.ui.unified.FileUploader"
      }
    };
    await util.file.upload(files, customSelector);
  });

  it("Verification", async function () {
    await ui5.element.getDisplayed(selectorTest);
    await ui5.element.getDisplayed(selectorTest2);
  });

});

describe("file - upload - custom selector - non UI5", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const customSelector = "input[type='file']";
    await util.file.upload(files, customSelector);
  });

  it("Verification", async function () {
    await ui5.element.getDisplayed(selectorTest);
    await ui5.element.getDisplayed(selectorTest2);
  });

});