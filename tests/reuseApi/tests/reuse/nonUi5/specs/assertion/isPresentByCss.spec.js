"use strict";

describe("assertion - isPresentByCss (id)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    let isPresented = await non_ui5.common.assertion.isPresentByCss("[id='paragraphWithClass']");
    non_ui5.common.assertion.expectTrue(isPresented);

    isPresented = await non_ui5.common.assertion.isPresentByCss("#paragraphWithClass");
    non_ui5.common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss (class)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    const isPresented = await non_ui5.common.assertion.isPresentByCss(".customClass");
    non_ui5.common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss (partial text for paragraph)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    const isPresented = await non_ui5.common.assertion.isPresentByCss("p*=paragraph");
    non_ui5.common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss with wrong selector/hidden element and catch error", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    let isPresented = await non_ui5.common.assertion.isPresentByCss("[='wrongSelector']", 1000);
    non_ui5.common.assertion.expectFalse(isPresented);

    isPresented = await non_ui5.common.assertion.isPresentByCss("#hiddenParagraph", 1000);
    non_ui5.common.assertion.expectFalse(isPresented);
  });
});
