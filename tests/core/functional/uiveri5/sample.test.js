describe("test uiveri5 locators page", function () {

  // this.beforeAll(async () => {
  //   await browser.url("#/categories");
  // });

  it("step 0:click on item Accessories - Use array controls", async function () {
    await browser.url("#/categories");

    var selector = {
      controlType: "sap.m.StandardListItem",
      viewName: "sap.ui.demo.cart.view.Home",
      bindingPath: {
        path: "/ProductCategories('AC')",
        propertyPath: "CategoryName"
      },
      interaction: {
        idSuffix: "content"
      }
    };
    const item = await browser.uiControl(selector);
    await item.click();
  });

  it("step 1:click on DVD player", async function () {
    var selector = {
      controlType: "sap.m.ObjectListItem",
      viewName: "sap.ui.demo.cart.view.Category",
      bindingPath: {
        path: "/Products('HT-2001')",
        propertyPath: "PictureUrl"
      },
      interaction: {
        idSuffix: "content"
      }
    };
    const item = await browser.uiControl(selector);
    await item.click();
  });

  it("step 2:check value", async function () {
    var selector = {
      controlType: "sap.m.ObjectNumber",
      viewName: "sap.ui.demo.cart.view.Product",
      properties: {
        number: "449,99"
      }
    };
    const objectNum = await browser.uiControl(selector);
    await expect(await objectNum.getUI5Property("number")).toBe("449,99");
  });

  it("step 3:click back", async function () {
    var selector = {
      controlType: "sap.ui.core.Icon",
      id: "container-cart---category--page-navButton-iconBtn"
    };
    const backBtn = await browser.uiControl(selector);
    await backBtn.click();
  });
});