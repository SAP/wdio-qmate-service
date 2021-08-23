/* eslint-disable no-unused-expressions */
const { expect: chaiExpect } = require("chai");

describe("Test Chai expect library", async () => {
  it("should work with arrays", async () => {
    await browser.url("#/categories");

    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };

    const element = await browser.uiControl(listElementProperties);
    const allPropertiesNamesOnElementLevel = await element.getAllUI5Properties();
    const allPropertiesNamesOnBrowserLevel = await browser.getAllUI5Properties(element);

    chaiExpect(allPropertiesNamesOnElementLevel).to.include("title", "visible"); // to.contain is not working!!!

    // Causes all .equal, .include, .members, .keys, and .property assertions that follow in the chain
    // to use deep equality instead of strict (===) equality
    chaiExpect(allPropertiesNamesOnElementLevel).to.be.an("array").that.includes("title").and.does.not.contain("tooltip");
    chaiExpect(allPropertiesNamesOnElementLevel)
      .to.be.an("array")
      .and.to.have.ordered.members(allPropertiesNamesOnBrowserLevel)
      .but.not.have.ordered.members(allPropertiesNamesOnBrowserLevel.reverse());

    chaiExpect(allPropertiesNamesOnBrowserLevel).to.have.property("length").that.is.gt(1);
  });

  it("should work with objects", async () => {
    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    const element = await browser.uiControl(listElementProperties);
    const counterOnBrowserLevel = await browser.getBindingProperty("counter", element);

    chaiExpect(counterOnBrowserLevel).to.be.an("array");

    const pathObject = counterOnBrowserLevel[0];

    chaiExpect(pathObject).to.be.an("object");
    chaiExpect(pathObject).to.have.property("path").and.to.be.a("string").and.to.be.eq("NumberOfProducts");
    chaiExpect(pathObject).to.have.property("value").and.to.be.a("number").and.to.be.above(0);
    chaiExpect(counterOnBrowserLevel).to.deep.include(pathObject); // object inside array or for nested objects
  });

  it("should work with Promises (reject/resolve)", async () => {
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
    chaiExpect(allAggregationNamesOnElementLevel).not.to.include("wrong_aggregation");
    chaiExpect(allAggregationNamesOnElementLevel).not.to.include("");

    // Same for await browser.getUI5Aggregation("", element) - 6 lines are required to test an async error
    try {
      const emptyAggregation = await element.getUI5Aggregation("");
      chaiExpect(emptyAggregation).not.to.be.ok("should throw 'javascript error: done is not a function'");
    } catch (e) {
      chaiExpect(e.message).to.match(/javascript error: done is not a function/);
    }

    const wrongAggregation = await element.getUI5Aggregation("wrong_name");
    chaiExpect(wrongAggregation).to.be.null; // .to.be.a('null');
  });

  it("should work with e2e specific stuff", async () => {
    const ui5ControlDomProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      },
      "domProperties": {
        "nodeName": "li",
        "class": "sapMLIB sapMLIB-CTX sapMLIBShowSeparator sapMLIBTypeActive sapMLIBActionable sapMLIBFocusable sapMSLI sapMLIBHoverable",
        "id": "__item1-container-cart---homeView--categoryList-0",
        "title": "Open category Accessories"
      }
    };

    const elem = await browser.uiControl(ui5ControlDomProperties);
    const elementIsDisplayed = await elem.isDisplayed();
    const elementIsClickable = await elem.isClickable();

    chaiExpect(elementIsDisplayed).to.be.true;
    chaiExpect(elementIsClickable).to.be.eq(true);
  });
});