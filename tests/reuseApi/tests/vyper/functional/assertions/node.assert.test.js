const assert = require("assert"); // https://nodejs.org/api/assert.html
describe("Test 'Assert' node native library ", function () {

  it.skip("asserts properties are 'deepStrictEqual' and strings are 'strictEqual'", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");

    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };

    const element = await browser.uiControl(listElementProperties);

    const allPropertiesNamesBrowser = await browser.getAllUI5Properties(element);
    const allPropertiesNamesElement = await element.getAllUI5Properties();
    assert.strict.deepStrictEqual(allPropertiesNamesBrowser, allPropertiesNamesElement);

    assert.strict.strictEqual(allPropertiesNamesBrowser[0], allPropertiesNamesElement[0]);
  });

  it("asserts reject promise and check if error message match the string", async function () {
    await browser.navigateTo("https://webdriver.io/docs/api.html");

    const elem = await $(".WrongElementClass");

    assert.ok(elem.error.error === "no such element");

    await assert.rejects(
      async () => {
        throw new Error("Handled error");
      },
      (err) => {
        assert.strict.match(err.message, /Handled error/);
        return true;
      }
    );
  });
});