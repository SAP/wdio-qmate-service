const lib = require("../../../../hooks/utils/lib");
const locatorCommands = require("../../../../hooks/utils/locatorCommands");
/**
* @class client
* @memberof ui5.common
*/
const Client = function () {

  /**
  * @function executeControlInBrowser
  * @memberOf ui5.common.client
  * @description Executes the passed callback function in browser client ui5 context, retrieving the passed element ui5 control in the native browser context
  * providing you the possibility to work directly with a ui5 control and do any action and retrieve any property as you would do in the browser client.
  * @param {Function} callbackFunction - The client script function that you can use to interact with your control instance.
  * [Caution] The first and last parameter is reserved (1st param is the control instance and last parameter the promise resolve function - done)
  * @param {String | object} selectorOrElement - The selector json or the dom element (retrieved from getDisplayElements)
  * @param {Object} parameters - An object containing parameters to pass to the callback function.
  * @example let ui5ControlProperties = {"elementProperties":{"metadata":"sap.m.StandardListItem", "id": "*categoryList-7"}};
  * let parameters = {"property": "text"};
  * var title = await ui5.common.client.executeControlInBrowser(function(control, parameters, done){
      done(control.getProperty(parameters.property));
    }, ui5ControlProperties, parameters);
  **/
  this.executeControlInBrowser = async function (callbackFunction, selectorOrElement, parameters) {
    return lib.controlActionInBrowser(callbackFunction, selectorOrElement, parameters);
  };

  /**
  * @function getControlProperty
  * @memberOf ui5.common.client
  * @description Get UI control property
  * @param {object} elem - The qmate element (result of calling getDisplayElement) 
  * @param {String} propertyName - The property name to retrieve from the control
  * @example let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "title";
    let val = await ui5.common.client.getControlProperty(elem, attribute);
  **/
  this.getControlProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Property(propertyName, elem);
  };

  /**
  * @function getControlAggregationProperty
  * @memberOf ui5.common.client
  * @description Get UI control aggregation property
  * @param {object} elem - The qmate element (result of calling getDisplayElement) 
  * @param {String} propertyName - The property name to retrieve from the control
  * @example let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "items":[{"path":"/Categories"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "tooltip";
    let val = await ui5.common.client.getControlAggregationProperty(elem, attribute);
  **/
  this.getControlAggregationProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Aggregation(propertyName, elem);
  };

  /**
  * @function getControlAssociationProperty
  * @memberOf ui5.common.client
  * @description Get UI control property
  * @param {object} elem - The qmate element (result of calling getDisplayElement) 
  * @param {String} propertyName - The property name to retrieve from the control
  * @example let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.MultiComboBox","mProperties":{}};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "selectedItems";
    let val = await ui5.common.client.getControlAssociationProperty(elem, attribute);
  **/
  this.getControlAssociationProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Association(propertyName, elem);
  };

  /**
  * @function getControlBindingContextPathProperty
  * @memberOf ui5.common.client
  * @description Get UI control binding context path
  * @param {object} elem - The qmate element (result of calling getDisplayElement) 
  * @example let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{"title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let sContext = await ui5.common.client.getControlBindingContextPathProperty(elem);
  **/
  this.getControlBindingContextPathProperty = async function (elem) {
    return locatorCommands.getBindingContextPath(elem);
  };


  /**
  * @function getControlPropertyBinding
  * @memberOf ui5.common.client
  * @description Get UI control property
  * @param {object} elem - The qmate element (result of calling getDisplayElement) 
  * @param {String} propertyName - The property name to retrieve from the control binding
  * @returns {Array} Array of bindings for the specific property
  * @example let ui5ControlProperties = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
    let elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    let propertyName = "title";
    let aBindings = await ui5.common.client.getControlPropertyBinding(elem, propertyName);
  **/
  this.getControlPropertyBinding = async function (elem, propertyName) {
    return locatorCommands.getBindingProperty(propertyName, elem);
  };

};
module.exports = new Client();
