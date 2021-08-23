describe("authenticator - customViaConfig", function () {
  it("Execution", async function () {
    await ui5.common.session.loginCustomViaConfig("PURCHASER", "Welcome1!", false);
  });

  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });
});
