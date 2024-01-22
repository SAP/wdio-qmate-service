describe("userInteraction - check - checkbox (unchecked)", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
    elem = await nonUi5.element.getById("unchecked");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.check(elem);
  });

  it("Verification", async function () {
    await expect(await nonUi5.element.isSelected(elem)).toBe(true);
  });
});

describe("userInteraction - check - checkbox (checked)", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
    elem = await nonUi5.element.getById("checked");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.check(elem);
  });

  it("Verification", async function () {
    await expect(await nonUi5.element.isSelected(elem)).toBe(true);
  });
});

describe("userInteraction - check - checkbox (error)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
  });

  it("Execution & Verification", async function () {
    const elem = undefined;
    await expect(nonUi5.userInteraction.check(elem, 0, 60000)).rejects.toThrow("Function 'check' failed with: Please provide an element or a CSS selector as first argument.");
  });
});
