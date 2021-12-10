"use strict";
describe("userInteraction - dragAndDrop - successful 1", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/dragAndDropWdioExample.html");
  });

  it("Execution", async function () {
    const draggable = await nonUi5.element.getById("draggable");
    const droppable = await nonUi5.element.getById("droppable");
    const innerText = await nonUi5.element.getValue(droppable);
    await common.assertion.expectEqual(innerText, "Drop here");
    await nonUi5.userInteraction.dragAndDrop(draggable, droppable);
  });

  it("Verification", async function () {
    const dropped = await nonUi5.element.getById("droppable");
    const text = await nonUi5.element.getValue(dropped);
    common.assertion.expectEqual(text, "Dropped!");
  });
});

// NOTE - this drag and drop implementation fails.
// From WDIO documentation: "The functionality of this command highly depends on the way drag and drop is implemented in your app..." https://webdriver.io/docs/api/element/dragAndDrop/
// describe("userInteraction - dragAndDrop - successful 2", async function () {
//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("http://localhost:34005/dragAndDropFailing.html");
//   });

//   it("Execution", async function () {
//     const sourceElement = await nonUi5.element.getById("draggableParagraph");
//     const targetElement = await nonUi5.element.getById("dropTargetDiv");
//     await nonUi5.userInteraction.dragAndDrop(sourceElement, targetElement);
//   });

//   it("Verification", async function () {
//     const targetElement = await nonUi5.element.getById("dropTargetDiv");
//     const text = await targetElement.getText();
//     common.assertion.expectUnequal(text, ""); 
//   });
// });