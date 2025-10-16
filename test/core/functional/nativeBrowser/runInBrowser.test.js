describe("Test for ", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should fail with 'javascript error: circular reference/Converting circular structure to JSON'", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };

    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem.controlActionInBrowser(function (control, done) {
      done(control.getBindingContext());
    })).rejects.toThrow("javascript error: circular reference");

    await expect(elem.controlActionInBrowser(function (control, done) {
      done(JSON.stringify(control.getBindingContext()));
    })).rejects.toThrow(/Converting circular structure to JSON/);
  });

  it("should access wrong element", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-79",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    const newText = "master";
    // const elem = await browser.uiControl(ui5ControlProperties);
    const selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 3000 };
    await expect(browser.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, selectorParams, newText)).rejects.toThrow(/No visible elements found/);
  });

  it("should use UI5 Control binding properties command on element level", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem.controlActionInBrowser(function (control, done) {
      done(control.getBindingContext().getPath());
    })).resolves.toEqual("/ProductCategories('AC')");
  });

  it("should fire press (controlActionInBrowser on element level)", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };

    const elem = await browser.uiControl(ui5ControlProperties);

    const newText = "test";
    await expect(elem.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, newText)).resolves.toEqual(newText);

    await expect(elem.controlActionInBrowser(function (control, done) {
      const data = { title: control.getTitle() };
      control.attachPress(data, function () {
        done(data.title);
      });
      control.firePress();
    })).resolves.toEqual(newText);
  });

  // ?
  it.skip("should fire press (controlActionInBrowser on browser level)", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    const selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 30000 };
    const newText = "master";
    await expect(browser.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, selectorParams, newText)).resolves.toEqual(newText);

    await expect(browser.controlActionInBrowser(function (control, done) {
      const data = { title: control.getTitle() };
      control.attachPress(data, function () {
        done(data.title);
      });
      control.firePress();
    }, ui5ControlProperties)).resolves.toEqual(newText);
  });
});