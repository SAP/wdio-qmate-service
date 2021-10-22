# UI5 Locators
To perform any action to an element (e.g. clicking a button) you need to specify the element at which the action is being executed. This differs from the web technology you use. Read the following instructions, depending on the UI technology of the application to be tested. 

## UI5

### Defining the selector
To write tests for any UI5 application, we provide a Chrome Extension to find the element selector. Please find the instructions under the section [Chrome Extension](./setupAndInstallation.md#Configure Chromedriver). This tool will generate the locator (ui5ControlProperties) with all the necessary properties. 

### Supported Selector Properties
The supported properties for any UI5 based application are the following:
```javascript
const ui5ControlProperties = {
	"elementProperties": { ... },
	"ancestorProperties": { ... },
	"parentProperties": { ... },
	"siblingProperties": { ... },
	"prevSiblingProperties": { ... },
	"nextSiblingProperties": { ... },
	"childProperties": { ... },
	"descendantProperties": { ... }
};
```

The locator consists of one mandatory selector called **elementProperties**, representing the target element that the action should be applied and seven optional selectors (Grouped by relevance):  

- **ancestorProperties, parentProperties** : Both these selectors depict the ancestor and parent control properties, used to locate the element. The difference between parent and ancestor is, that the parent can be used only as direct parent, whereas the ancestor can be used for any level of ancestry (parent, grandparent, grand-grand etc.).

- **siblingProperties, prevSiblingProperties, nextSiblingProperties** : These selectors depict the sibling control properties, used to locate the element. The difference between them is, that the siblingProperties can be any sibling, whereas the prevSiblingProperties can be only the direct previous sibling and nextSiblingProperties can be only the direct next sibling.

- **childProperties, descendantProperties** : These selectors depict the descendant control properties, used to locate the element. The difference between them is, that the child can be used only as direct child of the element, whereas the descendant can be use for any level of descendance (child, grandson, grand-grand etc.).

You have to define at least one property in ```elementProperties```. This could be ```metadata``` or any other property of the [Overview](#Overview) below.

### Overview

The following selector properties apply for all the selector types (elementProperties, ancestorProperties, parentProperties, siblingProperties, prevSiblingProperties, nextSiblingProperties, childProperties, descendantProperties): 
```javascript
// Example for element properties
"elementProperties":{
	"metadata": "sap.m.Button",
	"<ui5Property>": "*Any UI5 Property/Aggregation/Association"
	"id": "*myId",
	"viewName": "*myView*Name",
	"viewId": "*id*viewId",
	"bindingContextPath": "/ProductCategories(nodeKey=guid't12321-123213-34rer332', enabled='true', category='LT')"
	"text":	[{"path": "oDataModelName>companyChangedManually"}, {"path": "*enabled"}],  
	"tooltip": [{"path": "i18n>welcomeDescription"}]
	"domProperties": {
		"nodeName": "li",
	   	"class": "*sapMButton"
	   	"tooltip": "*text*"
	},
	"ancestorProperties": {	
		"metadata":"sap.m.ColumnListItem",
	  	"ancestorProperties": {
			"metadata": "sap.m.Table",
	     	"items":  {"path": "oDataModelName>PurchaseOrderItems"},
	     	"siblingProperties": {},
	     	...
	  },
	},
	"descendantProperties": {"metadata":"sap.m.Icon"},
	"siblingProperties": {"metadata":"sap.m.Input"},
	}
```
> 🛈 For most of the cases it will be sufficient to provide only the elementProperties. In this case you can remove the others. 

### Details
The following table describes all the selector properties in detail:

| Property | Description | Example | Remark |
| ----------------- | ----------- | -------- | ------- |
| metadata | The control type | sap.m.Button, sap.m.Input |  |
| ui properties | UI5 properties including aggregations and associations, as defined in the official [UI5 API](https://sapui5.hana.ondemand.com/#/api) | "text":"test", tooltip, title, icon, enabled etc. | supports properties types boolean,string,numeric. All properties should be written in string form ("enabled":"true","counter":"34"). Wildcards are supported for all properties, aggregation, associations ("text":"my*text*" ) |
| id | The id of a control | "id":"myButtonId", "id": "my*Id*" | Wildcards are supported |
| view name | The view name | "viewName":"myViewName", "viewName": "*view*"| Wildcards are supported |
| view id | The view id | "viewId": "*myViewId*" | Wildcards are supported |
| binding context path | The binding context path | "bindingContextPath": "/odata/entity('1')", "bindingContextPath": "/odata/entity(*)*" | Wildcards are supported |
| binding property paths | The binding property paths of the model (for all types of properties: UI properties, aggregations, associations) | "text":[{"path": "oDataModelName>companyChangedManually"}], "title":{"path": "oDataModelName>companyChangedTitle"},  "items": {"path": "oDataModelName>PurchaseOrderItems"}, "enabled":[{"path": "company*Enabled*"}], | Model name optional.Wildcards are supported. Can be provided as a json "items": {"path": } or as array "items": [{"path": ..},{"path": ..}...] |
| i18n keys | The binding properties path for i18n | "tooltip": [{"path": "i18n>welcomeDescription"}], "tooltip": {"path": "i18n>welcomeDescription"}, "tooltip": [{"path": "*i18n*welcomeDescription"}] | i18n is a model, and therefore all the above mentioned rules (as described in "binding property paths" apply. Model name optional.Wildcards are supported. Can be provided as a json "items": {"path": } or as array "items": [{"path": ..},{"path": ..}...] |
| dom properties | If the UI5 virtual dom is not sufficient you can use the domProperties. You can use any dom attribute to identify the write element. | domProperties:{ "nodeName":"div", "class":"buttonNU* class2*", "id": "my*Id*"} | Wildcards are supported |
| nested selectors | As described above you can nest  | "ancestorProperties": {"metadata":"sap.m.ColumnListItem","ancestorProperties": { .. } |  |

### Nested Properties
Qmate allows nesting of properties:
```javascript
// Example for nesting in element properties
"elementProperties": {
	...
	"ancestorProperties": {
		"metadata":	"sap.m.ColumnListItem",
		"ancestorProperties": {
			"metadata":	"sap.m.Table",
			"items": { "path": "oDataModelName>PurchaseOrderItems" },
			"siblingProperties": {},
			...
		},
	}
};
```
> 🛈 Nesting is enabled infinitely for *ancestorProperties*, *siblingProperties* and *descendantProperties*. Be cautious, as more level of nesting as slower your script can become.

### Usage
For almost every UI5 action we provide, you can pass the selector directly to the function like:
```javascript
it("Step 01: click on 'Accept' button", async function () {
	const ui5ControlProperties = { [...] };
	await ui5.common.userInteraction.click(ui5ControlProperties);
});
```

## Non UI5

### Defining the element
For all non UI5 applications you can define the element in different ways. We provide all common functionalities to get an element by its ID, Class or any other CSS attribute. Hence, you can not pass any selector directly to the function performing an action. Instead, you have to define the element first with one of our [Reuse functions](reuse/doc.md#nonUi5.element.getElementByCss). 
```javascript
// Get an element by its ID
const elem = await non_ui5.common.locator.getElementById("button-abc");

// Get an element by its class (pass an index if there are more than one elements with the same class)
const elem = await non_ui5.common.locator.getElementByClass(".button", 0);

// Get an element by its attribute value of "title"
const elem = await non_ui5.common.locator.getElementByCss("input[title='name']");

// Get an element by its class and text value
const elem = await non_ui5.common.locator.getElementByCssContainingText(".button", "Accept");
```
> 🛈 There are more possibilities of getting the element. You will find them in our [Reuse API](reuse/doc.md#nonUi5.element.getElementByCss). 

### Getting the attribute
To get an attribute of an element, please follow the steps below:

- **Step 1:** Open the dev-tools <kbd>F12</kbd> and switch to the *Elements* Tab.

- **Step 2:** Select the element (right click ➜ inspect)

- **Step 3:** Find any attribute or set of attributes to identify the element 
clearly.

- **Step 4:** To verify the uniqueness of the element, switch to the **Console** tab of the dev-tools and type in the following command using your found attribute/s:
```
$$("[<attr>='<attrValue>']");
```
> 🛈  If there are more than one elements found, try to find another attribute or add some more attributes until you will only find one element (You can still pass an index to the reuse function if you are not able to find a unique selector).


### Usage
To perform the action, pass the defined element to the action function.
```javascript
it("Step 01: click on 'Accept' button", async function () {
	const elem = await non_ui5.common.locator.getElementByCss(".acceptButton");
	await non_ui5.common.userInteraction.click(elem);
});
```