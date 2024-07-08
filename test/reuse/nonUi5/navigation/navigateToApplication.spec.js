describe("navigateToApplication: test with SAP website", function () {
  let url = null;  
  const relativeReference = "products.html";

  before(() => {
    url = browser.config.baseUrl;
  });

  it("Execution", async function () {
    await common.navigation.navigateToUrl(url);
    await nonUi5.navigation.navigateToApplication(relativeReference);
  });

  it("Verification", async function () {
    await common.assertion.expectUrlToBe(`${url}/${relativeReference}`);
  });
});
