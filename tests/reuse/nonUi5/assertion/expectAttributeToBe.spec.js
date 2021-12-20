"use strict";
let selector;

describe("assertion - expectAttributeToBe: title attribute", function () {
  let buttonElement;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    buttonElement = await nonUi5.element.getByCss("#Default");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectAttributeToBe(buttonElement, "default button", "title");
  });
});

describe("assertion - expectAttributeToBe wrong/null/undefined", function () {

  let buttonElement;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    buttonElement = await nonUi5.element.getByCss("#Default");
  });


  it("Verification", async function () {

    await expect(nonUi5.assertion.expectAttributeToBe(buttonElement, "default", "title"))
      .rejects.toThrow(/Expected.*default.*|Received.*default button/);

    await expect(nonUi5.assertion.expectAttributeToBe(buttonElement, null, "title"))
      .rejects.toThrow(/Expected.*null.*|Received.*default button/);

    await expect(nonUi5.assertion.expectAttributeToBe(buttonElement, undefined, "title"))
      .rejects.toThrow(/Expected.*undefined.*|Received.*default button/);

    await expect(nonUi5.assertion.expectAttributeToBe(buttonElement, "", "title"))
      .rejects.toThrow(/Expected.*\"\".*|Received.*default button/);
  });
});
