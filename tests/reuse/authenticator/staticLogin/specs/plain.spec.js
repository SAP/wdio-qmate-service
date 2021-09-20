describe("authenticator (plain) - fiori", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("http://localhost:34005/fiori.html");
  });

  it("Execution", async function () {
    await ui5.common.session.login("PURCHASER", "super-duper-sensitive-pw", false);
  });

  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - sapCloud", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("http://localhost:34005/sapCloud.html");
  });

  it("Execution", async function () {
    await ui5.common.session.login("PURCHASER", "super-duper-sensitive-pw", false);
  });

  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - loginFiori", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("http://localhost:34005/fiori.html");
  });

  it("Execution", async function () {
    await ui5.common.session.loginFiori("PURCHASER", "super-duper-sensitive-pw", false);
  });

  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });

});

describe("authenticator (plain) - loginSapCloud", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("http://localhost:34005/sapCloud.html");
  });

  it("Execution", async function () {
    await ui5.common.session.loginSapCloud("PURCHASER", "super-duper-sensitive-pw", false);
  });

  it("Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("shellAppTitle");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });
});


