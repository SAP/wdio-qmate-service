/**
 * @class control
 * @memberof ui5
 */
const Control = function () {

  const lib = require("../../../scripts/hooks/utils/lib");
  const locatorCommands = require("../../../scripts/hooks/utils/locatorCommands");

  // =================================== EXECUTE ===================================
  //TODO: maybe rename function?
  /**
  * @function execute
  * @memberOf ui5.control
  * @description Executes a native UI5 action as callback function in the browser on the given UI5 control.
  * @param {Function} callbackFunction - The client script function to be used with the control instance.
  * Caution: The first and last argument is reserved (1st param is the control instance and last argument the promise resolve function - done)
  * @param {String | Object} selectorOrElement - The selector object or the dom element (retrieved from getDisplayedElement).
  * @param {Object} args - An object containing the arguments to pass to the callback function.
  * @example const selector = {"elementProperties":{"metadata":"sap.m.StandardListItem", "id": "*categoryList-7"}};
  * const args = {"property": "text"};
  const title = await ui5.control.execute(function (control, args, done) {
    done(control.getProperty(args.property));
  }, selector, args);
  **/
  this.execute = async function (callbackFunction, selectorOrElement, args) {
    return lib.controlActionInBrowser(callbackFunction, selectorOrElement, args);
  };


  // =================================== GET ===================================
  /**
  * @function getProperty
  * @memberOf ui5.control
  * @description Gets the UI5 control property of the given element.
  * @param {Object} elem - The element.
  * @param {String} propertyName - The property name of the control to retrieve the value from.
  * @example const selector = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
  const elem = await ui5.control.locator.getDisplayedElement(selector);
  const propertyName = "title";
  const val = await ui5.control.getProperty(elem, propertyName);
  **/
  this.getProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Property(propertyName, elem);
  };

  /**
  * @function getAggregationProperty
  * @memberOf ui5.control
  * @description Gets the UI5 control aggregation property  of the given element.
  * @param {Object} elem - The element.
  * @param {String} propertyName - The aggregation property name of the control to retrieve the value from.
  * @example const selector = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "items":[{"path":"/Categories"}] }};
  const elem = await ui5.control.locator.getDisplayedElement(selector);
  const propertyName = "tooltip";
  const val = await ui5.control.getAggregationProperty(elem, propertyName);
  **/
  this.getAggregationProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Aggregation(propertyName, elem);
  };

  /**
  * @function getAssociationProperty
  * @memberOf ui5.control
  * @description Get UI control property
  * @param {Object} elem - The element.
  * @param {String} propertyName - The association property name of the control to retrieve the value from.
  * @example const selector = { "elementProperties":{"metadata":"sap.m.MultiComboBox","mProperties":{}};
  const elem = await ui5.control.locator.getDisplayedElement(selector);
  const propertyName = "selectedItems";
  const propertyValue = await ui5.control.getAssociationProperty(elem, propertyName);
  **/
  this.getAssociationProperty = async function (elem, propertyName) {
    return locatorCommands.getUI5Association(propertyName, elem);
  };

  /**
  * @function getBindingContextPathProperty
  * @memberOf ui5.control
  * @description Get UI control binding context path
  * @param {Object} elem - The element.
  * @example const selector = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{"title":[{"path":"CategoryName"}] }};
  const elem = await ui5.control.locator.getDisplayedElement(selector);
  const context = await ui5.control.getBindingContextPathProperty(elem);
  **/
  this.getBindingContextPathProperty = async function (elem) {
    return locatorCommands.getBindingContextPath(elem);
  };


  /**
  * @function getPropertyBinding
  * @memberOf ui5.control
  * @description Get UI control property
  * @param {Object} elem - The element.
  * @param {String} propertyName - The property name to retrieve from the control binding
  * @returns {Array} Array of bindings for the specific property
  * @example const selector = { "elementProperties":{"metadata":"sap.m.StandardListItem","mProperties":{ "title":[{"path":"CategoryName"}] }};
  const elem = await ui5.control.locator.getDisplayedElement(selector);
  const propertyName = "title";
  const binding = await ui5.control.getPropertyBinding(elem, propertyName);
  **/
  this.getPropertyBinding = async function (elem, propertyName) {
    return locatorCommands.getBindingProperty(propertyName, elem);
  };

};
module.exports = new Control();