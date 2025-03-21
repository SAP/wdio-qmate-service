# Spec

> Related Topics: [Features &#10095; Spec](../features/config.md) | [Features &#10095; Selectors](../features/selectors.md)

## Sample

Inside the *.spec.js* file, you define the sequence of steps for your test script. Each file consists of at least one *describe* block.
```js title="clickGoOnListReport.spec.js"
describe("clickGoOnListReport - click 'Go' on ListReport", function () {

  it("Step 01: Navigate to your application", async function () {
    await ui5.navigation.navigateToApplication("PurchaseOrder-manage")
  });

  it("Step 02: Navigate", async function () {
    await ui5.session.login("JOHNDOE", "Greetings1!");
  });

  it("Step 03: Click 'Go' on ListReport", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.m.Button",
        "id": "*listReportFilter-btnGo"
      }   
    };
    await ui5.userInteraction.click(selector);
  });

  // ...

});
```