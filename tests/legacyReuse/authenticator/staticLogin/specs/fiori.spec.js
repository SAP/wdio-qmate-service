describe("authenticator - fiori", function () {
  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });
});
