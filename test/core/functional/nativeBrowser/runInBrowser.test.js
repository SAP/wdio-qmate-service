const { BASE_URL } = require("../../../../src/reuse/constants.ts");

describe("Test for ", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should fail with 'javascript error: circular reference/Converting circular structure to JSON'", async function () {
    const ui5ControlProperties = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        mProperties: {
          viewId: "container-cart---app",
          title: [{ path: "CategoryName" }],
          bindingContextPath: "/ProductCategories*"
        }
      }
    };

    const elem = await browser.uiControl(ui5ControlProperties);
    // v8: "javascript error: circular reference"; v10 BiDi: deserializeValue recurses on
    // circular BiDi response → "Maximum call stack size exceeded"
    await expect(
      elem.controlActionInBrowser(function (control) {
        return control.getBindingContext();
      })
    ).rejects.toThrow(/javascript error: circular reference|Maximum call stack size exceeded/);

    await expect(
      elem.controlActionInBrowser(function (control) {
        return JSON.stringify(control.getBindingContext());
      })
    ).rejects.toThrow(/Converting circular structure to JSON|Maximum call stack size exceeded/);
  });

  it("should access wrong element", async function () {
    const ui5ControlProperties = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        id: "*categoryList-79",
        bindingContextPath: "/ProductCategories('LT')"
      }
    };
    const newText = "master";
    // const elem = await browser.uiControl(ui5ControlProperties);
    const selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 3000 };
    await expect(
      browser.controlActionInBrowser(
        function (control, txt) {
          control.setTitle(txt);
          return control.getTitle();
        },
        selectorParams,
        newText
      )
    ).rejects.toThrow(/No visible elements found/);
  });

  it("should use UI5 Control binding properties command on element level", async function () {
    await browser.url(`${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`);
    const ui5ControlProperties = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        mProperties: {
          viewId: "container-cart---app",
          title: [{ path: "CategoryName" }],
          bindingContextPath: "/ProductCategories*"
        }
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(
      elem.controlActionInBrowser(function (control) {
        return control.getBindingContext().getPath();
      })
    ).resolves.toEqual("/ProductCategories('AC')");
  });

  it("should fire press (controlActionInBrowser on element level)", async function () {
    const ui5ControlProperties = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        id: "*categoryList-7",
        bindingContextPath: "/ProductCategories('LT')"
      }
    };

    const elem = await browser.uiControl(ui5ControlProperties);

    const newText = "test";
    await expect(
      elem.controlActionInBrowser(function (control, txt) {
        control.setTitle(txt);
        return control.getTitle();
      }, newText)
    ).resolves.toEqual(newText);

    await expect(
      elem.controlActionInBrowser(function (control) {
        const data = { title: control.getTitle() };
        control.firePress();
        return data.title;
      })
    ).resolves.toEqual(newText);
  });

  // ?
  it.skip("should fire press (controlActionInBrowser on browser level)", async function () {
    const ui5ControlProperties = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        id: "*categoryList-7",
        bindingContextPath: "/ProductCategories('LT')"
      }
    };
    const selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 30000 };
    const newText = "master";
    await expect(
      browser.controlActionInBrowser(
        function (control, txt) {
          control.setTitle(txt);
          return control.getTitle();
        },
        selectorParams,
        newText
      )
    ).resolves.toEqual(newText);

    await expect(
      browser.controlActionInBrowser(function (control) {
        const data = { title: control.getTitle() };
        control.firePress();
        return data.title;
      }, ui5ControlProperties)
    ).resolves.toEqual(newText);
  });
});
