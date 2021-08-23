var chai = require("chai")
  , should = chai.should();

describe("webdriver.io page", function () {
  it("should have the right title", async function () {
    await browser.navigateTo("https://webdriver.io");
    const title = await browser.getTitle();
    await title.should.be.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
  });
});