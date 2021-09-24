"use strict";

describe("assertion - isPresentByCss (id)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    let isPresented = await nonUi5.element.isPresentByCss("[id='paragraphWithClass']");
    common.assertion.expectTrue(isPresented);

    isPresented = await nonUi5.element.isPresentByCss("#paragraphWithClass");
    common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss (class)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    const isPresented = await nonUi5.element.isPresentByCss(".customClass");
    common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss (partial text for paragraph)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    const isPresented = await nonUi5.element.isPresentByCss("p*=paragraph");
    common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByCss with wrong selector/hidden element and catch error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution and Verification", async function () {
    let isPresented = await nonUi5.element.isPresentByCss("[='wrongSelector']", 1000);
    common.assertion.expectFalse(isPresented);

    isPresented = await nonUi5.element.isPresentByCss("#hiddenParagraph", 1000);
    common.assertion.expectFalse(isPresented);
  });
});