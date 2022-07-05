describe("authenticator - customViaConfig", function () {
  it("Execution", async function () {
    await ui5.session.loginCustomViaConfig("PURCHASER", "Welcome2!", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});
