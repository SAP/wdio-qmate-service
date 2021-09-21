var path = require("path");
describe("dialogInteraction - uploadFiles", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.UploadCollection.Page",
        "metadata": "sap.m.Title"
      }
    };
    await ui5.element.getDisplayedElement(selector);
  });

  it("Execution", async function () {
    var files = [];
    files.push(path.resolve(__dirname, "./testFiles/test.txt"), path.resolve(__dirname, "./testFiles/test2.txt"));
    await util.dialogInteraction.uploadFiles(files);
  });

  it("Verification", async function () {
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
    await ui5.element.getDisplayedElement(selectorTest); //TODO rename to getDisplayed?
    await ui5.element.getDisplayedElement(selectorTest2);
    //await browser.sleep(25000);
  });
});