## Constants

<dl>
<dt><a href="#common">common</a></dt>
<dd><p>Global namespace for common modules.</p>
</dd>
<dt><a href="#ui5">ui5</a></dt>
<dd><p>Global namespace for UI5 modules.</p>
</dd>
<dt><a href="#nonUi5">nonUi5</a></dt>
<dd><p>Global namespace for non UI5 modules.</p>
</dd>
</dl>

<a name="common"></a>

## common
Global namespace for common modules.

**Kind**: global constant  

* [common](#common)
    * [.assertion](#common.assertion)
        * [.expectEqual(value1, value2)](#common.assertion.expectEqual)
        * [.expectUnequal(value1, value2)](#common.assertion.expectUnequal)
        * [.expectTrue(value)](#common.assertion.expectTrue)
        * [.expectFalse(value)](#common.assertion.expectFalse) ⇒ <code>Promise</code>
        * [.expectDefined(value)](#common.assertion.expectDefined)
        * [.expectUndefined(value)](#common.assertion.expectUndefined)
        * [.expectUrlToBe()](#common.assertion.expectUrlToBe) ⇒ <code>Promise</code>
    * [.browser](#common.browser)
        * [.getBaseUrl()](#common.browser.getBaseUrl) ⇒ <code>String</code>
        * [.setBaseUrl(baseUrl:)](#common.browser.setBaseUrl)
        * [.sleep([duration])](#common.browser.sleep)
        * [.sleepAndCollectCoverage([sleep])](#common.browser.sleepAndCollectCoverage)
        * [.refresh()](#common.browser.refresh)
        * [.clearBrowser([clearLocal], [clearSession], [clearCookies])](#common.browser.clearBrowser)
        * [.sendKeys(keys)](#common.browser.sendKeys)
        * [.getBrowserName()](#common.browser.getBrowserName) ⇒ <code>String</code>
        * [.getUI5Version()](#common.browser.getUI5Version)
        * [.executeScript(command)](#common.browser.executeScript)
        * [.waitForWindows()](#common.browser.waitForWindows)
        * [.switchToNewWindow(originalHandle, windowTitle)](#common.browser.switchToNewWindow)
        * [.switchToWindow(handle)](#common.browser.switchToWindow)
        * [.getCurrentWindow()](#common.browser.getCurrentWindow) ⇒ <code>Object</code>
    * [.console](#common.console)
        * [.log(message, [textColor], [backgroundColor], [brightness])](#common.console.log)
        * [.error(message)](#common.console.error)
        * [.warn(message)](#common.console.warn)
        * [.success(message)](#common.console.success)
        * [.info(message)](#common.console.info)
    * [.date](#common.date)
        * [.getToday([format])](#common.date.getToday) ⇒ <code>String</code>
        * [.getTomorrow([format])](#common.date.getTomorrow) ⇒ <code>String</code>
        * [.getNextMonth([format])](#common.date.getNextMonth) ⇒ <code>String</code>
        * [.getPreviousMonth([format])](#common.date.getPreviousMonth) ⇒ <code>String</code>
        * [.getNextYear([format])](#common.date.getNextYear) ⇒ <code>String</code>
        * [.getPreviousYear([format])](#common.date.getPreviousYear) ⇒ <code>String</code>
        * [.getSpecificDate(date, [format])](#common.date.getSpecificDate) ⇒ <code>String</code>
        * [.calculateDate([date], [format])](#common.date.calculateDate) ⇒ <code>String</code>
    * [.navigation](#common.navigation)
        * [.navigateToUrl(url)](#common.navigation.navigateToUrl)
        * [.navigateToUrlAndRetry(url, [retries], [interval])](#common.navigation.navigateToUrlAndRetry)
        * [.printCurrentUrl()](#common.navigation.printCurrentUrl)
    * [.userInteraction](#common.userInteraction)
        * [.fillActive(value)](#common.userInteraction.fillActive)
        * [.fillActiveAndRetry(value, [retries], [interval])](#common.userInteraction.fillActiveAndRetry)
        * [.clearAndFillActive(value)](#common.userInteraction.clearAndFillActive)
        * [.clearFillActiveAndRetry(value, [retries], [interval])](#common.userInteraction.clearFillActiveAndRetry)
        * [.pressEnter()](#common.userInteraction.pressEnter)
        * [.pressTab()](#common.userInteraction.pressTab)
        * [.pressF4()](#common.userInteraction.pressF4)
        * [.pressBackspace()](#common.userInteraction.pressBackspace)
        * [.pressEscape()](#common.userInteraction.pressEscape)
        * [.pressArrowLeft()](#common.userInteraction.pressArrowLeft)
        * [.pressArrowRight()](#common.userInteraction.pressArrowRight)

<a name="common.assertion"></a>

### common.assertion
**Kind**: static class of [<code>common</code>](#common)  

* [.assertion](#common.assertion)
    * [.expectEqual(value1, value2)](#common.assertion.expectEqual)
    * [.expectUnequal(value1, value2)](#common.assertion.expectUnequal)
    * [.expectTrue(value)](#common.assertion.expectTrue)
    * [.expectFalse(value)](#common.assertion.expectFalse) ⇒ <code>Promise</code>
    * [.expectDefined(value)](#common.assertion.expectDefined)
    * [.expectUndefined(value)](#common.assertion.expectUndefined)
    * [.expectUrlToBe()](#common.assertion.expectUrlToBe) ⇒ <code>Promise</code>

<a name="common.assertion.expectEqual"></a>

#### assertion.expectEqual(value1, value2)
Expects the passed values to be equal.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be equal to value (2) |
| value2 | <code>Any</code> | Value (2) to be equal to value (1) |

**Example**  
```js
common.assertion.expectEqual(value1, value2);
```
<a name="common.assertion.expectUnequal"></a>

#### assertion.expectUnequal(value1, value2)
Expects the passed values to be unequal.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be unequal to value (2) |
| value2 | <code>Any</code> | Value (2) to be unequal to value (1) |

**Example**  
```js
common.assertion.expectUnequal(value1, value2);
```
<a name="common.assertion.expectTrue"></a>

#### assertion.expectTrue(value)
Expects the passed value to be true.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be equal to true |

**Example**  
```js
common.assertion.expectTrue(value);
```
<a name="common.assertion.expectFalse"></a>

#### assertion.expectFalse(value) ⇒ <code>Promise</code>
Expects the passed value to be false.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to be false. |

**Example**  
```js
await common.assertion.expectFalse(false);
```
<a name="common.assertion.expectDefined"></a>

#### assertion.expectDefined(value)
Expects the passed values is defined.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be defined (not undefined) |

**Example**  
```js
common.assertion.expectDefined(value);
```
<a name="common.assertion.expectUndefined"></a>

#### assertion.expectUndefined(value)
Expects the passed values is undefined.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be undefined |

**Example**  
```js
common.assertion.expectUndefined(value);
```
<a name="common.assertion.expectUrlToBe"></a>

#### assertion.expectUrlToBe() ⇒ <code>Promise</code>
Expects the url to be the passed value.

**Kind**: static method of [<code>assertion</code>](#common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await common.assertion.expectUrlToBe("www.sap.com");
```
<a name="common.browser"></a>

### common.browser
**Kind**: static class of [<code>common</code>](#common)  

* [.browser](#common.browser)
    * [.getBaseUrl()](#common.browser.getBaseUrl) ⇒ <code>String</code>
    * [.setBaseUrl(baseUrl:)](#common.browser.setBaseUrl)
    * [.sleep([duration])](#common.browser.sleep)
    * [.sleepAndCollectCoverage([sleep])](#common.browser.sleepAndCollectCoverage)
    * [.refresh()](#common.browser.refresh)
    * [.clearBrowser([clearLocal], [clearSession], [clearCookies])](#common.browser.clearBrowser)
    * [.sendKeys(keys)](#common.browser.sendKeys)
    * [.getBrowserName()](#common.browser.getBrowserName) ⇒ <code>String</code>
    * [.getUI5Version()](#common.browser.getUI5Version)
    * [.executeScript(command)](#common.browser.executeScript)
    * [.waitForWindows()](#common.browser.waitForWindows)
    * [.switchToNewWindow(originalHandle, windowTitle)](#common.browser.switchToNewWindow)
    * [.switchToWindow(handle)](#common.browser.switchToWindow)
    * [.getCurrentWindow()](#common.browser.getCurrentWindow) ⇒ <code>Object</code>

<a name="common.browser.getBaseUrl"></a>

#### browser.getBaseUrl() ⇒ <code>String</code>
Retrieves the baseUrl from the configuration file.

**Kind**: static method of [<code>browser</code>](#common.browser)  
**Returns**: <code>String</code> - The baseUrl.  
**Example**  
```js
const baseUrl = await common.browser.getBaseUrl();
```
<a name="common.browser.setBaseUrl"></a>

#### browser.setBaseUrl(baseUrl:)
Sets or overwrites the baseUrl in the configuration file.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl: | <code>String</code> | base URL to set |

**Example**  
```js
await common.browser.setBaseUrl("https://cc3-721.wdf.sap.corp/ui");
```
<a name="common.browser.sleep"></a>

#### browser.sleep([duration])
Sleeps (pauses execution) for the passed duration.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [duration] | <code>Number</code> | <code>1000</code> | The time to pause (ms). |

**Example**  
```js
await common.browser.sleep(30000);
```
<a name="common.browser.sleepAndCollectCoverage"></a>

#### browser.sleepAndCollectCoverage([sleep])
Collects and stores the coverage information before a hard browser event (logout, clear history),also useful when parallelizing multiple specs and need to aggregate the coverage information

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [sleep] | <code>Integer</code> | <code>5000</code> | The time to pause (ms). |

**Example**  
```js
await common.browser.sleepAndCollectCoverage(5000);
```
<a name="common.browser.refresh"></a>

#### browser.refresh()
Refreshes the page.

**Kind**: static method of [<code>browser</code>](#common.browser)  
**Example**  
```js
await common.browser.refresh();
```
<a name="common.browser.clearBrowser"></a>

#### browser.clearBrowser([clearLocal], [clearSession], [clearCookies])
Clears the local and session cache and deletes all browser cookies.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [clearLocal] | <code>Boolean</code> | <code>true</code> | Specifies if the local cache will be cleared. |
| [clearSession] | <code>Boolean</code> | <code>true</code> | Specifies if the session cache will be cleared. |
| [clearCookies] | <code>Boolean</code> | <code>true</code> | Specifies if the cookies will be cleared. |

**Example**  
```js
await common.browser.clearBrowser();
```
<a name="common.browser.sendKeys"></a>

#### browser.sendKeys(keys)
Executes the set of keystrokes.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>String</code> | The combination of keys to execute. |

**Example**  
```js
await common.browser.sendKeys(protractor.Key.CONTROL, protractor.Key.ALT, "d");
```
<a name="common.browser.getBrowserName"></a>

#### browser.getBrowserName() ⇒ <code>String</code>
Retrieves the name of the current browser.

**Kind**: static method of [<code>browser</code>](#common.browser)  
**Returns**: <code>String</code> - The browser name.  
**Example**  
```js
const browserName = await common.browser.getBrowserName();
```
<a name="common.browser.getUI5Version"></a>

#### browser.getUI5Version()
Gets the UI5 version and creation date for UI5 based applications.

**Kind**: static method of [<code>browser</code>](#common.browser)  
**Example**  
```js
await common.browser.getUI5Version();
```
<a name="common.browser.executeScript"></a>

#### browser.executeScript(command)
Executes the specified JavaScript command.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to execute. |

**Example**  
```js
await common.browser.executeScript(command);
```
<a name="common.browser.waitForWindows"></a>

#### browser.waitForWindows()
**Kind**: static method of [<code>browser</code>](#common.browser)  
**Example**  
```js
await common.browser.waitForWindows();
```
<a name="common.browser.switchToNewWindow"></a>

#### browser.switchToNewWindow(originalHandle, windowTitle)
Switches the window.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Description |
| --- | --- | --- |
| originalHandle | <code>String</code> | The main window handle. |
| windowTitle | <code>String</code> | Window Title to be expected |

**Example**  
```js
await common.browser.switchToNewWindow(originalHandle,);
```
<a name="common.browser.switchToWindow"></a>

#### browser.switchToWindow(handle)
Switches to the passed window.

**Kind**: static method of [<code>browser</code>](#common.browser)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>Object</code> | The window handle. |

**Example**  
```js
await common.browser.switchToWindow(originalWindowHandle);
```
<a name="common.browser.getCurrentWindow"></a>

#### browser.getCurrentWindow() ⇒ <code>Object</code>
Returns the current window handle.

**Kind**: static method of [<code>browser</code>](#common.browser)  
**Returns**: <code>Object</code> - The window handle.  
**Example**  
```js
await common.browser.getCurrentWindow();
```
<a name="common.console"></a>

### common.console
**Kind**: static class of [<code>common</code>](#common)  

* [.console](#common.console)
    * [.log(message, [textColor], [backgroundColor], [brightness])](#common.console.log)
    * [.error(message)](#common.console.error)
    * [.warn(message)](#common.console.warn)
    * [.success(message)](#common.console.success)
    * [.info(message)](#common.console.info)

<a name="common.console.log"></a>

#### console.log(message, [textColor], [backgroundColor], [brightness])
Logs a message to the console in the given color.

**Kind**: static method of [<code>console</code>](#common.console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to log. |
| [textColor] | <code>String</code> | The color of the text: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta". |
| [backgroundColor] | <code>String</code> | The color of the background: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta". |
| [brightness] | <code>String</code> | Adjusts the brightness of the color: "bright", "dim". Leave empty for default. |

**Example**  
```js
common.console.log("The document has been saved.", "green");
```
<a name="common.console.error"></a>

#### console.error(message)
Logs a error message to the console in red.

**Kind**: static method of [<code>console</code>](#common.console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to log. |

**Example**  
```js
common.console.error("Error: Please investigate.");
```
<a name="common.console.warn"></a>

#### console.warn(message)
Logs a warning message to the console in yellow.

**Kind**: static method of [<code>console</code>](#common.console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to log. |

**Example**  
```js
common.console.warn("Optional step not executed.");
```
<a name="common.console.success"></a>

#### console.success(message)
Logs a success message to the console in green.

**Kind**: static method of [<code>console</code>](#common.console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to log. |

**Example**  
```js
common.console.success("The document has been saved.");
```
<a name="common.console.info"></a>

#### console.info(message)
Logs a info message to the console in cyan.

**Kind**: static method of [<code>console</code>](#common.console)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to log. |

**Example**  
```js
common.console.success("The document has been saved.");
```
<a name="common.date"></a>

### common.date
**Kind**: static class of [<code>common</code>](#common)  

* [.date](#common.date)
    * [.getToday([format])](#common.date.getToday) ⇒ <code>String</code>
    * [.getTomorrow([format])](#common.date.getTomorrow) ⇒ <code>String</code>
    * [.getNextMonth([format])](#common.date.getNextMonth) ⇒ <code>String</code>
    * [.getPreviousMonth([format])](#common.date.getPreviousMonth) ⇒ <code>String</code>
    * [.getNextYear([format])](#common.date.getNextYear) ⇒ <code>String</code>
    * [.getPreviousYear([format])](#common.date.getPreviousYear) ⇒ <code>String</code>
    * [.getSpecificDate(date, [format])](#common.date.getSpecificDate) ⇒ <code>String</code>
    * [.calculateDate([date], [format])](#common.date.calculateDate) ⇒ <code>String</code>

<a name="common.date.getToday"></a>

#### date.getToday([format]) ⇒ <code>String</code>
Returns the current day in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getToday("mm/dd/yyyy");
```
<a name="common.date.getTomorrow"></a>

#### date.getTomorrow([format]) ⇒ <code>String</code>
Returns tomorrows date in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getTomorrow("mm/dd/yyyy");
```
<a name="common.date.getNextMonth"></a>

#### date.getNextMonth([format]) ⇒ <code>String</code>
Returns the current day one month later in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getNextMonth("mm/dd/yyyy");
```
<a name="common.date.getPreviousMonth"></a>

#### date.getPreviousMonth([format]) ⇒ <code>String</code>
Returns the current day one month before in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getPreviousMonth("mm/dd/yyyy");
```
<a name="common.date.getNextYear"></a>

#### date.getNextYear([format]) ⇒ <code>String</code>
Returns the current day one year later in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getNextYear("mm/dd/yyyy");
```
<a name="common.date.getPreviousYear"></a>

#### date.getPreviousYear([format]) ⇒ <code>String</code>
Returns the current day one year before in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getPreviousYear("mm/dd/yyyy");
```
<a name="common.date.getSpecificDate"></a>

#### date.getSpecificDate(date, [format]) ⇒ <code>String</code>
Returns a specific date in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>String</code> |  | A specific date string. |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "dd.mm.yyyy.HH.MM", "datetime", "object"). |

**Example**  
```js
const date = await common.date.getSpecificDate("2020, 0, 17", "mm/dd/yyyy");
```
<a name="common.date.calculateDate"></a>

#### date.calculateDate([date], [format]) ⇒ <code>String</code>
Calculates the date based on the input parameter and returns it in the given format.

**Kind**: static method of [<code>date</code>](#common.date)  
**Returns**: <code>String</code> - The calculated date in the given format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>String</code> | <code>&quot;today&quot;</code> | Supported values: today, tomorrow, nextMonth, previousMonth, nextYear, lastYear |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object"). |

**Example**  
```js
const date = await common.date.calculateDate("today", "mm/dd/yyy");
```
<a name="common.navigation"></a>

### common.navigation
**Kind**: static class of [<code>common</code>](#common)  

* [.navigation](#common.navigation)
    * [.navigateToUrl(url)](#common.navigation.navigateToUrl)
    * [.navigateToUrlAndRetry(url, [retries], [interval])](#common.navigation.navigateToUrlAndRetry)
    * [.printCurrentUrl()](#common.navigation.printCurrentUrl)

<a name="common.navigation.navigateToUrl"></a>

#### navigation.navigateToUrl(url)
Navigates to the passed url.

**Kind**: static method of [<code>navigation</code>](#common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url. |

**Example**  
```js
await common.navigation.navigateToUrl("www.sap.com");
```
<a name="common.navigation.navigateToUrlAndRetry"></a>

#### navigation.navigateToUrlAndRetry(url, [retries], [interval])
Navigates to the passed url and retries the function in case of a failure.

**Kind**: static method of [<code>navigation</code>](#common.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>String</code> |  | The url to navigate to. |
| [retries] | <code>Integer</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Integer</code> | <code>5000</code> | The interval of the retries (ms), can be set in config for all functions under params stepRetriesIntervals. |

**Example**  
```js
await common.navigation.navigateToUrlAndRetry("www.sap.com");
```
<a name="common.navigation.printCurrentUrl"></a>

#### navigation.printCurrentUrl()
Displays the current URL in the console.

**Kind**: static method of [<code>navigation</code>](#common.navigation)  
**Example**  
```js
await common.navigation.printCurrentUrl();
```
<a name="common.userInteraction"></a>

### common.userInteraction
**Kind**: static class of [<code>common</code>](#common)  

* [.userInteraction](#common.userInteraction)
    * [.fillActive(value)](#common.userInteraction.fillActive)
    * [.fillActiveAndRetry(value, [retries], [interval])](#common.userInteraction.fillActiveAndRetry)
    * [.clearAndFillActive(value)](#common.userInteraction.clearAndFillActive)
    * [.clearFillActiveAndRetry(value, [retries], [interval])](#common.userInteraction.clearFillActiveAndRetry)
    * [.pressEnter()](#common.userInteraction.pressEnter)
    * [.pressTab()](#common.userInteraction.pressTab)
    * [.pressF4()](#common.userInteraction.pressF4)
    * [.pressBackspace()](#common.userInteraction.pressBackspace)
    * [.pressEscape()](#common.userInteraction.pressEscape)
    * [.pressArrowLeft()](#common.userInteraction.pressArrowLeft)
    * [.pressArrowRight()](#common.userInteraction.pressArrowRight)

<a name="common.userInteraction.fillActive"></a>

#### userInteraction.fillActive(value)
Fills the active input with the given value.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |

**Example**  
```js
await common.userInteraction.fillActive("My Value");
```
<a name="common.userInteraction.fillActiveAndRetry"></a>

#### userInteraction.fillActiveAndRetry(value, [retries], [interval])
Enters the given value to the active input field and retries the action in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>String</code> |  | The value with witch the input should be filled. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await common.userInteraction.fillActiveAndRetry("My Value");
```
<a name="common.userInteraction.clearAndFillActive"></a>

#### userInteraction.clearAndFillActive(value)
Clears and fills the active input.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value to enter. |

**Example**  
```js
await common.userInteraction.clearAndFillActive("My Value");
```
<a name="common.userInteraction.clearFillActiveAndRetry"></a>

#### userInteraction.clearFillActiveAndRetry(value, [retries], [interval])
CClears and fills the active input. Retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>String</code> |  | The value to enter. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await common.userInteraction.clearFillActiveAndRetry("My Value");
```
<a name="common.userInteraction.pressEnter"></a>

#### userInteraction.pressEnter()
Performs the Enter keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressEnter();
```
<a name="common.userInteraction.pressTab"></a>

#### userInteraction.pressTab()
Performs the Tab keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressTab();
```
<a name="common.userInteraction.pressF4"></a>

#### userInteraction.pressF4()
Performs the F4 keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressF4();
```
<a name="common.userInteraction.pressBackspace"></a>

#### userInteraction.pressBackspace()
Performs the Backspace keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressBackspace();
```
<a name="common.userInteraction.pressEscape"></a>

#### userInteraction.pressEscape()
Performs the Escape keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressEscape();
```
<a name="common.userInteraction.pressArrowLeft"></a>

#### userInteraction.pressArrowLeft()
Performs the Arrow Left keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressArrowLeft();
```
<a name="common.userInteraction.pressArrowRight"></a>

#### userInteraction.pressArrowRight()
Performs the Arrow Right keypress.

**Kind**: static method of [<code>userInteraction</code>](#common.userInteraction)  
**Example**  
```js
await common.userInteraction.pressArrowRight();
```
<a name="ui5"></a>

## ui5
Global namespace for UI5 modules.

**Kind**: global constant  

* [ui5](#ui5)
    * [.assertion](#ui5.assertion)
        * [.expectAttributeToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectAttributeToBe) ⇒ <code>Promise</code>
        * [.expectAttributeToContain(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectAttributeToContain) ⇒ <code>Promise</code>
        * [.expectTextToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectTextToBe) ⇒ <code>Promise</code>
        * [.expectValueToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValueToBe) ⇒ <code>Promise</code>
        * [.expectValueToBeDefined(selector, [index], [timeout])](#ui5.assertion.expectValueToBeDefined) ⇒ <code>Promise</code>
        * [.expectToBeNotEnabled(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeNotEnabled) ⇒ <code>Promise</code>
        * [.expectToBeEnabled(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeEnabled) ⇒ <code>Promise</code>
        * [.expectValidationError(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValidationError) ⇒ <code>Promise</code>
        * [.expectValidationSuccess(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValidationSuccess) ⇒ <code>Promise</code>
        * [.expectBindingPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectBindingPathToBe) ⇒ <code>Promise</code>
        * [.expectBindingContextPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectBindingContextPathToBe) ⇒ <code>Promise</code>
        * [.expectToBeVisible(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeVisible) ⇒ <code>Promise</code>
        * [.expectToBeVisibleInViewport(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeVisibleInViewport) ⇒ <code>Promise</code>
        * [.expectToBeNotVisible(selector, [index], [timeout])](#ui5.assertion.expectToBeNotVisible) ⇒ <code>Promise</code>
        * [.expectPageTitle(compareValue)](#ui5.assertion.expectPageTitle) ⇒ <code>Promise</code>
        * [.expectShellHeader()](#ui5.assertion.expectShellHeader) ⇒ <code>Promise</code>
        * [.expectLogoutText()](#ui5.assertion.expectLogoutText) ⇒ <code>Promise</code>
        * [.expectUnsupportedNavigationPopup(navigationTarget)](#ui5.assertion.expectUnsupportedNavigationPopup) ⇒ <code>Promise</code>
        * [.expectMessageToastText(text, [timeout])](#ui5.assertion.expectMessageToastText) ⇒ <code>Promise</code>
    * [.date](#ui5.date)
        * [.pickDate(selector, date)](#ui5.date.pickDate)
        * [.pickDateRange(selector, range)](#ui5.date.pickDateRange)
        * [.fillDateRange(selector, range)](#ui5.date.fillDateRange)
    * [.element](#ui5.element)
        * [.waitForAllElements(selector, [timeout])](#ui5.element.waitForAllElements)
        * [.getDisplayedElements(selector, [timeout])](#ui5.element.getDisplayedElements) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getDisplayedElement(selector, [index], [timeout])](#ui5.element.getDisplayedElement) ⇒ <code>Object</code>
        * [.getDisplayedChildElement(parentSelector, childSelector, [parentIndex], [childIndex], [timeout])](#ui5.element.getDisplayedChildElement) ⇒ <code>Object</code>
        * [.getElementByText(selector, value, [index], [timeout])](#ui5.element.getElementByText) ⇒ <code>Object</code>
        * [.getElementId(selector, [index], [timeout])](#ui5.element.getElementId) ⇒ <code>String</code>
        * [.getValue(selector, attribute, [index], [timeout])](#ui5.element.getValue) ⇒ <code>String</code>
        * [.getBindingValue(selector, attribute, [index], [timeout])](#ui5.element.getBindingValue) ⇒ <code>String</code>
        * [.isVisible(selector, [index], [timeout])](#ui5.element.isVisible) ⇒ <code>Boolean</code>
        * [.scrollToElement(selector, [index], [alignment], [timeout])](#ui5.element.scrollToElement)
        * [.highlightElement(selector, [duration], [color])](#ui5.element.highlightElement)
    * [.navigation](#ui5.navigation)
        * [.navigateToApplication(intent, [preventPopups], [verify])](#ui5.navigation.navigateToApplication)
        * [.navigateToApplicationAndRetry(intent, [preventPopups], [verify], [retries], [interval])](#ui5.navigation.navigateToApplicationAndRetry)
        * [.navigateToSystemAndApplication(system, intent, [closePopups], [verify])](#ui5.navigation.navigateToSystemAndApplication)
        * [.navigateToSystemAndApplicationAndRetry(system, intent, [closePopups], [verify], [retries], [interval])](#ui5.navigation.navigateToSystemAndApplicationAndRetry)
        * [.navigateToApplicationWithQueryParams(intent, queryParams, [preventPopups], [verify])](#ui5.navigation.navigateToApplicationWithQueryParams)
        * [.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, [preventPopups], [verify], [retries], [interval])](#ui5.navigation.navigateToApplicationWithQueryParamsAndRetry)
        * [.closePopups([timeout])](#ui5.navigation.closePopups)
    * [.session](#ui5.session)
        * [.login(username, [password], [verify], [timeout])](#ui5.session.login)
        * [.loginFiori(username, [password], [verify])](#ui5.session.loginFiori)
        * [.loginSapCloud(username, [password], [verify])](#ui5.session.loginSapCloud)
        * [.loginCustom(username, [password], usernameFieldSelector, passwordFieldSelector, logonButtonSelector, [verify])](#ui5.session.loginCustom)
        * [.loginCustomViaConfig(username, password, [verify])](#ui5.session.loginCustomViaConfig)
        * [.logout([verify])](#ui5.session.logout)
    * [.userInteraction](#ui5.userInteraction)
        * [.click(selector, [index], [timeout])](#ui5.userInteraction.click)
        * [.clickAndRetry(selector, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clickAndRetry)
        * [.clickTab(selector, [index], [timeout])](#ui5.userInteraction.clickTab)
        * [.clickListItem(selector, [index], [timeout])](#ui5.userInteraction.clickListItem)
        * [.fill(selector, value, [index], [timeout])](#ui5.userInteraction.fill)
        * [.fillAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.fillAndRetry)
        * [.clear(selector, [index], [timeout])](#ui5.userInteraction.clear)
        * [.clearAndRetry(selector, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndRetry)
        * [.clearAndFill(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFill)
        * [.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], [verify])](#ui5.userInteraction.clearFillAndRetry)
        * [.clearSmartFieldInput(selector, [index], [timeout])](#ui5.userInteraction.clearSmartFieldInput)
        * [.clearAndFillSmartFieldInput(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFillSmartFieldInput)
        * [.clearAndFillSmartFieldInputAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndFillSmartFieldInputAndRetry)
        * [.selectBox(selector, value, [index])](#ui5.userInteraction.selectBox)
        * [.selectComboBox(selector, value, [index])](#ui5.userInteraction.selectComboBox)
        * [.selectMultiComboBox(selector, values, [index])](#ui5.userInteraction.selectMultiComboBox)
        * [.clickSelectArrow(selector, [index])](#ui5.userInteraction.clickSelectArrow)
        * [.clickSelectArrowAndRetry(selector, [index], [retries], [interval])](#ui5.userInteraction.clickSelectArrowAndRetry)
        * [.selectAll([selector], [index], [timeout])](#ui5.userInteraction.selectAll)
        * [.openF4Help(selector, [index], [timeout], useF4Key)](#ui5.userInteraction.openF4Help)
        * [.searchFor(selector, [index], [timeout], useEnter)](#ui5.userInteraction.searchFor)
        * [.resetSearch(selector, [index], [timeout])](#ui5.userInteraction.resetSearch)

<a name="ui5.assertion"></a>

### ui5.assertion
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.assertion](#ui5.assertion)
    * [.expectAttributeToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectAttributeToBe) ⇒ <code>Promise</code>
    * [.expectAttributeToContain(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectAttributeToContain) ⇒ <code>Promise</code>
    * [.expectTextToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectTextToBe) ⇒ <code>Promise</code>
    * [.expectValueToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValueToBe) ⇒ <code>Promise</code>
    * [.expectValueToBeDefined(selector, [index], [timeout])](#ui5.assertion.expectValueToBeDefined) ⇒ <code>Promise</code>
    * [.expectToBeNotEnabled(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeNotEnabled) ⇒ <code>Promise</code>
    * [.expectToBeEnabled(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeEnabled) ⇒ <code>Promise</code>
    * [.expectValidationError(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValidationError) ⇒ <code>Promise</code>
    * [.expectValidationSuccess(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectValidationSuccess) ⇒ <code>Promise</code>
    * [.expectBindingPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectBindingPathToBe) ⇒ <code>Promise</code>
    * [.expectBindingContextPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectBindingContextPathToBe) ⇒ <code>Promise</code>
    * [.expectToBeVisible(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeVisible) ⇒ <code>Promise</code>
    * [.expectToBeVisibleInViewport(selector, [index], [timeout], [loadPropertyTimeout])](#ui5.assertion.expectToBeVisibleInViewport) ⇒ <code>Promise</code>
    * [.expectToBeNotVisible(selector, [index], [timeout])](#ui5.assertion.expectToBeNotVisible) ⇒ <code>Promise</code>
    * [.expectPageTitle(compareValue)](#ui5.assertion.expectPageTitle) ⇒ <code>Promise</code>
    * [.expectShellHeader()](#ui5.assertion.expectShellHeader) ⇒ <code>Promise</code>
    * [.expectLogoutText()](#ui5.assertion.expectLogoutText) ⇒ <code>Promise</code>
    * [.expectUnsupportedNavigationPopup(navigationTarget)](#ui5.assertion.expectUnsupportedNavigationPopup) ⇒ <code>Promise</code>
    * [.expectMessageToastText(text, [timeout])](#ui5.assertion.expectMessageToastText) ⇒ <code>Promise</code>

<a name="ui5.assertion.expectAttributeToBe"></a>

#### assertion.expectAttributeToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements attribute to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute to be compared. |
| compareValue | <code>String</code> \| <code>Boolean</code> \| <code>Number</code> \| <code>Object</code> |  | The compare value. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectAttributeToBe(selector, "text", "Hello");
```
<a name="ui5.assertion.expectAttributeToContain"></a>

#### assertion.expectAttributeToContain(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements attribute to contain the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute to be compared. |
| compareValue | <code>String</code> |  | The compare value. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectAttributeToContain(selector, "text", "abc");
```
<a name="ui5.assertion.expectTextToBe"></a>

#### assertion.expectTextToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements text attribute to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| compareValue | <code>String</code> |  | The compare value. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectTextToBe(selector, "Hello");
```
<a name="ui5.assertion.expectValueToBe"></a>

#### assertion.expectValueToBe(selector, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements value attribute to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| compareValue | <code>String</code> \| <code>Number</code> |  | The compare value. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectValueToBe(selector, "123");
```
<a name="ui5.assertion.expectValueToBeDefined"></a>

#### assertion.expectValueToBeDefined(selector, [index], [timeout]) ⇒ <code>Promise</code>
Expects the passed elements value to be defined.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.assertion.expectValueToBeDefined(selector);
```
<a name="ui5.assertion.expectToBeNotEnabled"></a>

#### assertion.expectToBeNotEnabled(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects that the element is enabled to the user.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectToBeNotEnabled(selector);
```
<a name="ui5.assertion.expectToBeEnabled"></a>

#### assertion.expectToBeEnabled(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects that the element is enabled to the user.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectToBeEnabled(selector);
```
<a name="ui5.assertion.expectValidationError"></a>

#### assertion.expectValidationError(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the "valueState" of the element to be "Error".

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectValidationError(selector);
```
<a name="ui5.assertion.expectValidationSuccess"></a>

#### assertion.expectValidationSuccess(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the valueState of the element to be "None".

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectValidationSuccess(selector);
```
<a name="ui5.assertion.expectBindingPathToBe"></a>

#### assertion.expectBindingPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements attribute binding-path to contain the compare value

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute to be compared. |
| compareValue | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | The compare value(s). |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectBindingPathToBe(selector, "text", "Hello");
```
<a name="ui5.assertion.expectBindingContextPathToBe"></a>

#### assertion.expectBindingContextPathToBe(selector, attribute, compareValue, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects the passed elements binding-context-path to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute to be compared. |
| compareValue | <code>String</code> |  | The compare value. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectBindingContextPathToBe(selector, "text", "Hello");
```
<a name="ui5.assertion.expectToBeVisible"></a>

#### assertion.expectToBeVisible(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects that the element is visible to the user.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectToBeVisible(selector);
```
<a name="ui5.assertion.expectToBeVisibleInViewport"></a>

#### assertion.expectToBeVisibleInViewport(selector, [index], [timeout], [loadPropertyTimeout]) ⇒ <code>Promise</code>
Expects that the element is visible in the viewport.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [loadPropertyTimeout] | <code>Number</code> | <code>0</code> | The timeout to wait for a specific property to have the given compare value. |

**Example**  
```js
await ui5.assertion.expectToBeVisibleInViewport(selector);
```
<a name="ui5.assertion.expectToBeNotVisible"></a>

#### assertion.expectToBeNotVisible(selector, [index], [timeout]) ⇒ <code>Promise</code>
Expects that the element is not visible to the user.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.assertion.expectToBeNotVisible(selector);
```
<a name="ui5.assertion.expectPageTitle"></a>

#### assertion.expectPageTitle(compareValue) ⇒ <code>Promise</code>
Expects the page title of the current page to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| compareValue | <code>String</code> | The compare value. |

**Example**  
```js
await ui5.assertion.expectPageTitle("Home");
```
<a name="ui5.assertion.expectShellHeader"></a>

#### assertion.expectShellHeader() ⇒ <code>Promise</code>
Expects the shell header to be visible

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await ui5.assertion.expectShellHeader();
```
<a name="ui5.assertion.expectLogoutText"></a>

#### assertion.expectLogoutText() ⇒ <code>Promise</code>
Expects the logout text after logout to be "You have been logged off.This is essential for chaining scripts, so that no static browser sleep in the spec itself is required anymore.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await ui5.assertion.expectLogoutText();
```
<a name="ui5.assertion.expectUnsupportedNavigationPopup"></a>

#### assertion.expectUnsupportedNavigationPopup(navigationTarget) ⇒ <code>Promise</code>
Expects navigation to an app that is not supported.This can be the case for Mocked tests when the application does not exist or when the app is not included in a role.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| navigationTarget | <code>String</code> | The selector describing the element. |

**Example**  
```js
await ui5.assertion.expectUnsupportedNavigationPopup("#SupplierInvoice-display?FiscalYear=1234&SupplierInvoice=1234567890");
```
<a name="ui5.assertion.expectMessageToastText"></a>

#### assertion.expectMessageToastText(text, [timeout]) ⇒ <code>Promise</code>
Expects the message toast with the passed text.

**Kind**: static method of [<code>assertion</code>](#ui5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>String</code> |  | The expected text. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.assertion.expectMessageToastText(text);
```
<a name="ui5.date"></a>

### ui5.date
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.date](#ui5.date)
    * [.pickDate(selector, date)](#ui5.date.pickDate)
    * [.pickDateRange(selector, range)](#ui5.date.pickDateRange)
    * [.fillDateRange(selector, range)](#ui5.date.fillDateRange)

<a name="ui5.date.pickDate"></a>

#### date.pickDate(selector, date)
Picks the passed date using the "DatePicker" with the given selector.

**Kind**: static method of [<code>date</code>](#ui5.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| date | <code>Date</code> | The date object. |

**Example**  
```js
const today = await common.date.calculateDate("today");await ui5.date.pickDate(selector, date);
```
<a name="ui5.date.pickDateRange"></a>

#### date.pickDateRange(selector, range)
Picks the passed date range using the "DatePicker" with the given selector.Note that this will only work within the current month!

**Kind**: static method of [<code>date</code>](#ui5.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| range | <code>Array.&lt;Object&gt;</code> | The array of date objects containing start- and end date. |

**Example**  
```js
const start = await common.date.calculateDate("2020, 9, 20");const end = await common.date.calculateDate("2021, 1, 3");const range = [start, end];await ui5.date.pickDateRange(selector, range);
```
<a name="ui5.date.fillDateRange"></a>

#### date.fillDateRange(selector, range)
Enters the passed date range to the date input with the given selector by providing the start- and end date.

**Kind**: static method of [<code>date</code>](#ui5.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| range | <code>Array.&lt;Object&gt;</code> | The array of date objects containing start- and end date. |

**Example**  
```js
const start = await common.date.calculateDate("2020, 9, 20", "dd.mm.yyyy");const end = await common.date.calculateDate("2021, 1, 3", "dd.mm.yyyy");const range = [start, end];await ui5.date.fillDateRange(selector, range);
```
<a name="ui5.element"></a>

### ui5.element
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.element](#ui5.element)
    * [.waitForAllElements(selector, [timeout])](#ui5.element.waitForAllElements)
    * [.getDisplayedElements(selector, [timeout])](#ui5.element.getDisplayedElements) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getDisplayedElement(selector, [index], [timeout])](#ui5.element.getDisplayedElement) ⇒ <code>Object</code>
    * [.getDisplayedChildElement(parentSelector, childSelector, [parentIndex], [childIndex], [timeout])](#ui5.element.getDisplayedChildElement) ⇒ <code>Object</code>
    * [.getElementByText(selector, value, [index], [timeout])](#ui5.element.getElementByText) ⇒ <code>Object</code>
    * [.getElementId(selector, [index], [timeout])](#ui5.element.getElementId) ⇒ <code>String</code>
    * [.getValue(selector, attribute, [index], [timeout])](#ui5.element.getValue) ⇒ <code>String</code>
    * [.getBindingValue(selector, attribute, [index], [timeout])](#ui5.element.getBindingValue) ⇒ <code>String</code>
    * [.isVisible(selector, [index], [timeout])](#ui5.element.isVisible) ⇒ <code>Boolean</code>
    * [.scrollToElement(selector, [index], [alignment], [timeout])](#ui5.element.scrollToElement)
    * [.highlightElement(selector, [duration], [color])](#ui5.element.highlightElement)

<a name="ui5.element.waitForAllElements"></a>

#### element.waitForAllElements(selector, [timeout])
Waits for all elements matching the given selector.

**Kind**: static method of [<code>element</code>](#ui5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the elements. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.element.waitForAllElements(selector);
```
<a name="ui5.element.getDisplayedElements"></a>

#### element.getDisplayedElements(selector, [timeout]) ⇒ <code>Array.&lt;Object&gt;</code>
Returns the visible elements with the given selector.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - The found elements.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the elements. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await ui5.element.getDisplayedElements(selector);
```
<a name="ui5.element.getDisplayedElement"></a>

#### element.getDisplayedElement(selector, [index], [timeout]) ⇒ <code>Object</code>
Returns the visible element.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await ui5.element.getDisplayedElement(selector);
```
<a name="ui5.element.getDisplayedChildElement"></a>

#### element.getDisplayedChildElement(parentSelector, childSelector, [parentIndex], [childIndex], [timeout]) ⇒ <code>Object</code>
Returns the element with the given selector that is a child element of a given parent.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>Object</code> - The found child element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parentSelector | <code>Object</code> |  | The selector describing the parent element. |
| childSelector | <code>Object</code> |  | The selector describing the child element. |
| [parentIndex] | <code>Number</code> | <code>0</code> | The index of the parent selector (in case there are more than one elements visible at the same time). |
| [childIndex] | <code>Number</code> | <code>0</code> | The index of the child selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await ui5.element.getDisplayedChildElement(parentSelector, childSelector);
```
<a name="ui5.element.getElementByText"></a>

#### element.getElementByText(selector, value, [index], [timeout]) ⇒ <code>Object</code>
Returns the element with the given selector and text value.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The text value of the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await ui5.element.getElementByText(selector, "Home");
```
<a name="ui5.element.getElementId"></a>

#### element.getElementId(selector, [index], [timeout]) ⇒ <code>String</code>
Returns the id of the element with the given selector.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>String</code> - The id of the element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elemId = await ui5.element.getElementId(selector);
```
<a name="ui5.element.getValue"></a>

#### element.getValue(selector, attribute, [index], [timeout]) ⇒ <code>String</code>
Returns the attribute value of the passed element.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>String</code> - The attribute value of the element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute of the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elemValue = await ui5.element.getValue(selector, "text");
```
<a name="ui5.element.getBindingValue"></a>

#### element.getBindingValue(selector, attribute, [index], [timeout]) ⇒ <code>String</code>
Returns the value of the given attribute of the bindingContext for a specific element.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>String</code> - The attribute value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute of the bindingContext. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const elemBindingValue = await ui5.element.getBindingValue(selector, "InvoiceGrossAmount");
```
<a name="ui5.element.isVisible"></a>

#### element.isVisible(selector, [index], [timeout]) ⇒ <code>Boolean</code>
Determines if the element is visible.

**Kind**: static method of [<code>element</code>](#ui5.element)  
**Returns**: <code>Boolean</code> - The bool value 'true' or 'false' if the element is visible or not.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
const isVisible = await ui5.element.isVisible(selector);
```
<a name="ui5.element.scrollToElement"></a>

#### element.scrollToElement(selector, [index], [alignment], [timeout])
Scrolls to the element with the given selector to get it into view.

**Kind**: static method of [<code>element</code>](#ui5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [alignment] | <code>String</code> | <code>&quot;center&quot;</code> | Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest". Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up' |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.element.scrollToElement(selector, 0, "start", 5000);
```
<a name="ui5.element.highlightElement"></a>

#### element.highlightElement(selector, [duration], [color])
Highlights the element with the given selector.

**Kind**: static method of [<code>element</code>](#ui5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [duration] | <code>Number</code> | <code>2000</code> | The duration of the highlighting (ms). |
| [color] | <code>String</code> | <code>&quot;red&quot;</code> | The color of the highlighting (CSS color). |

**Example**  
```js
await ui5.element.highlightElement(selector, 3000, "green");
```
<a name="ui5.navigation"></a>

### ui5.navigation
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.navigation](#ui5.navigation)
    * [.navigateToApplication(intent, [preventPopups], [verify])](#ui5.navigation.navigateToApplication)
    * [.navigateToApplicationAndRetry(intent, [preventPopups], [verify], [retries], [interval])](#ui5.navigation.navigateToApplicationAndRetry)
    * [.navigateToSystemAndApplication(system, intent, [closePopups], [verify])](#ui5.navigation.navigateToSystemAndApplication)
    * [.navigateToSystemAndApplicationAndRetry(system, intent, [closePopups], [verify], [retries], [interval])](#ui5.navigation.navigateToSystemAndApplicationAndRetry)
    * [.navigateToApplicationWithQueryParams(intent, queryParams, [preventPopups], [verify])](#ui5.navigation.navigateToApplicationWithQueryParams)
    * [.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, [preventPopups], [verify], [retries], [interval])](#ui5.navigation.navigateToApplicationWithQueryParamsAndRetry)
    * [.closePopups([timeout])](#ui5.navigation.closePopups)

<a name="ui5.navigation.navigateToApplication"></a>

#### navigation.navigateToApplication(intent, [preventPopups], [verify])
Navigates to the application via the passed intent. The intent will be added to the baseUrl maintained in the config.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| intent | <code>String</code> |  | The intent of the application. |
| [preventPopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popup appearance should be prevented. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |

**Example**  
```js
await ui5.navigation.navigateToApplication("PurchaseOrder-manage");
```
<a name="ui5.navigation.navigateToApplicationAndRetry"></a>

#### navigation.navigateToApplicationAndRetry(intent, [preventPopups], [verify], [retries], [interval])
Navigates to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| intent | <code>String</code> |  | The intent of the app. |
| [preventPopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popup appearance should be prevented. Might not work for specific popups. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage");
```
<a name="ui5.navigation.navigateToSystemAndApplication"></a>

#### navigation.navigateToSystemAndApplication(system, intent, [closePopups], [verify])
Navigates within the passed system to the application via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| system | <code>String</code> |  | The system url. |
| intent | <code>String</code> |  | The intent of the application. |
| [closePopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popups should be closed after the navigation. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |

**Example**  
```js
await ui5.navigation.navigateToSystemAndApplication("cc2-715.wdf.sap.corp", "PurchaseOrder-manage");
```
<a name="ui5.navigation.navigateToSystemAndApplicationAndRetry"></a>

#### navigation.navigateToSystemAndApplicationAndRetry(system, intent, [closePopups], [verify], [retries], [interval])
Navigates within the passed system to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| system | <code>String</code> |  | The system url. |
| intent | <code>String</code> |  | The intent of the application. |
| [closePopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popups should be closed after the navigation. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.navigation.navigateToSystemAndApplicationAndRetry("cc2-715.wdf.sap.corp", "PurchaseOrder-manage");
```
<a name="ui5.navigation.navigateToApplicationWithQueryParams"></a>

#### navigation.navigateToApplicationWithQueryParams(intent, queryParams, [preventPopups], [verify])
Navigates to the application with the passed queryParams via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| intent | <code>String</code> |  | The intent of the app. |
| queryParams | <code>String</code> |  | [OPTIONAL] Add url query params. |
| [preventPopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popup appearance should be prevented. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |

**Example**  
```js
const intent = ui5.appIntents.managePurchaseOrders;const queryParams = "?sap-language=EN&responderOn=true";await ui5.navigation.navigateToApplicationWithQueryParams(intent, queryParams);
```
<a name="ui5.navigation.navigateToApplicationWithQueryParamsAndRetry"></a>

#### navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, [preventPopups], [verify], [retries], [interval])
Navigates to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| intent | <code>String</code> |  | The intent of the app. |
| queryParams | <code>String</code> |  | [OPTIONAL] Add url query params. |
| [preventPopups] | <code>Boolean</code> | <code>false</code> | Specifies if random popup appearance should be prevented. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the url should be asserted after the navigation. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
const intent = ui5.appIntents.managePurchaseOrders;const queryParams = "?sap-language=EN&responderOn=true";await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams);
```
<a name="ui5.navigation.closePopups"></a>

#### navigation.closePopups([timeout])
Closes all popups if they occur after navigating to a specific page.

**Kind**: static method of [<code>navigation</code>](#ui5.navigation)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timeout] | <code>Integer</code> | <code>15000</code> | The timeout to wait. |

**Example**  
```js
await ui5.navigation.closePopups();
```
<a name="ui5.session"></a>

### ui5.session
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.session](#ui5.session)
    * [.login(username, [password], [verify], [timeout])](#ui5.session.login)
    * [.loginFiori(username, [password], [verify])](#ui5.session.loginFiori)
    * [.loginSapCloud(username, [password], [verify])](#ui5.session.loginSapCloud)
    * [.loginCustom(username, [password], usernameFieldSelector, passwordFieldSelector, logonButtonSelector, [verify])](#ui5.session.loginCustom)
    * [.loginCustomViaConfig(username, password, [verify])](#ui5.session.loginCustomViaConfig)
    * [.logout([verify])](#ui5.session.logout)

<a name="ui5.session.login"></a>

#### session.login(username, [password], [verify], [timeout])
Login with specific username and password. This function works for both fiori and sap-cloud login.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. |
| [password] | <code>String</code> | <code>&quot;Welcome1!&quot;</code> | The password. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the function will check the shell header after logging in. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.session.login("PURCHASER");
```
**Example**  
```js
await ui5.session.login("JOHN_DOE", "abc123!", true);
```
<a name="ui5.session.loginFiori"></a>

#### session.loginFiori(username, [password], [verify])
Login with fioriForm and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. |
| [password] | <code>String</code> | <code>&quot;Welcome1!&quot;</code> | The password. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the function will check the shell header after logging in. |

**Example**  
```js
await ui5.session.loginFiori("john", "abc123!");
```
<a name="ui5.session.loginSapCloud"></a>

#### session.loginSapCloud(username, [password], [verify])
Login with sapCloud form and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. |
| [password] | <code>String</code> | <code>&quot;Welcome1!&quot;</code> | The password. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the function will check the shell header after logging in. |

**Example**  
```js
await ui5.session.loginSapCloud("john", "abc123!");
```
<a name="ui5.session.loginCustom"></a>

#### session.loginCustom(username, [password], usernameFieldSelector, passwordFieldSelector, logonButtonSelector, [verify])
Login with custom form and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. |
| [password] | <code>String</code> | <code>&quot;Welcome1!&quot;</code> | The password. |
| usernameFieldSelector | <code>String</code> |  | The CSS selector of the username field. |
| passwordFieldSelector | <code>String</code> |  | The CSS selector of the password field. |
| logonButtonSelector | <code>String</code> |  | The CSS selector of the login button. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the function will check the shell header after logging in. |

**Example**  
```js
await ui5.session.loginCustom("JOHN_DOE", "abc123!", "#username", #password, "#logon");
```
<a name="ui5.session.loginCustomViaConfig"></a>

#### session.loginCustomViaConfig(username, password, [verify])
Login with specific username and password. The selectors will be taken from the config.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. Can be specified in spec or config. If specified in both credentials will be taken from config. |
| password | <code>String</code> | <code>&quot;Welcome1!&quot;</code> | The password. Can be specified in spec or config. If specified in both credentials will be taken from config. |
| [verify] | <code>Boolean</code> | <code>false</code> | Specifies if the function will check the shell header after logging in. |

**Example**  
```js
// config - SAMPLE 1
    auth: {
      formType: 'plain',
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    },
    // spec
    await ui5.session.loginCustomViaConfig("JOHN_DOE", "abc123!");


    // config - SAMPLE 2
    auth: {
      formType: "plain",
      username: "PURCH_EXT",
      password: "Welcome1!",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    },
    // spec
    await ui5.session.loginCustomViaConfig();
```
<a name="ui5.session.logout"></a>

#### session.logout([verify])
Logs the user out.

**Kind**: static method of [<code>session</code>](#ui5.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [verify] | <code>Boolean</code> | <code>&quot;true&quot;</code> | Specifies if the function will check the logout text after logging out. Set this to false if the system does not show the text after logging out. |

**Example**  
```js
await ui5.session.logout();
```
<a name="ui5.userInteraction"></a>

### ui5.userInteraction
**Kind**: static class of [<code>ui5</code>](#ui5)  

* [.userInteraction](#ui5.userInteraction)
    * [.click(selector, [index], [timeout])](#ui5.userInteraction.click)
    * [.clickAndRetry(selector, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clickAndRetry)
    * [.clickTab(selector, [index], [timeout])](#ui5.userInteraction.clickTab)
    * [.clickListItem(selector, [index], [timeout])](#ui5.userInteraction.clickListItem)
    * [.fill(selector, value, [index], [timeout])](#ui5.userInteraction.fill)
    * [.fillAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.fillAndRetry)
    * [.clear(selector, [index], [timeout])](#ui5.userInteraction.clear)
    * [.clearAndRetry(selector, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndRetry)
    * [.clearAndFill(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFill)
    * [.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], [verify])](#ui5.userInteraction.clearFillAndRetry)
    * [.clearSmartFieldInput(selector, [index], [timeout])](#ui5.userInteraction.clearSmartFieldInput)
    * [.clearAndFillSmartFieldInput(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFillSmartFieldInput)
    * [.clearAndFillSmartFieldInputAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndFillSmartFieldInputAndRetry)
    * [.selectBox(selector, value, [index])](#ui5.userInteraction.selectBox)
    * [.selectComboBox(selector, value, [index])](#ui5.userInteraction.selectComboBox)
    * [.selectMultiComboBox(selector, values, [index])](#ui5.userInteraction.selectMultiComboBox)
    * [.clickSelectArrow(selector, [index])](#ui5.userInteraction.clickSelectArrow)
    * [.clickSelectArrowAndRetry(selector, [index], [retries], [interval])](#ui5.userInteraction.clickSelectArrowAndRetry)
    * [.selectAll([selector], [index], [timeout])](#ui5.userInteraction.selectAll)
    * [.openF4Help(selector, [index], [timeout], useF4Key)](#ui5.userInteraction.openF4Help)
    * [.searchFor(selector, [index], [timeout], useEnter)](#ui5.userInteraction.searchFor)
    * [.resetSearch(selector, [index], [timeout])](#ui5.userInteraction.resetSearch)

<a name="ui5.userInteraction.click"></a>

#### userInteraction.click(selector, [index], [timeout])
Clicks on the element with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.click(selector);
```
<a name="ui5.userInteraction.clickAndRetry"></a>

#### userInteraction.clickAndRetry(selector, [index], [timeout], [retries], [interval])
Clicks on the element with the given selector and retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.clickAndRetry(selector);
```
<a name="ui5.userInteraction.clickTab"></a>

#### userInteraction.clickTab(selector, [index], [timeout])
Clicks on the tab with the given selector and checks if the tab got selected successfully.The function retries the click for maximal 3 times if the selection of the tab (blue underline) was not successful.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clickTab(selector);
```
<a name="ui5.userInteraction.clickListItem"></a>

#### userInteraction.clickListItem(selector, [index], [timeout])
Clicks or opens the list item with the given selector (e.g. ColumnListItem, StandardListItem).In some cases the default click function is not working correctly (clicks an element within the list item).Therefore we recommend to use this function to open a specific list item.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clickListItem(selector);
```
<a name="ui5.userInteraction.fill"></a>

#### userInteraction.fill(selector, value, [index], [timeout])
Fills the input field with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.fill(selector, "My Value");
```
<a name="ui5.userInteraction.fillAndRetry"></a>

#### userInteraction.fillAndRetry(selector, value, [index], [timeout], [retries], [interval])
Fills the input field with the given selector and retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.fillAndRetry(selector, "My Value");
```
<a name="ui5.userInteraction.clear"></a>

#### userInteraction.clear(selector, [index], [timeout])
Clears the input with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clear(selector);
```
<a name="ui5.userInteraction.clearAndRetry"></a>

#### userInteraction.clearAndRetry(selector, [index], [timeout], [retries], [interval])
Clears the input with the given selector and retries the action in case of a failure

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.clearAndRetry(selector);
```
<a name="ui5.userInteraction.clearAndFill"></a>

#### userInteraction.clearAndFill(selector, value, [index], [timeout])
Clears the input field with the given selector and enters the given value.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clearAndFill(selector, "My Value");
```
<a name="ui5.userInteraction.clearFillAndRetry"></a>

#### userInteraction.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], [verify])
Clears the input field with the given selector and enters the given value. Retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |
| [verify] | <code>Boolean</code> | <code>true</code> | Specifies if the filled value should be verified. |

**Example**  
```js
await ui5.userInteraction.clearFillAndRetry(selector, "My Value");
```
<a name="ui5.userInteraction.clearSmartFieldInput"></a>

#### userInteraction.clearSmartFieldInput(selector, [index], [timeout])
Clears the smart filed with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clearSmartFieldInput(selector);
```
<a name="ui5.userInteraction.clearAndFillSmartFieldInput"></a>

#### userInteraction.clearAndFillSmartFieldInput(selector, value, [index], [timeout])
Clears the smart filed with the given selector and enters the given value.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.clearAndFillSmartFieldInput(selector, "My Value");
```
<a name="ui5.userInteraction.clearAndFillSmartFieldInputAndRetry"></a>

#### userInteraction.clearAndFillSmartFieldInputAndRetry(selector, value, [index], [timeout], [retries], [interval])
Clears the smart filed with the given selector and enters the given value and retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to enter. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.clearAndFillSmartFieldInputAndRetry(selector, "My Value");
```
<a name="ui5.userInteraction.selectBox"></a>

#### userInteraction.selectBox(selector, value, [index])
Selects the passed value of the Select box.Please note that the function will only work for the default select Box.In special cases, please use the clickSelectArrow function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to select. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |

**Example**  
```js
await ui5.userInteraction.selectBox(selector, "Germany");
```
<a name="ui5.userInteraction.selectComboBox"></a>

#### userInteraction.selectComboBox(selector, value, [index])
Selects the passed value from the ComboBox with the given selector.Please note that the function will only work for the default ComboBox.In special cases you need to use the 'clickSelectArrow' function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The value to select. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |

**Example**  
```js
await ui5.userInteraction.selectComboBox(selector, "Germany");
```
<a name="ui5.userInteraction.selectMultiComboBox"></a>

#### userInteraction.selectMultiComboBox(selector, values, [index])
Selects the passed values of the MultiComboBox with the given selector.Please note that the function will only work for the default MultiComboBox.In special cases, please use the clickSelectArrow function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| values | <code>Array</code> |  | The values to select. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |

**Example**  
```js
await ui5.userInteraction.selectMultiComboBox(selector, ["Option 1", "Option 2"]);
```
<a name="ui5.userInteraction.clickSelectArrow"></a>

#### userInteraction.clickSelectArrow(selector, [index])
Clicks the arrow icon at the passed selector (select box).

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |

**Example**  
```js
await ui5.userInteraction.clickSelectArrow(selector);
```
<a name="ui5.userInteraction.clickSelectArrowAndRetry"></a>

#### userInteraction.clickSelectArrowAndRetry(selector, [index], [retries], [interval])
Clicks the arrow icon at the passed selector (select box), and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.clickSelectArrowAndRetry(selector);
```
<a name="ui5.userInteraction.selectAll"></a>

#### userInteraction.selectAll([selector], [index], [timeout])
Performs "select all" (ctrl + a) at the element with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.selectAll(selector);
```
<a name="ui5.userInteraction.openF4Help"></a>

#### userInteraction.openF4Help(selector, [index], [timeout], useF4Key)
Opens the F4-help of the element with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| useF4Key | <code>Boolean</code> |  | Specifies if the help is opened by pressing the F4-key or via the button. The default value is true (triggered by pressing the F4-key). Set "useF4Key" to false, to trigger the search by clicking the button. |

**Example**  
```js
await ui5.userInteraction.openF4Help(selector, 0, 30000, false);
```
<a name="ui5.userInteraction.searchFor"></a>

#### userInteraction.searchFor(selector, [index], [timeout], useEnter)
Searches for the passed value and executes the search.In case that the search is already filled, it will reset the field first.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| useEnter | <code>Boolean</code> |  | Specifies if the search is triggered by pressing the Enter-key or via the search button. The default value is true (triggered by pressing the Enter-key). Set "useEnter" to false, to trigger the search by clicking the search button. |

**Example**  
```js
await ui5.userInteraction.searchFor(selector, "My Value", 0, 30000, false);
```
<a name="ui5.userInteraction.resetSearch"></a>

#### userInteraction.resetSearch(selector, [index], [timeout])
Resets the search field.

**Kind**: static method of [<code>userInteraction</code>](#ui5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.resetSearch(selector);
```
<a name="nonUi5"></a>

## nonUi5
Global namespace for non UI5 modules.

**Kind**: global constant  

* [nonUi5](#nonUi5)
    * [.assertion](#nonUi5.assertion)
        * [.expectValueToBe(elem, compareValue, [attribute])](#nonUi5.assertion.expectValueToBe) ⇒ <code>Promise</code>
        * [.expectToBeVisible(element)](#nonUi5.assertion.expectToBeVisible) ⇒ <code>Promise</code>
    * [.element](#nonUi5.element)
        * [.waitForAllElements(selector, [timeout])](#nonUi5.element.waitForAllElements) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.waitForElementIsPresent(selector, [timeout])](#nonUi5.element.waitForElementIsPresent)
        * [.waitForElementIsVisible(selector, [timeout])](#nonUi5.element.waitForElementIsVisible)
        * [.waitForElementIsClickable(selector, [timeout])](#nonUi5.element.waitForElementIsClickable)
        * [.getDisplayedElements(selector, [timeout])](#nonUi5.element.getDisplayedElements) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getElementByCss(selector, [index], [timeout])](#nonUi5.element.getElementByCss) ⇒ <code>Object</code>
        * [.getElementByCssContainingText(selector, [text], [index], [timeout])](#nonUi5.element.getElementByCssContainingText) ⇒ <code>Object</code>
        * [.getElementById(id, [timeout])](#nonUi5.element.getElementById) ⇒ <code>Object</code>
        * [.getElementByClass(elemClass, [index], [timeout])](#nonUi5.element.getElementByClass) ⇒ <code>Object</code>
        * [.getElementByName(name, [index], [timeout])](#nonUi5.element.getElementByName) ⇒ <code>Object</code>
        * [.getElementByXPath(xpath, [index], [timeout])](#nonUi5.element.getElementByXPath) ⇒ <code>Object</code>
        * [.getElementByChild(elementSelector, childSelector)](#nonUi5.element.getElementByChild) ⇒ <code>Object</code>
        * [.getChildNode(elementSelector, childSelector, [elementIndex], [childIndex], [timeout])](#nonUi5.element.getChildNode) ⇒ <code>Object</code>
        * [.isVisible(element)](#nonUi5.element.isVisible) ⇒ <code>Boolean</code>
        * [.isElementPresent(elem)](#nonUi5.element.isElementPresent) ⇒ <code>Boolean</code>
        * [.isPresentByCss(css, [index], [timeout])](#nonUi5.element.isPresentByCss) ⇒ <code>boolean</code>
        * [.isPresentByXPath(xpath, [index], [timeout])](#nonUi5.element.isPresentByXPath) ⇒ <code>boolean</code>
        * [.getValue(elem, [attribute])](#nonUi5.element.getValue) ⇒ <code>String</code>
        * [.scrollToElement(elem, alignment)](#nonUi5.element.scrollToElement)
        * [.highlightElement(elem, [duration], [color])](#nonUi5.element.highlightElement)
        * [.switchToIframe(selector)](#nonUi5.element.switchToIframe)
        * [.switchToDefaultContent()](#nonUi5.element.switchToDefaultContent)
    * [.userInteraction](#nonUi5.userInteraction)
        * [.clickAndRetry(element, [timeout], [retries], [interval])](#nonUi5.userInteraction.clickAndRetry)
        * [.fill(element, value)](#nonUi5.userInteraction.fill)
        * [.fillAndRetry(element, value, [retries], [interval])](#nonUi5.userInteraction.fillAndRetry)
        * [.clear(element)](#nonUi5.userInteraction.clear)
        * [.clearAndFill(element, value)](#nonUi5.userInteraction.clearAndFill)
        * [.clearAndFillAndRetry(element, value, [retries], [interval], [verify])](#nonUi5.userInteraction.clearAndFillAndRetry)
        * [.dragAndDrop(element, targetElem)](#nonUi5.userInteraction.dragAndDrop)
        * [.clickChartPart(element)](#nonUi5.userInteraction.clickChartPart)

<a name="nonUi5.assertion"></a>

### nonUi5.assertion
**Kind**: static class of [<code>nonUi5</code>](#nonUi5)  

* [.assertion](#nonUi5.assertion)
    * [.expectValueToBe(elem, compareValue, [attribute])](#nonUi5.assertion.expectValueToBe) ⇒ <code>Promise</code>
    * [.expectToBeVisible(element)](#nonUi5.assertion.expectToBeVisible) ⇒ <code>Promise</code>

<a name="nonUi5.assertion.expectValueToBe"></a>

#### assertion.expectValueToBe(elem, compareValue, [attribute]) ⇒ <code>Promise</code>
Expects the attributes value of the passed element to be the compare value.

**Kind**: static method of [<code>assertion</code>](#nonUi5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |
| compareValue | <code>String</code> | The compare value. |
| [attribute] | <code>String</code> | The attribute to compare. If not passed, it will compare the inner HTML content of the element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.assertion.expectValueToBe(elem, "Save");
```
**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.assertion.expectValueToBe(element, "Save", "title");
```
<a name="nonUi5.assertion.expectToBeVisible"></a>

#### assertion.expectToBeVisible(element) ⇒ <code>Promise</code>
Expects that the element is visible to the user.

**Kind**: static method of [<code>assertion</code>](#nonUi5.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.assertion.expectToBeVisible(elem);
```
<a name="nonUi5.element"></a>

### nonUi5.element
**Kind**: static class of [<code>nonUi5</code>](#nonUi5)  

* [.element](#nonUi5.element)
    * [.waitForAllElements(selector, [timeout])](#nonUi5.element.waitForAllElements) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.waitForElementIsPresent(selector, [timeout])](#nonUi5.element.waitForElementIsPresent)
    * [.waitForElementIsVisible(selector, [timeout])](#nonUi5.element.waitForElementIsVisible)
    * [.waitForElementIsClickable(selector, [timeout])](#nonUi5.element.waitForElementIsClickable)
    * [.getDisplayedElements(selector, [timeout])](#nonUi5.element.getDisplayedElements) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getElementByCss(selector, [index], [timeout])](#nonUi5.element.getElementByCss) ⇒ <code>Object</code>
    * [.getElementByCssContainingText(selector, [text], [index], [timeout])](#nonUi5.element.getElementByCssContainingText) ⇒ <code>Object</code>
    * [.getElementById(id, [timeout])](#nonUi5.element.getElementById) ⇒ <code>Object</code>
    * [.getElementByClass(elemClass, [index], [timeout])](#nonUi5.element.getElementByClass) ⇒ <code>Object</code>
    * [.getElementByName(name, [index], [timeout])](#nonUi5.element.getElementByName) ⇒ <code>Object</code>
    * [.getElementByXPath(xpath, [index], [timeout])](#nonUi5.element.getElementByXPath) ⇒ <code>Object</code>
    * [.getElementByChild(elementSelector, childSelector)](#nonUi5.element.getElementByChild) ⇒ <code>Object</code>
    * [.getChildNode(elementSelector, childSelector, [elementIndex], [childIndex], [timeout])](#nonUi5.element.getChildNode) ⇒ <code>Object</code>
    * [.isVisible(element)](#nonUi5.element.isVisible) ⇒ <code>Boolean</code>
    * [.isElementPresent(elem)](#nonUi5.element.isElementPresent) ⇒ <code>Boolean</code>
    * [.isPresentByCss(css, [index], [timeout])](#nonUi5.element.isPresentByCss) ⇒ <code>boolean</code>
    * [.isPresentByXPath(xpath, [index], [timeout])](#nonUi5.element.isPresentByXPath) ⇒ <code>boolean</code>
    * [.getValue(elem, [attribute])](#nonUi5.element.getValue) ⇒ <code>String</code>
    * [.scrollToElement(elem, alignment)](#nonUi5.element.scrollToElement)
    * [.highlightElement(elem, [duration], [color])](#nonUi5.element.highlightElement)
    * [.switchToIframe(selector)](#nonUi5.element.switchToIframe)
    * [.switchToDefaultContent()](#nonUi5.element.switchToDefaultContent)

<a name="nonUi5.element.waitForAllElements"></a>

#### element.waitForAllElements(selector, [timeout]) ⇒ <code>Array.&lt;Object&gt;</code>
Waits until all elements with the given selector are rendered.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Array.&lt;Object&gt;</code> - The array of elements. //TODO  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.waitForAllElements(".inputField");
```
<a name="nonUi5.element.waitForElementIsPresent"></a>

#### element.waitForElementIsPresent(selector, [timeout])
Waits until the element with the given selector is present.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.waitForElementIsPresent(".input01");
```
**Example**  
```js
await nonUi5.element.waitForElementIsPresent("#button12");
```
**Example**  
```js
await nonUi5.element.waitForElementIsPresent("p:first-child");
```
<a name="nonUi5.element.waitForElementIsVisible"></a>

#### element.waitForElementIsVisible(selector, [timeout])
Waits until the element with the given selector is visible.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.waitForElementIsVisible(".input01");
```
**Example**  
```js
await nonUi5.element.waitForElementIsVisible("#button12");
```
**Example**  
```js
await nonUi5.element.waitForElementIsVisible("p:first-child");
```
<a name="nonUi5.element.waitForElementIsClickable"></a>

#### element.waitForElementIsClickable(selector, [timeout])
Waits until the element with the given selector is clickable.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.waitForElementIsClickable(".input01");
```
**Example**  
```js
await nonUi5.element.waitForElementIsClickable("#button12");
```
**Example**  
```js
await nonUi5.element.waitForElementIsClickable("p:first-child");
```
<a name="nonUi5.element.getDisplayedElements"></a>

#### element.getDisplayedElements(selector, [timeout]) ⇒ <code>Array.&lt;Object&gt;</code>
Gets all visible elements with the passed selector.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Array.&lt;Object&gt;</code> - The array of elements.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.getDisplayedElements(".inputField");
```
<a name="nonUi5.element.getElementByCss"></a>

#### element.getElementByCss(selector, [index], [timeout]) ⇒ <code>Object</code>
Gets the element with the given CSS selector.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementByCss(".button01");
```
<a name="nonUi5.element.getElementByCssContainingText"></a>

#### element.getElementByCssContainingText(selector, [text], [index], [timeout]) ⇒ <code>Object</code>
Gets the element with the given CSS selector containing the given text value.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The CSS selector describing the element. |
| [text] | <code>String</code> | <code>&quot;&quot;</code> | The containing text value of the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementByCssContainingText(".input01", "Jack Jackson");
```
<a name="nonUi5.element.getElementById"></a>

#### element.getElementById(id, [timeout]) ⇒ <code>Object</code>
Gets the element with the given ID.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | The id of the element. |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");
```
<a name="nonUi5.element.getElementByClass"></a>

#### element.getElementByClass(elemClass, [index], [timeout]) ⇒ <code>Object</code>
Gets the element with the given class.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elemClass | <code>String</code> |  | The class describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementByClass("button01");
```
<a name="nonUi5.element.getElementByName"></a>

#### element.getElementByName(name, [index], [timeout]) ⇒ <code>Object</code>
Gets the element with the given name.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name attribute of the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementByName(".button01");
```
<a name="nonUi5.element.getElementByXPath"></a>

#### element.getElementByXPath(xpath, [index], [timeout]) ⇒ <code>Object</code>
Gets the element with the given XPath.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| xpath | <code>String</code> |  | The XPath describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getElementByXPath("//ul/li/a");
```
<a name="nonUi5.element.getElementByChild"></a>

#### element.getElementByChild(elementSelector, childSelector) ⇒ <code>Object</code>
Gets an element with the given CSS selector and child selector. Can be used when multiple elements have the same properties.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The CSS selector describing the element. |
| childSelector | <code>String</code> | The CSS selector describing the elements child. |

**Example**  
```js
const elem = await nonUi5.element.getElementByChild(".form01", ".input01");
```
<a name="nonUi5.element.getChildNode"></a>

#### element.getChildNode(elementSelector, childSelector, [elementIndex], [childIndex], [timeout]) ⇒ <code>Object</code>
Gets an child element of a specific element by CSS.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elementSelector | <code>String</code> |  | The CSS of the parent element (can be a class for example). |
| childSelector | <code>String</code> |  | The CSS of the child element (can be a class for example). |
| [elementIndex] | <code>Integer</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [childIndex] | <code>Integer</code> | <code>0</code> | The index of the child element (in case there are more than one child elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>60000</code> | The timeout to wait (ms). |

**Example**  
```js
const elem = await nonUi5.element.getChildNode("ul[class='list']", "li[class='firstItem']");
```
<a name="nonUi5.element.isVisible"></a>

#### element.isVisible(element) ⇒ <code>Boolean</code>
Returns a boolean if the element is visible to the user.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Boolean</code> - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.element.isVisible(elem);
```
<a name="nonUi5.element.isElementPresent"></a>

#### element.isElementPresent(elem) ⇒ <code>Boolean</code>
Returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>Boolean</code> - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.element.isElementPresent(elem);
```
<a name="nonUi5.element.isPresentByCss"></a>

#### element.isPresentByCss(css, [index], [timeout]) ⇒ <code>boolean</code>
Returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>boolean</code> - Returns true or false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| css | <code>String</code> |  | The CSS selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.isPresentByCss(".button01");
```
<a name="nonUi5.element.isPresentByXPath"></a>

#### element.isPresentByXPath(xpath, [index], [timeout]) ⇒ <code>boolean</code>
returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| xpath | <code>String</code> |  | The XPath describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the element (in case there are more than one elements visible at the same time). |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await nonUi5.element.isPresentByXPath(".//*[text()='Create']");
```
<a name="nonUi5.element.getValue"></a>

#### element.getValue(elem, [attribute]) ⇒ <code>String</code>
Returns the attributes value of the passed element.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Returns**: <code>String</code> - The attributes value of the element.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |
| [attribute] | <code>String</code> | The attribute of the element. Leave empty to return the inner HTML value of the element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("elem01");const text = await nonUi5.element.getValue(elem, "text");
```
**Example**  
```js
const elem = await nonUi5.element.getElementById("elem02");const innerHTML = await nonUi5.element.getValue(elem);
```
<a name="nonUi5.element.scrollToElement"></a>

#### element.scrollToElement(elem, alignment)
Scrolls to the passed element to get it into view.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | The element. |
| alignment | <code>String</code> | <code>&quot;center&quot;</code> | Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest". Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up' |

**Example**  
```js
const elem = await nonUi5.element.getElementById("footer01");await nonUi5.element.scrollToElement(elem);
```
<a name="nonUi5.element.highlightElement"></a>

#### element.highlightElement(elem, [duration], [color])
Highlights the passed element.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | The element. |
| [duration] | <code>Integer</code> | <code>2000</code> | The duration of the highlighting (ms). |
| [color] | <code>String</code> | <code>&quot;red&quot;</code> | The color of the highlighting (CSS value). |

**Example**  
```js
const elem = await nonUi5.element.getElementById("text01");await nonUi5.element.highlightElement(elem);
```
**Example**  
```js
const elem = await nonUi5.element.getElementById("text01");await nonUi5.element.highlightElement(elem, 3000, "green");
```
<a name="nonUi5.element.switchToIframe"></a>

#### element.switchToIframe(selector)
Switches to the passed iframe.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The CSS selector describing the iframe element. |

**Example**  
```js
await nonUi5.element.switchToIframe("iframe[id='frame01']");
```
<a name="nonUi5.element.switchToDefaultContent"></a>

#### element.switchToDefaultContent()
Switches to the default content of the HTML page.

**Kind**: static method of [<code>element</code>](#nonUi5.element)  
**Example**  
```js
await nonUi5.element.switchToDefaultContent();
```
<a name="nonUi5.userInteraction"></a>

### nonUi5.userInteraction
**Kind**: static class of [<code>nonUi5</code>](#nonUi5)  

* [.userInteraction](#nonUi5.userInteraction)
    * [.clickAndRetry(element, [timeout], [retries], [interval])](#nonUi5.userInteraction.clickAndRetry)
    * [.fill(element, value)](#nonUi5.userInteraction.fill)
    * [.fillAndRetry(element, value, [retries], [interval])](#nonUi5.userInteraction.fillAndRetry)
    * [.clear(element)](#nonUi5.userInteraction.clear)
    * [.clearAndFill(element, value)](#nonUi5.userInteraction.clearAndFill)
    * [.clearAndFillAndRetry(element, value, [retries], [interval], [verify])](#nonUi5.userInteraction.clearAndFillAndRetry)
    * [.dragAndDrop(element, targetElem)](#nonUi5.userInteraction.dragAndDrop)
    * [.clickChartPart(element)](#nonUi5.userInteraction.clickChartPart)

<a name="nonUi5.userInteraction.clickAndRetry"></a>

#### userInteraction.clickAndRetry(element, [timeout], [retries], [interval])
Clicks on the passed element, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Object</code> |  | The element. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("button01");await nonUi5.userInteraction.clickAndRetry(elem);
```
<a name="nonUi5.userInteraction.fill"></a>

#### userInteraction.fill(element, value)
Fills the given value into the passed input.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value to be filled. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("input01");await nonUi5.userInteraction.fill(elem, "Service 01");
```
<a name="nonUi5.userInteraction.fillAndRetry"></a>

#### userInteraction.fillAndRetry(element, value, [retries], [interval])
Fills the given value into the passed input, retries in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Object</code> |  | The element. |
| value | <code>String</code> |  | The value to be filled. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("input01");await nonUi5.userInteraction.fillAndRetry(elem, "Service 01");
```
<a name="nonUi5.userInteraction.clear"></a>

#### userInteraction.clear(element)
Clears the passed input element.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
const elem = await non_ui5.common.locator.getElementById("input01");await nonUi5.userInteraction.clear(elem);
```
<a name="nonUi5.userInteraction.clearAndFill"></a>

#### userInteraction.clearAndFill(element, value)
Clears and fills the passed input element.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value to be filled in. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("input01");await nonUi5.userInteraction.clearAndFill(elem, "Service 01");
```
<a name="nonUi5.userInteraction.clearAndFillAndRetry"></a>

#### userInteraction.clearAndFillAndRetry(element, value, [retries], [interval], [verify])
Clears and fills the passed input, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Object</code> |  | The element. |
| value | <code>String</code> |  | The value to be filled in. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |
| [verify] | <code>Boolean</code> | <code>true</code> | Specifies if the filled value should be verified. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("input01");await nonUi5.userInteraction.clearAndFillAndRetry(elem, "Service 01");
```
<a name="nonUi5.userInteraction.dragAndDrop"></a>

#### userInteraction.dragAndDrop(element, targetElem)
Drags and drops the given element to the given target element.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to drag. |
| targetElem | <code>Object</code> | The target element to drop the element. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("drag01");
```
**Example**  
```js
const targetElem = await nonUi5.element.getElementById("drop02");await nonUi5.userInteraction.dragAndDrop(elem, targetElem);
```
<a name="nonUi5.userInteraction.clickChartPart"></a>

#### userInteraction.clickChartPart(element)
Clicks on a target element inside a chart area.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to click inside the chart. |

**Example**  
```js
const elem = await nonUi5.element.getElementById("chartPartToCLick");await nonUi5.userInteraction.clickChartPart(elem);
```
