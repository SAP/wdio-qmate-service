"use strict";
// How to change baseUrl from configuration file:
// https://webdriver.io/docs/browserobject.html#configurations-versus-options
describe("assertion - expectUrlToBe simple url (before login)", function () {
  const url = "https://qs9-715.wdf.sap.corp/ui";

  it("Preparation", async function () {
    await browser.navigateTo(url);
  });

  it("Execution and Verification", async function () {
    await common.assertion.expectUrlToBe(url);
  });
});

describe("assertion - expectUrlToBe after login with sap client and language (unhappy case)", function () {
  const url = "https://qs9-715.wdf.sap.corp/ui";
  it("Preparation", async function () {
    browser.config.baseUrl = url;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    const urlExp = "https://qs9-715.wdf.sap.corp/ui#Shell-home";
    // this check "await common.assertion.expectUrlToBe(urlExp);" is not working (from time to time) - during login url can be
    // https://qs9-715.wdf.sap.corp/ui?_sap-hash=JTIzU2hlbGwtaG9tZQ&sap-system-login=X&sap-system-login-cookie=X&sap-contextid=SID:ANON:ldai1qs9_QS9_00:E6H6esENrZdnhPd1G7VjCTa0jUDMw377cB8hPHuC-ATT
    // need to wait for stabilization?
    // await expect(common.assertion.expectUrlToBe(urlExp)).rejects.toThrow(/sap-hash/);
    const currentUrl = await browser.getUrl();
    console.log(`Url after login: ${currentUrl}`);
  });
});


describe("assertion - expectUrlToBe wrong url (unhappy case)", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
  });

  it("Execution and Verification", async function () {
    await expect(common.assertion.expectUrlToBe())
      .rejects.toThrow(/Expect\w+|\d+undefined\w+|\d+Received\w+|\d+"https:\/\/qs9-715.wdf.sap.corp\/ui"/);

    await expect(common.assertion.expectUrlToBe("https://qs9-715.wdf.sap.corp"))
      .rejects.toThrow(/Expect\w+|\d+"https:\/\/qs9-715.wdf.sap.corp"\w+|\d+Received\w+|\d+"https:\/\/qs9-715.wdf.sap.corp\/ui"/);
  });
});
