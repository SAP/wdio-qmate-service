# Functional tests

### Main goals of *tests/qmate/functional* test folder is to cover [Qmate WDIO API](../../../documentation/topics/native/doc.md) with tests:

- Test locators and how we can access locators via `browser.uiControl()` and `browser.uiControls()`.
- Test all methods (custom commands) from *scripts/hooks/utils/addLocatorCommands.js* (`getUi5Aggregation()`, `getProperties()` etc.)
- Test corner cases (provide wrong 'elementProperties', try to enter a value to a label, try to click non-clickable element etc.) to check error handling inside custom commands

#### tests/qmate/functional/locators:

- Test only selectors (locators) - `uiControl()` method
- Try all combinations of `elementProperties`, `ancestorProperties`, `descendantProperties` etc.

#### tests/qmate/functional/ui5Properties:

- Test custom commands: `getUi5Aggregation()`, `getUi5Properties()` etc. on both element and browser levels

#### tests/qmate/functional/chaning:

- Test chaining (work on both browser and element levels):
```js
    const list = await browser.uiControl(ui5ControlProperties);
    const firstIitem = await list.uiControl(ui5ControlProperties2, 0);
``` 

#### tests/qmate/functional/nonUi5:
- access UI elements via DOM properties (id, class, li etc.)

#### tests/qmate/functional/nativeBrowser:
- test method `controlActionInBrowser`


----
### Assertion:
 - Use native WDIO `expect` to test/check/assert browser-related properties, e.g. `isClickable()`, `isAvailableInViewpoint` etc.)
 - Use Chai `expect` as `chaiExpect` to check common properties, e.g. `chaiExpect(element).to.be.an("object")`, `chaiExpect(element).to.have.property("someProperty")`, `chaiExpect(element).to.be.true` etc.

Use [this file](https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/tests/testIntegration/filters1.spec.js) to find some test cases

