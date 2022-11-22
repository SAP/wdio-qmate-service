"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("getAggregationProperty - check name is Accessories", async () => {
  let val;
  it("Preparation", async () => {
    const url = await util.browser.getBaseUrl();
    await common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "viewId": "container-cart---app",
          "title": [{
            "path": "CategoryName"
          }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "tooltip");
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, "Open category Accessories");
  });
});

describe("getAggregationProperty - columns of table", async () => {
  let val;
  const expectedColumns = ["Product", "Supplier", "Dimensions", "Weight", "Price"];
  it("Preparation", async () => {
    const url = "https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Table/sample/sap.m.sample.Table";
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Table.Table",
        "metadata": "sap.m.Table"
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "columns");
    val = val.map(item => item.mAggregations.header.mProperties.text);
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, expectedColumns);
  });
});

describe("getAggregationProperty - items in list", async () => {
  let val;
  const expectedItems = ["ITelO Vault", "Notebook Basic 15", "Notebook Basic 17", "Notebook Basic 18", "Notebook Basic 19"];
  it("Preparation", async () => {
    const url = "https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Select/sample/sap.m.sample.Select";
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/ProductCollection2"
        }]
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "items");
    val = val.map(item => item.mProperties.text);
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, expectedItems);
  });
});