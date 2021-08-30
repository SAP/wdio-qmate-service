## Constants

<dl>
<dt><a href="#ui5">ui5</a></dt>
<dd><p>Global namespace for UI5 modules.</p>
</dd>
<dt><a href="#nonUi5">nonUi5</a></dt>
<dd><p>Global namespace for non UI5 modules.</p>
</dd>
</dl>

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
        * [.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], verify)](#ui5.userInteraction.clearFillAndRetry)
        * [.clearSmartFieldInput(selector, [index], [timeout])](#ui5.userInteraction.clearSmartFieldInput)
        * [.clearAndFillSmartFieldInput(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFillSmartFieldInput)
        * [.clearAndFillSmartFieldInputAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndFillSmartFieldInputAndRetry)
        * [.selectBox(selector, value, [index])](#ui5.userInteraction.selectBox)
        * [.selectComboBox(selector, value, [index])](#ui5.userInteraction.selectComboBox)
        * [.selectMultiComboBox(selector, values, [index])](#ui5.userInteraction.selectMultiComboBox)
        * [.clickSelectArrow(selector, [index])](#ui5.userInteraction.clickSelectArrow)
        * [.clickSelectArrowAndRetry(selector, [index], [retries], [interval])](#ui5.userInteraction.clickSelectArrowAndRetry)
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
    * [.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], verify)](#ui5.userInteraction.clearFillAndRetry)
    * [.clearSmartFieldInput(selector, [index], [timeout])](#ui5.userInteraction.clearSmartFieldInput)
    * [.clearAndFillSmartFieldInput(selector, value, [index], [timeout])](#ui5.userInteraction.clearAndFillSmartFieldInput)
    * [.clearAndFillSmartFieldInputAndRetry(selector, value, [index], [timeout], [retries], [interval])](#ui5.userInteraction.clearAndFillSmartFieldInputAndRetry)
    * [.selectBox(selector, value, [index])](#ui5.userInteraction.selectBox)
    * [.selectComboBox(selector, value, [index])](#ui5.userInteraction.selectComboBox)
    * [.selectMultiComboBox(selector, values, [index])](#ui5.userInteraction.selectMultiComboBox)
    * [.clickSelectArrow(selector, [index])](#ui5.userInteraction.clickSelectArrow)
    * [.clickSelectArrowAndRetry(selector, [index], [retries], [interval])](#ui5.userInteraction.clickSelectArrowAndRetry)
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

#### userInteraction.clearFillAndRetry(selector, value, [index], [timeout], [retries], [interval], verify)
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
| verify | <code>Boolean</code> |  | Verifies if the value was entered correctly. Default is true. |

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
    * [.userInteraction](#nonUi5.userInteraction)
        * [.pressEnter()](#nonUi5.userInteraction.pressEnter)
        * [.pressTab()](#nonUi5.userInteraction.pressTab)
        * [.pressF4()](#nonUi5.userInteraction.pressF4)
        * [.pressBackspace()](#nonUi5.userInteraction.pressBackspace)
        * [.pressEscape()](#nonUi5.userInteraction.pressEscape)
        * [.pressArrowLeft()](#nonUi5.userInteraction.pressArrowLeft)
        * [.pressArrowRight()](#nonUi5.userInteraction.pressArrowRight)
        * [.selectAll([selector], [index], [timeout])](#nonUi5.userInteraction.selectAll)
        * [.fillActive(value)](#nonUi5.userInteraction.fillActive)
        * [.fillActiveAndRetry(value, retries, interval)](#nonUi5.userInteraction.fillActiveAndRetry)
        * [.clearAndFillActive(value)](#nonUi5.userInteraction.clearAndFillActive)
        * [.clearFillActiveAndRetry(value, [retries], [interval])](#nonUi5.userInteraction.clearFillActiveAndRetry)

<a name="nonUi5.userInteraction"></a>

### nonUi5.userInteraction
**Kind**: static class of [<code>nonUi5</code>](#nonUi5)  

* [.userInteraction](#nonUi5.userInteraction)
    * [.pressEnter()](#nonUi5.userInteraction.pressEnter)
    * [.pressTab()](#nonUi5.userInteraction.pressTab)
    * [.pressF4()](#nonUi5.userInteraction.pressF4)
    * [.pressBackspace()](#nonUi5.userInteraction.pressBackspace)
    * [.pressEscape()](#nonUi5.userInteraction.pressEscape)
    * [.pressArrowLeft()](#nonUi5.userInteraction.pressArrowLeft)
    * [.pressArrowRight()](#nonUi5.userInteraction.pressArrowRight)
    * [.selectAll([selector], [index], [timeout])](#nonUi5.userInteraction.selectAll)
    * [.fillActive(value)](#nonUi5.userInteraction.fillActive)
    * [.fillActiveAndRetry(value, retries, interval)](#nonUi5.userInteraction.fillActiveAndRetry)
    * [.clearAndFillActive(value)](#nonUi5.userInteraction.clearAndFillActive)
    * [.clearFillActiveAndRetry(value, [retries], [interval])](#nonUi5.userInteraction.clearFillActiveAndRetry)

<a name="nonUi5.userInteraction.pressEnter"></a>

#### userInteraction.pressEnter()
Performs the Enter keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressEnter();
```
<a name="nonUi5.userInteraction.pressTab"></a>

#### userInteraction.pressTab()
Performs the Tab keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressTab();
```
<a name="nonUi5.userInteraction.pressF4"></a>

#### userInteraction.pressF4()
Performs the F4 keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressF4();
```
<a name="nonUi5.userInteraction.pressBackspace"></a>

#### userInteraction.pressBackspace()
Performs the Backspace keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressBackspace();
```
<a name="nonUi5.userInteraction.pressEscape"></a>

#### userInteraction.pressEscape()
Performs the Escape keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressEscape();
```
<a name="nonUi5.userInteraction.pressArrowLeft"></a>

#### userInteraction.pressArrowLeft()
Performs the Arrow Left keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressArrowLeft();
```
<a name="nonUi5.userInteraction.pressArrowRight"></a>

#### userInteraction.pressArrowRight()
Performs the Arrow Right keypress.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  
**Example**  
```js
await ui5.userInteraction.pressArrowRight();
```
<a name="nonUi5.userInteraction.selectAll"></a>

#### userInteraction.selectAll([selector], [index], [timeout])
Performs "select all" (ctrl + a) at the element with the given selector.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>Object</code> |  | The selector describing the element. |
| [index] | <code>Number</code> | <code>0</code> | The index of the selector, in case there are more than one elements visible at the same time. |
| [timeout] | <code>Number</code> | <code>30000</code> | The timeout to wait (ms). |

**Example**  
```js
await ui5.userInteraction.selectAll(selector);
```
<a name="nonUi5.userInteraction.fillActive"></a>

#### userInteraction.fillActive(value)
Enters the given value to the active input field.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value to enter. |

**Example**  
```js
await ui5.userInteraction.fillActive("My Value");
```
<a name="nonUi5.userInteraction.fillActiveAndRetry"></a>

#### userInteraction.fillActiveAndRetry(value, retries, interval)
Enters the given value to the active input field and retries the action in case it fails.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value with witch the input should be filled. |
| retries | <code>Number</code> | The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times. |
| interval | <code>Number</code> | The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs. |

**Example**  
```js
await ui5.userInteraction.fillActiveAndRetry("My Value");
```
<a name="nonUi5.userInteraction.clearAndFillActive"></a>

#### userInteraction.clearAndFillActive(value)
Clears and fills the active input.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The value to enter. |

**Example**  
```js
await ui5.userInteraction.clearAndFillActive("My Value");
```
<a name="nonUi5.userInteraction.clearFillActiveAndRetry"></a>

#### userInteraction.clearFillActiveAndRetry(value, [retries], [interval])
CClears and fills the active input. Retries the action in case of a failure.

**Kind**: static method of [<code>userInteraction</code>](#nonUi5.userInteraction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>String</code> |  | The value to enter. |
| [retries] | <code>Number</code> | <code>3</code> | The number of retries, can be set in config for all functions under params stepsRetries. |
| [interval] | <code>Number</code> | <code>5000</code> | The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. |

**Example**  
```js
await ui5.userInteraction.clearFillActiveAndRetry("My Value");
```
