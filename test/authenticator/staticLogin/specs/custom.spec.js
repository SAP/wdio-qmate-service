describe("loginCustom - using params in config.js", function () {
  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("loginCustom", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/custom.html");
  });

  it("Execution", async function () {
    await ui5.session.loginCustom("<username>", "<password>", "#username", "#password", "#logon", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("loginCustom - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/custom.html");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginCustom("<username>", "<password>", "#wrongusernamefield", "#wrongpasswordfield", "#wrongsubmitbutton", false))
      .rejects.toThrow("Function 'loginCustom' failed");
  });

});
