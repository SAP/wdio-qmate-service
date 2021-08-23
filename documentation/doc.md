## Classes

<dl>
<dt><a href="#CustomAuthenticator">CustomAuthenticator</a></dt>
<dd></dd>
<dt><a href="#FormAuthenticator">FormAuthenticator</a></dt>
<dd></dd>
<dt><a href="#PlainAuthenticator">PlainAuthenticator</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#utilities">utilities</a> : <code>object</code></dt>
<dd><p>Namespace for utilities modules.</p>
</dd>
<dt><a href="#ui5">ui5</a> : <code>object</code></dt>
<dd><p>Namespace for ui5 modules.</p>
</dd>
<dt><a href="#non_ui5">non_ui5</a> : <code>object</code></dt>
<dd><p>Namespace for non ui5 modules.</p>
</dd>
<dt><a href="#odata">odata</a> : <code>object</code></dt>
<dd><p>Namespace for odata modules.</p>
</dd>
</dl>

<a name="CustomAuthenticator"></a>

## CustomAuthenticator
**Kind**: global class  
<a name="new_CustomAuthenticator_new"></a>

### new CustomAuthenticator(config, instanceConfig, logger)
Handle page authentication


| Param | Type |
| --- | --- |
| config | <code>Config</code> | 
| instanceConfig | <code>Object</code> | 
| logger | <code>Logger</code> | 

<a name="FormAuthenticator"></a>

## FormAuthenticator
**Kind**: global class  
<a name="new_FormAuthenticator_new"></a>

### new FormAuthenticator(config, instanceConfig, logger)
Handle page authentication


| Param | Type |
| --- | --- |
| config | <code>Config</code> | 
| instanceConfig | <code>Object</code> | 
| logger | <code>Logger</code> | 

<a name="PlainAuthenticator"></a>

## PlainAuthenticator
**Kind**: global class  
<a name="new_PlainAuthenticator_new"></a>

### new PlainAuthenticator(config, instanceConfig, logger)
Handle no Url authentication


| Param | Type |
| --- | --- |
| config | <code>Config</code> | 
| instanceConfig | <code>Object</code> | 
| logger | <code>Logger</code> | 

<a name="utilities"></a>

## utilities : <code>object</code>
Namespace for utilities modules.

**Kind**: global namespace  

