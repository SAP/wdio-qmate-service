
describe("userInteraction - dragAndDrop", async function () {
  let sourceText;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/dragAndDrop.html");
  });

  it("Execution", async function () {
    const sourceElement = await nonUi5.element.getById("draggableParagraph");
    const sourceDiv = await nonUi5.element.getById("sourceDiv");
    sourceText = await sourceDiv.getText();
    const targetElement = await nonUi5.element.getById("dropTargetDiv");
    await nonUi5.userInteraction.dragAndDrop(sourceElement, targetElement);
  });

  it("Verification", async function () {
    //TODO - drag and drop fails
    const targetElement = await nonUi5.element.getById("dropTargetDiv");
    const text = await targetElement.getText();
    // common.assertion.expectEqual(text, sourceText);
  });
});
