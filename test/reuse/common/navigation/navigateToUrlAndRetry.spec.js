describe("navigateToUrlAndRetry", function () {
  const url = "https://sapui5.hana.ondemand.com/";
  const retries = 1;
  const interval = 500;

  it("Execution", async function () {
    await common.navigation.navigateToUrlAndRetry(url, retries, interval);
  });

  it("Execution & Verification", async function () {
    await common.assertion.expectUrlToBe(url);
  });
});

describe("navigateToUrlAndRetry with wrong url", function () {
  it("Execution & Verification", async function () {
    await expect(common.navigation.navigateToUrlAndRetry("sd")).rejects.toThrow(
      "Function 'navigateToUrlAndRetry' failed with: Retries done. Failed to execute the function:invalid argument"
    );
  });
});

describe("navigateToUrlAndRetry with wrong parameter", function () {
  it("Execution & Verification", async function () {
    await expect(common.navigation.navigateToUrlAndRetry()).rejects.toThrow(
      "Function 'navigateToUrlAndRetry' failed with: Retries done. Failed to execute the function: Please provide an url as argument."
    );
  });
});
