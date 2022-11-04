"use strict";

describe("navigation - navigateToSystemAndApplicationAndRetry", function () {
  const system = "<systemUrl>";
  const application = "PurchaseOrder-manage";

  it("Execution & Verification", async function () {
    await common.navigation.navigateToUrl(`https://${system}`);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");

    await ui5.navigation.navigateToSystemAndApplicationAndRetry(system, application, true);
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Manage Purchase Orders");
  });


  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});

describe("navigation - navigateToSystemAndApplicationAndRetry wrong navigation intent type in demo url with/without verification(unhappy case)", function () {
  const system = "<systemUrl>";
  const wrongApplication = {
    strange: "intent"
  };
  const application = "Shell-home";

  it("Execution & Verification", async function () {
    await ui5.navigation.navigateToSystemAndApplicationAndRetry(system, application, false);
    await ui5.session.loginFiori("PURCHASER", "super-duper-sensitive-pw");

    await ui5.navigation
      .navigateToSystemAndApplicationAndRetry(system, wrongApplication, false, false); // verify = false - no error during navigation
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(system); // url still includes system

    await expect(ui5.navigation.navigateToSystemAndApplicationAndRetry(system, wrongApplication, false, true)) // verify = true (by default)
      .rejects.toThrow(/Navigation failed/);
  });
});