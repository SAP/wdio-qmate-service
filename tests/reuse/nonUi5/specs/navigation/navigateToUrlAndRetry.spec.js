describe("navigateToUrlAndRetry", function () {

  const url = "https://sapui5.hana.ondemand.com/";
  const retries = 1;
  const interval = 500;

  it("Execution", async function () {
    await non_ui5.common.navigation.navigateToUrlAndRetry(url, retries, interval);
  });

  it("Execution and Verification", async function () {
    await ui5.common.assertion.expectUrlToBe(url);
  });
});

describe("navigateToUrlAndRetry with wrong url", function () {

  const url = "https://sapui5.hana.ondemand.com/";
  const retries = 1;
  const interval = 500;

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.navigation.navigateToUrlAndRetry("sd"))
      .rejects.toThrow("Retries done. Failed to execute the function: invalid argument");
  });
});

describe("navigateToUrlAndRetry with wrong parameter", function () {

  const url = "https://sapui5.hana.ondemand.com/";
  const retries = "retries";
  const interval = 500;

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.navigation.navigateToUrlAndRetry())
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'navigateToUrl' failed: Please provide an url as argument.");
  });
});