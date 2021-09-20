"use strict";

describe("navigation - navigateToSystemAndApplicationAndRetry", function () {
  const system = "super-sensitive.domain.name";
  const application = "PurchaseOrder-manage";

  it("Execution and Verification", async function () {
    await non_ui5.common.navigation.navigateToUrl(`https://${system}`);
    await ui5.common.session.loginFiori("PURCHASER");

    await ui5.common.navigation.navigateToSystemAndApplicationAndRetry(system, application, true);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectPageTitle("Manage Purchase Orders");
  });


  it("Clean Up", async function () {
    await ui5.common.session.logout();
  });
});

describe("navigation - navigateToSystemAndApplicationAndRetry wrong navigation intent type in demo url with/without verification(unhappy case)", function () {
  const system = "super-sensitive.domain.name";
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToSystemAndApplicationAndRetry(system, application, false);
    await ui5.common.session.loginFiori("PURCHASER");

    await ui5.common.navigation
      .navigateToSystemAndApplicationAndRetry(system, wrongApplication, false, false); // verify = false - no error during navigation
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(system); // url still includes system

    await expect(ui5.common.navigation.navigateToSystemAndApplicationAndRetry(system, wrongApplication, false, true)) // verify = true (by default)
      .rejects.toThrow(/Navigation failed/);
  });
});