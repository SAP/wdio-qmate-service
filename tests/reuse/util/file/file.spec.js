const path = require("path");

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

const selectorFileUploader = {
  "elementProperties": {
    "viewName": "sap.m.sample.UploadCollection.Page",
    "metadata": "sap.ui.unified.FileUploader"
  }
};

const files = [];
files.push(path.resolve(__dirname, "./testFiles/test.txt"), path.resolve(__dirname, "./testFiles/test2.txt"));

describe("file - upload - default selector", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.element.getDisplayed(selectorFileUploader);
  });

  it("Execution", async function () {
    await util.file.upload(files);
  });

  it("Verification", async function () {
    await ui5.element.getDisplayed(selectorTest);
    await ui5.element.getDisplayed(selectorTest2);
  });
});

describe("file - upload - custom selector", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection");
    await util.browser.refresh();
  });

  it("Execution", async function () {
    await util.file.upload(files, selectorFileUploader);
  });

  it("Verification", async function () {
    await ui5.element.getDisplayed(selectorTest);
    await ui5.element.getDisplayed(selectorTest2);
  });

});