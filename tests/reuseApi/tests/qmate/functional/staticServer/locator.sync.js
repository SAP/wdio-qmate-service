
const chai = require("chai")
  , expect = chai.expect
  , should = chai.should();
const assert = require("assert");

describe("webdriver.io page locator test", function () {

  it("step1:navigate to specific supplier invoice number", async function () {
    await browser.url("#SupplierInvoice-list1?SupplierInvoiceWthnFiscalYear=5105602883%252F2019");
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.ui.core.Icon",
        "id": "*template:::ListReportPage:::DynamicPageTitle-expandBtn-img"
      }
    };
    var elem = await browser.uiControl(selector);
    await elem.click();
  });

  it("step2:click Go", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.m.Button",
        "id": "*listReportFilter-btnGo"
      }
    };
    var elem = await browser.uiControl(selector);
    await elem.click();
  });

  it("step3:select entry from list", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.m.CheckBox",
        "id": "*responsiveTable-sa"
      }
    };
    var elem = await browser.uiControl(selector);
    await elem.click();
  });

  it("step4:click Go", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.m.CheckBox",
        "id": "*responsiveTable-sa"
      }
    };
    var elem = await browser.uiControl(selector);
    await elem.click();
  });
});