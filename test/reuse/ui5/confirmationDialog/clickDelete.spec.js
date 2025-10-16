"use strict";
const selectorForPopup = {
  "elementProperties": {
    "metadata": "sap.m.Dialog"
  }
};

describe("confirmationDialog - clickDelete", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
    // 1. Select promoted product, add to shopping cart
    const productForPutToCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.ui.core.Icon",
        "bindingContextPath": "/Promoted/0"
      }
    };
    await ui5.userInteraction.click(productForPutToCart);

    // 2. Navigate to shopping cart
    const cartButton = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://cart"
      }
    };
    await ui5.userInteraction.click(cartButton, 0, 30000); // Check index and timeout works

    // 3. Edit shopping cart
    const editCartButton = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.ui.core.Icon",
        "id": "*editButton-img"
      }
    };
    await ui5.userInteraction.click(editCartButton);

    // 4. Click 'remove' button for the promoted product
    const removeButton = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.ui.core.Icon"
      }
    };
    await ui5.userInteraction.click(removeButton);

    // 5. Check popup
    await expect(ui5.element.getDisplayed(selectorForPopup)).resolves.toBeTruthy();
  });

  it("Execution", async function () {
    // 6. Click 'Delete' button on a confirmation popup
    await ui5.confirmationDialog.clickDelete();
  });

  it("Verification", async function () {
    // 7. Verify product is still in a shopping cart, popup cancelled
    const emptyCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.m.List",
        "id": "*entryList"
      }
    };
    await ui5.assertion.expectToBeVisible(emptyCart);

    // 8. Check popup disappeared
    await expect(ui5.element.getDisplayed(selectorForPopup))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickDelete without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // No popup to click
    await expect(ui5.element.getDisplayed(selectorForPopup))
      .rejects.toThrow(/No visible elements found/);

    await expect(ui5.confirmationDialog.clickDelete())
      .rejects.toThrow(/No visible elements found/);
  });
});