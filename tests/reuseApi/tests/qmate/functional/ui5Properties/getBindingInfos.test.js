describe("Test 'getBindingContextPath()' and 'getBindingProperty()' on both element and browser levels", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should access binding context path on both element and browser levels", async function () {
    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    const element = await browser.uiControl(listElementProperties);
    const bindingContext = await element.getBindingContextPath();
    expect(bindingContext).toEqual("/ProductCategories('AC')");

    await expect(browser.getBindingContextPath(listElementProperties)).resolves.toEqual(bindingContext);
  });

  it("should access non-existing/empty binding context path on both element and browser levels", async function () {
    const listProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.List",
        "id": "*categoryList"
      }
    };
    const element = await browser.uiControl(listProperties);
    await expect(element.getBindingContextPath()).resolves.toBeNull();
    await expect(browser.getBindingContextPath(listProperties)).resolves.toBeNull();
  });

  it("should access binding context property on both element and browser levels", async function () {
    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };

    const example = {
      path: "NumberOfProducts",
      value: expect.any(Number)
    };

    const element = await browser.uiControl(listElementProperties);
    const counterOnElementLevel = await element.getBindingProperty("counter");
    await expect(browser.getBindingProperty("counter", element)).resolves.toEqual(counterOnElementLevel);

    expect(counterOnElementLevel[0]).toEqual(expect.objectContaining(example));
  });

  it("should access non-existing/empty binding context properties on both element and browser levels", async function () {
    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    const element = await browser.uiControl(listElementProperties);

    await expect(element.getBindingProperty("wrong_property_name")).rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");
    await expect(browser.getBindingProperty("wrong_property_name", element)).rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");

    await expect(element.getBindingProperty("")).rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");
    await expect(browser.getBindingProperty("", element)).rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");
  });
});