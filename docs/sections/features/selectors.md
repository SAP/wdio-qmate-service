# Selectors
To perform any action on an element (e.g. clicking a button), you need to specify the element at which the action is being executed. This differs from the web technology you are using. Read the following instructions, depending on the UI technology of the application to be tested. 

!!! info
	Selectors are typically created using our Qmate Suite, but it is important to note that this tool is currently **only available for internal use at SAP**. For further information as **internal**, please refer to our official Qmate documentation.

## UI5

### Supported Selector Properties
The supported properties for any UI5 based application are the following:
```js
const selector = {
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

The selector consists of one **mandatory** selector called **elementProperties**, representing the target element where the action should be applied to and seven optional selectors:  

- **ancestorProperties, parentProperties**: While the `parentProperties` can be used only as direct parent of the element, the `ancestorProperties` can be used for any level of ancestry (parent, grandparent, grand-grand etc.).

- **childProperties, descendantProperties** : The difference between them is, that the `childProperties` can be used only as direct child of the element, whereas the `descendantProperties` can be use for any level of descendance (child, grandson, grand-grand etc.).

- **siblingProperties, prevSiblingProperties, nextSiblingProperties**: The `siblingProperties` can be any sibling, whereas the `prevSiblingProperties` can be only the direct previous sibling and `nextSiblingProperties` can be only the direct next sibling.

You have to define at least one property in ```elementProperties```. This could be ```metadata``` or any other property of the [Overview](#overview) below.


### Sample
```js
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
	     	"siblingProperties": {...},
	     	...
	  },
	},
	"descendantProperties": {"metadata":"sap.m.Icon"},
	"siblingProperties": {"metadata":"sap.m.Input"},
	}
```
!!! tip
	For most of the cases it will be sufficient to provide only the elementProperties. Qmate Suite will generate the minimal unique selector for you.


### Overview
The following properties apply to all selector types (elementProperties, ancestorProperties, parentProperties, siblingProperties, prevSiblingProperties, nextSiblingProperties, childProperties, descendantProperties).

| Property | Description | Sample | Format | Remark |
| -------- | ----------- | -------| ------ | ------ |
| ``metadata`` | the control type | ``"metadata": "sap.m.Button"``, ``"metadata": "sap.m.Input"`` | string: ``"property": "value"`` | |
| ``<ui5Property>`` | UI5 properties including aggregations and associations, as defined in the official [UI5 API](https://sapui5.hana.ondemand.com/#/api){target="__blank"} | ``"text": "Amount"``, ``"tooltip": "Amount"``, ``"title": "Currency"``, ``"enabled": true`` | string: ``"property": "value"``, numeric: ``"property": 123``, boolean: ``"property": true`` | |
| ``id`` | the ID of the control | ``"id": "myButtonId"``, ``"id": "my*Id*"`` | string: ``"property": "value"`` | |
| ``viewName`` | the view name | ``"viewName": "myViewName"``, ``"viewName": "*view*"``| string: ``"property": "value"`` | |
| ``viewId`` | the view ID | ``"viewId": "*myViewId*"`` | string: ``"property": "value"`` | |
| ``bindingContextPath`` | the binding context path | ``"bindingContextPath": "/odata/entity('1')"``, ``"bindingContextPath": "/odata/entity(*)*"`` | string: ``"property": "value"`` | |
| binding property paths | the binding property paths of the model (for all types of properties: UI properties, aggregations, associations) | ``"text":[{"path": "oDataModelName>companyChangedManually"}]``, ``"title": {"path": "oDataModelName>companyChangedTitle"}``,  ``"items": {"path": "oDataModelName>PurchaseOrderItems"}``, ``"enabled": [{"path": "company*Enabled*"}]``, | json: ``"items": {"path": ...}``, array: ``"items": [{"path": ...}, {"path": ...} ...]`` | model name is optional |
| i18n keys | the binding properties path for i18n | ``"tooltip": [{"path": "i18n>welcomeDescription"}]``, ``"tooltip": {"path": "i18n>welcomeDescription"}``, ``"tooltip": [{"path": "*i18n*welcomeDescription"}]`` | json: ``"items": {"path": ...}``, array: ``"items": [{"path": ...}, {"path": ...} ...]`` | i18n is a model, and therefore all the above mentioned rules (as described in *binding property paths*) apply |
| ``domProperties`` | the properties of the DOM | ``"domProperties": {"nodeName": "div", "class": "buttonNU* class2*", "id": "my*Id*"}`` | string: ``"property": "value"``, numeric: ``"property": 123``, boolean: ``"property": true`` | can be used if the UI5 Virtual DOM is not sufficient |

!!! info
	Wildcards are supported for all properties, aggregation and associations 
	```js
	"text": "my*text*"
	```

### Nested Properties
In case you need to specify the element based on its surrounding, you can define nested properties. 
```javascript
"elementProperties": {
	...
	"ancestorProperties": {
		"metadata":	"sap.m.ColumnListItem",
		"ancestorProperties": {
			"metadata":	"sap.m.Table",
			"items": { "path": "oDataModelName>PurchaseOrderItems" },
			"siblingProperties": {...},
			...
		},
	}
};
```
!!! info
	Nesting is enabled infinitely for *ancestorProperties*, *siblingProperties* and *descendantProperties*. Be cautious, the more level of nesting you add the slower your script will be.

### Usage of Selectors
For almost every UI5 action we provide, you can pass the selector directly to the function like:
```javascript
it("Step 01: click on 'Save' button", async function () {
  const selector = {
    "elementProperties": {
      "metadata": "sap.m.Button",
      "text": "Save"
    }
  };
  await ui5.userInteraction.click(selector);
});
```

## Non UI5

### Defining the element
For all non UI5 applications you can define the element in different ways. We provide all common functionalities to get an element by its ID, Class or any other CSS attribute. Hence, you can not pass any selector directly to the function performing an action. Instead, you have to define the element first with one of the provided methods.
```javascript
// Get an element by its ID
const elem = await nonUi5.element.getById("button-abc");

// Get an element by its class (pass an index if there are more than one elements with the same class)
const elem = await nonUi5.element.getByClass(".button", 0);

// Get an element by its attribute value of "title"
const elem = await nonUi5.element.getByCss("input[title='name']");

// Get an element by its class and text value
const elem = await nonUi5.element.getByCssContainingText(".button", "Save");
```
!!! info
	To get a complete overview about all possible methods, please see [nonUi5.element](https://pages.github.tools.sap/sProcurement/wdio-qmate-service-ts/doc/#nonUi5.element){target="__blank"}. 


### Getting the attributes manually 
To get the properties of an element manually, please follow the steps below:

1. Open the dev-tools <kbd>F12</kbd> and switch to the *Elements* Tab.

2. Select the element (<kbd>right click</kbd> ➜ <kbd>inspect</kbd>)

3. Find any attribute or set of attributes to identify the element 
clearly.

4. To verify the uniqueness of the element, switch to the *Console* tab of the dev-tools and type in the following command using your found attribute/s:
```bash
$$("[<attr>='<attrValue>']");
```
!!! warning
	If there are more than one elements found, try to find another attribute or add some more attributes until you will find a single element (you can still pass an index to the reuse function if you are not able to find a unique selector).


### Usage
To perform the action, pass the defined element to the action function.
```javascript
it("Step 01: click on 'Save' button", async function () {
	const elem = await nonUi5.element.getByCss(".saveButton");
	await nonUi5.userInteraction.click(elem);
});
```
