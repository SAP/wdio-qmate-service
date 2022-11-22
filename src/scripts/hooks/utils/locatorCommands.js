"use strict";
const lib = require("./lib");
const cycle = require("./cycle.js");

module.exports = {
  ui5ControlLocator: async function (ui5Selector, index = 0, timeout = 60000, rootElement, returnAllDomElements = false) {
    return lib.uiControlExecuteLocator(ui5Selector, index, timeout, rootElement, returnAllDomElements);
  },

  ui5ControlsLocators: async function (ui5Selector, timeout = 60000, rootElement) {
    return lib.uiControlExecuteLocator(ui5Selector, null, timeout, rootElement);
  },

  getUI5Property: async function (propName, selectorOrElement) {
    return lib.controlActionInBrowser(function (control, propName, done) {
      let val = null;
      try {
        val = control.getProperty(propName);
      } catch (error) {
        // exception ignore it for now, need to check further
      }
      // Need to stringify array values
      val = val && val.hasOwnProperty("length") ? val.toString() : val; // need to stringify arrays and objects
      done(val);
    }, selectorOrElement, propName);
  },

  getUI5Aggregation: async function (propName, selectorOrElement) {
    const aggregation = await lib.controlActionInBrowser(function (control, propName, decycle, done) {
      let value = null;
      try {
        value = control.getAggregation(propName);
      } catch (error) {
        // exception ignore it for now, need to check further
      }
      eval(decycle);
      if (typeof value === "object" && value !== null) {
        value = decycle(value);
      }
      done(value);
    }, selectorOrElement, propName, cycle.decycle.toString());
    if (aggregation) {
      return cycle.retrocycle(aggregation);
    } else {
      return aggregation;
    }
  },

  getUI5Association: async function (propName, selectorOrElement) {
    return lib.controlActionInBrowser(function (control, propName, done) {
      let value = null;
      try {
        value = control.getAssociation(propName);
      } catch (error) {
        // exception ignore it for now, need to check further
      }
      done(value);
    }, selectorOrElement, propName);
  },

  getBindingContextPath: async function (selectorOrElement) {
    return lib.controlActionInBrowser(function (control, done) {
      let bindingContextPath = null;
      let bindingContexts = jQuery.extend({},
        control.oPropagatedProperties && control.oPropagatedProperties.oBindingContexts,
        control.oBindingContexts,
        control.mElementBindingContexts
      );
      // reduce object to non-empty contexts
      bindingContexts = Object.keys(bindingContexts).reduce(function (finalContexts, key) {
        if (bindingContexts[key]) {
          finalContexts[key] = bindingContexts[key];
        }
        return finalContexts;
      }, {});

      if (bindingContexts && Object.keys(bindingContexts).length > 0) {
        const aKeys = Object.keys(bindingContexts);
        for (let index = 0; index < aKeys.length; index++) {
          const oBindingContext = bindingContexts[aKeys[index]];
          if (oBindingContext &&
              oBindingContext.getPath &&
              oBindingContext.getPath())
            bindingContextPath = oBindingContext.getPath();
        }
      }
      done(bindingContextPath);
    }, selectorOrElement);
  },

  getBindingProperty: async function (propName, selectorOrElement) {
    return lib.controlActionInBrowser(function (control, propertyName, done) {
      let aBindingInfos = [];
      function retrieveCompositeBindings(oBinding, aBindingInfos) {
        if (!oBinding) return;
        if (oBinding.getBindings && oBinding.getBindings() && aBindingInfos) {
          const aBindings = oBinding.getBindings();
          for (let i = 0; i < aBindings.length; i++) {
            for (let j = 0; j < aBindingInfos.length; j++) {
              try {
                if (!aBindings[i].getBindings &&
                    aBindingInfos[j].path === aBindings[i].getPath() &&
                    aBindings[i].getValue) {
                  aBindingInfos[j].value = aBindings[i].getValue();
                } else if (aBindings[i].getBindings) {
                  retrieveCompositeBindings(aBindings[i], aBindingInfos);
                }
                // eslint-disable-next-line no-empty
              } catch (error) {
              }
            }
          }
        } else if (!oBinding.getBindings && aBindingInfos) {
          for (let j = 0; j < aBindingInfos.length; j++) {
            try {
              if (aBindingInfos[j].path === oBinding.getPath() &&
                  oBinding.getValue) {
                aBindingInfos[j].value = oBinding.getValue();
              }
              // eslint-disable-next-line no-empty
            } catch (error) {
            }
          }
        }
      }

      function retrieverBindingPaths(oControl, sPropKey) {
        const aBindingInfos = [];
        const aBindingInfoParts = oControl.getBindingInfo(sPropKey).parts;
        try {
          if (aBindingInfoParts && aBindingInfoParts.length > 0) {
            for (let i = 0; i < aBindingInfoParts.length; i++) {
              let sModel = "";
              if (!aBindingInfoParts[i].path) continue;
              if (aBindingInfoParts[i].model) sModel = aBindingInfoParts[i].model;
              aBindingInfos.push({
                model: sModel,
                path: aBindingInfoParts[i].path,
                value: ""
              });
            }
          } else {
            const sBindingDataStr = oControl.getBindingInfo(sPropKey).path;
            const sBindingDataModelStr = oControl.getBindingInfo(sPropKey).model;
            if (sBindingDataStr) {
              aBindingInfos.push({
                model: sBindingDataModelStr,
                path: sBindingDataStr,
                value: ""
              });
            }
          }
          // Get values
          if (oControl.getBinding && oControl.getBinding(sPropKey)) {
            const oBinding = oControl.getBinding(sPropKey);
            retrieveCompositeBindings(oBinding, aBindingInfos);
          }
        } catch (error) {
          //Continue
        }
        return aBindingInfos;
      }
      aBindingInfos = retrieverBindingPaths(control, propertyName);
      done(aBindingInfos);
    }, selectorOrElement, propName);
  },

  getAllUI5Properties: async function (selectorOrElement) {
    return lib.controlActionInBrowser(function (control, done) {
      let allProps = null;
      if (control.getMetadata()) {
        const controlMetadata = control.getMetadata();
        allProps = Object.keys(controlMetadata.getAllProperties());
      }
      done(allProps);
    }, selectorOrElement);
  },

  getAllUI5Aggregations: async function (selectorOrElement) {
    return lib.controlActionInBrowser(function (control, done) {
      let allProps = null;
      if (control.getMetadata()) {
        const controlMetadata = control.getMetadata();
        allProps = Object.keys(controlMetadata.getAllAggregations());
      }
      done(allProps);
    }, selectorOrElement);
  },

  getAllUI5Associations: async function (selectorOrElement) {
    return lib.controlActionInBrowser(function (control, done) {
      let allProps = null;
      if (control.getMetadata()) {
        const controlMetadata = control.getMetadata();
        allProps = Object.keys(controlMetadata.getAllAssociations());
      }
      done(allProps);
    }, selectorOrElement);
  }
};

