/* eslint-disable no-unused-expressions */
describe("webdriver.io page locator test", function () {

  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should access element by elementProperties and inner domProperties", async function () {
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
  });

  it("should access element only by domProperties (unhappy case)", async function () {
    const selectorWithoutElementProperties = {
      "domProperties": {
        "nodeName": "li",
        "class": "sapMLIB sapMLIB-CTX sapMLIBShowSeparator sapMLIBTypeActive sapMLIBActionable sapMLIBFocusable sapMSLI sapMLIBHoverable",
        "id": "__item1-container-cart---homeView--categoryList-0",
        "title": "Open category Accessories"
      }
    };

    await expect(browser.uiControl(selectorWithoutElementProperties))
      .rejects.toThrow(/No visible elements found/);
  });

  it("try access element by element properties, wrong dom properties and catch error", async function () {
    const wrongProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')",
        "domProperties": {
          "nodeName": "div",
          "class": "sapMLIB sapMLIB-CTX sapMLIBShowSeparator sapMLIBTypeActive sapMLIBActionable sapMLIBFocusable sapMSLI sapMLIBHoverable",
          "id": "__item1-container-cart---homeView--categoryList-0",
          "title": "Open category Accessories"
        }
      }
    };
    await expect(browser.uiControl(wrongProperties))
      .rejects.toThrowError(/No visible elements found/);
  });

});
