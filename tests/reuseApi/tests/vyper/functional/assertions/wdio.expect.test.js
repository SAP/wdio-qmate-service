// https://webdriver.io/docs/assertion.html
// https://jestjs.io/docs/en/using-matchers
// https://jestjs.io/docs/en/expect
// toHaveBeenCalled
describe("Test WDIO expect library", async () => {
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

    expect(allPropertiesNamesOnElementLevel).toContain("title", "tooltip", "visible");

    // Use .toEqual to compare recursively all properties of object instances (also known as "deep" equality).
    // It calls Object.is to compare primitive values, which is even better for testing than === strict equality operator.
    expect(allPropertiesNamesOnElementLevel).toEqual(allPropertiesNamesOnBrowserLevel);
    // expect({a: undefined, b: 2}).toEqual({b: 2});
    // expect({a: undefined, b: 2}).not.toStrictEqual({b: 2});
    expect(allPropertiesNamesOnElementLevel).toStrictEqual(allPropertiesNamesOnBrowserLevel); // https://jestjs.io/docs/en/expect#tostrictequalvalue
    expect(allPropertiesNamesOnElementLevel).not.toEqual(allPropertiesNamesOnBrowserLevel.reverse());

    // A bit hard to check that it is an array
    expect(allPropertiesNamesOnElementLevel).toBeInstanceOf(Array);
    expect(allPropertiesNamesOnElementLevel).toHaveElementProperty("length");

    // All is objects
    expect(allPropertiesNamesOnElementLevel).toBeInstanceOf(Object);
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

    const pathObject = counterOnBrowserLevel[0];
    const valueExample = {
      path: pathObject.path,
      value: pathObject.value
    };

    const assertionExample = {
      path: expect.any(String),
      value: expect.any(Number)
    };

    expect(pathObject).toBeInstanceOf(Object);
    expect(pathObject).toHaveElementProperty("path");
    expect(pathObject).toEqual(expect.objectContaining(valueExample));
    expect(pathObject).toEqual(expect.objectContaining(assertionExample));
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

    // This is just an example to use resolve + chaining. For hte sake of performance just use variable to store Promise.resolve result
    // After 'resolves' any command can be chained
    await expect(browser.getAllUI5Aggregations(element)).resolves.toBeInstanceOf(Array);
    await expect(browser.getAllUI5Aggregations(element)).resolves.not.toBeInstanceOf(Boolean);
    await expect(browser.getAllUI5Aggregations(element)).resolves.not.toBeNull();
    await expect(browser.getAllUI5Aggregations(element)).resolves.toStrictEqual(allAggregationNamesOnElementLevel);

    await expect(browser.getUI5Aggregation("", element)).rejects.toThrow("javascript error: done is not a function");
    await expect(element.getUI5Aggregation("")).rejects.toThrow("javascript error: done is not a function");

    await expect(browser.getUI5Aggregation("wrong_aggregation_name", element)).resolves.toBeNull();
    await expect(element.getUI5Aggregation("wrong_aggregation_name")).resolves.toBeNull();
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
    await expect(elem).toBeDisplayed();
    await expect(elem).toBeClickable();

    // This check is for DOM and is not relevant for sapui5
    await expect(elem).toHaveChildren({ gte: 2 });
  });
});