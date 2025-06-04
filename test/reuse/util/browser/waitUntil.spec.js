

describe("browser - waitUntil", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
  });

  it("Execution", async function () {
    const title = "Demo Kit - SAPUI5 SDK";
    await util.browser.waitUntil(
      async () => (await browser.getTitle()) === title,
      {
        timeout: 5000,
        timeoutMsg: `Expected title to be "${title}" after 5s`,
      }
    );
  });

  it("Verification", async function () {
    const title = await browser.getTitle();
    expect(title).toBe(title);
  });
});

describe("browser - waitUntil with error", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    const wrongTitle = "Wrong Title";
    const errorMessage = `Expected title to be "${wrongTitle}" after 5s`;
    await expect(
      util.browser.waitUntil(
        async () => (await browser.getTitle()) === wrongTitle,
        {
          timeout: 5000,
          timeoutMsg: errorMessage,
        }
      )
    ).rejects.toThrow(errorMessage);
  });
});
