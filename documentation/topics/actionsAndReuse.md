# Actions & Reuse

## [API](../../reuse/doc.md)
To make writing script as easy as possible, we provide many reuse functions. 
They can be used very easily and perform helpful background checks out of the box. 
Please find a detailed overview of all our reuse functions with descriptions and samples in our [API](../../reuse/doc.md).

## Best Practice
- Make use of our [Reuse Methods](../../reuse/doc.md) 
whenever possible, to provide stability and support for future improvements and changes.

- If you ar missing any functionality, please don't hesitate to [Contact](./contact.md) us. We will continuously improve our reuse to your needs, if possible.

## Namespaces
To give a better overview of all functionalities we split them into several namespaces, starting with the UI technologies to use, followed by the category of action.

### [UI5](../../reuse/doc.md#ui5)
For all UI5 related actions, please use the prefix *ui5*.
```javascript
// Example for click action in UI5
ui5.common.userInteraction.click(selector);
```

### [Non UI5](../../reuse/doc.md#nonUi5)
For all other applications, please use the prefix *non_ui5*.
```javascript
// Example for fill action in non UI5
non_ui5.common.userInteraction.fill(elem, "ABC");
```

### [Utilities](../../reuse/doc.md#util)
There are some actions which are not related to any specific UI technology, like formatting or browser actions. 
Therefore, please use the prefix *utilities*.
```javascript
// Example for formatting a string, => this will return "NR12345"
let sliced = await utilities.formatter.sliceStringAt("prefixNR12345postfix", "NR", 7);
```

### [OData](../../reuse/doc.md#service)
TODO: Add OData reuse library
We also provide the functionality to directly call OData calls. 
Therefore, please use the prefix *oData*.
```javascript
// Example for OData call
let res = await oData.common.service.post(service, "A_PurchaseOrder", payload);
```