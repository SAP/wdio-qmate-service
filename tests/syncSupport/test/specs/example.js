describe("sync test", () => {
  let selector;
  it("Preparation", function () {
    browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

  });

  it("Verification", async function () {
    await ui5.common.assertion.expectToBeVisible(selector); // sync navigation works

    const result = ui5.common.assertion.expectToBeVisible(selector); // but async custom command cannot be used as sync
    expect(result instanceof Promise).toBe(true);
  });
});


