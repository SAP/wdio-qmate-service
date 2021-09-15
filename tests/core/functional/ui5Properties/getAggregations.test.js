"use strict";
const { handleCookiesConsent } = require("../../../reuseApi/tests/utils");

describe("Test 'getAllUI5Aggregations()' and 'getUI5Aggregation()' on both element and browser levels", function () {

  it("should get Dropdown aggregations on both element and browser levels, access unknown, empty and 'items' aggregations", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBox");
    await handleCookiesConsent();

    const dropdownProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.ComboBox.view.ComboBox",
        "metadata": "sap.m.ComboBox"
      }
    };

    const element = await browser.uiControl(dropdownProperties);

    await checkElementAndBrowserAccessAllAggregations({
      requiredAggregations: [
        "tooltip",
        "customData",
        "layoutData",
        "dependents",
        "dragDropConfig",
        "formattedValueStateText",
        "items"
      ],
      element
    });

    // Unknown Aggregation
    const unknowAggregationOnElementLevel = await element.getUI5Aggregation("unknown_aggregation");
    expect(unknowAggregationOnElementLevel).toBeNull();
    await expect(browser.getUI5Aggregation("unknown_aggregation", element)).resolves.toEqual(unknowAggregationOnElementLevel);

    // Empty aggregation
    const tooltipOnElementLever = await element.getUI5Aggregation("tooltip");
    expect(tooltipOnElementLever).toBeNull();
    await expect(browser.getUI5Aggregation("tooltip", element)).resolves.toEqual(tooltipOnElementLever);

    // Aggregation array - test in controlActionInBrowser
    // This is not working, fails with an error "javascript error: circular reference" - maybe an infinite loop?
    // content is an array of objects
    await expect(element.getUI5Aggregation("items")).rejects.toThrow("javascript error: circular reference");
    await expect(browser.getUI5Aggregation("items", element)).rejects.toThrow("javascript error: circular reference");
  });

  it("should get List Item aggregations on both element and browser levels and access tooltip aggregation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");

    const listElementProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };

    const element = await browser.uiControl(listElementProperties);

    await checkElementAndBrowserAccessAllAggregations({
      requiredAggregations: ["tooltip"],
      element
    });

    const tooltipOnElementLever = await element.getUI5Aggregation("tooltip");
    expect(tooltipOnElementLever).toBe("Open category Accessories");
    await expect(browser.getUI5Aggregation("tooltip", element)).resolves.toEqual(tooltipOnElementLever);
  });

  it("should try to access non-existing/empty aggregation(s)", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    const listElementProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };

    const element = await browser.uiControl(listElementProperties);
    const allAggregationNamesOnElementLevel = await element.getAllUI5Aggregations();
    expect(allAggregationNamesOnElementLevel).not.toContain("wrong_aggregation");
    expect(allAggregationNamesOnElementLevel).not.toContain("");

    await expect(element.getUI5Aggregation("")).rejects.toThrow("javascript error: done is not a function");
    await expect(browser.getUI5Aggregation("wrong_aggregation_name", element)).resolves.toBeNull();
  });
});


async function checkElementAndBrowserAccessAllAggregations({ requiredAggregations, element }) {
  const allAggregationNamesOnElementLevel = await element.getAllUI5Aggregations();
  expect(allAggregationNamesOnElementLevel).toContain(...requiredAggregations);

  await expect(browser.getAllUI5Aggregations(element)).resolves.toEqual(allAggregationNamesOnElementLevel);
}