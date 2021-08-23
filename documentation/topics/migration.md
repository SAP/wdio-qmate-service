# Migration guide

We try to keep qmate API as stable as possible during protractor->WDIO migration.

But some changes need to be added to the code, especially if you use protractor native functions:

---
## Changes in resue API
### Browser actions

[TODO: need to change vyperForAll name after migration]

|  native protractor function, used in vyperForAll |  native WDIO function | qmate reuse API function  |
|---|---|---|
| browser.sleep(time)  | await browser.pause(time)  | await utilities.browser.sleep(time)  |
| browser..driver.navigate().refresh()  | await browser.refresh() | await utilities.browser.refresh()  |
| browser.get(url)  | await browser.navigateTo(url)  | await non_ui5.common.navigation.navigateToUrl(url)  |
| await browser.switchTo().defaultContent()   |  await browser.switchToFrame(null) | await non_ui5.common.locator.switchToDefaultContent()  |
|   |   |   |



### [Navigation](../../scripts/reuse/ui5/common/modules/navigation.js)

|  native protractor function, used in vyperForAll |  native WDIO function | qmate reuse API function  |
|---|---|---|
| browser.getCurrentUrl()  | browser.getUrl()  | utilities.browser.getCurrentUrl()  |
| browser.baseUrl (to read property) | browser.config.baseUrl  | await utilities.browser.getBaseUrl()  |
| browser.baseUrl (to set property) | browser.config.baseUrl  | await utilities.browser.setBaseUrl() |
| browser.ignoreSynchronization | -  | `TODO` |
|   |   |   |


### Browser configs access
|  vyperForAll | qmate |
|---|---|
| browser.params  | browser.config.params |
| browser.params.coverage.status   | browser.config.params.coverage.status |
|   |   |   |


---
## Changes in Configuration file

### New style of configuration files:

All examples of configuration files are [here](../../tests/reuseApi/configurations)


### Specs

In `wdio-qmate-service` path to specs should be defined in another way:

```js
const path = require("path");
const qmateConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "chrome.headless.conf.js"));
exports.config = merge(qmateConfig.config, {
...
  specs: [
    path.resolve(__dirname, "../scripts/advancedNavigation/specs/advancedNavigation.spec.js"),
    path.resolve(__dirname, "../scripts/advancedNavigation/specs/advancedNavigationInplace.spec.js"),
    path.resolve(__dirname, "../scripts/advancedNavigation/specs/advancedNavigationExplace.spec.js"),
  ],
...
};
```

### Jasmin options
|  vyperForAll | qmate |
|---|---|
|`framework: jasmine2`| not required |
|`jasmineNodeOpts: {`<br>`showColors: false,`<br>`silent: true,`<br>`defaultTimeoutInterval: 600000`<br>`}`|`jasmineOpts: {`<br>`defaultTimeoutInterval: 600000`<br>`}` |


### Run specs sequentially

`VyperForAll` by default runs specs sequentially, in the same browser window and shares state between specs (e.g. cookies etc.).

`wdio-qmate-service` by default runs specs independently, but can be configured to run specs sequentially

Please have a look at [WDIO documentation](https://webdriver.io/docs/organizingsuites/#grouping-test-specs-to-run-sequentially)

Please note that this logic is availble only since [v.7.4.0](https://github.com/webdriverio/webdriverio/blob/main/CHANGELOG.md#v740-2021-04-13)
