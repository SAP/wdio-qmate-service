/* eslint-disable no-unused-expressions */
describe("webdriver.io page locator test", function () {

  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should access element by elementProperties and inner siblingProperties", async function () {
    // Use nested ancestorProperties
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Toolbar",
          "id": "*searchBar33343"
        }
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem).toBeDisplayedInViewport();
    expect(elem).toBeInstanceOf(Object);
    expect(elem).toHaveAttribute("elementId");
  });

  it("should access element by elementProperties and nextSiblingProperties", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader"
      },
      "nextSiblingProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Toolbar",
        "id": "*searchBar33343"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem).toBeDisplayedInViewport();
    expect(elem).toBeInstanceOf(Object);
    expect(elem).toHaveAttribute("elementId");
  });

  it("should access element by elementProperties and previousSiblingProperties", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Toolbar",
        "id": "*searchBar33343"
      },
      "prevSiblingProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem).toBeDisplayedInViewport();
    expect(elem).toBeInstanceOf(Object);
    expect(elem).toHaveAttribute("elementId");
  });

  it("should access elements only by siblingProperties and fail (unhappy case)", async function () {
    const selectorWithoutElementProperties = {
      "siblingProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'CSA')"
      }
    };
    await expect(browser.uiControl(selectorWithoutElementProperties))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should access element by elementProperties and siblingProperties", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "id": "*categoryList-0",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      },
      "siblingProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'CSA')"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);

    await expect(elem).toBeDisplayedInViewport();
    await expect(elem).toBeDisplayed();
    await expect(elem).toBeClickable();
    expect(elem).toBeInstanceOf(Object);
    expect(elem).toHaveAttribute("elementId");
  });

  it("try access element by elementProperties and siblingProperties and throw error", async function () {
    const wrongProperties = {
      "elementProperties": {
        "id": "*categoryList-0",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      },
      "siblingProperties": {
        "viewName": "view.Home",
        "metadata": "sap.m.ListItem",
        "bindingContextPath": "/ProductCategories*'CSA')"
      }
    };
    await expect(browser.uiControl(wrongProperties)).rejects.toThrowError(/No visible elements found/);
  });

  it("should access element by elementProperties and multiple siblingProperties as array - AND (happy case)", async function () {
    // The AC list item has CSA as a sibling, and also has other StandardListItem siblings - both conditions must match
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      },
      "siblingProperties": [
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem", "bindingContextPath": "/ProductCategories*'CSA')" },
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem" }
      ]
    };
    const elem = await browser.uiControl(selector);
    await expect(elem).toBeDisplayed();
    await expect(elem).toBeClickable();
  });

  it("should fail when one entry of siblingProperties array does not match - AND (unhappy case)", async function () {
    // Second entry points to a non-existent sibling - AND logic means the whole selector fails
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      },
      "siblingProperties": [
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem", "bindingContextPath": "/ProductCategories*'CSA')" },
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem", "bindingContextPath": "/ProductCategories*'THIS-DOES-NOT-EXIST')" }
      ]
    };
    await expect(browser.uiControl(selector, 0, 1000))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should return multiple elements when multiple elements each satisfy array siblingProperties - AND (multiple results)", async function () {
    // All category items (except AC and CSA themselves) have both AC and CSA as siblings - returns multiple items
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem"
      },
      "siblingProperties": [
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem", "bindingContextPath": "/ProductCategories*'CSA')" },
        { "viewName": "sap.ui.demo.cart.view.Home", "metadata": "sap.m.StandardListItem", "bindingContextPath": "/ProductCategories*'AC')" }
      ]
    };
    const elems = await browser.uiControls(selector);
    expect(elems.length).toBeGreaterThan(1);
  });

});





