describe("watchMode - test case runs after being restarted in watch mode", function() {
  it("Step 01: Navigate to URL", async function() {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Step 02: Click 'accessories' StandardListItem", async function() {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    await ui5.userInteraction.click(selector);
  });
});
