describe("navigateToApplication: test with SAP website", function () {
  const url = browser.config.baseUrl;
  const relativeReference = "products.html";

  it("Execution", async function () {
    await common.navigation.navigateToUrl(url);
    await nonUi5.navigation.navigateToApplication(relativeReference);
  });

  it("Verification", async function () {
    await common.assertion.expectUrlToBe(`${url}/${relativeReference}`);
  });
});
