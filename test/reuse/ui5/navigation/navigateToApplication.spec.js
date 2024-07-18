"use strict";

// Tests to add:
// - test with preventPopups=false
// - test with preventPopups=true
// - test where baseUrl has query parameters
// - test where intent has query parameters
// - test where baseUrl has multiple query parameters
// - test with error handling

const BASE_URL = `http://localhost:34099/ui`;
const INTENT = "Shell-home";
const DUMMY_QUERY_PARAM_1 = "dummyQueryParam1=dummyValue1";
const DUMMY_QUERY_PARAM_2 = "dummyQueryParam2=dummyValue2";
const PREVENT_POPUP_QUERY_PARAMS = "help-readCatalog=false&help-stateUACP=PRODUCTION";

describe("navigation - navigateToApplication - preventPopups=false", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = BASE_URL;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(INTENT, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - preventPopups=true", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = BASE_URL;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(INTENT, true);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}?${PREVENT_POPUP_QUERY_PARAMS}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - baseUrl with closePopup query parameters", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = `${BASE_URL}?${PREVENT_POPUP_QUERY_PARAMS}`;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(INTENT, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}?${PREVENT_POPUP_QUERY_PARAMS}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - baseUrl with dummy query parameters", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}`;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(INTENT, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - intent and baseUrl with query parameters", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}`;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(`${INTENT}?${DUMMY_QUERY_PARAM_2}`, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}#Shell-home?${DUMMY_QUERY_PARAM_2}`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - intent with multiple query parameters", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = BASE_URL;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(`${INTENT}?${DUMMY_QUERY_PARAM_1}&${DUMMY_QUERY_PARAM_2}`, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}#Shell-home?${DUMMY_QUERY_PARAM_1}&${DUMMY_QUERY_PARAM_2}`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - baseUrl with multiple query parameters", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}&${PREVENT_POPUP_QUERY_PARAMS}`;
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication(INTENT, false);
  });

  it("Verification", async function () {
    const urlExp = `${BASE_URL}?${DUMMY_QUERY_PARAM_1}&${PREVENT_POPUP_QUERY_PARAMS}#Shell-home`;
    await common.assertion.expectUrlToBe(urlExp);
  });
});

describe("navigation - navigateToApplication - verify=true", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = BASE_URL;
  });

  it("Execution & Verification", async function () {
    await ui5.navigation.navigateToApplication(INTENT, false, true);
  });
});
