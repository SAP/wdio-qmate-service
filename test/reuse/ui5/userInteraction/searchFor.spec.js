const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - searchFor - use button", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.SearchField/sample/sap.m.sample.SearchField");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const value = "Laptop";
    const index = 0;
    const timeout = 30000;
    const useEnter = false;
    await ui5.userInteraction.searchFor(selector, value, index, timeout, useEnter);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const valueExp = "Laptop";
    await ui5.assertion.expectValueToBe(selector, valueExp);
  });

});

describe("userInteraction - searchFor - use Enter", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.SearchField/sample/sap.m.sample.SearchField");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const value = "Laptop";
    const index = 0;
    const timeout = 30000;
    const useEnter = true;
    await ui5.userInteraction.searchFor(selector, value, index, timeout, useEnter);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const valueExp = "Laptop";
    await ui5.assertion.expectValueToBe(selector, valueExp);
  });

});

describe("userInteraction - searchFor - use Enter and wrong selector", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.SearchField/sample/sap.m.sample.SearchField");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sarchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const value = "Laptop";
    const index = 0;
    const timeout = 30000;
    const useEnter = true;
    await expect(ui5.userInteraction.searchFor(selector, value, index, timeout, useEnter))
      .rejects.toThrow("Retries done. Failed to execute the function");
  });
});

describe("userInteraction - resetSearch", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.SearchField/sample/sap.m.sample.SearchField");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const value = "Laptop";
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.searchFor(selector, value, index, timeout);
    await ui5.userInteraction.resetSearch(selector, index, timeout);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.SearchField.Page",
        metadata: "sap.m.SearchField"
      },
      ancestorProperties: {
        siblingProperties: {
          metadata: "sap.m.Toolbar",
          viewName: "sap.m.sample.SearchField.Page"
        }
      }
    };
    const valueExp = "";
    await ui5.assertion.expectValueToBe(selector, valueExp);
  });
});