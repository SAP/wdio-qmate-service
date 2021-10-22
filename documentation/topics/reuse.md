# Reuse

## [API](../../reuse/doc.md)
We provide helpful reuse functions across different web technologies. 
Please find a detailed overview of all our reuse functions with descriptions and samples in our [API](../../reuse/doc.md).

## Namespaces
The reuse API is divided into different namespaces which specifies the modules and corresponding functions.

### [ui5](../../reuse/doc.md#ui5)
For all UI5 related actions. Takes the UI5 selector as argument.
```javascript
await ui5.userInteraction.click(selector);
```

### [nonUi5](../../reuse/doc.md#nonUi5)
For any other web technology and application (including ariba, WebGUI, etc.). Takes the web element as argument.
```javascript
await nonUi5.userInteraction.fill(elem, "ABC");
```

### [common](../../reuse/doc.md#nonUi5)
For non specific reuses, independently from any web technology. Takes no specific locator or element.
```javascript
common.assertion.expectEqual("A", "A");
```

### [util](../../reuse/doc.md#util)
For utilities and helper functions like formatters.
```javascript
await util.browser.sleep(30000);
```

### [service](../../reuse/doc.md#service)
For services like OData and SOAP.
```javascript
const res = await service.odata.post(service, "A_PurchaseOrder", payload);
```