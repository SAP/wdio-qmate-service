describe("loginCustom - using params in config.js", function () {
  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("loginCustom", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/custom.html");
  });

  it("Execution", async function () {
    await ui5.session.loginCustom("<username>", "<password>", "#username", "#password", "#logon", false);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getById("shellAppTitle");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("loginCustom - same-page submission", function () {
  it("logs in without requiring a URL change or reloading the page", async function () {
    const url = "http://localhost:34005/custom.html";
    await common.navigation.navigateToUrl(url);
    await browser.execute(() => {
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        document.body.innerHTML = '<div id="shellAppTitle">Home</div>';
      });
    });

    await ui5.session.loginCustom("<username>", "<password>", "#username", "#password", "#logon", false);

    await expect(browser.$("#shellAppTitle")).toBeDisplayed();
    expect(await browser.getUrl()).toBe(url);
  });
});

describe("loginCustom - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/custom.html");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginCustom("<username>", "<password>", "#wrongusernamefield", "#wrongpasswordfield", "#wrongsubmitbutton", false)).rejects.toThrow("Function 'loginCustom' failed");
  });
});
