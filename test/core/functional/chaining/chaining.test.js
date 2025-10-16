"use strict";
describe("webdriver.io page", function () {

  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("step 0:click on item Accessories - Use array controls", async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "items": [{ "path": "/ProductCategories" }] },
      "parentProperties": { "metadata": "sap.m.Page", "title": [{ "path": "i18n>homeTitle" }] }
    };
    const ui5ControlProperties2 = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "title": [{ "path": "CategoryName" }],
        "bindingContextPath": "/ProductCategories*"
      }
    };

    const list = await browser.uiControl(ui5ControlProperties);
    const allItems = await list.uiControls(ui5ControlProperties2);

    expect(allItems).toBeInstanceOf(Array);
    await expect(allItems[0]).toBeDisplayed();
    await allItems[0].click();
  });

  it("step 1:navigate back to main page", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.ui.core.Icon",
        "id": "*page-navButton-iconBtn"
      }
    };
    const backToListBtn = await browser.uiControl(ui5ControlProperties);
    await expect(backToListBtn).toBeClickable();
    await backToListBtn.click();
  });

  it("step 2:click on item Accessories - Use control and index", async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "items": [{ "path": "/ProductCategories" }] },
      "parentProperties": { "metadata": "sap.m.Page", "title": [{ "path": "i18n>homeTitle" }] }
    };
    const ui5ControlProperties2 = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "title": [{ "path": "CategoryName" }],
        "bindingContextPath": "/ProductCategories*"
      }
    };
    const list = await browser.uiControl(ui5ControlProperties);
    const item1 = await list.uiControl(ui5ControlProperties2, 0);
    const item2 = await list.uiControl(ui5ControlProperties2, 1);
    // expect(ui5ControlProperties2).toBeInstanceOf(Object); use check for  item1?
    await expect(await item1.getAttribute("id")).not.toBeNull();
    await expect(await item2.getAttribute("id")).not.toBeNull();
    await item2.click();
  });

  it("step 3:click on item Accessories - Use control and index", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.Page",
        "id": "*page"
      }
    };
    const ui5ControlProperties2 = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectListItem",
        "bindingContextPath": "/Products*'HT-1114')"
      }
    };
    const ui5ControlProperties3 = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.Button",
        "id": "*page-navButton"
      }
    };
    const productList = await browser.uiControl(ui5ControlProperties);
    const item = await productList.uiControl(ui5ControlProperties2);
    const backButton = await productList.uiControl(ui5ControlProperties3);
    await expect(await item.getAttribute("id")).not.toBeNull();
    await item.click();
    await expect(backButton).toBeDisplayedInViewport();
    await expect(await backButton.getAttribute("id")).not.toBeNull();
    await backButton.click();

  });

  it("step 4:fill search field in Categories - Use control and index", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Toolbar",
        "id": "*searchBar33343"
      }
    };
    const ui5ControlProperties2 = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    const list = await browser.uiControl(ui5ControlProperties);
    const item1 = await list.uiControl(ui5ControlProperties2, 0);
    await expect(await item1.getAttribute("id")).not.toBeNull();
    // item1.setValue("ABCDEF"); async code without await
    // await common.userInteraction.pressEnter(); // we cannot use reuse
  });

  it("step 5:fill wrong element and catch error - Use control and index", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Toolbar",
        "id": "*searchBar33343"
      }
    };
    const ui5ControlWrongProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": ".m.SearchField",
        "id": "*"
      }
    };
    const list = await browser.uiControl(ui5ControlProperties);
    await expect(list.uiControl(ui5ControlWrongProperties, 0))
      .rejects.toThrowError(/No visible elements found/);
  });
});