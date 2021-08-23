describe("Successful suite", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("is a short step", async function () {
    await browser.refresh();
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-0",
        "bindingContextPath": "/ProductCategories('AC')"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem).toBeClickable();
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
    const deletFromCartElement = await browser.uiControl(deleteFromCart);

    await deletFromCartElement.click(); const confirmDeletFromCart = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "text": "Delete"
      }
    };
    const confirmDeletFromCartElement = await browser.uiControl(confirmDeletFromCart);
    await confirmDeletFromCartElement.click();

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
    expect(elems.length === 1).toBe(true);
    await elems[0].click();
  });
});

const path = require("path");
const moment = require("moment");

function takeScreenshot() {
  const timestamp = moment().format("YYYYMMDD-HHmmss.SSS");
  const filepath = path.join("reports/html-reporter/screenshots", timestamp + ".png");
  browser.saveScreenshot(filepath).then(() => {
    process.emit("test:screenshot", filepath);
  });
}

