let retries = 0;
describe("(Mocha) retry per step", function () {
  this.beforeAll(async () => {
    await browser.navigateTo("https://webdriver.io");
  });

  it("should be ok on the second retry (third iteration)", async () => {
    const title = await browser.getTitle();
    // For demo purposes.
    // Note: no access to this.wdioRetries due to arrow function () => {} - another scope as for 'function () {}
    console.log("number of retries wdio local ------------>" + retries);
    if (retries < 1) { // One retry - two test runs
      retries++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  }, 1); // <- step should be retried once

  it("should be ok on the second retry (third iteration)", async function () {
    const title = await browser.getTitle();
    console.log("number of retries wdio local ------------>" + this.wdioRetries); // for demo purposes
    if (this.wdioRetries < 2) { // Two retries - three test runs
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  }, 2); // <- step should be retried twice
}); // Cannot set number of retries per suite