describe("authenticator (plain) - fiori", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/fiori.html");
  });

  it("Execution", async function () {
    await ui5.session.login("<username>", "<password>", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - sapCloud", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/sapCloud.html");
  });

  it("Execution", async function () {
    await ui5.session.login("<username>", "<password>", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - loginFiori", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/fiori.html");
  });

  it("Execution", async function () {
    await ui5.session.loginFiori("<username>", "<password>", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - loginSapCloud", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/sapCloud.html");
  });

  it("Execution", async function () {
    await ui5.session.loginSapCloud("<username>", "<password>", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});


