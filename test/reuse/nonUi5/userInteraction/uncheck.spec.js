describe("userInteraction - uncheck - checkbox (checked)", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
    elem = await nonUi5.element.getById("checked");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.uncheck(elem);
  });

  it("Verification", async function () {
    await expect(await nonUi5.element.isSelected(elem)).toBe(false);
  });
});

describe("userInteraction - uncheck - checkbox (unchecked)", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
    elem = await nonUi5.element.getById("unchecked");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.uncheck(elem);
  });

  it("Verification", async function () {
    await expect(await nonUi5.element.isSelected(elem)).toBe(false);
  });
});

describe("userInteraction - uncheck - checkbox (error)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/checkBox.html");
  });

  it("Execution & Verification", async function () {
    const elem = undefined;
    await expect(nonUi5.userInteraction.uncheck(elem, 0, 60000)).rejects.toThrow("Function 'uncheck' failed with: Please provide an element or a CSS selector as first argument.");
  });
});
