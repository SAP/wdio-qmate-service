/* eslint-disable no-unused-expressions */
const { checkIfAnElementIsUnique } = require("./utils");

describe("webdriver.io access to element via elementProperties test", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should access element by id", async function () {
    const categoryListElementProperties = {
      "elementProperties": {
        "id": "*categoryList-0"
      }
    };
    const categoryListElement = await browser.uiControl(categoryListElementProperties, 0, 60000);
    const categoryListElements = await browser.uiControls(categoryListElementProperties, 60000);

    expect(categoryListElements.length).toBe(1);
    await expect(categoryListElement).toBeDisplayedInViewport();
    await expect(categoryListElement).toBeClickable();

    await expect(categoryListElements[0]).toBeDisplayedInViewport();
    await expect(categoryListElements[0]).toBeClickable();

    checkIfAnElementIsUnique(categoryListElement, categoryListElements);

    // Text include count of products too, so we need to use Match
    await expect(categoryListElement.getText()).resolves.toMatch(/Accessories/);
  });

  it("should access element by binding context", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "bindingContextPath": "/ProductCategories('AC')"
      }
    };
    const categoryListElement = await browser.uiControl(ui5ControlProperties, 0, 60000);
    const categoryListElements = await browser.uiControls(ui5ControlProperties, 60000);

    expect(categoryListElements.length).toBe(1);
    await expect(categoryListElement).toBeDisplayedInViewport();
    await expect(categoryListElement).toBeClickable();

    checkIfAnElementIsUnique(categoryListElement, categoryListElements);

    // Text include count of products too, so we need to use Match
    await expect(categoryListElement.getText()).resolves.toMatch(/Accessories/);
  });

  it("should access element by viewName, metadata, bindingContextPath, text->path and fail to click non-clickable element", async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'DC')"
      }
    };
    const element = await browser.uiControl(ui5ControlProperties, 0, 60000);
    await expect(element.getText()).resolves.toMatch(/Desktop Computers/);

    // Navigate to products to have access to a Product 'Compare' link
    await element.click();

    const compareLinkProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectAttribute",
        "bindingContextPath": "/Products*'HT-1600')",
        "text": [{
          "path": "i18n>CompareWith"
        }]
      }
    };
    const link = await browser.uiControl(compareLinkProperties, 0, 60000);
    const links = await browser.uiControls(compareLinkProperties, 60000);
    await expect(link.getText()).resolves.toEqual("Compare");
    await expect(link).toBeDisplayedInViewport();
    await expect(link).not.toBeClickable();

    checkIfAnElementIsUnique(link, links);

    await expect(link.click()).rejects.toThrowError(/is not clickable at point/);

    // Check that without text->path cannot get unique element: without 'text->path' we can access to a link and a Product (2 elements)
    const productLinksProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectAttribute",
        "bindingContextPath": "/Products*'HT-1600')"
      }
    };

    const productLinks = await browser.uiControls(productLinksProperties, 60000);
    expect(productLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("should fail because element is not available: timeout error", async function () {
    // Try to access 'Add to Cart' button, which is not available at the screen
    const nonAvailableButtonProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>addToCartShort"
        }]
      }
    };

    await expect(browser.uiControl(nonAvailableButtonProperties, 0, 60000))
      .rejects.toThrowError(/No visible elements found/);
  });
});


