describe("Failed suite", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("should fail due to wrong selector", async function () {
    try {
      const ui5ControlProperties = {
        "elementProperties": {
          "metadata": "sap.m.StandardListItm",
          "id": "*categoryList-0",
          "bindingContextPath": "/ProductCategories('AC')"
        }
      };
      await browser.uiControl(ui5ControlProperties);
    } catch (e) {
      throw new Error("I failed");
    }
  });

  it("should fail due to wrong 'javascript error: Cannot read property 'parts' of undefined'", async () => {
    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    const element = await browser.uiControl(listElementProperties);
    // Should fail with "javascript error: Cannot read property 'parts' of undefined"
    await element.getBindingProperty("wrong_property_name");
  });


  it("is a long step", async function () {
    await browser.refresh();
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-0",
        "bindingContextPath": "/ProductCategories('AC')"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await elem.click();
    const product = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectListItem",
        "bindingContextPath": "/Products*'HT-2001')"
      }
    };
    const productElement = await browser.uiControl(product);
    await productElement.click();

    const addCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>addToCartShort"
        }]
      }
    };
    const addCartElement = await browser.uiControl(addCart);
    await addCartElement.click();

    const openCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://cart"
      }
    };
    const openCartElement = await browser.uiControl(openCart);
    await openCartElement.click();

    const editCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.m.Button",
        "id": "*editButton"
      }
    };
    const editCartElement = await browser.uiControl(editCart);
    await editCartElement.click();

    const deleteFromCart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.m.Button",
        "bindingContextPath": "/cartEntries/HT-2001"
      }
    };
    const deleteFromCartElement = await browser.uiControl(deleteFromCart);
    await deleteFromCartElement.click();

    const confirmDeletFromCart = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "text": "Delete"
      }
    };
    const confirmDeleteFromCartElement = await browser.uiControl(confirmDeletFromCart);
    await confirmDeleteFromCartElement.click();

    await openCartElement.click();

    const back = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "type": "Back"
      },
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };
    const elems = await browser.uiControls(back);
    expect(elems.length).toBe(1);
    await elems[0].click();

    // Should fail here
    await browser.uiControl(back);
  });
});