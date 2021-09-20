const { expect } = require("chai");

describe("Check page title with pupetteer and chai", function () {
  it("step1:Load page and check title", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    const puppeteer = await browser.getPuppeteer();
    const page = (await puppeteer.pages())[0];
    const title = await page.title();
    expect(title).to.be.a("string");
  });
});