* [utilities](#utilities) : <code>object</code>
    * [.browser](#utilities.browser)
        * [.getBaseUrl()](#utilities.browser.getBaseUrl) ⇒ <code>String</code>
        * [.setBaseUrl(baseUrl:)](#utilities.browser.setBaseUrl)
        * [.clearBrowser(clearLocal, clearSession, clearCookies)](#utilities.browser.clearBrowser)
        * [.sleep(duration)](#utilities.browser.sleep)
        * [.refresh()](#utilities.browser.refresh)
        * [.sleepAndCollectCoverage(sleep)](#utilities.browser.sleepAndCollectCoverage)
        * [.getBrowserName()](#utilities.browser.getBrowserName) ⇒ <code>String</code>
        * [.executeScript(command)](#utilities.browser.executeScript)
        * [.getUI5Version()](#utilities.browser.getUI5Version)
        * [.sendKeys(keys)](#utilities.browser.sendKeys)
    * [.dialogInteraction](#utilities.dialogInteraction)
        * [.uploadFiles(files)](#utilities.dialogInteraction.uploadFiles)
    * [.execute](#utilities.execute)
    * [.fileHandler](#utilities.fileHandler)
        * [.parsePdf(pdfStream, renderMethod)](#utilities.fileHandler.parsePdf)
        * [.expectPdfContainsText(pdfStream, text, renderMethod)](#utilities.fileHandler.expectPdfContainsText)
        * [.expectPdfNotContainsText(pdfStream, text, renderMethod)](#utilities.fileHandler.expectPdfNotContainsText)
    * [.formatter](#utilities.formatter)
        * [.sliceStringAt(input, slicePoint, length)](#utilities.formatter.sliceStringAt) ⇒ <code>String</code>
        * [.sliceStringAfter(input, slicePoint, length)](#utilities.formatter.sliceStringAfter) ⇒ <code>String</code>
        * [.trimString(input)](#utilities.formatter.trimString)
        * [.extractNumberFromString(input, index)](#utilities.formatter.extractNumberFromString) ⇒ <code>String</code>
        * [.stringifyJSON(object)](#utilities.formatter.stringifyJSON) ⇒ <code>String</code>
        * [.formatDate(date, format)](#utilities.formatter.formatDate) ⇒ <code>String</code>
    * [.function](#utilities.function)
        * [.retry(fct, args, retries, interval, scope)](#utilities.function.retry)
        * [.executeOptional(fct, args)](#utilities.function.executeOptional)
    * [.mockserver](#utilities.mockserver)
        * [.waitForUi5ApplicationLoad(interval)](#utilities.mockserver.waitForUi5ApplicationLoad)
        * [.interactWithMockServer(mockServerPath, fnCallback, oParams)](#utilities.mockserver.interactWithMockServer)
        * [.attachFunctionBefore(method, mockServerPath, fnBeforeCallback, oParams)](#utilities.mockserver.attachFunctionBefore)
        * [.attachFunctionAfter(method, mockServerPath, fnAfterCallback, oParams)](#utilities.mockserver.attachFunctionAfter)
        * [.addNewRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)](#utilities.mockserver.addNewRequest)
        * [.removeRequest(method, mockServerPath, urlPathRegex)](#utilities.mockserver.removeRequest)
        * [.addOrOverrideRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)](#utilities.mockserver.addOrOverrideRequest)
        * [.startMockServer(mockServerPath)](#utilities.mockserver.startMockServer)
        * [.initMockServer(mockServerPath, mockServerOptions)](#utilities.mockserver.initMockServer)
        * [.initApplication(mockServerPath)](#utilities.mockserver.initApplication)
        * [.stopMockServer(mockServerPath)](#utilities.mockserver.stopMockServer)
        * [.loadMockDataFile(filePath, isText)](#utilities.mockserver.loadMockDataFile) ⇒ <code>String</code>
        * [.getEntitySetData(mockServerPath, entitySetName)](#utilities.mockserver.getEntitySetData) ⇒ <code>Array</code>
        * [.setEntitySetData(mockServerPath, entitySetName, entries)](#utilities.mockserver.setEntitySetData)
    * [.OS](#utilities.OS)
    * [.qUnit](#utilities.qUnit)
        * [.executeTests(relativePathToQUnitHTML)](#utilities.qUnit.executeTests)

<a name="utilities.browser"></a>

### utilities.browser
**Kind**: static class of [<code>utilities</code>](#utilities)  

* [.browser](#utilities.browser)
    * [.getBaseUrl()](#utilities.browser.getBaseUrl) ⇒ <code>String</code>
    * [.setBaseUrl(baseUrl:)](#utilities.browser.setBaseUrl)
    * [.clearBrowser(clearLocal, clearSession, clearCookies)](#utilities.browser.clearBrowser)
    * [.sleep(duration)](#utilities.browser.sleep)
    * [.refresh()](#utilities.browser.refresh)
    * [.sleepAndCollectCoverage(sleep)](#utilities.browser.sleepAndCollectCoverage)
    * [.getBrowserName()](#utilities.browser.getBrowserName) ⇒ <code>String</code>
    * [.executeScript(command)](#utilities.browser.executeScript)
    * [.getUI5Version()](#utilities.browser.getUI5Version)
    * [.sendKeys(keys)](#utilities.browser.sendKeys)

<a name="utilities.browser.getBaseUrl"></a>

#### browser.getBaseUrl() ⇒ <code>String</code>
Get baseUrl from the configuration file for the current test spec

**Kind**: static method of [<code>browser</code>](#utilities.browser)  
**Example**  
```js
const baseUrl = await utilities.browser.getBaseUrl();
```
<a name="utilities.browser.setBaseUrl"></a>

#### browser.setBaseUrl(baseUrl:)
Get baseUrl from the configuration file for the current test spec

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl: | <code>String</code> | base URL to set |

**Example**  
```js
await utilities.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
```
<a name="utilities.browser.clearBrowser"></a>

#### browser.clearBrowser(clearLocal, clearSession, clearCookies)
Clears the local and session cache and deletes all browser cookies.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| clearLocal | <code>Boolean</code> | Set to false if you dont want to clear the local cache (Default is true). |
| clearSession | <code>Boolean</code> | Set to false if you dont want to clear the session cache (Default is true). |
| clearCookies | <code>Boolean</code> | Set to false if you dont want to delete all browser cookies (Default is true). |

**Example**  
```js
await utilities.browser.clearBrowser();
```
<a name="utilities.browser.sleep"></a>

#### browser.sleep(duration)
Browser will sleep for the passed duration.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>Integer</code> | The time to wait in milliseconds (Default is 10 sec). |

**Example**  
```js
await utilities.browser.sleep(30000);
```
<a name="utilities.browser.refresh"></a>

#### browser.refresh()
Browser will refresh the page.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  
**Example**  
```js
await utilities.browser.refresh();
```
<a name="utilities.browser.sleepAndCollectCoverage"></a>

#### browser.sleepAndCollectCoverage(sleep)
Collects and stores the coverage information before a hard browser event (logout, clear history),also useful when parallelizing multiple specs and need to aggregate the coverage information

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| sleep | <code>Integer</code> | Stop browser actions for the collection of coverage (Default is 5 secs or 5000 msecs). |

**Example**  
```js
await utilities.browser.sleepAndCollectCoverage(5000);
```
<a name="utilities.browser.getBrowserName"></a>

#### browser.getBrowserName() ⇒ <code>String</code>
Returns the name of the current browser.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  
**Returns**: <code>String</code> - The browser name.  
**Example**  
```js
const browserName = await utilities.browser.getBrowserName();
```
<a name="utilities.browser.executeScript"></a>

#### browser.executeScript(command)
Executes the specified JS command.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to run. |

**Example**  
```js
await utilities.browser.executeScript(command);
```
<a name="utilities.browser.getUI5Version"></a>

#### browser.getUI5Version()
Get UI5 Version and creation date for ui5 based apps

**Kind**: static method of [<code>browser</code>](#utilities.browser)  
**Example**  
```js
await utilities.browser.getUI5Version();
```
<a name="utilities.browser.sendKeys"></a>

#### browser.sendKeys(keys)
Executes the set of keystrokes.

**Kind**: static method of [<code>browser</code>](#utilities.browser)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>String</code> | The combination of keys to execute. |

**Example**  
```js
await utilities.browser.sendKeys(protractor.Key.CONTROL, protractor.Key.ALT, "d");
```
<a name="utilities.dialogInteraction"></a>

### utilities.dialogInteraction
**Kind**: static class of [<code>utilities</code>](#utilities)  
<a name="utilities.dialogInteraction.uploadFiles"></a>

#### dialogInteraction.uploadFiles(files)
Uploads all the file/s as mentioned in the Array.

**Kind**: static method of [<code>dialogInteraction</code>](#utilities.dialogInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>Array</code> | List of file/s to be uploaded. |

**Example**  
```js
await utilities.dialogInteraction.uploadFile(["path/to/text1.txt", "path/to/text2.txt"]);
```
<a name="utilities.execute"></a>

### utilities.execute
**Kind**: static class of [<code>utilities</code>](#utilities)  
<a name="utilities.fileHandler"></a>

### utilities.fileHandler
**Kind**: static class of [<code>utilities</code>](#utilities)  

* [.fileHandler](#utilities.fileHandler)
    * [.parsePdf(pdfStream, renderMethod)](#utilities.fileHandler.parsePdf)
    * [.expectPdfContainsText(pdfStream, text, renderMethod)](#utilities.fileHandler.expectPdfContainsText)
    * [.expectPdfNotContainsText(pdfStream, text, renderMethod)](#utilities.fileHandler.expectPdfNotContainsText)

<a name="utilities.fileHandler.parsePdf"></a>

#### fileHandler.parsePdf(pdfStream, renderMethod)
parses the text from PDF docs, returned text can be asserted to verify its pdf document content

**Kind**: static method of [<code>fileHandler</code>](#utilities.fileHandler)  
**See**: <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a>  

| Param | Type | Description |
| --- | --- | --- |
| pdfStream | <code>Buffer</code> | pdf stream to be downloaded |
| renderMethod | <code>function</code> | a function to customize the parsing process |

**Example**  
```js
await utilities.fileHandler.parsePdf(pdfStream, customRenderer);
```
<a name="utilities.fileHandler.expectPdfContainsText"></a>

#### fileHandler.expectPdfContainsText(pdfStream, text, renderMethod)
parses the pdf and checks for given text to be present in pdf

**Kind**: static method of [<code>fileHandler</code>](#utilities.fileHandler)  
**See**: <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a>  

| Param | Type | Description |
| --- | --- | --- |
| pdfStream | <code>Buffer</code> | pdf stream to be downloaded |
| text | <code>String</code> | text to be present |
| renderMethod | <code>function</code> | a function to customize the parsing process |

**Example**  
```js
await utilities.fileHandler.expectPdfContainsText(pdfStream, "text");
```
<a name="utilities.fileHandler.expectPdfNotContainsText"></a>

#### fileHandler.expectPdfNotContainsText(pdfStream, text, renderMethod)
parses the pdf and checks for given text not to be present in pdf

**Kind**: static method of [<code>fileHandler</code>](#utilities.fileHandler)  
**See**: <a href="https://github.wdf.sap.corp/sProcurement/vyperForAll/blob/master/documentation/topics/pdfParsing.md#customized-parsing-and-how-to-do-it">Parse pdf</a>  

| Param | Type | Description |
| --- | --- | --- |
| pdfStream | <code>Buffer</code> | pdf stream to be downloaded |
| text | <code>String</code> | text not to be present |
| renderMethod | <code>function</code> | a function to customize the parsing process. |

**Example**  
```js
await utilities.fileHandler.expectPdfNotContainsText(pdfStream, "text");
```
<a name="utilities.formatter"></a>

### utilities.formatter
**Kind**: static class of [<code>utilities</code>](#utilities)  

* [.formatter](#utilities.formatter)
    * [.sliceStringAt(input, slicePoint, length)](#utilities.formatter.sliceStringAt) ⇒ <code>String</code>
    * [.sliceStringAfter(input, slicePoint, length)](#utilities.formatter.sliceStringAfter) ⇒ <code>String</code>
    * [.trimString(input)](#utilities.formatter.trimString)
    * [.extractNumberFromString(input, index)](#utilities.formatter.extractNumberFromString) ⇒ <code>String</code>
    * [.stringifyJSON(object)](#utilities.formatter.stringifyJSON) ⇒ <code>String</code>
    * [.formatDate(date, format)](#utilities.formatter.formatDate) ⇒ <code>String</code>

<a name="utilities.formatter.sliceStringAt"></a>

#### formatter.sliceStringAt(input, slicePoint, length) ⇒ <code>String</code>
Slices a input string beginning at specific substring.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  
**Returns**: <code>String</code> - The sliced string.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | The input string to slice. |
| slicePoint | <code>String</code> | The substring at which the input string is sliced. |
| length | <code>Integer</code> | The required length of the returning string (starting at the index of the passed slice point). |

**Example**  
```js
let sliced = utilities.formatter.sliceStringAt("prefixNR12345postfix", "NR", 7);// this will return "NR12345"
```
<a name="utilities.formatter.sliceStringAfter"></a>

#### formatter.sliceStringAfter(input, slicePoint, length) ⇒ <code>String</code>
Slices a input string beginning after a specific substring.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  
**Returns**: <code>String</code> - The sliced string.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | The input string to slice. |
| slicePoint | <code>String</code> | The substring after the input string is sliced. |
| length | <code>Integer</code> | The required length of the returning string (starting at the index after the passed slice point). |

**Example**  
```js
let sliced = utilities.formatter.sliceStringAfter("prefixNR12345postfix", "NR", 5);// this will return "12345"
```
<a name="utilities.formatter.trimString"></a>

#### formatter.trimString(input)
Removes whitespace from both sides of a string.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | The input string to trim. |

**Example**  
```js
let trimmed = utilities.formatter.trimString("   value ");// this will return "value"
```
<a name="utilities.formatter.extractNumberFromString"></a>

#### formatter.extractNumberFromString(input, index) ⇒ <code>String</code>
Extracts all numbers from a string.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  
**Returns**: <code>String</code> - The extracted number.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | The input string to extract the number. |
| index | <code>Integer</code> | [OPTIONAL] If there are multiple numbers in the string you can pass an index to return a specific one. Per default it will return the first. |

**Example**  
```js
let extracted = utilities.formatter.extractNumberFromString("prefixNR12345postfix");// this will return "12345"
```
**Example**  
```js
let extracted = utilities.formatter.extractNumberFromString("first12345 someText second 20 abc", 1);// this will return "20"
```
<a name="utilities.formatter.stringifyJSON"></a>

#### formatter.stringifyJSON(object) ⇒ <code>String</code>
Stringifies a JSON.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  
**Returns**: <code>String</code> - The stringified JSON-Object.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>JSON</code> | The JSON to stringify. |

**Example**  
```js
throw new Error(`No visible element found with selector: ${JSON.stringify(selector)}`);
```
**Example**  
```js
console.log(`Printing the current selector: ${utilities.formatter.stringifyJSON(selector)}`);
```
<a name="utilities.formatter.formatDate"></a>

#### formatter.formatDate(date, format) ⇒ <code>String</code>
formats date.

**Kind**: static method of [<code>formatter</code>](#utilities.formatter)  
**Returns**: <code>String</code> - The formatted date as string.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | The date object to be formatted. |
| format | <code>String</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object"). |

**Example**  
```js
const date = new Date(2020, 0, 17);const formattedDate = utilities.formatDate(date, "mm/dd/yyyy");// this will return "01/17/2020"
```
<a name="utilities.function"></a>

### utilities.function
**Kind**: static class of [<code>utilities</code>](#utilities)  

* [.function](#utilities.function)
    * [.retry(fct, args, retries, interval, scope)](#utilities.function.retry)
    * [.executeOptional(fct, args)](#utilities.function.executeOptional)

<a name="utilities.function.retry"></a>

#### function.retry(fct, args, retries, interval, scope)
Retries the passed function n times with an specific intervall until it executed successfully.

**Kind**: static method of [<code>function</code>](#utilities.function)  

| Param | Type | Description |
| --- | --- | --- |
| fct | <code>function</code> | The function to retry. |
| args | <code>Array</code> | An array of the arguments passed to the function. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |
| scope | <code>Object</code> | The function scope to execute the function, defaults to null (global object) |

**Example**  
```js
async function sayHello(firstName, lastName) {console.log("Hello " + firstName + " " + lastName + "!");}await utilities.function.retry(sayHello, ["John", "Doe"], 3, 5000);
```
<a name="utilities.function.executeOptional"></a>

#### function.executeOptional(fct, args)
Executes the passed function optionally. If it fails, a promise will be returned anyway.

**Kind**: static method of [<code>function</code>](#utilities.function)  

| Param | Type | Description |
| --- | --- | --- |
| fct | <code>function</code> | The function to execute. |
| args | <code>Array</code> | An array of the arguments passed to the function. |

**Example**  
```js
function sayHello(firstName, lastName) {console.log("Hello " + firstName + " " + lastName + "!");}await utilities.function.executeOptional(sayHello, ["John", "Doe"]);
```
<a name="utilities.mockserver"></a>

### utilities.mockserver
**Kind**: static class of [<code>utilities</code>](#utilities)  

* [.mockserver](#utilities.mockserver)
    * [.waitForUi5ApplicationLoad(interval)](#utilities.mockserver.waitForUi5ApplicationLoad)
    * [.interactWithMockServer(mockServerPath, fnCallback, oParams)](#utilities.mockserver.interactWithMockServer)
    * [.attachFunctionBefore(method, mockServerPath, fnBeforeCallback, oParams)](#utilities.mockserver.attachFunctionBefore)
    * [.attachFunctionAfter(method, mockServerPath, fnAfterCallback, oParams)](#utilities.mockserver.attachFunctionAfter)
    * [.addNewRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)](#utilities.mockserver.addNewRequest)
    * [.removeRequest(method, mockServerPath, urlPathRegex)](#utilities.mockserver.removeRequest)
    * [.addOrOverrideRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)](#utilities.mockserver.addOrOverrideRequest)
    * [.startMockServer(mockServerPath)](#utilities.mockserver.startMockServer)
    * [.initMockServer(mockServerPath, mockServerOptions)](#utilities.mockserver.initMockServer)
    * [.initApplication(mockServerPath)](#utilities.mockserver.initApplication)
    * [.stopMockServer(mockServerPath)](#utilities.mockserver.stopMockServer)
    * [.loadMockDataFile(filePath, isText)](#utilities.mockserver.loadMockDataFile) ⇒ <code>String</code>
    * [.getEntitySetData(mockServerPath, entitySetName)](#utilities.mockserver.getEntitySetData) ⇒ <code>Array</code>
    * [.setEntitySetData(mockServerPath, entitySetName, entries)](#utilities.mockserver.setEntitySetData)

<a name="utilities.mockserver.waitForUi5ApplicationLoad"></a>

#### mockserver.waitForUi5ApplicationLoad(interval)
Waits for the UI5 framework to load and makes sure XHR request finished und busy indicators are not visible anymore.

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>Integer</code> | The intervals to use when waiting UI5 to load. |

**Example**  
```js
await utilities.mockserver.waitForUi5ApplicationLoad(100);
```
<a name="utilities.mockserver.interactWithMockServer"></a>

#### mockserver.interactWithMockServer(mockServerPath, fnCallback, oParams)
Execute client script function to enable interaction with mockserver instance [you can write code in ui5 app context]

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver instance |
| fnCallback | <code>String</code> \| <code>Object</code> | The client script function that you can use to interact with your mockserver instance. [Caution] The first and last parameter is reserved (1st param is the mockserver instance and last parameter the promise resolve function - done) |
| oParams | <code>String</code> | Additional parameters you would like to inject in your client script function |

**Example**  
```js
await utilities.mockserver.interactWithMockServer("path/to/project/localService/main/mockserver", fnCallback, oParams);
```
<a name="utilities.mockserver.attachFunctionBefore"></a>

#### mockserver.attachFunctionBefore(method, mockServerPath, fnBeforeCallback, oParams)
Attaches a callback function in mockserver attachBefore event to be executed

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The attachAfter http method [GET or POST]. |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed]. |
| fnBeforeCallback | <code>String</code> \| <code>Object</code> | The callback function to be used in the native attachBefore method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.util.MockServer%23methods/Summary) |
| oParams | <code>Object</code> | Additional parameters you would like to inject in your client script function |

**Example**  
```js
await utilities.mockserver.attachFunctionBefore("GET", "path/to/project/localService/main/mockserver", fnBeforeCallback, oParams);
```
<a name="utilities.mockserver.attachFunctionAfter"></a>

#### mockserver.attachFunctionAfter(method, mockServerPath, fnAfterCallback, oParams)
Attaches a callback function in mockserver attachAfter event to be executed

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The attachAfter http method [GET or POST]. |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed]. |
| fnAfterCallback | <code>String</code> \| <code>Object</code> | The callback function to be used in the native attachAfter method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.util.MockServer%23methods/Summary) |
| oParams | <code>Object</code> | Additional parameters you would like to inject in your client script function |

**Example**  
```js
await utilities.mockserver.attachFunctionAfter("GET", "path/to/project/localService/main/mockserver",  fnAfterCallback);
```
<a name="utilities.mockserver.addNewRequest"></a>

#### mockserver.addNewRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)
Adds new mock request

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The http method [GET,POST..]. |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| urlPathRegex | <code>String</code> | The url path regex to filter the requests |
| responseJsonPath | <code>String</code> | The json object or the path to your json file to be used as response [use relative path from the html page started]. |
| returnCode | <code>Integer</code> | The http response code to simulate for this mock request. |
| isText | <code>Boolean</code> | If true then content type is text/plain otherwise application/json. |
| responseMessages | <code>String</code> | Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)] |
| responseLocation | <code>String</code> | Mocks the location response messages header |

**Example**  
```js
await utilities.mockserver.addNewRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
```
<a name="utilities.mockserver.removeRequest"></a>

#### mockserver.removeRequest(method, mockServerPath, urlPathRegex)
Removes request mock [Doesn't work currently - Mockserver bug]

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The http method [GET,POST..]. |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| urlPathRegex | <code>String</code> | The url path regex to filter the requests |

**Example**  
```js
await utilities.mockserver.removeRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*");
```
<a name="utilities.mockserver.addOrOverrideRequest"></a>

#### mockserver.addOrOverrideRequest(method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation)
Adds new or overrides an existing mock request

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The http method [GET,POST..]. |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| urlPathRegex | <code>String</code> | The url path regex to filter the requests |
| responseJsonPath | <code>String</code> | The json object or the path to your json file to be used as response [use relative path from the html page started]. |
| returnCode | <code>Integer</code> | The http response code to simulate for this mock request. |
| isText | <code>Boolean</code> | If true then content type is text/plain otherwise application/json. |
| responseMessages | <code>String</code> | Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)] |
| responseLocation | <code>String</code> | Mocks the location response messages header |

**Example**  
```js
await utilities.mockserver.addOrOverrideRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
```
<a name="utilities.mockserver.startMockServer"></a>

#### mockserver.startMockServer(mockServerPath)
(Re-)Starts mock server instance

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |

**Example**  
```js
await utilities.mockserver.startMockServer("path/to/project/localService/main/mockserver");
```
<a name="utilities.mockserver.initMockServer"></a>

#### mockserver.initMockServer(mockServerPath, mockServerOptions)
Initializes the provide mockserver instance on the fly

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| mockServerOptions | <code>String</code> | The mock server options |

**Example**  
```js
await utilities.mockserver.initMockServer("path/to/project/localService/main/mockserver", mockServerOptions);
```
<a name="utilities.mockserver.initApplication"></a>

#### mockserver.initApplication(mockServerPath)
Initializes the application [Used in the beggining of script, once the mockserver is fully initialized and request mocking is done]

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |

**Example**  
```js
await utilities.mockserver.initApplication("path/to/project/localService/main/mockserver");
```
<a name="utilities.mockserver.stopMockServer"></a>

#### mockserver.stopMockServer(mockServerPath)
Stops the mockserver instance

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |

**Example**  
```js
await utilities.mockserver.stopMockServer("path/to/project/localService/main/mockserver");
```
<a name="utilities.mockserver.loadMockDataFile"></a>

#### mockserver.loadMockDataFile(filePath, isText) ⇒ <code>String</code>
Loads a mock data file

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  
**Returns**: <code>String</code> - The json object  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| isText | <code>Boolean</code> | If true then content type is text/plain otherwise application/json. |

**Example**  
```js
await utilities.mockserver.loadMockDataFile("path/to/project/mockData/myData.json", true);
```
<a name="utilities.mockserver.getEntitySetData"></a>

#### mockserver.getEntitySetData(mockServerPath, entitySetName) ⇒ <code>Array</code>
Retrieves entity data

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  
**Returns**: <code>Array</code> - An array of json objects  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| entitySetName | <code>String</code> | The entity set name |

**Example**  
```js
await utilities.mockserver.getEntitySetData("path/to/project/localService/main/mockserver", "Headers");
```
<a name="utilities.mockserver.setEntitySetData"></a>

#### mockserver.setEntitySetData(mockServerPath, entitySetName, entries)
Override entity data entries

**Kind**: static method of [<code>mockserver</code>](#utilities.mockserver)  

| Param | Type | Description |
| --- | --- | --- |
| mockServerPath | <code>String</code> | The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance]. |
| entitySetName | <code>String</code> | The entity name |
| entries | <code>String</code> | The json object to be used as data to be inserted [use relative path from the html page started]. |

**Example**  
```js
await utilities.mockserver.setEntitySetData("path/to/project/localService/main/mockserver", "Headers", entries);
```
<a name="utilities.OS"></a>

### utilities.OS
**Kind**: static class of [<code>utilities</code>](#utilities)  
<a name="utilities.qUnit"></a>

### utilities.qUnit
**Kind**: static class of [<code>utilities</code>](#utilities)  
<a name="utilities.qUnit.executeTests"></a>

#### qUnit.executeTests(relativePathToQUnitHTML)
Executes QUnit & OPA5 tests [Qmate  acts like a runner]

**Kind**: static method of [<code>qUnit</code>](#utilities.qUnit)  

| Param | Type | Description |
| --- | --- | --- |
| relativePathToQUnitHTML | <code>String</code> | Relative path to the QUnit/OPA5 html file |

**Example**  
```js
await utilities.qUnit.executeTests("path/to/qunit.html");
```
<a name="ui5"></a>

## ui5 : <code>object</code>
Namespace for ui5 modules.

**Kind**: global namespace  

* [ui5](#ui5) : <code>object</code>
    * [.common](#ui5.common) : <code>object</code>
        * [.assertion](#ui5.common.assertion)
            * [.expectAttributeToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToBe) ⇒ <code>Promise</code>
            * [.expectAttributeToContain(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToContain) ⇒ <code>Promise</code>
            * [.expectValidationError(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationError) ⇒ <code>Promise</code>
            * [.expectValidationSuccess(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationSuccess) ⇒ <code>Promise</code>
            * [.expectBindingPathToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingPathToBe) ⇒ <code>Promise</code>
            * [.expectBindingContextPathToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingContextPathToBe) ⇒ <code>Promise</code>
            * [.expectTextToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectTextToBe) ⇒ <code>Promise</code>
            * [.expectValueToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
            * [.expectValueToBeDefined(selector, index, timeout)](#ui5.common.assertion.expectValueToBeDefined) ⇒ <code>Promise</code>
            * [.expectToBeNotEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeNotEnabled) ⇒ <code>Promise</code>
            * [.expectToBeEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeEnabled) ⇒ <code>Promise</code>
            * [.expectToBeVisible(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
            * [.expectToBeVisibleInViewport(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisibleInViewport) ⇒ <code>Promise</code>
            * [.expectToBeNotVisible(selector, index, timeout)](#ui5.common.assertion.expectToBeNotVisible) ⇒ <code>Promise</code>
            * [.expectPageTitle(compareValue)](#ui5.common.assertion.expectPageTitle) ⇒ <code>Promise</code>
            * [.expectShellHeader()](#ui5.common.assertion.expectShellHeader) ⇒ <code>Promise</code>
            * [.expectLogoutText()](#ui5.common.assertion.expectLogoutText) ⇒ <code>Promise</code>
            * [.expectUnsupportedNavigationPopup(navigationTarget)](#ui5.common.assertion.expectUnsupportedNavigationPopup) ⇒ <code>Promise</code>
            * [.expectMessageToastText(text, timeout)](#ui5.common.assertion.expectMessageToastText) ⇒ <code>boolean</code>
            * [.expectUrlToBe()](#ui5.common.assertion.expectUrlToBe) ⇒ <code>Promise</code>
            * [.expectEqual(value1, value2)](#ui5.common.assertion.expectEqual)
            * [.expectUnequal(value1, value2)](#ui5.common.assertion.expectUnequal)
            * [.expectTrue(value)](#ui5.common.assertion.expectTrue)
            * [.expectFalse(value)](#ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
            * [.expectDefined(value)](#ui5.common.assertion.expectDefined)
            * [.expectUndefined(value)](#ui5.common.assertion.expectUndefined)
        * [.client](#ui5.common.client)
            * [.executeControlInBrowser(callbackFunction, selectorOrElement, parameters)](#ui5.common.client.executeControlInBrowser)
            * [.getControlProperty(elem, propertyName)](#ui5.common.client.getControlProperty)
            * [.getControlAggregationProperty(elem, propertyName)](#ui5.common.client.getControlAggregationProperty)
            * [.getControlAssociationProperty(elem, propertyName)](#ui5.common.client.getControlAssociationProperty)
            * [.getControlBindingContextPathProperty(elem)](#ui5.common.client.getControlBindingContextPathProperty)
            * [.getControlPropertyBinding(elem, propertyName)](#ui5.common.client.getControlPropertyBinding) ⇒ <code>Array</code>
        * [.confirmationDialog](#ui5.common.confirmationDialog)
            * [.clickOk(timeout)](#ui5.common.confirmationDialog.clickOk)
            * [.clickCancel(timeout)](#ui5.common.confirmationDialog.clickCancel)
            * [.clickYes([timeout])](#ui5.common.confirmationDialog.clickYes)
            * [.clickNo([timeout])](#ui5.common.confirmationDialog.clickNo)
            * [.clickDelete([timeout])](#ui5.common.confirmationDialog.clickDelete)
            * [.clickRevokeApproval([timeout])](#ui5.common.confirmationDialog.clickRevokeApproval)
            * [.clickCreate()](#ui5.common.confirmationDialog.clickCreate)
        * [.date](#ui5.common.date)
            * [.pickDate(selector, date)](#ui5.common.date.pickDate)
            * [.pickDateRange(selector, range)](#ui5.common.date.pickDateRange)
            * [.fillDateRange(selector, range)](#ui5.common.date.fillDateRange)
            * [.getToday(format)](#ui5.common.date.getToday) ⇒ <code>String</code>
            * [.getTomorrow(format)](#ui5.common.date.getTomorrow) ⇒ <code>String</code>
            * [.getNextMonth(format)](#ui5.common.date.getNextMonth) ⇒ <code>String</code>
            * [.getPreviousMonth(format)](#ui5.common.date.getPreviousMonth) ⇒ <code>String</code>
            * [.getNextYear(format)](#ui5.common.date.getNextYear) ⇒ <code>String</code>
            * [.getPreviousYear(format)](#ui5.common.date.getPreviousYear) ⇒ <code>String</code>
            * [.getSpecificDate(date, format)](#ui5.common.date.getSpecificDate) ⇒ <code>String</code>
            * [.calculateDate([date], [format])](#ui5.common.date.calculateDate) ⇒ <code>String</code>
        * [.errorDialog](#ui5.common.errorDialog)
            * [.expectErrorDialogToBeVisible()](#ui5.common.errorDialog.expectErrorDialogToBeVisible)
            * [.clickClose()](#ui5.common.errorDialog.clickClose)
        * [.footerBar](#ui5.common.footerBar)
            * [.clickApply()](#ui5.common.footerBar.clickApply)
            * [.clickSave()](#ui5.common.footerBar.clickSave)
            * [.clickCreate()](#ui5.common.footerBar.clickCreate)
            * [.clickCancel()](#ui5.common.footerBar.clickCancel)
            * [.clickCheck()](#ui5.common.footerBar.clickCheck)
            * [.clickOrder()](#ui5.common.footerBar.clickOrder)
            * [.clickPost()](#ui5.common.footerBar.clickPost)
            * [.clickAdd()](#ui5.common.footerBar.clickAdd)
        * [.formatter](#ui5.common.formatter)
            * [.addRemoveLeadingZeros(number, length)](#ui5.common.formatter.addRemoveLeadingZeros) ⇒ <code>String</code>
        * [.iconTabBar](#ui5.common.iconTabBar)
            * [.switchTab(value)](#ui5.common.iconTabBar.switchTab)
        * [.locator](#ui5.common.locator)
            * [.waitForAllElements(selector, timeout)](#ui5.common.locator.waitForAllElements)
            * [.getDisplayedElements(selector, timeout)](#ui5.common.locator.getDisplayedElements) ⇒ <code>Object</code>
            * [.getDisplayedElement(selector, index, timeout)](#ui5.common.locator.getDisplayedElement) ⇒ <code>Object</code>
            * [.getDisplayedChildElement(parentSelector, childSelector, parentIndex, childIndex, timeout)](#ui5.common.locator.getDisplayedChildElement) ⇒ <code>Object</code>
            * [.getElementByText(selector, value, index, timeout)](#ui5.common.locator.getElementByText) ⇒ <code>Object</code>
            * [.getElementId(selector, index, timeout)](#ui5.common.locator.getElementId) ⇒ <code>String</code>
            * [.getBindingValue(selector, attribute, index, timeout)](#ui5.common.locator.getBindingValue) ⇒ <code>String</code>
            * [.getValue(selector, attribute, index, timeout)](#ui5.common.locator.getValue) ⇒ <code>String</code>
            * [.scrollToElement(selector, index, alignment, timeout)](#ui5.common.locator.scrollToElement)
            * [.highlightElement(selector, duration, color)](#ui5.common.locator.highlightElement)
            * [.isVisible(selector, index, timeout)](#ui5.common.locator.isVisible) ⇒ <code>Boolean</code>
        * [.navigation](#ui5.common.navigation)
            * [.closePopups(timeout)](#ui5.common.navigation.closePopups)
            * [.navigateToApplication(intent, preventPopups, verify)](#ui5.common.navigation.navigateToApplication)
            * [.navigateToApplicationAndRetry(intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToApplicationAndRetry)
            * [.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify)](#ui5.common.navigation.navigateToApplicationWithQueryParams)
            * [.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, closePopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry)
            * [.navigateToApplicationAndRetryRefresh(intent, preventPopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationAndRetryRefresh)
            * [.navigateToSystemAndApplication(system, intent, closePopups, verify)](#ui5.common.navigation.navigateToSystemAndApplication)
            * [.navigateToSystemAndApplicationAndRetry(system, intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToSystemAndApplicationAndRetry)
            * [.navigateToUrl(url)](#ui5.common.navigation.navigateToUrl)
            * [.printCurrentUrl()](#ui5.common.navigation.printCurrentUrl)
        * [.navigationBar](#ui5.common.navigationBar)
            * [.clickBack()](#ui5.common.navigationBar.clickBack)
            * [.clickSapLogo()](#ui5.common.navigationBar.clickSapLogo)
            * [.clickUserIcon()](#ui5.common.navigationBar.clickUserIcon)
        * [.session](#ui5.common.session)
            * [.login(username, password, verify, timeout)](#ui5.common.session.login)
            * [.loginFiori(username, password, verify)](#ui5.common.session.loginFiori)
            * [.loginSapCloud(username, password, verify)](#ui5.common.session.loginSapCloud)
            * [.loginCustom(username, password, usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify)](#ui5.common.session.loginCustom)
            * [.loginCustomViaConfig(username, password, verify)](#ui5.common.session.loginCustomViaConfig)
            * [.logout(verify)](#ui5.common.session.logout)
            * [.switchUser(username, password, authenticator, timeout)](#ui5.common.session.switchUser)
        * [.userInteraction](#ui5.common.userInteraction)
            * [.click(selector, index, timeout)](#ui5.common.userInteraction.click)
            * [.clickAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clickAndRetry)
            * [.clickTab(selector, index, timeout)](#ui5.common.userInteraction.clickTab)
            * [.clickListItem(selector, index, timeout)](#ui5.common.userInteraction.clickListItem)
            * [.pressEnter()](#ui5.common.userInteraction.pressEnter)
            * [.pressF4()](#ui5.common.userInteraction.pressF4)
            * [.pressTab()](#ui5.common.userInteraction.pressTab)
            * [.pressBackspace()](#ui5.common.userInteraction.pressBackspace)
            * [.pressArrowLeft()](#ui5.common.userInteraction.pressArrowLeft)
            * [.pressArrowRight()](#ui5.common.userInteraction.pressArrowRight)
            * [.selectAll(selector, index, timeout)](#ui5.common.userInteraction.selectAll)
            * [.fill(selector, value, index, timeout)](#ui5.common.userInteraction.fill)
            * [.fillAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.fillAndRetry)
            * [.fillActive(value)](#ui5.common.userInteraction.fillActive)
            * [.fillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.fillActiveAndRetry)
            * [.clearAndFillSmartFieldInput(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFillSmartFieldInput)
            * [.clearSmartFieldInput(selector, index, timeout)](#ui5.common.userInteraction.clearSmartFieldInput)
            * [.clearAndFillSmartFieldInputAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry)
            * [.clearAndFill(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFill)
            * [.clearFillAndRetry(selector, value, index, timeout, retries, interval, verify)](#ui5.common.userInteraction.clearFillAndRetry)
            * [.clearAndFillActive(value)](#ui5.common.userInteraction.clearAndFillActive)
            * [.clearFillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.clearFillActiveAndRetry)
            * [.clear(selector, index, timeout)](#ui5.common.userInteraction.clear)
            * [.clearAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndRetry)
            * [.openF4Help(selector, index, timeout, useF4Key)](#ui5.common.userInteraction.openF4Help)
            * [.searchFor(selector, value, index, timeout, useEnter)](#ui5.common.userInteraction.searchFor)
            * [.resetSearch(selector, index, timeout)](#ui5.common.userInteraction.resetSearch)
            * [.selectComboBox(selector, value, index)](#ui5.common.userInteraction.selectComboBox)
            * [.selectMultiComboBox(selector, values, index)](#ui5.common.userInteraction.selectMultiComboBox)
            * [.selectBox(selector, value, index)](#ui5.common.userInteraction.selectBox)
            * [.clickSelectArrow(selector, index)](#ui5.common.userInteraction.clickSelectArrow)
            * [.clickSelectArrowAndRetry(selector, retries, interval, index)](#ui5.common.userInteraction.clickSelectArrowAndRetry)

<a name="ui5.common"></a>

### ui5.common : <code>object</code>
Namespace for common modules.

**Kind**: static namespace of [<code>ui5</code>](#ui5)  

* [.common](#ui5.common) : <code>object</code>
    * [.assertion](#ui5.common.assertion)
        * [.expectAttributeToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToBe) ⇒ <code>Promise</code>
        * [.expectAttributeToContain(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToContain) ⇒ <code>Promise</code>
        * [.expectValidationError(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationError) ⇒ <code>Promise</code>
        * [.expectValidationSuccess(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationSuccess) ⇒ <code>Promise</code>
        * [.expectBindingPathToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingPathToBe) ⇒ <code>Promise</code>
        * [.expectBindingContextPathToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingContextPathToBe) ⇒ <code>Promise</code>
        * [.expectTextToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectTextToBe) ⇒ <code>Promise</code>
        * [.expectValueToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
        * [.expectValueToBeDefined(selector, index, timeout)](#ui5.common.assertion.expectValueToBeDefined) ⇒ <code>Promise</code>
        * [.expectToBeNotEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeNotEnabled) ⇒ <code>Promise</code>
        * [.expectToBeEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeEnabled) ⇒ <code>Promise</code>
        * [.expectToBeVisible(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
        * [.expectToBeVisibleInViewport(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisibleInViewport) ⇒ <code>Promise</code>
        * [.expectToBeNotVisible(selector, index, timeout)](#ui5.common.assertion.expectToBeNotVisible) ⇒ <code>Promise</code>
        * [.expectPageTitle(compareValue)](#ui5.common.assertion.expectPageTitle) ⇒ <code>Promise</code>
        * [.expectShellHeader()](#ui5.common.assertion.expectShellHeader) ⇒ <code>Promise</code>
        * [.expectLogoutText()](#ui5.common.assertion.expectLogoutText) ⇒ <code>Promise</code>
        * [.expectUnsupportedNavigationPopup(navigationTarget)](#ui5.common.assertion.expectUnsupportedNavigationPopup) ⇒ <code>Promise</code>
        * [.expectMessageToastText(text, timeout)](#ui5.common.assertion.expectMessageToastText) ⇒ <code>boolean</code>
        * [.expectUrlToBe()](#ui5.common.assertion.expectUrlToBe) ⇒ <code>Promise</code>
        * [.expectEqual(value1, value2)](#ui5.common.assertion.expectEqual)
        * [.expectUnequal(value1, value2)](#ui5.common.assertion.expectUnequal)
        * [.expectTrue(value)](#ui5.common.assertion.expectTrue)
        * [.expectFalse(value)](#ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
        * [.expectDefined(value)](#ui5.common.assertion.expectDefined)
        * [.expectUndefined(value)](#ui5.common.assertion.expectUndefined)
    * [.client](#ui5.common.client)
        * [.executeControlInBrowser(callbackFunction, selectorOrElement, parameters)](#ui5.common.client.executeControlInBrowser)
        * [.getControlProperty(elem, propertyName)](#ui5.common.client.getControlProperty)
        * [.getControlAggregationProperty(elem, propertyName)](#ui5.common.client.getControlAggregationProperty)
        * [.getControlAssociationProperty(elem, propertyName)](#ui5.common.client.getControlAssociationProperty)
        * [.getControlBindingContextPathProperty(elem)](#ui5.common.client.getControlBindingContextPathProperty)
        * [.getControlPropertyBinding(elem, propertyName)](#ui5.common.client.getControlPropertyBinding) ⇒ <code>Array</code>
    * [.confirmationDialog](#ui5.common.confirmationDialog)
        * [.clickOk(timeout)](#ui5.common.confirmationDialog.clickOk)
        * [.clickCancel(timeout)](#ui5.common.confirmationDialog.clickCancel)
        * [.clickYes([timeout])](#ui5.common.confirmationDialog.clickYes)
        * [.clickNo([timeout])](#ui5.common.confirmationDialog.clickNo)
        * [.clickDelete([timeout])](#ui5.common.confirmationDialog.clickDelete)
        * [.clickRevokeApproval([timeout])](#ui5.common.confirmationDialog.clickRevokeApproval)
        * [.clickCreate()](#ui5.common.confirmationDialog.clickCreate)
    * [.date](#ui5.common.date)
        * [.pickDate(selector, date)](#ui5.common.date.pickDate)
        * [.pickDateRange(selector, range)](#ui5.common.date.pickDateRange)
        * [.fillDateRange(selector, range)](#ui5.common.date.fillDateRange)
        * [.getToday(format)](#ui5.common.date.getToday) ⇒ <code>String</code>
        * [.getTomorrow(format)](#ui5.common.date.getTomorrow) ⇒ <code>String</code>
        * [.getNextMonth(format)](#ui5.common.date.getNextMonth) ⇒ <code>String</code>
        * [.getPreviousMonth(format)](#ui5.common.date.getPreviousMonth) ⇒ <code>String</code>
        * [.getNextYear(format)](#ui5.common.date.getNextYear) ⇒ <code>String</code>
        * [.getPreviousYear(format)](#ui5.common.date.getPreviousYear) ⇒ <code>String</code>
        * [.getSpecificDate(date, format)](#ui5.common.date.getSpecificDate) ⇒ <code>String</code>
        * [.calculateDate([date], [format])](#ui5.common.date.calculateDate) ⇒ <code>String</code>
    * [.errorDialog](#ui5.common.errorDialog)
        * [.expectErrorDialogToBeVisible()](#ui5.common.errorDialog.expectErrorDialogToBeVisible)
        * [.clickClose()](#ui5.common.errorDialog.clickClose)
    * [.footerBar](#ui5.common.footerBar)
        * [.clickApply()](#ui5.common.footerBar.clickApply)
        * [.clickSave()](#ui5.common.footerBar.clickSave)
        * [.clickCreate()](#ui5.common.footerBar.clickCreate)
        * [.clickCancel()](#ui5.common.footerBar.clickCancel)
        * [.clickCheck()](#ui5.common.footerBar.clickCheck)
        * [.clickOrder()](#ui5.common.footerBar.clickOrder)
        * [.clickPost()](#ui5.common.footerBar.clickPost)
        * [.clickAdd()](#ui5.common.footerBar.clickAdd)
    * [.formatter](#ui5.common.formatter)
        * [.addRemoveLeadingZeros(number, length)](#ui5.common.formatter.addRemoveLeadingZeros) ⇒ <code>String</code>
    * [.iconTabBar](#ui5.common.iconTabBar)
        * [.switchTab(value)](#ui5.common.iconTabBar.switchTab)
    * [.locator](#ui5.common.locator)
        * [.waitForAllElements(selector, timeout)](#ui5.common.locator.waitForAllElements)
        * [.getDisplayedElements(selector, timeout)](#ui5.common.locator.getDisplayedElements) ⇒ <code>Object</code>
        * [.getDisplayedElement(selector, index, timeout)](#ui5.common.locator.getDisplayedElement) ⇒ <code>Object</code>
        * [.getDisplayedChildElement(parentSelector, childSelector, parentIndex, childIndex, timeout)](#ui5.common.locator.getDisplayedChildElement) ⇒ <code>Object</code>
        * [.getElementByText(selector, value, index, timeout)](#ui5.common.locator.getElementByText) ⇒ <code>Object</code>
        * [.getElementId(selector, index, timeout)](#ui5.common.locator.getElementId) ⇒ <code>String</code>
        * [.getBindingValue(selector, attribute, index, timeout)](#ui5.common.locator.getBindingValue) ⇒ <code>String</code>
        * [.getValue(selector, attribute, index, timeout)](#ui5.common.locator.getValue) ⇒ <code>String</code>
        * [.scrollToElement(selector, index, alignment, timeout)](#ui5.common.locator.scrollToElement)
        * [.highlightElement(selector, duration, color)](#ui5.common.locator.highlightElement)
        * [.isVisible(selector, index, timeout)](#ui5.common.locator.isVisible) ⇒ <code>Boolean</code>
    * [.navigation](#ui5.common.navigation)
        * [.closePopups(timeout)](#ui5.common.navigation.closePopups)
        * [.navigateToApplication(intent, preventPopups, verify)](#ui5.common.navigation.navigateToApplication)
        * [.navigateToApplicationAndRetry(intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToApplicationAndRetry)
        * [.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify)](#ui5.common.navigation.navigateToApplicationWithQueryParams)
        * [.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, closePopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry)
        * [.navigateToApplicationAndRetryRefresh(intent, preventPopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationAndRetryRefresh)
        * [.navigateToSystemAndApplication(system, intent, closePopups, verify)](#ui5.common.navigation.navigateToSystemAndApplication)
        * [.navigateToSystemAndApplicationAndRetry(system, intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToSystemAndApplicationAndRetry)
        * [.navigateToUrl(url)](#ui5.common.navigation.navigateToUrl)
        * [.printCurrentUrl()](#ui5.common.navigation.printCurrentUrl)
    * [.navigationBar](#ui5.common.navigationBar)
        * [.clickBack()](#ui5.common.navigationBar.clickBack)
        * [.clickSapLogo()](#ui5.common.navigationBar.clickSapLogo)
        * [.clickUserIcon()](#ui5.common.navigationBar.clickUserIcon)
    * [.session](#ui5.common.session)
        * [.login(username, password, verify, timeout)](#ui5.common.session.login)
        * [.loginFiori(username, password, verify)](#ui5.common.session.loginFiori)
        * [.loginSapCloud(username, password, verify)](#ui5.common.session.loginSapCloud)
        * [.loginCustom(username, password, usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify)](#ui5.common.session.loginCustom)
        * [.loginCustomViaConfig(username, password, verify)](#ui5.common.session.loginCustomViaConfig)
        * [.logout(verify)](#ui5.common.session.logout)
        * [.switchUser(username, password, authenticator, timeout)](#ui5.common.session.switchUser)
    * [.userInteraction](#ui5.common.userInteraction)
        * [.click(selector, index, timeout)](#ui5.common.userInteraction.click)
        * [.clickAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clickAndRetry)
        * [.clickTab(selector, index, timeout)](#ui5.common.userInteraction.clickTab)
        * [.clickListItem(selector, index, timeout)](#ui5.common.userInteraction.clickListItem)
        * [.pressEnter()](#ui5.common.userInteraction.pressEnter)
        * [.pressF4()](#ui5.common.userInteraction.pressF4)
        * [.pressTab()](#ui5.common.userInteraction.pressTab)
        * [.pressBackspace()](#ui5.common.userInteraction.pressBackspace)
        * [.pressArrowLeft()](#ui5.common.userInteraction.pressArrowLeft)
        * [.pressArrowRight()](#ui5.common.userInteraction.pressArrowRight)
        * [.selectAll(selector, index, timeout)](#ui5.common.userInteraction.selectAll)
        * [.fill(selector, value, index, timeout)](#ui5.common.userInteraction.fill)
        * [.fillAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.fillAndRetry)
        * [.fillActive(value)](#ui5.common.userInteraction.fillActive)
        * [.fillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.fillActiveAndRetry)
        * [.clearAndFillSmartFieldInput(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFillSmartFieldInput)
        * [.clearSmartFieldInput(selector, index, timeout)](#ui5.common.userInteraction.clearSmartFieldInput)
        * [.clearAndFillSmartFieldInputAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry)
        * [.clearAndFill(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFill)
        * [.clearFillAndRetry(selector, value, index, timeout, retries, interval, verify)](#ui5.common.userInteraction.clearFillAndRetry)
        * [.clearAndFillActive(value)](#ui5.common.userInteraction.clearAndFillActive)
        * [.clearFillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.clearFillActiveAndRetry)
        * [.clear(selector, index, timeout)](#ui5.common.userInteraction.clear)
        * [.clearAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndRetry)
        * [.openF4Help(selector, index, timeout, useF4Key)](#ui5.common.userInteraction.openF4Help)
        * [.searchFor(selector, value, index, timeout, useEnter)](#ui5.common.userInteraction.searchFor)
        * [.resetSearch(selector, index, timeout)](#ui5.common.userInteraction.resetSearch)
        * [.selectComboBox(selector, value, index)](#ui5.common.userInteraction.selectComboBox)
        * [.selectMultiComboBox(selector, values, index)](#ui5.common.userInteraction.selectMultiComboBox)
        * [.selectBox(selector, value, index)](#ui5.common.userInteraction.selectBox)
        * [.clickSelectArrow(selector, index)](#ui5.common.userInteraction.clickSelectArrow)
        * [.clickSelectArrowAndRetry(selector, retries, interval, index)](#ui5.common.userInteraction.clickSelectArrowAndRetry)

<a name="ui5.common.assertion"></a>

#### common.assertion
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.assertion](#ui5.common.assertion)
    * [.expectAttributeToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToBe) ⇒ <code>Promise</code>
    * [.expectAttributeToContain(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectAttributeToContain) ⇒ <code>Promise</code>
    * [.expectValidationError(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationError) ⇒ <code>Promise</code>
    * [.expectValidationSuccess(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValidationSuccess) ⇒ <code>Promise</code>
    * [.expectBindingPathToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingPathToBe) ⇒ <code>Promise</code>
    * [.expectBindingContextPathToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectBindingContextPathToBe) ⇒ <code>Promise</code>
    * [.expectTextToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectTextToBe) ⇒ <code>Promise</code>
    * [.expectValueToBe(selector, compareValue, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
    * [.expectValueToBeDefined(selector, index, timeout)](#ui5.common.assertion.expectValueToBeDefined) ⇒ <code>Promise</code>
    * [.expectToBeNotEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeNotEnabled) ⇒ <code>Promise</code>
    * [.expectToBeEnabled(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeEnabled) ⇒ <code>Promise</code>
    * [.expectToBeVisible(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
    * [.expectToBeVisibleInViewport(selector, index, timeout, loadPropertyTimeout)](#ui5.common.assertion.expectToBeVisibleInViewport) ⇒ <code>Promise</code>
    * [.expectToBeNotVisible(selector, index, timeout)](#ui5.common.assertion.expectToBeNotVisible) ⇒ <code>Promise</code>
    * [.expectPageTitle(compareValue)](#ui5.common.assertion.expectPageTitle) ⇒ <code>Promise</code>
    * [.expectShellHeader()](#ui5.common.assertion.expectShellHeader) ⇒ <code>Promise</code>
    * [.expectLogoutText()](#ui5.common.assertion.expectLogoutText) ⇒ <code>Promise</code>
    * [.expectUnsupportedNavigationPopup(navigationTarget)](#ui5.common.assertion.expectUnsupportedNavigationPopup) ⇒ <code>Promise</code>
    * [.expectMessageToastText(text, timeout)](#ui5.common.assertion.expectMessageToastText) ⇒ <code>boolean</code>
    * [.expectUrlToBe()](#ui5.common.assertion.expectUrlToBe) ⇒ <code>Promise</code>
    * [.expectEqual(value1, value2)](#ui5.common.assertion.expectEqual)
    * [.expectUnequal(value1, value2)](#ui5.common.assertion.expectUnequal)
    * [.expectTrue(value)](#ui5.common.assertion.expectTrue)
    * [.expectFalse(value)](#ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
    * [.expectDefined(value)](#ui5.common.assertion.expectDefined)
    * [.expectUndefined(value)](#ui5.common.assertion.expectUndefined)

<a name="ui5.common.assertion.expectAttributeToBe"></a>

##### assertion.expectAttributeToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements attribute to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| attribute | <code>String</code> | The attribute to be compared. |
| compareValue | <code>String</code> \| <code>Boolean</code> \| <code>Number</code> \| <code>Object</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectAttributeToBe(selector, "text", "Hello", 0, 30000, 10000);
```
<a name="ui5.common.assertion.expectAttributeToContain"></a>

##### assertion.expectAttributeToContain(selector, attribute, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements attribute to contain the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| attribute | <code>String</code> | The attribute to be compared. |
| compareValue | <code>String</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectAttributeToContain(selector, "text", "Hello", 0, 30000, 10000);
```
<a name="ui5.common.assertion.expectValidationError"></a>

##### assertion.expectValidationError(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the valueState of the element to be "Error".

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectValidationError(selector, 30000, 10000);
```
<a name="ui5.common.assertion.expectValidationSuccess"></a>

##### assertion.expectValidationSuccess(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the valueState of the element to be "None".

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectValidationSuccess(selector, 30000, 10000);
```
<a name="ui5.common.assertion.expectBindingPathToBe"></a>

##### assertion.expectBindingPathToBe(selector, attribute, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements attribute binding-path  to contain the compare value

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| attribute | <code>String</code> | The attribute to be compared. |
| compareValue | <code>String</code> \| <code>Array.&lt;String&gt;</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectBindingPathToBe(selector, "text", "Hello");
```
<a name="ui5.common.assertion.expectBindingContextPathToBe"></a>

##### assertion.expectBindingContextPathToBe(selector, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements binding-context-path to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| compareValue | <code>String</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectBindingContextPathToBe(selector, "text", "Hello");
```
<a name="ui5.common.assertion.expectTextToBe"></a>

##### assertion.expectTextToBe(selector, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements text attribute to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| compareValue | <code>String</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectTextToBe(selector, "Hello");
```
<a name="ui5.common.assertion.expectValueToBe"></a>

##### assertion.expectValueToBe(selector, compareValue, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects the passed elements text value to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| compareValue | <code>String</code> | The compare value. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectValueToBe(selector, "123");
```
<a name="ui5.common.assertion.expectValueToBeDefined"></a>

##### assertion.expectValueToBeDefined(selector, index, timeout) ⇒ <code>Promise</code>
Expects the passed elements value to be defined.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Integer</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.assertion.expectValueToBeDefined(selector);
```
<a name="ui5.common.assertion.expectToBeNotEnabled"></a>

##### assertion.expectToBeNotEnabled(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects that the element is enabled to the user. Will fail if it is not enabled.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectToBeNotEnabled(selector);
```
<a name="ui5.common.assertion.expectToBeEnabled"></a>

##### assertion.expectToBeEnabled(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects that the element is enabled to the user. Will fail if it is not enabled.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectToBeEnabled(selector);
```
<a name="ui5.common.assertion.expectToBeVisible"></a>

##### assertion.expectToBeVisible(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects that the element is visible to the user. Will fail if it is not visible.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectToBeVisible(selector);
```
<a name="ui5.common.assertion.expectToBeVisibleInViewport"></a>

##### assertion.expectToBeVisibleInViewport(selector, index, timeout, loadPropertyTimeout) ⇒ <code>Promise</code>
Expects that the element is visible to the user in viewport. Will fail if it is not visible in viewport.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| loadPropertyTimeout | <code>Number</code> | The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec). |

**Example**  
```js
await ui5.common.assertion.expectToBeVisibleInViewport(selector);
```
<a name="ui5.common.assertion.expectToBeNotVisible"></a>

##### assertion.expectToBeNotVisible(selector, index, timeout) ⇒ <code>Promise</code>
Expects that the element is not visible to the user. Will fail if it is visible.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.assertion.expectToBeNotVisible(selector);
```
<a name="ui5.common.assertion.expectPageTitle"></a>

##### assertion.expectPageTitle(compareValue) ⇒ <code>Promise</code>
Expects the page title of the current page to be the compare value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| compareValue | <code>String</code> | The compare value. |

**Example**  
```js
await ui5.common.assertion.expectPageTitle("Home");
```
<a name="ui5.common.assertion.expectShellHeader"></a>

##### assertion.expectShellHeader() ⇒ <code>Promise</code>
Expects the shell header to be visible

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await ui5.common.assertion.expectShellHeader();
```
<a name="ui5.common.assertion.expectLogoutText"></a>

##### assertion.expectLogoutText() ⇒ <code>Promise</code>
Expects the logout text after logout to be "You have been logged off.            This is essential for chaining scripts, therefore there is no hard browser sleep required anymore in the spec itself".

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await ui5.common.assertion.expectLogoutText();
```
<a name="ui5.common.assertion.expectUnsupportedNavigationPopup"></a>

##### assertion.expectUnsupportedNavigationPopup(navigationTarget) ⇒ <code>Promise</code>
Expects navigation to an app that is not supported.             This can be the case for Mocked tests when the application does not exist             or when the app is not included in a role.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| navigationTarget | <code>String</code> | The selector describing the element. |

**Example**  
```js
await ui5.common.assertion.expectUnsupportedNavigationPopup("#SupplierInvoice-display?FiscalYear=1234&SupplierInvoice=1234567890");
```
<a name="ui5.common.assertion.expectMessageToastText"></a>

##### assertion.expectMessageToastText(text, timeout) ⇒ <code>boolean</code>
Expects the message toast with the passed text.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to expect in the Message Toast |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.assertion.expectMessageToastText(text);
```
<a name="ui5.common.assertion.expectUrlToBe"></a>

##### assertion.expectUrlToBe() ⇒ <code>Promise</code>
Expects the url to be the passed value.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  
**Example**  
```js
await ui5.common.assertion.expectUrlToBe("www.sap.com");
```
<a name="ui5.common.assertion.expectEqual"></a>

##### assertion.expectEqual(value1, value2)
Expects the passed values to be equal.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be equal to value (2) |
| value2 | <code>Any</code> | Value (2) to be equal to value (1) |

**Example**  
```js
ui5.common.assertion.expectEqual(value1, value2);
```
<a name="ui5.common.assertion.expectUnequal"></a>

##### assertion.expectUnequal(value1, value2)
Expects the passed values to be unequal.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be unequal to value (2) |
| value2 | <code>Any</code> | Value (2) to be unequal to value (1) |

**Example**  
```js
ui5.common.assertion.expectUnequal(value1, value2);
```
<a name="ui5.common.assertion.expectTrue"></a>

##### assertion.expectTrue(value)
Expects the passed value to be true.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be equal to true |

**Example**  
```js
ui5.common.assertion.expectTrue(value);
```
<a name="ui5.common.assertion.expectFalse"></a>

##### assertion.expectFalse(value) ⇒ <code>Promise</code>
Expects the passed value to be false.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to be false. |

**Example**  
```js
await ui5.common.assertion.expectFalse(false);
```
<a name="ui5.common.assertion.expectDefined"></a>

##### assertion.expectDefined(value)
Expects the passed values is defined.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be defined (not undefined) |

**Example**  
```js
ui5.common.assertion.expectDefined(value);
```
<a name="ui5.common.assertion.expectUndefined"></a>

##### assertion.expectUndefined(value)
Expects the passed values is undefined.

**Kind**: static method of [<code>assertion</code>](#ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be undefined |

**Example**  
```js
ui5.common.assertion.expectUndefined(value);
```
<a name="ui5.common.client"></a>

#### common.client
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.client](#ui5.common.client)
    * [.executeControlInBrowser(callbackFunction, selectorOrElement, parameters)](#ui5.common.client.executeControlInBrowser)
    * [.getControlProperty(elem, propertyName)](#ui5.common.client.getControlProperty)
    * [.getControlAggregationProperty(elem, propertyName)](#ui5.common.client.getControlAggregationProperty)
    * [.getControlAssociationProperty(elem, propertyName)](#ui5.common.client.getControlAssociationProperty)
    * [.getControlBindingContextPathProperty(elem)](#ui5.common.client.getControlBindingContextPathProperty)
    * [.getControlPropertyBinding(elem, propertyName)](#ui5.common.client.getControlPropertyBinding) ⇒ <code>Array</code>

<a name="ui5.common.client.executeControlInBrowser"></a>

##### client.executeControlInBrowser(callbackFunction, selectorOrElement, parameters)
Executes the passed callback function in browser client ui5 context, retrieving the passed element ui5 control in the native browser contextproviding you the possibility to work directly with a ui5 control and do any action and retrieve any property as you would do in the browser client.

**Kind**: static method of [<code>client</code>](#ui5.common.client)  

| Param | Type | Description |
| --- | --- | --- |
| callbackFunction | <code>function</code> | The client script function that you can use to interact with your control instance. [Caution] The first and last parameter is reserved (1st param is the control instance and last parameter the promise resolve function - done) |
| selectorOrElement | <code>String</code> \| <code>object</code> | The selector json or the dom element (retrieved from getDisplayElements) |
| parameters | <code>Object</code> | An object containing parameters to pass to the callback function. |

**Example**  
```js
let ui5ControlProperties = {"elementProperties":{"metadata":"sap.m.StandardListItem", "id": "*categoryList-7"}};let parameters = {"property": "text"};var title = await ui5.common.client.executeControlInBrowser(function(control, parameters, done){
      done(control.getProperty(parameters.property));
    }, ui5ControlProperties, parameters);
```
<a name="ui5.common.client.getControlProperty"></a>

##### client.getControlProperty(elem, propertyName)
Get UI control property

**Kind**: static method of [<code>client</code>](#ui5.common.client)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | The qmate element (result of calling getDisplayElement) |
| propertyName | <code>String</code> | The property name to retrieve from the control |

**Example**  
```js
let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "title";
    let val = await ui5.common.client.getControlProperty(elem, attribute);
```
<a name="ui5.common.client.getControlAggregationProperty"></a>

##### client.getControlAggregationProperty(elem, propertyName)
Get UI control aggregation property

**Kind**: static method of [<code>client</code>](#ui5.common.client)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | The qmate element (result of calling getDisplayElement) |
| propertyName | <code>String</code> | The property name to retrieve from the control |

**Example**  
```js
let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "items":[{"path":"/Categories"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "tooltip";
    let val = await ui5.common.client.getControlAggregationProperty(elem, attribute);
```
<a name="ui5.common.client.getControlAssociationProperty"></a>

##### client.getControlAssociationProperty(elem, propertyName)
Get UI control property

**Kind**: static method of [<code>client</code>](#ui5.common.client)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | The qmate element (result of calling getDisplayElement) |
| propertyName | <code>String</code> | The property name to retrieve from the control |

**Example**  
```js
let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.MultiComboBox","mProperties":{}};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "selectedItems";
    let val = await ui5.common.client.getControlAssociationProperty(elem, attribute);
```
<a name="ui5.common.client.getControlBindingContextPathProperty"></a>

##### client.getControlBindingContextPathProperty(elem)
Get UI control binding context path

**Kind**: static method of [<code>client</code>](#ui5.common.client)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | The qmate element (result of calling getDisplayElement) |

**Example**  
```js
let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{"title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let sContext = await ui5.common.client.getControlBindingContextPathProperty(elem);
```
<a name="ui5.common.client.getControlPropertyBinding"></a>

##### client.getControlPropertyBinding(elem, propertyName) ⇒ <code>Array</code>
Get UI control property

**Kind**: static method of [<code>client</code>](#ui5.common.client)  
**Returns**: <code>Array</code> - Array of bindings for the specific property  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | The qmate element (result of calling getDisplayElement) |
| propertyName | <code>String</code> | The property name to retrieve from the control binding |

**Example**  
```js
let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "title";
    let aBindings = await ui5.common.client.getControlPropertyBinding(elem, propertyName);
```
<a name="ui5.common.confirmationDialog"></a>

#### common.confirmationDialog
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.confirmationDialog](#ui5.common.confirmationDialog)
    * [.clickOk(timeout)](#ui5.common.confirmationDialog.clickOk)
    * [.clickCancel(timeout)](#ui5.common.confirmationDialog.clickCancel)
    * [.clickYes([timeout])](#ui5.common.confirmationDialog.clickYes)
    * [.clickNo([timeout])](#ui5.common.confirmationDialog.clickNo)
    * [.clickDelete([timeout])](#ui5.common.confirmationDialog.clickDelete)
    * [.clickRevokeApproval([timeout])](#ui5.common.confirmationDialog.clickRevokeApproval)
    * [.clickCreate()](#ui5.common.confirmationDialog.clickCreate)

<a name="ui5.common.confirmationDialog.clickOk"></a>

##### confirmationDialog.clickOk(timeout)
clicks the "OK" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickOk();
```
<a name="ui5.common.confirmationDialog.clickCancel"></a>

##### confirmationDialog.clickCancel(timeout)
clicks the "Cancel" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickCancel();
```
<a name="ui5.common.confirmationDialog.clickYes"></a>

##### confirmationDialog.clickYes([timeout])
clicks the "Yes" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| [timeout] | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickYes();
```
<a name="ui5.common.confirmationDialog.clickNo"></a>

##### confirmationDialog.clickNo([timeout])
clicks the "Yes" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| [timeout] | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickNo();
```
<a name="ui5.common.confirmationDialog.clickDelete"></a>

##### confirmationDialog.clickDelete([timeout])
clicks the "Delete" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| [timeout] | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickDelete();
```
<a name="ui5.common.confirmationDialog.clickRevokeApproval"></a>

##### confirmationDialog.clickRevokeApproval([timeout])
clicks the "Revoke Approval" button at the confirmation dialog.

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  

| Param | Type | Description |
| --- | --- | --- |
| [timeout] | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.confirmationDialog.clickRevokeApproval();
```
<a name="ui5.common.confirmationDialog.clickCreate"></a>

##### confirmationDialog.clickCreate()
Clicks the create button in the confirmation dialog

**Kind**: static method of [<code>confirmationDialog</code>](#ui5.common.confirmationDialog)  
**Example**  
```js
await ui5.common.confirmationDialog.clickCreate();
```
<a name="ui5.common.date"></a>

#### common.date
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.date](#ui5.common.date)
    * [.pickDate(selector, date)](#ui5.common.date.pickDate)
    * [.pickDateRange(selector, range)](#ui5.common.date.pickDateRange)
    * [.fillDateRange(selector, range)](#ui5.common.date.fillDateRange)
    * [.getToday(format)](#ui5.common.date.getToday) ⇒ <code>String</code>
    * [.getTomorrow(format)](#ui5.common.date.getTomorrow) ⇒ <code>String</code>
    * [.getNextMonth(format)](#ui5.common.date.getNextMonth) ⇒ <code>String</code>
    * [.getPreviousMonth(format)](#ui5.common.date.getPreviousMonth) ⇒ <code>String</code>
    * [.getNextYear(format)](#ui5.common.date.getNextYear) ⇒ <code>String</code>
    * [.getPreviousYear(format)](#ui5.common.date.getPreviousYear) ⇒ <code>String</code>
    * [.getSpecificDate(date, format)](#ui5.common.date.getSpecificDate) ⇒ <code>String</code>
    * [.calculateDate([date], [format])](#ui5.common.date.calculateDate) ⇒ <code>String</code>

<a name="ui5.common.date.pickDate"></a>

##### date.pickDate(selector, date)
Picks the passed date with the DatePicker.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| date | <code>Date</code> | The date object. |

**Example**  
```js
const today = await ui5.common.date.calculateDate("today");await ui5.common.date.pickDate(selector, date);
```
<a name="ui5.common.date.pickDateRange"></a>

##### date.pickDateRange(selector, range)
Picks the passed date range with the DatePicker.Note that this will only work within the current month!

**Kind**: static method of [<code>date</code>](#ui5.common.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| range | <code>Array</code> | The array of date objects containing start- and end date. |

**Example**  
```js
const start = await ui5.common.date.calculateDate("2020, 9, 20");const end = await ui5.common.date.calculateDate("2021, 1, 3");const range = [start, end];await ui5.common.date.pickDateRange(selector, range);
```
<a name="ui5.common.date.fillDateRange"></a>

##### date.fillDateRange(selector, range)
Fills the passed date range by passing the start- and end date.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Selector</code> | The selector describing the element. |
| range | <code>Array</code> | The array of date objects containing start- and end date. |

**Example**  
```js
const start = await ui5.common.date.calculateDate("2020, 9, 20", "dd.mm.yyyy");const end = await ui5.common.date.calculateDate("2021, 1, 3", "dd.mm.yyyy");const range = [start, end];await ui5.common.date.fillDateRange(selector, range);
```
<a name="ui5.common.date.getToday"></a>

##### date.getToday(format) ⇒ <code>String</code>
Returns the current day.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getToday("mm/dd/yyyy");
```
<a name="ui5.common.date.getTomorrow"></a>

##### date.getTomorrow(format) ⇒ <code>String</code>
Returns tomorrows date.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getTomorrow("mm/dd/yyyy");
```
<a name="ui5.common.date.getNextMonth"></a>

##### date.getNextMonth(format) ⇒ <code>String</code>
Returns the current day one month later.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getNextMonth("mm/dd/yyyy");
```
<a name="ui5.common.date.getPreviousMonth"></a>

##### date.getPreviousMonth(format) ⇒ <code>String</code>
Returns the current day one month before.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getPreviousMonth("mm/dd/yyyy");
```
<a name="ui5.common.date.getNextYear"></a>

##### date.getNextYear(format) ⇒ <code>String</code>
Returns the current day one year later.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getNextYear("mm/dd/yyyy");
```
<a name="ui5.common.date.getPreviousYear"></a>

##### date.getPreviousYear(format) ⇒ <code>String</code>
Returns the current day one year before.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getPreviousYear("mm/dd/yyyy");
```
<a name="ui5.common.date.getSpecificDate"></a>

##### date.getSpecificDate(date, format) ⇒ <code>String</code>
Returns a specific date based on your input.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in the passed format.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | A specific date string. |
| format | <code>String</code> | The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object). |

**Example**  
```js
const date = await ui5.common.date.getSpecificDate("2020, 0, 17", "mm/dd/yyyy");
```
<a name="ui5.common.date.calculateDate"></a>

##### date.calculateDate([date], [format]) ⇒ <code>String</code>
Calculates the date depending on the input parameter.

**Kind**: static method of [<code>date</code>](#ui5.common.date)  
**Returns**: <code>String</code> - The date in expected format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [date] | <code>String</code> | <code>&quot;today&quot;</code> | Values possible: today, tomorrow, nextMonth, previousMonth, nextYear, lastYear |
| [format] | <code>String</code> | <code>&quot;object&quot;</code> | The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object"). |

**Example**  
```js
const date = await ui5.common.date.calculateDate("today", "mm/dd/yyy");
```
<a name="ui5.common.errorDialog"></a>

#### common.errorDialog
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.errorDialog](#ui5.common.errorDialog)
    * [.expectErrorDialogToBeVisible()](#ui5.common.errorDialog.expectErrorDialogToBeVisible)
    * [.clickClose()](#ui5.common.errorDialog.clickClose)

<a name="ui5.common.errorDialog.expectErrorDialogToBeVisible"></a>

##### errorDialog.expectErrorDialogToBeVisible()
Expects that Error Dialog is visible on the page

**Kind**: static method of [<code>errorDialog</code>](#ui5.common.errorDialog)  
**Example**  
```js
await ui5.common.errorDialog.expectErrorDialogToBeVisible();
```
<a name="ui5.common.errorDialog.clickClose"></a>

##### errorDialog.clickClose()
Clicks Close button in an Error dialog

**Kind**: static method of [<code>errorDialog</code>](#ui5.common.errorDialog)  
**Example**  
```js
await ui5.common.errorDialog.clickClose();
```
<a name="ui5.common.footerBar"></a>

#### common.footerBar
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.footerBar](#ui5.common.footerBar)
    * [.clickApply()](#ui5.common.footerBar.clickApply)
    * [.clickSave()](#ui5.common.footerBar.clickSave)
    * [.clickCreate()](#ui5.common.footerBar.clickCreate)
    * [.clickCancel()](#ui5.common.footerBar.clickCancel)
    * [.clickCheck()](#ui5.common.footerBar.clickCheck)
    * [.clickOrder()](#ui5.common.footerBar.clickOrder)
    * [.clickPost()](#ui5.common.footerBar.clickPost)
    * [.clickAdd()](#ui5.common.footerBar.clickAdd)

<a name="ui5.common.footerBar.clickApply"></a>

##### footerBar.clickApply()
Triggers apply by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickApply();
```
<a name="ui5.common.footerBar.clickSave"></a>

##### footerBar.clickSave()
Triggers save by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickSave();
```
<a name="ui5.common.footerBar.clickCreate"></a>

##### footerBar.clickCreate()
Triggers create by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickCreate();
```
<a name="ui5.common.footerBar.clickCancel"></a>

##### footerBar.clickCancel()
Triggers cancel by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickCancel();
```
<a name="ui5.common.footerBar.clickCheck"></a>

##### footerBar.clickCheck()
Triggers check by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickCheck();
```
<a name="ui5.common.footerBar.clickOrder"></a>

##### footerBar.clickOrder()
Triggers order by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickOrder();
```
<a name="ui5.common.footerBar.clickPost"></a>

##### footerBar.clickPost()
Triggers post by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickPost();
```
<a name="ui5.common.footerBar.clickAdd"></a>

##### footerBar.clickAdd()
Triggers add by clicking the button at the footer toolbar.

**Kind**: static method of [<code>footerBar</code>](#ui5.common.footerBar)  
**Example**  
```js
await ui5.common.footerBar.clickAdd();
```
<a name="ui5.common.formatter"></a>

#### common.formatter
**Kind**: static class of [<code>common</code>](#ui5.common)  
<a name="ui5.common.formatter.addRemoveLeadingZeros"></a>

##### formatter.addRemoveLeadingZeros(number, length) ⇒ <code>String</code>
Adds or removes leading zeros to the passed item number to format it to the needed format of the id.

**Kind**: static method of [<code>formatter</code>](#ui5.common.formatter)  
**Returns**: <code>String</code> - The formatted id.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Integer</code> | The number of the element (e.g. 1, 2 / 10, 20). |
| length | <code>Integer</code> | The length of the needed id. Purchase Order Item -> 5, Schedule Line -> 4, Account Assignment -> 2. |

**Example**  
```js
let itemNumber = await ui5.common.formatter.addRemoveLeadingZeros(10, 5);
```
<a name="ui5.common.iconTabBar"></a>

#### common.iconTabBar
**Kind**: static class of [<code>common</code>](#ui5.common)  
<a name="ui5.common.iconTabBar.switchTab"></a>

##### iconTabBar.switchTab(value)
switches the current tab to the one with the passed value.

**Kind**: static method of [<code>iconTabBar</code>](#ui5.common.iconTabBar)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The text value of the tab to switch to. |

**Example**  
```js
await ui5.common.iconTabBar.switchTab("Items");
```
<a name="ui5.common.locator"></a>

#### common.locator
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.locator](#ui5.common.locator)
    * [.waitForAllElements(selector, timeout)](#ui5.common.locator.waitForAllElements)
    * [.getDisplayedElements(selector, timeout)](#ui5.common.locator.getDisplayedElements) ⇒ <code>Object</code>
    * [.getDisplayedElement(selector, index, timeout)](#ui5.common.locator.getDisplayedElement) ⇒ <code>Object</code>
    * [.getDisplayedChildElement(parentSelector, childSelector, parentIndex, childIndex, timeout)](#ui5.common.locator.getDisplayedChildElement) ⇒ <code>Object</code>
    * [.getElementByText(selector, value, index, timeout)](#ui5.common.locator.getElementByText) ⇒ <code>Object</code>
    * [.getElementId(selector, index, timeout)](#ui5.common.locator.getElementId) ⇒ <code>String</code>
    * [.getBindingValue(selector, attribute, index, timeout)](#ui5.common.locator.getBindingValue) ⇒ <code>String</code>
    * [.getValue(selector, attribute, index, timeout)](#ui5.common.locator.getValue) ⇒ <code>String</code>
    * [.scrollToElement(selector, index, alignment, timeout)](#ui5.common.locator.scrollToElement)
    * [.highlightElement(selector, duration, color)](#ui5.common.locator.highlightElement)
    * [.isVisible(selector, index, timeout)](#ui5.common.locator.isVisible) ⇒ <code>Boolean</code>

<a name="ui5.common.locator.waitForAllElements"></a>

##### locator.waitForAllElements(selector, timeout)
Waits for all elements with the passed selector.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| timeout | <code>Number</code> | <code>3000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.locator.waitForAllElements(selector, 10000);
```
<a name="ui5.common.locator.getDisplayedElements"></a>

##### locator.getDisplayedElements(selector, timeout) ⇒ <code>Object</code>
Returns the visible elements.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>Object</code> - [] - The found elements.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| timeout | <code>Number</code> | <code>3000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elem = await ui5.common.locator.getDisplayedElements(selector, 10000);
```
<a name="ui5.common.locator.getDisplayedElement"></a>

##### locator.getDisplayedElement(selector, index, timeout) ⇒ <code>Object</code>
Returns the visible element.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>3000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elem = await ui5.common.locator.getDisplayedElement(selector, 0, 10000);
```
<a name="ui5.common.locator.getDisplayedChildElement"></a>

##### locator.getDisplayedChildElement(parentSelector, childSelector, parentIndex, childIndex, timeout) ⇒ <code>Object</code>
Returns element that is a child element of a given parent

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>Object</code> - The found child element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parentSelector | <code>Object</code> |  | The selector describing the parent element |
| childSelector | <code>Object</code> |  | The selector describing the child element |
| parentIndex | <code>Number</code> | <code>0</code> | The index for the parent element, in case there is more than one  element visible at the same time. By default, it takes 0 |
| childIndex | <code>Number</code> | <code>0</code> | The index for the child element, in case there is more than one  element visible at the same time. By default, it takes 0 |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elem = await ui5.common.locator.getDisplayedChildElement(parentDelector, childSelector, 0, 0, 10000);
```
<a name="ui5.common.locator.getElementByText"></a>

##### locator.getElementByText(selector, value, index, timeout) ⇒ <code>Object</code>
Returns the element containing the passed text value.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| value | <code>String</code> |  | The text value of the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elem = await ui5.common.locator.getElementByText(selector, "Home");
```
<a name="ui5.common.locator.getElementId"></a>

##### locator.getElementId(selector, index, timeout) ⇒ <code>String</code>
Returns the id of the element.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>String</code> - The id of the element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elemId = await ui5.common.locator.getElementId(selector);
```
<a name="ui5.common.locator.getBindingValue"></a>

##### locator.getBindingValue(selector, attribute, index, timeout) ⇒ <code>String</code>
Returns the value of attribute of the bindingContext of the element.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>String</code> - The attribute value of the element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute of the bindingCotext of the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elemValue = await ui5.common.locator.getBindingValue(selector, "InvoiceGrossAmount");
```
<a name="ui5.common.locator.getValue"></a>

##### locator.getValue(selector, attribute, index, timeout) ⇒ <code>String</code>
Returns the attribute value of the passed element.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>String</code> - The attribute value of the element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| attribute | <code>String</code> |  | The attribute of the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elemValue = await ui5.common.locator.getValue(selector, "text");
```
<a name="ui5.common.locator.scrollToElement"></a>

##### locator.scrollToElement(selector, index, alignment, timeout)
Scrolls to the passed element to get it into view.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| alignment | <code>String</code> | <code>&quot;center&quot;</code> | Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest". Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up' |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.locator.scrollToElement(selector, 0, "start", 5000);
```
<a name="ui5.common.locator.highlightElement"></a>

##### locator.highlightElement(selector, duration, color)
Highlights the element with the passed selector.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| duration | <code>Number</code> | <code>2000</code> | The duration of the highlighting (default value: 2 sec). |
| color | <code>String</code> | <code>&quot;red&quot;</code> | The color of the highlighting (default is red). |

**Example**  
```js
await ui5.common.locator.highlightElement(selector);
```
**Example**  
```js
await ui5.common.locator.highlightElement(selector, 3000, "green");
```
<a name="ui5.common.locator.isVisible"></a>

##### locator.isVisible(selector, index, timeout) ⇒ <code>Boolean</code>
Returns a boolean whether the element is visible or not.

**Kind**: static method of [<code>locator</code>](#ui5.common.locator)  
**Returns**: <code>Boolean</code> - Returns bool value 'true' or 'false' if the element is visible or not.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Integer</code> | The index of the selector, in case there are more than |
| timeout | <code>Integer</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let isElementVisible = await ui5.common.locator.isVisible(selector);
```
**Example**  
```js
let isElementVisible = await ui5.common.locator.isVisible(selector, 0, 2000);
```
<a name="ui5.common.navigation"></a>

#### common.navigation
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.navigation](#ui5.common.navigation)
    * [.closePopups(timeout)](#ui5.common.navigation.closePopups)
    * [.navigateToApplication(intent, preventPopups, verify)](#ui5.common.navigation.navigateToApplication)
    * [.navigateToApplicationAndRetry(intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToApplicationAndRetry)
    * [.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify)](#ui5.common.navigation.navigateToApplicationWithQueryParams)
    * [.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, closePopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry)
    * [.navigateToApplicationAndRetryRefresh(intent, preventPopups, verify, retries, interval)](#ui5.common.navigation.navigateToApplicationAndRetryRefresh)
    * [.navigateToSystemAndApplication(system, intent, closePopups, verify)](#ui5.common.navigation.navigateToSystemAndApplication)
    * [.navigateToSystemAndApplicationAndRetry(system, intent, closePopups, retries, interval, verify)](#ui5.common.navigation.navigateToSystemAndApplicationAndRetry)
    * [.navigateToUrl(url)](#ui5.common.navigation.navigateToUrl)
    * [.printCurrentUrl()](#ui5.common.navigation.printCurrentUrl)

<a name="ui5.common.navigation.closePopups"></a>

##### navigation.closePopups(timeout)
Closes all popups if they occure after navigating to a specific page.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>Integer</code> | The timeout to wait (default value: 15 sec). |

**Example**  
```js
await ui5.common.navigation.closePopups();
```
<a name="ui5.common.navigation.navigateToApplication"></a>

##### navigation.navigateToApplication(intent, preventPopups, verify)
Navigates to the application via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | The intent of the app. |
| preventPopups | <code>Boolean</code> | [OPTIONAL] Set to 'true' to prevent popups during navigation. Default is 'false'. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'. |

**Example**  
```js
await ui5.common.navigation.navigateToApplication("PurchaseOrder-manage", false);
```
**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;await ui5.common.navigation.navigateToApplication(intent);
```
<a name="ui5.common.navigation.navigateToApplicationAndRetry"></a>

##### navigation.navigateToApplicationAndRetry(intent, closePopups, retries, interval, verify)
Navigates to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | The intent of the app. |
| closePopups | <code>Boolean</code> | [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'. |

**Example**  
```js
await ui5.common.navigation.navigateToApplicationAndRetry("PurchaseOrder-manage", false);
```
**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;await ui5.common.navigation.navigateToApplicationAndRetry(intent);
```
<a name="ui5.common.navigation.navigateToApplicationWithQueryParams"></a>

##### navigation.navigateToApplicationWithQueryParams(intent, queryParams, closePopups, verify)
Navigates to the application via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | The intent of the app. |
| queryParams | <code>String</code> | [OPTIONAL] Add url query params. |
| closePopups | <code>Boolean</code> | [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'. |

**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;let queryParams = "?sap-language=EN&responderOn=true";await ui5.common.navigation.navigateToApplicationWithQueryParams(intent, queryParam);
```
<a name="ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry"></a>

##### navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams, closePopups, verify, retries, interval)
Navigates to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | The intent of the app. |
| queryParams | <code>String</code> | [OPTIONAL] Add url query params. |
| closePopups | <code>Boolean</code> | [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry("PurchaseOrder-manage", false);
```
**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;let queryParams = "?sap-language=EN&responderOn=true";await ui5.common.navigation.navigateToApplicationWithQueryParamsAndRetry(intent, queryParams);
```
<a name="ui5.common.navigation.navigateToApplicationAndRetryRefresh"></a>

##### navigation.navigateToApplicationAndRetryRefresh(intent, preventPopups, verify, retries, interval)
Navigates to the application via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>String</code> | The intent of the app. |
| preventPopups | <code>Boolean</code> | [OPTIONAL] Set to 'true' to prevent popups during navigation. Default is 'false'. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'. |
| retries | <code>Integer</code> | [OPTIONAL] The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | [OPTIONAL] The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage", false);
```
**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;await ui5.common.navigation.navigateToApplicationAndRetryRefresh(intent);
```
<a name="ui5.common.navigation.navigateToSystemAndApplication"></a>

##### navigation.navigateToSystemAndApplication(system, intent, closePopups, verify)
Navigates within the passed system to the application via the passed intent.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| system | <code>String</code> | The system url to navigate. |
| intent | <code>String</code> | The intent of the app. |
| closePopups | <code>Boolean</code> | [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'false'. |

**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;await ui5.common.navigation.navigateToSystemAndApplication("super-sensitive.domain.name", intent);
```
<a name="ui5.common.navigation.navigateToSystemAndApplicationAndRetry"></a>

##### navigation.navigateToSystemAndApplicationAndRetry(system, intent, closePopups, retries, interval, verify)
Navigates within the passed system to the application via the passed intent, and retries in case it fails.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| system | <code>String</code> | The system url to navigate. |
| intent | <code>String</code> | The intent of the app. |
| closePopups | <code>Boolean</code> | [OPTIONAL] Set to 'false' if you dont want to close the popups after navigating. Default is 'true'. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |
| verify | <code>Boolean</code> | [OPTIONAL] Verifies if the url after the navigation is the expected url. Default is 'true'. |

**Example**  
```js
let intent = ui5.common.appIntents.managePurchaseOrders;await ui5.common.navigation.navigateToSystemAndApplicationAndRetry("super-sensitive.domain.name", intent);
```
<a name="ui5.common.navigation.navigateToUrl"></a>

##### navigation.navigateToUrl(url)
Navigates to the passed url.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to navigate to. |

**Example**  
```js
await ui5.common.navigation.navigateToUrl("www.ariba.com");
```
<a name="ui5.common.navigation.printCurrentUrl"></a>

##### navigation.printCurrentUrl()
Displays the current URL in the console.

**Kind**: static method of [<code>navigation</code>](#ui5.common.navigation)  
**Example**  
```js
await ui5.common.navigation.printCurrentUrl();
```
<a name="ui5.common.navigationBar"></a>

#### common.navigationBar
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.navigationBar](#ui5.common.navigationBar)
    * [.clickBack()](#ui5.common.navigationBar.clickBack)
    * [.clickSapLogo()](#ui5.common.navigationBar.clickSapLogo)
    * [.clickUserIcon()](#ui5.common.navigationBar.clickUserIcon)

<a name="ui5.common.navigationBar.clickBack"></a>

##### navigationBar.clickBack()
Navigates one layer back.

**Kind**: static method of [<code>navigationBar</code>](#ui5.common.navigationBar)  
**Example**  
```js
await ui5.common.navigationBar.clickBack();
```
<a name="ui5.common.navigationBar.clickSapLogo"></a>

##### navigationBar.clickSapLogo()
Clicks at the SAP Logo.

**Kind**: static method of [<code>navigationBar</code>](#ui5.common.navigationBar)  
**Example**  
```js
await ui5.common.navigationBar.clickSapLogo();
```
<a name="ui5.common.navigationBar.clickUserIcon"></a>

##### navigationBar.clickUserIcon()
Clicks at the Account Icon.

**Kind**: static method of [<code>navigationBar</code>](#ui5.common.navigationBar)  
**Example**  
```js
await ui5.common.navigationBar.clickUserIcon();
```
<a name="ui5.common.session"></a>

#### common.session
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.session](#ui5.common.session)
    * [.login(username, password, verify, timeout)](#ui5.common.session.login)
    * [.loginFiori(username, password, verify)](#ui5.common.session.loginFiori)
    * [.loginSapCloud(username, password, verify)](#ui5.common.session.loginSapCloud)
    * [.loginCustom(username, password, usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify)](#ui5.common.session.loginCustom)
    * [.loginCustomViaConfig(username, password, verify)](#ui5.common.session.loginCustomViaConfig)
    * [.logout(verify)](#ui5.common.session.logout)
    * [.switchUser(username, password, authenticator, timeout)](#ui5.common.session.switchUser)

<a name="ui5.common.session.login"></a>

##### session.login(username, password, verify, timeout)
Login with specific username and password. This function works for both fiori and sap-cloud login.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username. |
| password | <code>String</code> | The password. |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'. |
| timeout | <code>Integer</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.session.login("PURCHASER");
```
**Example**  
```js
await ui5.common.session.login("john", "abc123!");
```
<a name="ui5.common.session.loginFiori"></a>

##### session.loginFiori(username, password, verify)
Login with fioriForm and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username. |
| password | <code>String</code> | The password. |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'. |

**Example**  
```js
await ui5.common.session.loginFiori("john", "abc123!");
```
<a name="ui5.common.session.loginSapCloud"></a>

##### session.loginSapCloud(username, password, verify)
Login with sapCloud form and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username. |
| password | <code>String</code> | The password. |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'. |

**Example**  
```js
await ui5.common.session.loginSapCloud("john", "abc123!");
```
<a name="ui5.common.session.loginCustom"></a>

##### session.loginCustom(username, password, usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify)
Login with custom form and specific username and password.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username. |
| password | <code>String</code> | The password. |
| usernameFieldSelector | <code>String</code> | The CSS selector of the username field. |
| passwordFieldSelector | <code>String</code> | The CSS selector of the password field. |
| logonButtonSelector | <code>String</code> | The CSS selector of the login button. |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'. |

**Example**  
```js
await ui5.common.session.loginCustom("john", "abc123!", "#j_username", #j_password, "#logOnFormSubmit");
```
<a name="ui5.common.session.loginCustomViaConfig"></a>

##### session.loginCustomViaConfig(username, password, verify)
Login with specific username and password. The selectors will be taken from the config.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The username. Can be specified in spec or config. If specified in both credentials will be taken from config! |
| password | <code>String</code> | The password. Can be specified in spec or config. If specified in both credentials will be taken from config! |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'. |

**Example**  
```js
// config - SAMPLE 1auth: {
      formType: 'plain',
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
  },// specawait ui5.common.session.loginCustomViaConfig("john", "abc123!");


   // config - SAMPLE 2auth: {
      username: "PURCH_EXT",
      password: "super-duper-sensitive-pw",
      formType: "plain",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
  },// specawait ui5.common.session.loginCustomViaConfig();
```
<a name="ui5.common.session.logout"></a>

##### session.logout(verify)
Logs the user out.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Description |
| --- | --- | --- |
| verify | <code>Boolean</code> | [OPTIONAL] Specifies if the function will check the logout text after logging out. Set this to false if the system does not show this message after logging out. Default is 'false'. |

**Example**  
```js
await ui5.common.session.logout();
```
<a name="ui5.common.session.switchUser"></a>

##### session.switchUser(username, password, authenticator, timeout)
switchs the user according to the passed username and password.

**Kind**: static method of [<code>session</code>](#ui5.common.session)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | The username. |
| password | <code>String</code> |  | The password. |
| authenticator | <code>Object</code> |  | The login form type. |
| timeout | <code>Number</code> | <code>8000</code> | The timeout to wait (default value: 8 sec). |

**Example**  
```js
await ui5.common.session.switchUser("Buyer");
```
<a name="ui5.common.userInteraction"></a>

#### common.userInteraction
**Kind**: static class of [<code>common</code>](#ui5.common)  

* [.userInteraction](#ui5.common.userInteraction)
    * [.click(selector, index, timeout)](#ui5.common.userInteraction.click)
    * [.clickAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clickAndRetry)
    * [.clickTab(selector, index, timeout)](#ui5.common.userInteraction.clickTab)
    * [.clickListItem(selector, index, timeout)](#ui5.common.userInteraction.clickListItem)
    * [.pressEnter()](#ui5.common.userInteraction.pressEnter)
    * [.pressF4()](#ui5.common.userInteraction.pressF4)
    * [.pressTab()](#ui5.common.userInteraction.pressTab)
    * [.pressBackspace()](#ui5.common.userInteraction.pressBackspace)
    * [.pressArrowLeft()](#ui5.common.userInteraction.pressArrowLeft)
    * [.pressArrowRight()](#ui5.common.userInteraction.pressArrowRight)
    * [.selectAll(selector, index, timeout)](#ui5.common.userInteraction.selectAll)
    * [.fill(selector, value, index, timeout)](#ui5.common.userInteraction.fill)
    * [.fillAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.fillAndRetry)
    * [.fillActive(value)](#ui5.common.userInteraction.fillActive)
    * [.fillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.fillActiveAndRetry)
    * [.clearAndFillSmartFieldInput(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFillSmartFieldInput)
    * [.clearSmartFieldInput(selector, index, timeout)](#ui5.common.userInteraction.clearSmartFieldInput)
    * [.clearAndFillSmartFieldInputAndRetry(selector, value, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry)
    * [.clearAndFill(selector, value, index, timeout)](#ui5.common.userInteraction.clearAndFill)
    * [.clearFillAndRetry(selector, value, index, timeout, retries, interval, verify)](#ui5.common.userInteraction.clearFillAndRetry)
    * [.clearAndFillActive(value)](#ui5.common.userInteraction.clearAndFillActive)
    * [.clearFillActiveAndRetry(value, retries, interval)](#ui5.common.userInteraction.clearFillActiveAndRetry)
    * [.clear(selector, index, timeout)](#ui5.common.userInteraction.clear)
    * [.clearAndRetry(selector, index, timeout, retries, interval)](#ui5.common.userInteraction.clearAndRetry)
    * [.openF4Help(selector, index, timeout, useF4Key)](#ui5.common.userInteraction.openF4Help)
    * [.searchFor(selector, value, index, timeout, useEnter)](#ui5.common.userInteraction.searchFor)
    * [.resetSearch(selector, index, timeout)](#ui5.common.userInteraction.resetSearch)
    * [.selectComboBox(selector, value, index)](#ui5.common.userInteraction.selectComboBox)
    * [.selectMultiComboBox(selector, values, index)](#ui5.common.userInteraction.selectMultiComboBox)
    * [.selectBox(selector, value, index)](#ui5.common.userInteraction.selectBox)
    * [.clickSelectArrow(selector, index)](#ui5.common.userInteraction.clickSelectArrow)
    * [.clickSelectArrowAndRetry(selector, retries, interval, index)](#ui5.common.userInteraction.clickSelectArrowAndRetry)

<a name="ui5.common.userInteraction.click"></a>

##### userInteraction.click(selector, index, timeout)
Clicks on the passed element.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.click(selector);
```
<a name="ui5.common.userInteraction.clickAndRetry"></a>

##### userInteraction.clickAndRetry(selector, index, timeout, retries, interval)
Clicks on the passed element and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Number</code> |  | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> |  | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.clickAndRetry(selector, 0, 30000, 2, 1000);
```
<a name="ui5.common.userInteraction.clickTab"></a>

##### userInteraction.clickTab(selector, index, timeout)
Clicks on the passed tab and checks if the tab got selected successfully.The function retries the click if the selection of the tab (blue underline) was not successful.The maximum amount of retries is set to 3 per default.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clickTab(selector);
```
<a name="ui5.common.userInteraction.clickListItem"></a>

##### userInteraction.clickListItem(selector, index, timeout)
Clicks on a specific item of a list (e.g. ColumnListItem, StandardListItem, etc.).In some cases the default click function is not working correctly (clicks an element within the list item).Therefore we recommend to use this function to open a specific list item.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Integer</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clickListItem(selector);
```
<a name="ui5.common.userInteraction.pressEnter"></a>

##### userInteraction.pressEnter()
Performs the Enter keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressEnter();
```
<a name="ui5.common.userInteraction.pressF4"></a>

##### userInteraction.pressF4()
Performs the F4 keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressF4();
```
<a name="ui5.common.userInteraction.pressTab"></a>

##### userInteraction.pressTab()
Performs the Tab keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressTab();
```
<a name="ui5.common.userInteraction.pressBackspace"></a>

##### userInteraction.pressBackspace()
Performs the Backspace keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressBackspace();
```
<a name="ui5.common.userInteraction.pressArrowLeft"></a>

##### userInteraction.pressArrowLeft()
Performs the Arrow Left keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressArrowLeft();
```
<a name="ui5.common.userInteraction.pressArrowRight"></a>

##### userInteraction.pressArrowRight()
Performs the Arrow Right keypress.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  
**Example**  
```js
await ui5.common.userInteraction.pressArrowRight();
```
<a name="ui5.common.userInteraction.selectAll"></a>

##### userInteraction.selectAll(selector, index, timeout)
Select all (ctrl + a) at passed element.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>Object</code> |  | The selector describing the element. |
| index | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.selectAll(selector);
```
<a name="ui5.common.userInteraction.fill"></a>

##### userInteraction.fill(selector, value, index, timeout)
Fills the passed input if it is defined.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.fill(selector, "My Value");
```
<a name="ui5.common.userInteraction.fillAndRetry"></a>

##### userInteraction.fillAndRetry(selector, value, index, timeout, retries, interval)
Fills the passed input if it is defined, and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.fillAndRetry(selector, "My Value");
```
<a name="ui5.common.userInteraction.fillActive"></a>

##### userInteraction.fillActive(value)
Fills the active input.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |

**Example**  
```js
await ui5.common.userInteraction.fillActive("My Value");
```
<a name="ui5.common.userInteraction.fillActiveAndRetry"></a>

##### userInteraction.fillActiveAndRetry(value, retries, interval)
Fills the active input, and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.fillActiveAndRetry("My Value");
```
<a name="ui5.common.userInteraction.clearAndFillSmartFieldInput"></a>

##### userInteraction.clearAndFillSmartFieldInput(selector, value, index, timeout)
Clears the passed smart filed and fills it subsequently.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clearAndFillSmartFieldInput(selector, "My Value");
```
<a name="ui5.common.userInteraction.clearSmartFieldInput"></a>

##### userInteraction.clearSmartFieldInput(selector, index, timeout)
Clears the passed smart filed.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clearSmartFieldInput(selector);
```
<a name="ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry"></a>

##### userInteraction.clearAndFillSmartFieldInputAndRetry(selector, value, index, timeout, retries, interval)
Clears the passed smart filed and fills it, and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry(selector, "My Value");
```
<a name="ui5.common.userInteraction.clearAndFill"></a>

##### userInteraction.clearAndFill(selector, value, index, timeout)
Clears the passed input if it is defined and fills it subsequently.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clearAndFill(selector, "My Value");
```
<a name="ui5.common.userInteraction.clearFillAndRetry"></a>

##### userInteraction.clearFillAndRetry(selector, value, index, timeout, retries, interval, verify)
Clears the passed input if it is defined and fills it, and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |
| verify | <code>Boolean</code> | Verifies if the value was entered correctly. Default is true. |

**Example**  
```js
await ui5.common.userInteraction.clearFillAndRetry(selector, "My Value");
```
<a name="ui5.common.userInteraction.clearAndFillActive"></a>

##### userInteraction.clearAndFillActive(value)
Clears and fills the active input.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |

**Example**  
```js
await ui5.common.userInteraction.clearAndFillActive("My Value");
```
<a name="ui5.common.userInteraction.clearFillActiveAndRetry"></a>

##### userInteraction.clearFillActiveAndRetry(value, retries, interval)
Clears and fills the active input, and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.clearFillActiveAndRetry("My Value");
```
<a name="ui5.common.userInteraction.clear"></a>

##### userInteraction.clear(selector, index, timeout)
Clears the passed input.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.clear(selector);
```
<a name="ui5.common.userInteraction.clearAndRetry"></a>

##### userInteraction.clearAndRetry(selector, index, timeout, retries, interval)
Clears the passed input.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element, and retries in case it fails. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.common.userInteraction.clearAndRetry(selector);
```
<a name="ui5.common.userInteraction.openF4Help"></a>

##### userInteraction.openF4Help(selector, index, timeout, useF4Key)
Opens the F4-help of the passed element.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| useF4Key | <code>Boolean</code> | Specifies if the help is opened by pressing the F4-key or via the button. The default value is true (triggered by pressing the F4-key). Set "useF4Key" to false, to trigger the search by clicking the button. |

**Example**  
```js
await ui5.common.userInteraction.openF4Help(selector, 0, 30000, false);
```
<a name="ui5.common.userInteraction.searchFor"></a>

##### userInteraction.searchFor(selector, value, index, timeout, useEnter)
Searchs for the passed value and executes the search.In case that the search is already filled, it will reset the field first.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>String</code> | The value with witch the search input is being filled. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |
| useEnter | <code>Boolean</code> | Specifies if the search is triggered by pressing the Enter-key or via the search button. The default value is true (triggered by pressing the Enter-key). Set "useEnter" to false, to trigger the search by clicking the search button. |

**Example**  
```js
await ui5.common.userInteraction.searchFor(selector, "My Value", 0, 30000, false);
```
<a name="ui5.common.userInteraction.resetSearch"></a>

##### userInteraction.resetSearch(selector, index, timeout)
Resets the search field if it is filled.In case that the search is not filled, it will raise an error.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Number</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
await ui5.common.userInteraction.resetSearch(selector);
```
<a name="ui5.common.userInteraction.selectComboBox"></a>

##### userInteraction.selectComboBox(selector, value, index)
Selects the passed value from the ComboBox.Please note that the function will only work for the default ComboBox.In special cases, please use the clickSelectArrow function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>Number</code> | The value of the element to be selected. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |

**Example**  
```js
await ui5.common.userInteraction.selectComboBox(selector, "Germany");
```
<a name="ui5.common.userInteraction.selectMultiComboBox"></a>

##### userInteraction.selectMultiComboBox(selector, values, index)
Selects the passed values of the MultiComboBox.Please note that the function will only work for the default MultiComboBox.In special cases, please use the clickSelectArrow function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| values | <code>Number</code> | The array of values of the elements to be selected. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |

**Example**  
```js
await ui5.common.userInteraction.selectMultiComboBox(selector, ["Item1", "Item2"]);
```
<a name="ui5.common.userInteraction.selectBox"></a>

##### userInteraction.selectBox(selector, value, index)
Selects the passed value of the Select box.Please note that the function will only work for the default select Box.In special cases, please use the clickSelectArrow function.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| value | <code>Number</code> | The value of the element to be selected. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |

**Example**  
```js
await ui5.common.userInteraction.selectBox(selector, "Germany");
```
<a name="ui5.common.userInteraction.clickSelectArrow"></a>

##### userInteraction.clickSelectArrow(selector, index)
Clicks the arrow icon at the passed selector (select box).

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element. |
| index | <code>Integer</code> | The index of the selector, in case there are more than |

**Example**  
```js
await ui5.common.userInteraction.clickSelectArrow(selector);
```
<a name="ui5.common.userInteraction.clickSelectArrowAndRetry"></a>

##### userInteraction.clickSelectArrowAndRetry(selector, retries, interval, index)
Clicks the arrow icon at the passed selector (select box), and retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The selector describing the element |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.. |
| index | <code>Number</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |

**Example**  
```js
await ui5.common.userInteraction.clickSelectArrowAndRetry(selector);
```
<a name="non_ui5"></a>

## non\_ui5 : <code>object</code>
Namespace for non ui5 modules.

**Kind**: global namespace  

* [non_ui5](#non_ui5) : <code>object</code>
    * [.common](#non_ui5.common) : <code>object</code>
        * [.assertion](#non_ui5.common.assertion)
            * [.expectToBeVisible(element)](#non_ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
            * [.expectValueToBe(elem, compareValue, attribute)](#non_ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
            * [.isVisible(element)](#non_ui5.common.assertion.isVisible) ⇒ <code>Boolean</code>
            * [.isElementPresent(elem)](#non_ui5.common.assertion.isElementPresent) ⇒ <code>Boolean</code>
            * [.isPresentByCss(css, index, timeout)](#non_ui5.common.assertion.isPresentByCss) ⇒ <code>boolean</code>
            * [.isPresentByXPath(xpath, index, timeout)](#non_ui5.common.assertion.isPresentByXPath) ⇒ <code>boolean</code>
            * [.expectEqual(value1, value2)](#non_ui5.common.assertion.expectEqual)
            * [.expectTrue(value)](#non_ui5.common.assertion.expectTrue)
            * [.expectFalse(value)](#non_ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
            * [.expectUnequal(value1, value2)](#non_ui5.common.assertion.expectUnequal)
            * [.expectDefined(value)](#non_ui5.common.assertion.expectDefined)
            * [.expectUndefined(value)](#non_ui5.common.assertion.expectUndefined)
        * [.locator](#non_ui5.common.locator)
            * [.getDisplayedElements(selector, timeout)](#non_ui5.common.locator.getDisplayedElements)
            * [.waitForAllElements(selector, timeout)](#non_ui5.common.locator.waitForAllElements) ⇒ <code>Array.&lt;Object&gt;</code>
            * [.waitForElementIsVisible(selector, timeout)](#non_ui5.common.locator.waitForElementIsVisible)
            * [.waitForElementIsClickable(selector, timeout)](#non_ui5.common.locator.waitForElementIsClickable)
            * [.waitForElementIsPresent(selector, timeout)](#non_ui5.common.locator.waitForElementIsPresent)
            * [.getElementByCss(css, index, timeout)](#non_ui5.common.locator.getElementByCss) ⇒ <code>Object</code>
            * [.getElementByCssContainingText(css, index, text, timeout)](#non_ui5.common.locator.getElementByCssContainingText) ⇒ <code>Object</code>
            * [.getElementById(id, timeout)](#non_ui5.common.locator.getElementById) ⇒ <code>Object</code>
            * [.getElementByClass(elemClass, index, timeout)](#non_ui5.common.locator.getElementByClass) ⇒ <code>Object</code>
            * [.getElementByName(name, index, timeout)](#non_ui5.common.locator.getElementByName) ⇒ <code>Object</code>
            * [.getElementByXPath(xpath, index, timeout)](#non_ui5.common.locator.getElementByXPath) ⇒ <code>Object</code>
            * [.getElementByChild(elementSelector, childSelector)](#non_ui5.common.locator.getElementByChild) ⇒ <code>Object</code>
            * [.getChildNode(elementSelector, childSelector, elementIndex, childIndex, timeout)](#non_ui5.common.locator.getChildNode) ⇒ <code>Object</code>
            * [.getValue(elem, attribute)](#non_ui5.common.locator.getValue) ⇒ <code>String</code>
            * [.scrollToElement(elem, alignment)](#non_ui5.common.locator.scrollToElement)
            * [.highlightElement(elem, duration, color)](#non_ui5.common.locator.highlightElement)
            * [.switchToIframe(selector)](#non_ui5.common.locator.switchToIframe)
            * [.switchToDefaultContent()](#non_ui5.common.locator.switchToDefaultContent)
            * [.waitForWindows()](#non_ui5.common.locator.waitForWindows)
            * [.switchToNewWindow(originalHandle, windowTitle)](#non_ui5.common.locator.switchToNewWindow)
            * [.switchToWindow(handle)](#non_ui5.common.locator.switchToWindow)
            * [.getCurrentWindow()](#non_ui5.common.locator.getCurrentWindow)
        * [.navigation](#non_ui5.common.navigation)
            * [.navigateToUrl(url)](#non_ui5.common.navigation.navigateToUrl)
            * [.navigateToUrlAndRetry(url, retries, interval)](#non_ui5.common.navigation.navigateToUrlAndRetry)
        * [.userInteraction](#non_ui5.common.userInteraction)
            * [.click(element, timeout)](#non_ui5.common.userInteraction.click)
            * [.clickAndRetry(element, timeout, retries, interval)](#non_ui5.common.userInteraction.clickAndRetry)
            * [.fill(element, value)](#non_ui5.common.userInteraction.fill)
            * [.fillAndRetry(element, value, retries, interval)](#non_ui5.common.userInteraction.fillAndRetry)
            * [.fillActive(value)](#non_ui5.common.userInteraction.fillActive)
            * [.fillActiveAndRetry(value, retries, interval)](#non_ui5.common.userInteraction.fillActiveAndRetry)
            * [.clear(element)](#non_ui5.common.userInteraction.clear)
            * [.clearAndRetry(element, retries, interval)](#non_ui5.common.userInteraction.clearAndRetry)
            * [.clearAndFill(element, value)](#non_ui5.common.userInteraction.clearAndFill)
            * [.clearAndFillAndRetry(element, value, retries, interval, verify)](#non_ui5.common.userInteraction.clearAndFillAndRetry)
            * [.dragAndDrop(element, target)](#non_ui5.common.userInteraction.dragAndDrop)
            * [.clickChartPart(elem)](#non_ui5.common.userInteraction.clickChartPart)
            * [.pressEnter()](#non_ui5.common.userInteraction.pressEnter)
            * [.pressF4()](#non_ui5.common.userInteraction.pressF4)
            * [.pressTab()](#non_ui5.common.userInteraction.pressTab)
            * [.pressBackspace()](#non_ui5.common.userInteraction.pressBackspace)
            * [.pressArrowLeft()](#non_ui5.common.userInteraction.pressArrowLeft)
            * [.pressArrowRight()](#non_ui5.common.userInteraction.pressArrowRight)
            * [.pressEscape()](#non_ui5.common.userInteraction.pressEscape)

<a name="non_ui5.common"></a>

### non_ui5.common : <code>object</code>
Namespace for common modules.

**Kind**: static namespace of [<code>non\_ui5</code>](#non_ui5)  

* [.common](#non_ui5.common) : <code>object</code>
    * [.assertion](#non_ui5.common.assertion)
        * [.expectToBeVisible(element)](#non_ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
        * [.expectValueToBe(elem, compareValue, attribute)](#non_ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
        * [.isVisible(element)](#non_ui5.common.assertion.isVisible) ⇒ <code>Boolean</code>
        * [.isElementPresent(elem)](#non_ui5.common.assertion.isElementPresent) ⇒ <code>Boolean</code>
        * [.isPresentByCss(css, index, timeout)](#non_ui5.common.assertion.isPresentByCss) ⇒ <code>boolean</code>
        * [.isPresentByXPath(xpath, index, timeout)](#non_ui5.common.assertion.isPresentByXPath) ⇒ <code>boolean</code>
        * [.expectEqual(value1, value2)](#non_ui5.common.assertion.expectEqual)
        * [.expectTrue(value)](#non_ui5.common.assertion.expectTrue)
        * [.expectFalse(value)](#non_ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
        * [.expectUnequal(value1, value2)](#non_ui5.common.assertion.expectUnequal)
        * [.expectDefined(value)](#non_ui5.common.assertion.expectDefined)
        * [.expectUndefined(value)](#non_ui5.common.assertion.expectUndefined)
    * [.locator](#non_ui5.common.locator)
        * [.getDisplayedElements(selector, timeout)](#non_ui5.common.locator.getDisplayedElements)
        * [.waitForAllElements(selector, timeout)](#non_ui5.common.locator.waitForAllElements) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.waitForElementIsVisible(selector, timeout)](#non_ui5.common.locator.waitForElementIsVisible)
        * [.waitForElementIsClickable(selector, timeout)](#non_ui5.common.locator.waitForElementIsClickable)
        * [.waitForElementIsPresent(selector, timeout)](#non_ui5.common.locator.waitForElementIsPresent)
        * [.getElementByCss(css, index, timeout)](#non_ui5.common.locator.getElementByCss) ⇒ <code>Object</code>
        * [.getElementByCssContainingText(css, index, text, timeout)](#non_ui5.common.locator.getElementByCssContainingText) ⇒ <code>Object</code>
        * [.getElementById(id, timeout)](#non_ui5.common.locator.getElementById) ⇒ <code>Object</code>
        * [.getElementByClass(elemClass, index, timeout)](#non_ui5.common.locator.getElementByClass) ⇒ <code>Object</code>
        * [.getElementByName(name, index, timeout)](#non_ui5.common.locator.getElementByName) ⇒ <code>Object</code>
        * [.getElementByXPath(xpath, index, timeout)](#non_ui5.common.locator.getElementByXPath) ⇒ <code>Object</code>
        * [.getElementByChild(elementSelector, childSelector)](#non_ui5.common.locator.getElementByChild) ⇒ <code>Object</code>
        * [.getChildNode(elementSelector, childSelector, elementIndex, childIndex, timeout)](#non_ui5.common.locator.getChildNode) ⇒ <code>Object</code>
        * [.getValue(elem, attribute)](#non_ui5.common.locator.getValue) ⇒ <code>String</code>
        * [.scrollToElement(elem, alignment)](#non_ui5.common.locator.scrollToElement)
        * [.highlightElement(elem, duration, color)](#non_ui5.common.locator.highlightElement)
        * [.switchToIframe(selector)](#non_ui5.common.locator.switchToIframe)
        * [.switchToDefaultContent()](#non_ui5.common.locator.switchToDefaultContent)
        * [.waitForWindows()](#non_ui5.common.locator.waitForWindows)
        * [.switchToNewWindow(originalHandle, windowTitle)](#non_ui5.common.locator.switchToNewWindow)
        * [.switchToWindow(handle)](#non_ui5.common.locator.switchToWindow)
        * [.getCurrentWindow()](#non_ui5.common.locator.getCurrentWindow)
    * [.navigation](#non_ui5.common.navigation)
        * [.navigateToUrl(url)](#non_ui5.common.navigation.navigateToUrl)
        * [.navigateToUrlAndRetry(url, retries, interval)](#non_ui5.common.navigation.navigateToUrlAndRetry)
    * [.userInteraction](#non_ui5.common.userInteraction)
        * [.click(element, timeout)](#non_ui5.common.userInteraction.click)
        * [.clickAndRetry(element, timeout, retries, interval)](#non_ui5.common.userInteraction.clickAndRetry)
        * [.fill(element, value)](#non_ui5.common.userInteraction.fill)
        * [.fillAndRetry(element, value, retries, interval)](#non_ui5.common.userInteraction.fillAndRetry)
        * [.fillActive(value)](#non_ui5.common.userInteraction.fillActive)
        * [.fillActiveAndRetry(value, retries, interval)](#non_ui5.common.userInteraction.fillActiveAndRetry)
        * [.clear(element)](#non_ui5.common.userInteraction.clear)
        * [.clearAndRetry(element, retries, interval)](#non_ui5.common.userInteraction.clearAndRetry)
        * [.clearAndFill(element, value)](#non_ui5.common.userInteraction.clearAndFill)
        * [.clearAndFillAndRetry(element, value, retries, interval, verify)](#non_ui5.common.userInteraction.clearAndFillAndRetry)
        * [.dragAndDrop(element, target)](#non_ui5.common.userInteraction.dragAndDrop)
        * [.clickChartPart(elem)](#non_ui5.common.userInteraction.clickChartPart)
        * [.pressEnter()](#non_ui5.common.userInteraction.pressEnter)
        * [.pressF4()](#non_ui5.common.userInteraction.pressF4)
        * [.pressTab()](#non_ui5.common.userInteraction.pressTab)
        * [.pressBackspace()](#non_ui5.common.userInteraction.pressBackspace)
        * [.pressArrowLeft()](#non_ui5.common.userInteraction.pressArrowLeft)
        * [.pressArrowRight()](#non_ui5.common.userInteraction.pressArrowRight)
        * [.pressEscape()](#non_ui5.common.userInteraction.pressEscape)

<a name="non_ui5.common.assertion"></a>

#### common.assertion
**Kind**: static class of [<code>common</code>](#non_ui5.common)  

* [.assertion](#non_ui5.common.assertion)
    * [.expectToBeVisible(element)](#non_ui5.common.assertion.expectToBeVisible) ⇒ <code>Promise</code>
    * [.expectValueToBe(elem, compareValue, attribute)](#non_ui5.common.assertion.expectValueToBe) ⇒ <code>Promise</code>
    * [.isVisible(element)](#non_ui5.common.assertion.isVisible) ⇒ <code>Boolean</code>
    * [.isElementPresent(elem)](#non_ui5.common.assertion.isElementPresent) ⇒ <code>Boolean</code>
    * [.isPresentByCss(css, index, timeout)](#non_ui5.common.assertion.isPresentByCss) ⇒ <code>boolean</code>
    * [.isPresentByXPath(xpath, index, timeout)](#non_ui5.common.assertion.isPresentByXPath) ⇒ <code>boolean</code>
    * [.expectEqual(value1, value2)](#non_ui5.common.assertion.expectEqual)
    * [.expectTrue(value)](#non_ui5.common.assertion.expectTrue)
    * [.expectFalse(value)](#non_ui5.common.assertion.expectFalse) ⇒ <code>Promise</code>
    * [.expectUnequal(value1, value2)](#non_ui5.common.assertion.expectUnequal)
    * [.expectDefined(value)](#non_ui5.common.assertion.expectDefined)
    * [.expectUndefined(value)](#non_ui5.common.assertion.expectUndefined)

<a name="non_ui5.common.assertion.expectToBeVisible"></a>

##### assertion.expectToBeVisible(element) ⇒ <code>Promise</code>
Expects that the element is visible to the user. Will fail if it is not visible.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01");await non_ui5.common.assertion.expectToBeVisible(elem);
```
<a name="non_ui5.common.assertion.expectValueToBe"></a>

##### assertion.expectValueToBe(elem, compareValue, attribute) ⇒ <code>Promise</code>
Expects the attributes value of the passed element to be the compare value.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |
| compareValue | <code>String</code> | The compare value. |
| attribute | <code>String</code> | [OPTIONAL] The attribute to compare. If not passed, it will compare the inner content of the element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01");await non_ui5.common.assertion.expectValueToBe(elem, "Save");
```
**Example**  
```js
let element = await non_ui5.common.locator.getElementById("button01");await non_ui5.common.assertion.expectValueToBe(element, "Save", "title");
```
<a name="non_ui5.common.assertion.isVisible"></a>

##### assertion.isVisible(element) ⇒ <code>Boolean</code>
returns a boolean if the element is visible to the user.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  
**Returns**: <code>Boolean</code> - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01");await non_ui5.common.assertion.isVisible(elem);
```
<a name="non_ui5.common.assertion.isElementPresent"></a>

##### assertion.isElementPresent(elem) ⇒ <code>Boolean</code>
returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  
**Returns**: <code>Boolean</code> - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |

**Example**  
```js
await non_ui5.common.assertion.isElementPresent(elem);
```
<a name="non_ui5.common.assertion.isPresentByCss"></a>

##### assertion.isPresentByCss(css, index, timeout) ⇒ <code>boolean</code>
returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| css | <code>String</code> |  | The CSS selector of the element (can be a class for example). |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>30000</code> | The timeout to wait (default value: 3 sec). |

**Example**  
```js
await non_ui5.common.assertion.isPresentByCss(".button01");
```
<a name="non_ui5.common.assertion.isPresentByXPath"></a>

##### assertion.isPresentByXPath(xpath, index, timeout) ⇒ <code>boolean</code>
returns a boolean if the element is present at the DOM or not.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| xpath | <code>String</code> |  | The XPath selector of the element. |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>3000</code> | The timeout to wait (default value: 3 sec). |

**Example**  
```js
await non_ui5.common.assertion.isPresentByXPath(".//*[text()='Create']");
```
<a name="non_ui5.common.assertion.expectEqual"></a>

##### assertion.expectEqual(value1, value2)
Expects the passed values to be equal.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be equal to value (2) |
| value2 | <code>Any</code> | Value (2) to be equal to value (1) |

**Example**  
```js
non_ui5.common.assertion.expectEqual(value1, value2);
```
<a name="non_ui5.common.assertion.expectTrue"></a>

##### assertion.expectTrue(value)
Expects the passed value to be true.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be equal to true |

**Example**  
```js
non_ui5.common.assertion.expectTrue(value);
```
<a name="non_ui5.common.assertion.expectFalse"></a>

##### assertion.expectFalse(value) ⇒ <code>Promise</code>
Expects the passed value to be false.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  
**Returns**: <code>Promise</code> - The promise to be resolved.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to be false. |

**Example**  
```js
await non_ui5.common.assertion.expectFalse(false);
```
<a name="non_ui5.common.assertion.expectUnequal"></a>

##### assertion.expectUnequal(value1, value2)
Expects the passed values to be unequal.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>Any</code> | Value (1) to be unequal to value (2) |
| value2 | <code>Any</code> | Value (2) to be unequal to value (1) |

**Example**  
```js
non_ui5.common.assertion.expectUnequal(value1, value2);
```
<a name="non_ui5.common.assertion.expectDefined"></a>

##### assertion.expectDefined(value)
Expects the passed values is defined.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be defined (not undefined) |

**Example**  
```js
non_ui5.common.assertion.expectDefined(value);
```
<a name="non_ui5.common.assertion.expectUndefined"></a>

##### assertion.expectUndefined(value)
Expects the passed values is undefined.

**Kind**: static method of [<code>assertion</code>](#non_ui5.common.assertion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Value to be undefined |

**Example**  
```js
non_ui5.common.assertion.expectUndefined(value);
```
<a name="non_ui5.common.locator"></a>

#### common.locator
**Kind**: static class of [<code>common</code>](#non_ui5.common)  

* [.locator](#non_ui5.common.locator)
    * [.getDisplayedElements(selector, timeout)](#non_ui5.common.locator.getDisplayedElements)
    * [.waitForAllElements(selector, timeout)](#non_ui5.common.locator.waitForAllElements) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.waitForElementIsVisible(selector, timeout)](#non_ui5.common.locator.waitForElementIsVisible)
    * [.waitForElementIsClickable(selector, timeout)](#non_ui5.common.locator.waitForElementIsClickable)
    * [.waitForElementIsPresent(selector, timeout)](#non_ui5.common.locator.waitForElementIsPresent)
    * [.getElementByCss(css, index, timeout)](#non_ui5.common.locator.getElementByCss) ⇒ <code>Object</code>
    * [.getElementByCssContainingText(css, index, text, timeout)](#non_ui5.common.locator.getElementByCssContainingText) ⇒ <code>Object</code>
    * [.getElementById(id, timeout)](#non_ui5.common.locator.getElementById) ⇒ <code>Object</code>
    * [.getElementByClass(elemClass, index, timeout)](#non_ui5.common.locator.getElementByClass) ⇒ <code>Object</code>
    * [.getElementByName(name, index, timeout)](#non_ui5.common.locator.getElementByName) ⇒ <code>Object</code>
    * [.getElementByXPath(xpath, index, timeout)](#non_ui5.common.locator.getElementByXPath) ⇒ <code>Object</code>
    * [.getElementByChild(elementSelector, childSelector)](#non_ui5.common.locator.getElementByChild) ⇒ <code>Object</code>
    * [.getChildNode(elementSelector, childSelector, elementIndex, childIndex, timeout)](#non_ui5.common.locator.getChildNode) ⇒ <code>Object</code>
    * [.getValue(elem, attribute)](#non_ui5.common.locator.getValue) ⇒ <code>String</code>
    * [.scrollToElement(elem, alignment)](#non_ui5.common.locator.scrollToElement)
    * [.highlightElement(elem, duration, color)](#non_ui5.common.locator.highlightElement)
    * [.switchToIframe(selector)](#non_ui5.common.locator.switchToIframe)
    * [.switchToDefaultContent()](#non_ui5.common.locator.switchToDefaultContent)
    * [.waitForWindows()](#non_ui5.common.locator.waitForWindows)
    * [.switchToNewWindow(originalHandle, windowTitle)](#non_ui5.common.locator.switchToNewWindow)
    * [.switchToWindow(handle)](#non_ui5.common.locator.switchToWindow)
    * [.getCurrentWindow()](#non_ui5.common.locator.getCurrentWindow)

<a name="non_ui5.common.locator.getDisplayedElements"></a>

##### locator.getDisplayedElements(selector, timeout)
Get all visible elements with the passed selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | The selector describing the elements. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
await non_ui5.common.locator.getDisplayedElements(".inputField");
```
**Example**  
```js
await non_ui5.common.locator.getDisplayedElements(".button", 10000);
```
<a name="non_ui5.common.locator.waitForAllElements"></a>

##### locator.waitForAllElements(selector, timeout) ⇒ <code>Array.&lt;Object&gt;</code>
Waits for all elements with the passed selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Array.&lt;Object&gt;</code> - array of all elements  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | The selector describing the elements. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
await non_ui5.common.locator.waitForAllElements(".inputField");
```
**Example**  
```js
await non_ui5.common.locator.waitForAllElements(".button", 10000);
```
<a name="non_ui5.common.locator.waitForElementIsVisible"></a>

##### locator.waitForElementIsVisible(selector, timeout)
Waits for an element is visible by its selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | The query selector (e.g. id or class) of the element. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
await non_ui5.common.locator.waitForElementIsVisible(".input01", 10000);
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsVisible("#button12");
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsVisible("p:first-child", 20000);
```
<a name="non_ui5.common.locator.waitForElementIsClickable"></a>

##### locator.waitForElementIsClickable(selector, timeout)
Waits for an element is clickable by its selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | The query selector (e.g. id or class) of the element. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
await non_ui5.common.locator.waitForElementIsClickable(".input01", 10000);
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsClickable("#button12");
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsClickable("p:first-child", 20000);
```
<a name="non_ui5.common.locator.waitForElementIsPresent"></a>

##### locator.waitForElementIsPresent(selector, timeout)
Waits for an element is present at the DOM by its selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | The query selector (e.g. id or class) of the element. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
await non_ui5.common.locator.waitForElementIsPresent(".input01", 10000);
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsPresent("#button12");
```
**Example**  
```js
await non_ui5.common.locator.waitForElementIsPresent("p:first-child", 20000);
```
<a name="non_ui5.common.locator.getElementByCss"></a>

##### locator.getElementByCss(css, index, timeout) ⇒ <code>Object</code>
Gets an element by its CSS.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| css | <code>String</code> |  | The CSS of the element (can be a class for example). |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByCss(".button01");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementByCss(".input01", 1, 10000);
```
<a name="non_ui5.common.locator.getElementByCssContainingText"></a>

##### locator.getElementByCssContainingText(css, index, text, timeout) ⇒ <code>Object</code>
Gets an element by its CSS and text value.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| css | <code>String</code> |  | The CSS of the element (can be a class for example). |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| text | <code>String</code> | <code>&quot;&quot;</code> | [OPTIONAL] The text value of the element. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByCssContainingText(".input01", "Jack Jackson");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementByCssContainingText(".input02", "John Doe", 2, 10000);
```
<a name="non_ui5.common.locator.getElementById"></a>

##### locator.getElementById(id, timeout) ⇒ <code>Object</code>
Gets an element by its ID.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | The id of the element. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);
```
<a name="non_ui5.common.locator.getElementByClass"></a>

##### locator.getElementByClass(elemClass, index, timeout) ⇒ <code>Object</code>
Gets an element by its ID.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elemClass | <code>String</code> |  | The elemClass of the element. |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByClass("button01");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementByClass("input01", 0, 10000);
```
<a name="non_ui5.common.locator.getElementByName"></a>

##### locator.getElementByName(name, index, timeout) ⇒ <code>Object</code>
Gets an element by its name.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name of the element (can be a class for example). |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByName(".button01");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementByName(".input01", 0, 10000);
```
<a name="non_ui5.common.locator.getElementByXPath"></a>

##### locator.getElementByXPath(xpath, index, timeout) ⇒ <code>Object</code>
Gets an element by its XPath.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| xpath | <code>String</code> |  | The XPath of the element. |
| index | <code>Integer</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByXPath("//ul/li/a");
```
<a name="non_ui5.common.locator.getElementByChild"></a>

##### locator.getElementByChild(elementSelector, childSelector) ⇒ <code>Object</code>
Gets a specific element by passing the child property when multiple elements have the same properties.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>String</code> | The CSS identifier of the element. |
| childSelector | <code>String</code> | The CSS identifier of the elements child. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementByChild(".form01", ".input01");
```
<a name="non_ui5.common.locator.getChildNode"></a>

##### locator.getChildNode(elementSelector, childSelector, elementIndex, childIndex, timeout) ⇒ <code>Object</code>
Gets an child element of a specific element by CSS.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>Object</code> - The found element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elementSelector | <code>String</code> |  | The CSS of the parent element (can be a class for example). |
| childSelector | <code>String</code> |  | The CSS of the child element (can be a class for example). |
| elementIndex | <code>Integer</code> | <code>0</code> | The index of the parent element, in case there are more than one elements visible at the same time. By default, it takes 0. |
| childIndex | <code>Integer</code> | <code>0</code> | The index of the child element, in case there are more than one elements visible at the same time. By default, it takes 0. |
| timeout | <code>Integer</code> | <code>60000</code> | The timeout to wait (default value: 60 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getChildNode("ul[class='list']", "li[class='firstItem']");
```
<a name="non_ui5.common.locator.getValue"></a>

##### locator.getValue(elem, attribute) ⇒ <code>String</code>
Returns the attributes value of the passed element.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Returns**: <code>String</code> - The attributes value of the element.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element. |
| attribute | <code>String</code> | [OPTIONAL] The attribute of the element. If not passed, it will return the inner content of the element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("elem01");let text = await non_ui5.common.locator.getValue(elem, "text");
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("elem02");let innerHTML = await non_ui5.common.locator.getValue(elem, "value");
```
<a name="non_ui5.common.locator.scrollToElement"></a>

##### locator.scrollToElement(elem, alignment)
Scrolls to the passed element to get it into view.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | The element. |
| alignment | <code>String</code> | <code>&quot;center&quot;</code> | Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest". Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up' |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("footer01");await non_ui5.common.locator.scrollToElement(elem);
```
<a name="non_ui5.common.locator.highlightElement"></a>

##### locator.highlightElement(elem, duration, color)
Highlights the element with the passed selector.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | The element. |
| duration | <code>Integer</code> | <code>2000</code> | The duration of the highlighting (default value: 2 sec). |
| color | <code>String</code> | <code>&quot;red&quot;</code> | The color of the highlighting (default is red). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("text01");await non_ui5.common.locator.highlightElement(elem);
```
**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("text01");await non_ui5.common.locator.highlightElement(elem, 3000, "green");
```
<a name="non_ui5.common.locator.switchToIframe"></a>

##### locator.switchToIframe(selector)
Switches to the passed iframe.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The element. |

**Example**  
```js
await non_ui5.common.locator.switchToIframe("iframe[id='frame01']");
```
<a name="non_ui5.common.locator.switchToDefaultContent"></a>

##### locator.switchToDefaultContent()
Switchs to the default content.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Example**  
```js
await non_ui5.common.locator.switchToDefaultContent();
```
<a name="non_ui5.common.locator.waitForWindows"></a>

##### locator.waitForWindows()
**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Example**  
```js
await non_ui5.common.locator.waitForWindows();
```
<a name="non_ui5.common.locator.switchToNewWindow"></a>

##### locator.switchToNewWindow(originalHandle, windowTitle)
Switches the window.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Description |
| --- | --- | --- |
| originalHandle | <code>String</code> | The main window handle. |
| windowTitle | <code>String</code> | Window Title to be expected |

**Example**  
```js
await non_ui5.common.locator.switchToNewWindow(originalHandle,);
```
<a name="non_ui5.common.locator.switchToWindow"></a>

##### locator.switchToWindow(handle)
Switches to the passed window.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>String</code> | The window handle. |

**Example**  
```js
await non_ui5.common.locator.switchToWindow(originalWindowHandle);
```
<a name="non_ui5.common.locator.getCurrentWindow"></a>

##### locator.getCurrentWindow()
Returns the current window handle.

**Kind**: static method of [<code>locator</code>](#non_ui5.common.locator)  
**Example**  
```js
await non_ui5.common.locator.getCurrentWindow();
```
<a name="non_ui5.common.navigation"></a>

#### common.navigation
**Kind**: static class of [<code>common</code>](#non_ui5.common)  

* [.navigation](#non_ui5.common.navigation)
    * [.navigateToUrl(url)](#non_ui5.common.navigation.navigateToUrl)
    * [.navigateToUrlAndRetry(url, retries, interval)](#non_ui5.common.navigation.navigateToUrlAndRetry)

<a name="non_ui5.common.navigation.navigateToUrl"></a>

##### navigation.navigateToUrl(url)
Navigates to the passed url.

**Kind**: static method of [<code>navigation</code>](#non_ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to navigate to. |

**Example**  
```js
await non_ui5.common.navigation.navigateToUrl("www.ariba.com");
```
<a name="non_ui5.common.navigation.navigateToUrlAndRetry"></a>

##### navigation.navigateToUrlAndRetry(url, retries, interval)
Navigates to the passed url.

**Kind**: static method of [<code>navigation</code>](#non_ui5.common.navigation)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to navigate to. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await non_ui5.common.navigation.navigateToUrlAndRetry("www.ariba.com");
```
<a name="non_ui5.common.userInteraction"></a>

#### common.userInteraction
**Kind**: static class of [<code>common</code>](#non_ui5.common)  

* [.userInteraction](#non_ui5.common.userInteraction)
    * [.click(element, timeout)](#non_ui5.common.userInteraction.click)
    * [.clickAndRetry(element, timeout, retries, interval)](#non_ui5.common.userInteraction.clickAndRetry)
    * [.fill(element, value)](#non_ui5.common.userInteraction.fill)
    * [.fillAndRetry(element, value, retries, interval)](#non_ui5.common.userInteraction.fillAndRetry)
    * [.fillActive(value)](#non_ui5.common.userInteraction.fillActive)
    * [.fillActiveAndRetry(value, retries, interval)](#non_ui5.common.userInteraction.fillActiveAndRetry)
    * [.clear(element)](#non_ui5.common.userInteraction.clear)
    * [.clearAndRetry(element, retries, interval)](#non_ui5.common.userInteraction.clearAndRetry)
    * [.clearAndFill(element, value)](#non_ui5.common.userInteraction.clearAndFill)
    * [.clearAndFillAndRetry(element, value, retries, interval, verify)](#non_ui5.common.userInteraction.clearAndFillAndRetry)
    * [.dragAndDrop(element, target)](#non_ui5.common.userInteraction.dragAndDrop)
    * [.clickChartPart(elem)](#non_ui5.common.userInteraction.clickChartPart)
    * [.pressEnter()](#non_ui5.common.userInteraction.pressEnter)
    * [.pressF4()](#non_ui5.common.userInteraction.pressF4)
    * [.pressTab()](#non_ui5.common.userInteraction.pressTab)
    * [.pressBackspace()](#non_ui5.common.userInteraction.pressBackspace)
    * [.pressArrowLeft()](#non_ui5.common.userInteraction.pressArrowLeft)
    * [.pressArrowRight()](#non_ui5.common.userInteraction.pressArrowRight)
    * [.pressEscape()](#non_ui5.common.userInteraction.pressEscape)

<a name="non_ui5.common.userInteraction.click"></a>

##### userInteraction.click(element, timeout)
Clicks on the passed element.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Object</code> |  | The element. |
| timeout | <code>Integer</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01", 10000);await non_ui5.common.userInteraction.click(elem);
```
<a name="non_ui5.common.userInteraction.clickAndRetry"></a>

##### userInteraction.clickAndRetry(element, timeout, retries, interval)
Clicks on the passed element, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Object</code> |  | The element. |
| timeout | <code>Integer</code> | <code>30000</code> | The timeout to wait (default value: 30 sec). |
| retries | <code>Integer</code> |  | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> |  | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("button01", 10000);await non_ui5.common.userInteraction.clickAndRetry(elem);
```
<a name="non_ui5.common.userInteraction.fill"></a>

##### userInteraction.fill(element, value)
Fills the passed input.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value with witch the input should be filled. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.fill(elem, "Service 01");
```
<a name="non_ui5.common.userInteraction.fillAndRetry"></a>

##### userInteraction.fillAndRetry(element, value, retries, interval)
Fills the passed input, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value with witch the input should be filled. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.fillAndRetry(elem, "Service 01");
```
<a name="non_ui5.common.userInteraction.fillActive"></a>

##### userInteraction.fillActive(value)
Fills the active input.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |

**Example**  
```js
await non_ui5.common.userInteraction.fillActive("My Value");
```
<a name="non_ui5.common.userInteraction.fillActiveAndRetry"></a>

##### userInteraction.fillActiveAndRetry(value, retries, interval)
Fills the active input, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await non_ui5.common.userInteraction.fillActiveAndRetry("My Value");
```
<a name="non_ui5.common.userInteraction.clear"></a>

##### userInteraction.clear(element)
Clears the passed input.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.clear(elem);
```
<a name="non_ui5.common.userInteraction.clearAndRetry"></a>

##### userInteraction.clearAndRetry(element, retries, interval)
Clears the passed input, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.clearAndRetry(elem);
```
<a name="non_ui5.common.userInteraction.clearAndFill"></a>

##### userInteraction.clearAndFill(element, value)
Clears and fills the passed input.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value with witch the input should be filled after clearing it. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.clearAndFill(elem, "Service 01");
```
<a name="non_ui5.common.userInteraction.clearAndFillAndRetry"></a>

##### userInteraction.clearAndFillAndRetry(element, value, retries, interval, verify)
Clears and fills the passed input, retries in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element. |
| value | <code>String</code> | The value with witch the input should be filled after clearing it. |
| retries | <code>Integer</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Integer</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |
| verify | <code>Boolean</code> | Verifies if the value was entered correctly. Default is true. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("input01", 10000);await non_ui5.common.userInteraction.clearAndFillAndRetry(elem, "Service 01");
```
<a name="non_ui5.common.userInteraction.dragAndDrop"></a>

##### userInteraction.dragAndDrop(element, target)
Drags and drops an element at the target element.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | The element to drag. |
| target | <code>Object</code> | The target element to drop the element. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("drag01");
```
**Example**  
```js
let target = await non_ui5.common.locator.getElementById("drop02");await non_ui5.common.userInteraction.dragAndDrop(elem, target);
```
<a name="non_ui5.common.userInteraction.clickChartPart"></a>

##### userInteraction.clickChartPart(elem)
Clicks on a target element inside a chart area.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | The element to click inside the chart. |

**Example**  
```js
let elem = await non_ui5.common.locator.getElementById("chartPartToCLick");await non_ui5.common.userInteraction.clickChartPart(elem);
```
<a name="non_ui5.common.userInteraction.pressEnter"></a>

##### userInteraction.pressEnter()
Performs the Enter keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressEnter();
```
<a name="non_ui5.common.userInteraction.pressF4"></a>

##### userInteraction.pressF4()
Performs the F4 keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressF4();
```
<a name="non_ui5.common.userInteraction.pressTab"></a>

##### userInteraction.pressTab()
Performs the Tab keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressTab();
```
<a name="non_ui5.common.userInteraction.pressBackspace"></a>

##### userInteraction.pressBackspace()
Performs the Backspace keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressBackspace();
```
<a name="non_ui5.common.userInteraction.pressArrowLeft"></a>

##### userInteraction.pressArrowLeft()
Performs the Arrow Left keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressArrowLeft();
```
<a name="non_ui5.common.userInteraction.pressArrowRight"></a>

##### userInteraction.pressArrowRight()
Performs the Arrow Right keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressArrowRight();
```
<a name="non_ui5.common.userInteraction.pressEscape"></a>

##### userInteraction.pressEscape()
Performs the Escape keypress.

**Kind**: static method of [<code>userInteraction</code>](#non_ui5.common.userInteraction)  
**Example**  
```js
await non_ui5.common.userInteraction.pressEscape();
```
<a name="odata"></a>

## odata : <code>object</code>
Namespace for odata modules.

**Kind**: global namespace  

* [odata](#odata) : <code>object</code>
    * [.common](#odata.common) : <code>object</code>
        * [.service](#odata.common.service)
            * [.init(url, username, password)](#odata.common.service.init) ⇒ <code>Object</code>
            * [.get(service, entitySet, keys)](#odata.common.service.get)
            * [.getEntitySet(service, entitySet)](#odata.common.service.getEntitySet)
            * [.isFeatureToggleActivated(service, featureName)](#odata.common.service.isFeatureToggleActivated)
            * [.post(service, entitySet, payload)](#odata.common.service.post)
            * [.merge(service, entitySet, payload)](#odata.common.service.merge)
            * [.delete(service, entitySet, options)](#odata.common.service.delete)
            * [.callFunctionImport(service, functionImportName, options)](#odata.common.service.callFunctionImport)
            * [.readPdfFromDirectUrl(url)](#odata.common.service.readPdfFromDirectUrl)

<a name="odata.common"></a>

### odata.common : <code>object</code>
Namespace for common modules.

**Kind**: static namespace of [<code>odata</code>](#odata)  

* [.common](#odata.common) : <code>object</code>
    * [.service](#odata.common.service)
        * [.init(url, username, password)](#odata.common.service.init) ⇒ <code>Object</code>
        * [.get(service, entitySet, keys)](#odata.common.service.get)
        * [.getEntitySet(service, entitySet)](#odata.common.service.getEntitySet)
        * [.isFeatureToggleActivated(service, featureName)](#odata.common.service.isFeatureToggleActivated)
        * [.post(service, entitySet, payload)](#odata.common.service.post)
        * [.merge(service, entitySet, payload)](#odata.common.service.merge)
        * [.delete(service, entitySet, options)](#odata.common.service.delete)
        * [.callFunctionImport(service, functionImportName, options)](#odata.common.service.callFunctionImport)
        * [.readPdfFromDirectUrl(url)](#odata.common.service.readPdfFromDirectUrl)

<a name="odata.common.service"></a>

#### common.service
**Kind**: static class of [<code>common</code>](#odata.common)  

* [.service](#odata.common.service)
    * [.init(url, username, password)](#odata.common.service.init) ⇒ <code>Object</code>
    * [.get(service, entitySet, keys)](#odata.common.service.get)
    * [.getEntitySet(service, entitySet)](#odata.common.service.getEntitySet)
    * [.isFeatureToggleActivated(service, featureName)](#odata.common.service.isFeatureToggleActivated)
    * [.post(service, entitySet, payload)](#odata.common.service.post)
    * [.merge(service, entitySet, payload)](#odata.common.service.merge)
    * [.delete(service, entitySet, options)](#odata.common.service.delete)
    * [.callFunctionImport(service, functionImportName, options)](#odata.common.service.callFunctionImport)
    * [.readPdfFromDirectUrl(url)](#odata.common.service.readPdfFromDirectUrl)

<a name="odata.common.service.init"></a>

##### service.init(url, username, password) ⇒ <code>Object</code>
Intializes The service to work with.XCSRF-Token will be automatically fetched and stored in the service instance.Cookies will also automatically assembled and stored in the service instance.

**Kind**: static method of [<code>service</code>](#odata.common.service)  
**Returns**: <code>Object</code> - The initialized service object.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>url</code> | The base url of the service |
| username | <code>username</code> | The username. |
| password | <code>password</code> | The password of the username. |

**Example**  
```js
const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";service = await odata.common.service.init(url, user, password);
```
<a name="odata.common.service.get"></a>

##### service.get(service, entitySet, keys)
makes a GET request.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| entitySet | <code>entitySet</code> | The entitySet you want to GET from. |
| keys | <code>keys</code> | The required keys for the GET-request. |

**Example**  
```js
const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";service = await odata.common.service.init(url, user, password);
```
<a name="odata.common.service.getEntitySet"></a>

##### service.getEntitySet(service, entitySet)
GET's the EntitySet collection.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| entitySet | <code>entitySet</code> | The entitySet you want to GET from. |

**Example**  
```js
const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";service = await odata.common.service.init(url, user, password);let res = await odata.common.service.getEntitySet(service, "A_PurchaseOrder");
```
<a name="odata.common.service.isFeatureToggleActivated"></a>

##### service.isFeatureToggleActivated(service, featureName)
checks if a feature toggle is switched on or off

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| featureName | <code>featureName</code> | The name of the feature you want know the status of. |

**Example**  
```js
const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";service = await odata.common.service.init(url, user, password);let isFeatureActive = await odata.common.service.isFeatureToggleActivated(service, "MM_PUR_PO_BATCHES_IN_MANAGE_PO");
```
<a name="odata.common.service.post"></a>

##### service.post(service, entitySet, payload)
makes a POST request.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| entitySet | <code>entitySet</code> | The entitySet you want to POST against. |
| payload | <code>payload</code> | The payload for the POST-request. |

**Example**  
```js
let keys = {             "PurchaseOrder": "4500007108",             "DraftUUID": "00000000-0000-0000-0000-000000000000",             "IsActiveEntity": "true"         };let res = await odata.common.service.get(service, "A_PurchaseOrder", keys);
```
<a name="odata.common.service.merge"></a>

##### service.merge(service, entitySet, payload)
makes a MERGE request.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| entitySet | <code>entitySet</code> | The entitySet you want to MERGE in. |
| payload | <code>payload</code> | The payload for the MERGE-request. |

**Example**  
```js
let res = await odata.common.service.merge(service, "A_PurchaseOrderScheduleLine", {             "PurchasingDocument": "4500007108",             "PurchasingDocumentItem": "10",             "ScheduleLine": "1",             "ScheduleLineDeliveryDate": new Date()         };let res = await odata.common.service.get(service, "A_PurchaseOrder", keys);
```
<a name="odata.common.service.delete"></a>

##### service.delete(service, entitySet, options)
makes a DELETE request.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| entitySet | <code>entitySet</code> | The entitySet you want to DELETE. |
| options | <code>options</code> | The options for the DELETE-request. |

**Example**  
```js
let options = {
                "PurchaseOrder": "",
                "DraftUUID": draftUUID,
                "IsActiveEntity": false
              };
              await odata.common.service.delete(service, "C_PurchaseOrderTP", options);
```
<a name="odata.common.service.callFunctionImport"></a>

##### service.callFunctionImport(service, functionImportName, options)
makes a function import request on an OData service.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>service</code> | Instance of the service |
| functionImportName | <code>entitySet</code> | Name of Function Import |
| options | <code>options</code> | parameters for function import |

**Example**  
```js
const options = {
    CentralRequestForQuotation : "7500000026",
    Supplier : "100006"
  };
  const res = await oData.common.service.callFunctionImport(service, functionImportName, options);
```
<a name="odata.common.service.readPdfFromDirectUrl"></a>

##### service.readPdfFromDirectUrl(url)
returns a stream of pdf file which is part of attachment.

**Kind**: static method of [<code>service</code>](#odata.common.service)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>url</code> | system url |
|  | <code>username</code> | [OPTIONAL] username for login |
|  | <code>password</code> | [OPTIONAL] password for login |

**Example**  
```js
const url = "https://domain.com/getPdfFile";
      const pdfStream = await oData.common.service.readPdfFromDirectUrl(url, "username", "Password");
```
