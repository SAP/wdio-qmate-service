"use strict";
let selector;

describe("assertion - expectAttributeToContain: title attribute", function () {
  let buttonElement;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    buttonElement = await nonUi5.element.getByCss("#Default");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectAttributeToContain(buttonElement, "default", "title");
  });
});

describe("assertion - expectAttributeToContain wrong/null/undefined", function () {

  let buttonElement;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    buttonElement = await nonUi5.element.getByCss("#Default");
  });


  it("Verification", async function () {

    await expect(nonUi5.assertion.expectAttributeToContain(buttonElement, "defaultx", "title"))
      .rejects.toThrow(/Expected substring.*defaultx.*\s.*Received string.*default button/);

    await expect(nonUi5.assertion.expectAttributeToContain(buttonElement, null, "title"))
      .rejects.toThrow(/Expected.*null.*\sReceived.*\s.*Received.*default button/);

    await expect(nonUi5.assertion.expectAttributeToContain(buttonElement, undefined, "title"))
      .rejects.toThrow(/Expected.*undefined.*\sReceived.*\s.*Received.*default button/);

  });
});
