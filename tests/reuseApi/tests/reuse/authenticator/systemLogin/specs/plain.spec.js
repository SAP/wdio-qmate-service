describe("session - plain", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home", false, true);
  });

  it("Execution", async function () {
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "id": "shellAppTitle"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selector);
  });

});
