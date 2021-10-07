describe("authenticator - fiori", function () {
  it("Verification", async function () {
    const elem = await nonUi5.element.getElementById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});
