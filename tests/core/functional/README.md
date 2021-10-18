# Functional tests

### Main goals of *tests/qmate/functional* test folder is to cover [Qmate WDIO API](../../documentation/topics/locators.md) with tests:

- Test locators and how we can access locators via `browser.uiControl()` and `browser.uiControls()`.
- Test all methods (custom commands) from [scripts/hooks/utils/addLocatorCommands.js](../../scripts/hooks/utils/locatorCommands.js) (`getUi5Aggregation()`, `getProperties()` etc.)
- Test corner cases (provide wrong 'elementProperties', try to enter a value to a label, try to click non-clickable element etc.) to check error handling inside custom commands

#### /locators:

- Test only selectors (locators) - `uiControl()` method
- Try all combinations of `elementProperties`, `ancestorProperties`, `descendantProperties` etc.

#### /ui5Properties:

- Test custom commands: `getUi5Aggregation()`, `getUi5Properties()` etc. on both element and browser levels

#### /chaining:

- Test chaining (work on both browser and element levels):
```js
    const list = await browser.uiControl(ui5ControlProperties);
    const firstIitem = await list.uiControl(ui5ControlProperties2, 0);
``` 

#### /nonUi5:
- access UI elements via DOM properties (id, class, li etc.)

#### /nativeBrowser:
- test method `controlActionInBrowser`