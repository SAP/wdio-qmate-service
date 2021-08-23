require("chai").should(); // https://www.chaijs.com/api/bdd/
describe("Test Chai 'should' assertion library", function () {
  it("should check objects are deep equal and strings are equal", async function () {
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
    allPropertiesNamesBrowser.should.have.members(allPropertiesNamesElement);
    allPropertiesNamesBrowser.should.to.be.deep.equal(allPropertiesNamesElement);

    allPropertiesNamesBrowser[0].should.be.eq(allPropertiesNamesElement[0]);
  });
});