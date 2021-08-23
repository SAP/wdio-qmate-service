describe("locator - highlightElement", function () {

  let product;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");

  });

  it("Execution", async function () {
    product = await non_ui5.common.locator.getElementByXPath("//div[contains(text(),'Laptops')]");
    const duration = 3000;
    const color = "green";
    await non_ui5.common.locator.highlightElement(product, duration, color);
  });
});

// TODO: get state (properties) of element to check highlight=true
