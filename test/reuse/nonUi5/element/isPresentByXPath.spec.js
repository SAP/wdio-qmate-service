"use strict";
describe("element - isPresentByXPath", function () {
  it("Preparation", async function () {
    // XPath presence does not depend on the live Demo Kit's navigation markup.
    const html = "<span>API Reference</span><span hidden>API Reference (hidden)</span>";
    await common.navigation.navigateToUrl(`data:text/html,${encodeURIComponent(html)}`);
  });

  it("finds an element by partial text", async function () {
    const isPresent = await nonUi5.element.isPresentByXPath("//span[contains(text(),'API Reference')]");
    await common.assertion.expectTrue(isPresent);
  });

  it("includes hidden matches at the requested index", async function () {
    const isPresent = await nonUi5.element.isPresentByXPath("//span[contains(text(),'API Reference')]", 1);
    await common.assertion.expectTrue(isPresent);
  });

  it("returns false for a missing element", async function () {
    const isPresent = await nonUi5.element.isPresentByXPath("//span[contains(text(),'Wrong Text')]", 0, 1000);
    await common.assertion.expectFalse(isPresent);
  });

  it("returns false for an index beyond the matches", async function () {
    const isPresent = await nonUi5.element.isPresentByXPath("//span[contains(text(),'API Reference')]", 2);
    await common.assertion.expectFalse(isPresent);
  });
});
