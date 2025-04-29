describe("element - highlight", function () {

  let product;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

  });

  it("Execution", async function () {
    product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    const duration = 3000;
    const color = "green";
    await nonUi5.element.highlight(product, duration, color);
  });
});

// TODO: get state (properties) of element to check highlight=true
