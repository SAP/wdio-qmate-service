/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
Copyright (c) 2012, Adam Phillabaum, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

Unless otherwise stated by a specific section of code

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Computes the Jaro distance between two string -- intrepreted from:
// http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
// s1 is the first string to compare
// s2 is the second string to compare
function distance(s1, s2) {
    if (typeof(s1) !== "string" || typeof(s2) !== "string") {
        return 0;
    }

    if (s1.length === 0 || s2.length === 0) {
        return 0;
    }

    var matchWindow = (Math.floor(Math.max(s1.length, s2.length) / 2.0)) - 1;
    var matches1 = new Array(s1.length);
    var matches2 = new Array(s2.length);
    var m = 0; // number of matches
    var t = 0; // number of transpositions
    var i = 0; // index for string 1
    var k = 0; // index for string 2

    //debug helpers
    //console.log("s1: " + s1 + "; s2: " + s2);
    //console.log(" - matchWindow: " + matchWindow);

    for (i = 0; i < s1.length; i++) { // loop to find matched characters
        var start = Math.max(0, (i - matchWindow)); // use the higher of the window diff
        var end = Math.min((i + matchWindow + 1), s2.length); // use the min of the window and string 2 length

        for (k = start; k < end; k++) { // iterate second string index
            if (matches2[k]) { // if second string character already matched
                continue;
            }
            if (s1[i] !== s2[k]) { // characters don't match
                continue;
            }

            // assume match if the above 2 checks don't continue
            matches1[i] = true;
            matches2[k] = true;
            m++;
            break;
        }
    }

    // nothing matched
    if (m === 0) {
        return 0.0;
    }

    k = 0; // reset string 2 index
    for(i = 0; i < s1.length; i++) { // loop to find transpositions
        if (!matches1[i]) { // non-matching character
            continue;
        }
        while(!matches2[k]) { // move k index to the next match
            k++;
        }
        if (s1[i] !== s2[k]) { // if the characters don't match, increase transposition
          // HtD: t is always less than the number of matches m, because transpositions are a subset of matches
            t++;
        }
        k++; // iterate k index normally
    }

    // transpositions divided by 2
    t = t / 2.0;

    return ((m / s1.length) + (m / s2.length) + ((m - t) / m)) / 3.0; // HtD: therefore, m - t > 0, and m - t < m
    // HtD: => return value is between 0 and 1
}

// Computes the Winkler distance between two string -- intrepreted from:
// http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
// s1 is the first string to compare
// s2 is the second string to compare
// dj is the Jaro Distance (if you've already computed it), leave blank and the method handles it
// ignoreCase: if true strings are first converted to lower case before comparison
function JaroWinklerDistance(s1, s2, dj, ignoreCase) {
    if (s1 === s2) {
        return 1;
    } else {
        if (ignoreCase) {
          s1 = s1.toLowerCase();
          s2 = s2.toLowerCase();
        }

        //console.log(news1);
        //console.log(news2);

        var jaro = (typeof(dj) === 'undefined') ? distance(s1, s2) : dj;
        var p = 0.1; // default scaling factor
        var l = 0 // length of the matching prefix
        while(s1[l] === s2[l] && l < 4) {
            l++;
        }

        // HtD: 1 - jaro >= 0
        return jaro + l * p * (1 - jaro);
    }
}

module.exports = JaroWinklerDistance;

},{}],2:[function(require,module,exports){
module.exports = function(ui5Selector, index, opt_parentElement) {

  //Polyfill

  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, "findIndex", {
      value: function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function");
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      },
      configurable: true,
      writable: true
    });
  }

  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    };
  }

  var aCandidateControls = [];
  function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  function getControlAllProperties(oControl) {
    if (!oControl ||
      !oControl.getMetadata ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getAllProperties
    ) { return null; }
    return oControl.getMetadata().getAllProperties();
  }

  function getControlAllAggregations(oControl) {
    if (!oControl ||
      !oControl.getMetadata ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getAllAggregations
    ) { return null; }
    return oControl.getMetadata().getAllAggregations();
  }

  function getControlAllAssociations(oControl) {
    if (!oControl ||
      !oControl.getMetadata ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getAllAssociations
    ) { return null; }
    return oControl.getMetadata().getAllAssociations();
  }

  function getControlProperty(oControl, sPropKey) {
    if (!oControl ||
      !oControl.getProperty ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getProperty ||
      !oControl.getMetadata().getProperty(sPropKey) ||
      !oControl.getMetadata().getProperty(sPropKey).get
    ) { return null; }
    return oControl.getMetadata().getProperty(sPropKey).get(oControl);
  }

  function getAggregationProperty(oControl, sPropKey) {
    if (!oControl ||
      !oControl.getAggregation ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getAggregation ||
      !oControl.getMetadata().getAggregation(sPropKey) ||
      !oControl.getMetadata().getAggregation(sPropKey).get
    ) { return null; }
    return oControl.getMetadata().getAggregation(sPropKey).get(oControl);
  }

  function getAssociationProperty(oControl, sPropKey) {
    if (!oControl ||
      !oControl.getAssociation ||
      !oControl.getMetadata() ||
      !oControl.getMetadata().getAssociation ||
      !oControl.getMetadata().getAssociation(sPropKey) ||
      !oControl.getMetadata().getAssociation(sPropKey).get
    ) { return null; }
    return oControl.getMetadata().getAssociation(sPropKey).get(oControl);
  }

  function getControlBindingContextPaths(oControl) {
    if (!oControl) return null;
    var bindingContexts = jQuery.extend({},
      oControl.oPropagatedProperties && oControl.oPropagatedProperties.oBindingContexts,
      oControl.oBindingContexts,
      oControl.mElementBindingContexts
    );
    // reduce object to non-empty contexts
    bindingContexts = Object.keys(bindingContexts).reduce(function (finalContexts, key) {
      if (bindingContexts[key]) {
        finalContexts[key] = bindingContexts[key];
      }
      return finalContexts;
    }, {});

    if (bindingContexts && Object.keys(bindingContexts).length > 0) {
      var aKeys = Object.keys(bindingContexts);
      var aBindingContextPaths = [];
      for (let index = 0; index < aKeys.length; index++) {
        if (aKeys[index] === "$cmd") continue;
        const oBindingContext = bindingContexts[aKeys[index]];
        if (oBindingContext &&
          oBindingContext.getPath &&
          oBindingContext.getPath())
          aBindingContextPaths.push(oBindingContext.getPath());
      }
      return aBindingContextPaths;
    }
    return null;
  }

  function isControlInViewName(oControl, sViewName) {
    try {
      // eslint-disable-next-line no-undef
      if (!oControl || !sap.ui.core.Element || !sap.ui.core.mvc.View) {
        return false;
      }
      if (oControl.getViewName &&
        // eslint-disable-next-line no-undef
        oControl instanceof sap.ui.core.mvc.View &&
        wildCardAndNormalCompare(sViewName, oControl.getViewName())) {
        return true;
      } else {
        return isControlInViewName(oControl.getParent(), sViewName);
      }
    } catch (error) {
      return false;
    }
  }

  function isControlInViewId(oControl, sViewId) {
    try {
      // eslint-disable-next-line no-undef
      if (!oControl || !sap.ui.core.Element || !sap.ui.core.mvc.View) {
        return false;
      }
      if (oControl.getId &&
        wildCardAndNormalCompare(sViewId, oControl.getId()) &&
        // eslint-disable-next-line no-undef
        oControl instanceof sap.ui.core.mvc.View) {
        return true;
      } else {
        return isControlInViewId(oControl.getParent(), sViewId);
      }
    } catch (error) {
      return false;
    }
  }

  function convertToString(value) {
    if (value === undefined || value === null) { return null; }
    return value.toString();
  }

  function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value));
  }

  function retrieveNodesFromBody(index, opt_parentElement) {
    // Logic to retrieve the element for chaining
    if (index) {
      if (!isInt(index) && index.nodeType) {
        return index.querySelectorAll("*");
      } else if (opt_parentElement && opt_parentElement.nodeType) {
        return opt_parentElement.querySelectorAll("*");
      }
    }

    var sapBody = document.getElementsByClassName("sapUiBody");
    if (!sapBody || !sapBody[0]) {
      throw new Error("No body found");
    }
    return sapBody[0].querySelectorAll("*");
  }

  function retrieveNodeName(oNode) {
    if (oNode) {
      return oNode.nodeName;
    }
    return null;
  }

  function retrieveNodeAttributes(oNode) {
    var domProperties = [];
    if (oNode.attributes && oNode.attributes.length > 0) {
      for (let index = 0; index < oNode.attributes.length; index++) {
        var oElm = oNode.attributes[index];
        if (oElm.nodeName && oElm.nodeValue) {
          var nodeNm = oElm.nodeName;
          var nodeValue = oElm.nodeValue;
          var nodeVN = {};
          nodeVN[nodeNm] = nodeValue;
          domProperties.push(nodeVN);
        }
      }
    }
    return domProperties;
  }

  function retrieveCompositeBindings(oBinding, aBindingInfos) {
    if (!oBinding) return;
    if (oBinding.getBindings && oBinding.getBindings() && aBindingInfos) {
      var aBindings = oBinding.getBindings();
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
    var aBindingInfos = [];
    var aBindingInfoParts = oControl.getBindingInfo(sPropKey).parts;
    try {
      if (aBindingInfoParts && aBindingInfoParts.length > 0) {
        for (let i = 0; i < aBindingInfoParts.length; i++) {
          var sModel = "";
          if (!aBindingInfoParts[i].path) continue;
          if (aBindingInfoParts[i].model) sModel = aBindingInfoParts[i].model;
          aBindingInfos.push({
            model: sModel,
            path: aBindingInfoParts[i].path,
            value: ""
          });
        }
      } else {
        var sBindingDataStr = oControl.getBindingInfo(sPropKey).path;
        var sBindingDataModelStr = oControl.getBindingInfo(sPropKey).model;
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
        var oBinding = oControl.getBinding(sPropKey);
        retrieveCompositeBindings(oBinding, aBindingInfos);
      }
    } catch (error) {
      //Continue
    }
    return aBindingInfos;
  }

  function getBindDataForAggregation(oControl, sPropKey) {
    var aAggregation = getControlAllAggregations(oControl);
    var aBindingInfos = [];
    try {
      if (aAggregation.hasOwnProperty(sPropKey)) {
        if (!oControl || !sPropKey
          || !aAggregation.hasOwnProperty(sPropKey)
          || !oControl.getBindingInfo
          || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
        aBindingInfos = retrieverBindingPaths(oControl, sPropKey);
      }
    } catch (e) {
      // Do nothing
    }
    return aBindingInfos;
  }

  function getBindDataForAssociation(oControl, sPropKey) {
    var aAssociation = getControlAllAssociations(oControl);
    var aBindingInfos = [];
    try {
      if (aAssociation.hasOwnProperty(sPropKey)) {
        if (!oControl || !sPropKey
          || !aAssociation.hasOwnProperty(sPropKey)
          || !oControl.getBindingInfo
          || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
        aBindingInfos = retrieverBindingPaths(oControl, sPropKey);
      }
    } catch (e) {
      // Do nothing
    }
    return aBindingInfos;
  }

  function getBindDataForProperty(oControl, sPropKey) {
    var aProperties = getControlAllProperties(oControl);
    var aBindingInfos = [];
    try {
      if (aProperties.hasOwnProperty(sPropKey)) {
        if (!oControl || !sPropKey
          || !aProperties.hasOwnProperty(sPropKey)
          || !oControl.getBindingInfo
          || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
        aBindingInfos = retrieverBindingPaths(oControl, sPropKey);
      }
    } catch (e) {
      // Do nothing
    }
    return aBindingInfos;
  }

  function retrieveValidUI5ControlsSubElements(nodes) {
    if (!nodes || nodes.length === 0) {
      //console.log('no node html elements found');
      return aCandidateControls;
    }
    Array.prototype.filter.call(nodes, function (node) {
      //console.log("node -->" + node);
      var nodeId = node.getAttribute("id");
      if (!nodeId) {
        var childNod = node.children;
        //console.log("Number of child elements-->"+ childNod.length);
        if (!childNod) return false;
        Array.prototype.filter.call(childNod, function (chNode) {
          var chNodeId = chNode.getAttribute("id");
          if (chNodeId) {
            // eslint-disable-next-line no-undef
            var oControl = sap.ui.getCore().byId(chNodeId);
            if (oControl) {
              //console.log("Control pushed-->"+ oControl.getId());
              aCandidateControls.push(oControl);
            } else {
              //console.log("Im in else iterate 1");
              retrieveValidUI5ControlsSubElements(chNode.children);
              return false;
            }
          } else {
            //console.log("Im in else iterate 2");
            retrieveValidUI5ControlsSubElements(chNode.children);
            return false;
          }
        });
      } else {
        // eslint-disable-next-line no-undef
        var oControl = sap.ui.getCore().byId(nodeId);
        if (oControl) {
          //console.log("Control pushed-->" + oControl.getId());
          //console.log("Control pushed-->"+ oControl.getId());
          aCandidateControls.push(oControl);
        } else {
          //console.log("Im in else iterate 3 -->" + node.children.length);
          retrieveValidUI5ControlsSubElements(node.children);
          return false;
        }
      }
      return oControl;
    });
  }

  function findSiblingControls(oControl, oParentControl) {
    if (!oControl || !oControl.getId || !oControl.getId()) return null;
    if (!oParentControl.getId || !oParentControl.getId()) return null;
    var sParentId = oParentControl.getId();
    var aAllSiblingNodes = document.getElementById(sParentId).children;
    aCandidateControls = [];
    retrieveValidUI5ControlsSubElements(aAllSiblingNodes);
    var aValidControls = aCandidateControls;
    if (!aValidControls || aValidControls.length === 0) return null;
    var oControlIndx = aValidControls.findIndex(function (element) {
      return element.getId() === oControl.getId();
    });
    if (oControlIndx === -1) { throw new Error("Something is very wrong with prev/next control finder"); }
    else {
      aValidControls.splice(oControlIndx, 1);
      return aValidControls;
    }
  }

  function findPrevNextControl(oControl, oParentControl, bIsNext) {
    if (!oControl || !oControl.getId || !oControl.getId()) return null;
    if (!oParentControl.getId || !oParentControl.getId()) return null;
    var sParentId = oParentControl.getId();
    var aAllSiblingNodes = document.getElementById(sParentId).children;
    aCandidateControls = [];
    retrieveValidUI5ControlsSubElements(aAllSiblingNodes);
    var aValidControls = aCandidateControls;
    if (!aValidControls || aValidControls.length === 0) return null;
    var oControlIndx = aValidControls.findIndex(function (element) {
      return element.getId() === oControl.getId();
    });
    if (oControlIndx === -1) { throw new Error("Something is very wrong with prev/next control finder"); }
    if (bIsNext && ((aValidControls.length - 1) > oControlIndx)) {
      return aValidControls[oControlIndx + 1];
    } else if (!bIsNext && (oControlIndx > 0)) {
      return aValidControls[oControlIndx - 1];
    }
    return null;
  }

  function extractBindingPathAndModelProperty(pathObj) {
    var binding = {
      model: "",
      path: ""
    };
    if (!pathObj || !pathObj.path) return binding;
    if (pathObj.path.indexOf(">") !== -1) {
      binding.model = pathObj.path.substring(0, pathObj.path.indexOf(">"));
      binding.path = pathObj.path.substring(pathObj.path.indexOf(">") + 1, pathObj.path.length);
    } else {
      binding.path = pathObj.path;
    }
    return binding;
  }

  function compareBindingPathAndModelProperty(key, locatorProperty, oControl) {
    var extrPath = extractBindingPathAndModelProperty(locatorProperty);
    var aBindindInfo = getBindDataForProperty(oControl, key);
    if (aBindindInfo.length === 0) {
      aBindindInfo = getBindDataForAggregation(oControl, key);
    }
    if (aBindindInfo.length === 0) {
      aBindindInfo = getBindDataForAssociation(oControl, key);
    }
    if (
      (!extrPath.path && aBindindInfo.length > 0) ||
      (!extrPath.path && aBindindInfo.length === 0)
    ) {
      return true;
    } else if (extrPath.path && aBindindInfo.length === 0) {
      return false;
    }
    var aCandidatePath = [];
    for (let index = 0; index < aBindindInfo.length; index++) {
      const bindindInfo = aBindindInfo[index];
      if ((extrPath.model && bindindInfo.model)) {
        if ((extrPath.path && (bindindInfo.path !== null && bindindInfo.path !== undefined))
          && wildCardAndNormalCompare(extrPath.model, bindindInfo.model)) {
          //if(convertToString(bindindInfo.path) === convertToString(extrPath.path))
          if (wildCardAndNormalCompare(extrPath.path, bindindInfo.path))
            aCandidatePath.push(bindindInfo.path);
        }
      } else {
        if (extrPath.path && (bindindInfo.path !== null && bindindInfo.path !== undefined)) {
          //if(convertToString(bindindInfo.path) === convertToString(extrPath.path))
          if (wildCardAndNormalCompare(extrPath.path, bindindInfo.path)) {
            aCandidatePath.push(bindindInfo.path);
          }
        }
      }
    }
    return aCandidatePath.length > 0;
  }

  function wildCardAndNormalCompare(sWild, sValue) {
    if (!sWild.trim() || sWild.indexOf("*") === -1) {
      return (convertToString(sWild) === convertToString(sValue));
    }
    var aWilds = convertToString(sWild).trim().split("*");
    sValue = convertToString(sValue);
    for (var i = 0; i < aWilds.length; i++) {
      if (!aWilds[i]) continue;
      if (sValue.indexOf(aWilds[i]) === -1) return false;
    }
    return true;
  }

  function compareAttributeToElementAttributes(sKey, sValue, aNodeAttributes) {
    if (!sKey || !sValue || !aNodeAttributes) return false;
    for (let index = 0; index < aNodeAttributes.length; index++) {
      var oElm = aNodeAttributes[index];
      if (oElm) {
        const aAttrKey = Object.keys(oElm);
        const aAttrValue = Object.values(oElm);
        if (aAttrKey && aAttrValue &&
          aAttrKey.length > 0 && aAttrValue.length > 0 &&
          aAttrValue[0] !== undefined && aAttrValue[0] !== null) {
          if (aAttrKey[0] === sKey) {
            var val = aAttrValue[0].toString();
            if (wildCardAndNormalCompare(sValue, val)) {
              return true;
            }
          }

        }
      }
    }
    return false;
  }

  function compareToDomProperties(oNode, mProperties) {
    var bPass = true;
    if (!mProperties || !oNode) {
      console.log("No dom properties or no node to compare");
      return bPass;
    }
    var aNodeAttributes = retrieveNodeAttributes(oNode);
    for (var key in mProperties) {
      var value = mProperties[key];
      if (value) {
        if (key === "nodeName") {
          const nodeName = retrieveNodeName(oNode);
          bPass = bPass && (nodeName.toLowerCase() === value.toLowerCase());
        } else {
          if (Array.isArray(value)) {
            value.map(function (attrValue) {
              bPass = bPass && compareAttributeToElementAttributes(key, attrValue, aNodeAttributes);
            });
          } else {
            bPass = bPass && compareAttributeToElementAttributes(key, value, aNodeAttributes);
          }
        }
      } else {
        return false;
      }
    }
    return bPass;
  }

  function compareToProperties(mProperties, oControl) {
    var bPass = true;
    if (!mProperties) {
      console.log("No properties to compare");
      return bPass;
    }

    //debugger;
    for (var key in mProperties) {
      var value = mProperties[key];
      if (key !== "domProperties" &&
        key !== "metadata" &&
        key !== "ancestorProperties" &&
        key !== "descendantProperties" &&
        key !== "siblingProperties") {
        if (value && Array.isArray(value)) {
          let bIsStringVal = false;
          if (value.length > 0) {
            //Check type
            const stVal = value[0];
            if (typeof stVal === "string") {
              bIsStringVal = true;
            }
          }
          value.map(function (valData) {
            if (bIsStringVal) {
              bPass = bPass && compareArrayStrElements(key, valData, oControl);
            } else {
              bPass = bPass && compareBindingPathAndModelProperty(key, valData, oControl);
            }
          });
        } else if (value && typeof value === "object") {
          bPass = bPass && compareBindingPathAndModelProperty(key, value, oControl);
        } else if (key === "bindingContextPath") {
          var aPaths = getControlBindingContextPaths(oControl);
          var bFound = false;
          if (aPaths && aPaths.length) {
            for (let index = 0; index < aPaths.length; index++) {
              if (aPaths[index] && value) {
                bFound = wildCardAndNormalCompare(value, aPaths[index]);
                if (bFound){
                  break;
                }
              }
            }
          }
          bPass = bPass && bFound;
        } else if (key === "viewName") {
          bPass = bPass && isControlInViewName(oControl, value);
        } else if (key === "viewId") {
          bPass = bPass && isControlInViewId(oControl, value);
        } else {
          if (key === "id") {
            var bIdProp = compareId(oControl, value);
            bPass = bPass && bIdProp;
          } else {
            var bPropVal = compareProperty(oControl, key, value);
            if (!bPropVal) bPropVal = compareAggregation(oControl, key, value);
            if (!bPropVal) bPropVal = compareAssociation(oControl, key, value);
            bPass = bPass && bPropVal;
          }
        }
      }
    }
    return bPass;
  }


  function compareArrayStrElements(key, elemId, oControl) {
    let bPass = false;
    var aPropValues = [];
    try {
      aPropValues = getAssociationProperty(oControl, key) || [];
      // eslint-disable-next-line no-empty
    } catch (error) {
    }

    if (aPropValues.length === 0) {
      try {
        //Try again
        aPropValues = getAggregationProperty(oControl, key) || [];
        // eslint-disable-next-line no-empty
      } catch (error) {
      }
    }

    if (aPropValues.length === 0) {
      try {
        aPropValues = getControlProperty(oControl, key) || [];
      } catch (error) {
        // Continue
      }
    }

    if ((aPropValues.length === 0 && elemId) ||
      (aPropValues.length > 0 && !elemId)) {
      return bPass;
    } else if (aPropValues.length === 0 && !elemId) {
      return true;
    }

    for (let index = 0; index < aPropValues.length; index++) {
      const elem = aPropValues[index];
      if (elem && elemId) {
        let elemStr = elem;
        if (typeof elem === "object" && elem.getId) {
          elemStr = elem.getId();
        } else {
          elemStr = elem;
        }
        const elemLow = elemStr.toLowerCase();
        const elemIdLow = elemId.toLowerCase();
        if (wildCardAndNormalCompare(elemIdLow, elemLow)) {
          bPass = true;
          break;
        }
      }
    }
    return bPass;
  }

  function compareProperty(oControl, key, value) {
    var controlVal = null;
    try {
      controlVal = getControlProperty(oControl, key);
    } catch (e) {
      // Property doesnt exist
    }
    if (controlVal !== null && controlVal !== undefined && value !== null && value !== undefined) {
      //return convertToString(controlVal) === convertToString(value);
      return wildCardAndNormalCompare(value, controlVal);
    } else if ((controlVal === null || controlVal === undefined) && value) {
      return false;
    }
  }

  function getId(oControl) {
    if (!oControl ||
      !oControl.getId
    ) { return null; }
    return oControl.getId();
  }

  function compareId(oControl, value) {
    var controlVal = null;
    try {
      controlVal = getId(oControl);
    } catch (e) {
      // Property doesnt exist
    }
    if (controlVal !== null && controlVal !== undefined && value) {
      //return convertToString(controlVal) === convertToString(value);
      return wildCardAndNormalCompare(value, controlVal);
    } else if ((controlVal === null || controlVal === undefined) && value) {
      return false;
    }
  }

  function compareAggregation(oControl, key, value) {
    var controlVal = null;
    try {
      controlVal = getAggregationProperty(oControl, key);
    } catch (e) {
      // Aggregation doesnt exist
    }
    if (controlVal !== null && controlVal !== undefined && value) {
      //return convertToString(controlVal) === convertToString(value);
      return wildCardAndNormalCompare(value, controlVal);
    } else if ((controlVal === null || controlVal === undefined) && value) {
      return false;
    }
  }

  function compareAssociation(oControl, key, value) {
    var controlVal = null;
    try {
      controlVal = getAssociationProperty(oControl, key);
    } catch (e) {
      // Association doesnt exist
    }
    if (controlVal !== null && controlVal !== undefined && value) {
      //return convertToString(controlVal) === convertToString(value);
      return wildCardAndNormalCompare(value, controlVal);
    } else if ((controlVal === null || controlVal === undefined) && value) {
      return false;
    }
  }

  function filterMetadata(elementProperties, oControl) {
    //console.log("Beggining control---->" + controlVal);
    var bPass = true;
    var controlVal = oControl.getMetadata().getName();
    if (!elementProperties) return bPass;
    if (!elementProperties.metadata) return bPass;
    var metadata = elementProperties.metadata;
    if (!controlVal && metadata) {
      bPass = false;
      return bPass;
    } else if (controlVal && metadata) {
      //console.log("Control val---->" + controlVal + " metadata--->"+ metadata);
      bPass = bPass && (controlVal === metadata);
    }
    return bPass;
  }

  function compareToElementProperties(elementProperties, oControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oControl) {
      return bPass;
    }
    bPass = bPass && filterMetadata(elementProperties, oControl);
    if (!bPass) return bPass;
    if (elementProperties && elementProperties.mProperties && typeof elementProperties.mProperties === "object") {
      //if(oControl.getId() === "__box0")
      //debugger;
      bPass = bPass && compareToProperties(elementProperties.mProperties, oControl);
    } else if (elementProperties && typeof elementProperties === "object"
      && !elementProperties.mProperties) {
      bPass = bPass && compareToProperties(elementProperties, oControl);
    }

    if (elementProperties.domProperties && typeof elementProperties.domProperties === "object") {
      var oNode = convertToDomElement(oControl);
      bPass = bPass && compareToDomProperties(oNode, elementProperties.domProperties);
    }
    if (bPass) {
      var selectObj = elementProperties;
      if (elementProperties.mProperties) {
        selectObj = elementProperties.mProperties;
      }
      if (selectObj.ancestorProperties) {
        bPass = bPass && compareToAncestorProperties(selectObj.ancestorProperties, oControl);
      }

      if (selectObj.descendantProperties) {
        bPass = bPass && compareToDescendantElementProperties(selectObj.descendantProperties, oControl);
      }

      if (selectObj.siblingProperties) {
        var oParentControl = getValidParentControl(oControl);
        bPass = bPass && compareToSiblingElementProperties(selectObj.siblingProperties, oControl, oParentControl);
      }

      if (selectObj.prevSiblingProperties || selectObj.nextSiblingProperties || selectObj.childProperties || selectObj.parentProperties) {
        throw new Error("Nested properties can only be used for ancestorProperties, descendantProperties or siblingProperties.");
      }
    }
    return bPass;
  }

  function compareToPrevElementProperties(elementProperties, oControl, oParentControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oParentControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oParentControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oParentControl) {
      return bPass;
    }
    var oPrevControl = findPrevNextControl(oControl, oParentControl, false);
    if ((!elementProperties || isEmptyObject(elementProperties)) && oPrevControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oPrevControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oPrevControl) {
      return bPass;
    }
    /*console.log("Previous Property Control Type -->"
    + oPrevControl.getMetadata().getName()
    + ", Id-->" + oPrevControl.getId());*/
    return compareToElementProperties(elementProperties, oPrevControl);
  }

  function retrieveValidUI5Controls(nodes) {
    var aCandidateValidControls = [];
    if (!nodes || nodes.length === 0) {
      throw new Error("no node html elements found");
    }
    Array.prototype.filter.call(nodes, function (node) {
      var nodeId = node.getAttribute("id");
      if (!nodeId) { return false; }
      // eslint-disable-next-line no-undef
      var oControl = sap.ui.getCore().byId(nodeId);
      if (oControl) {
        aCandidateValidControls.push(oControl);
      }
      return oControl;
    });
    return aCandidateValidControls;
  }

  function injectDataForProperties(domElement, oControl) {
    // Inject properties
    var aProperties = Object.keys(getControlAllProperties(oControl));
    Array.prototype.filter.call(aProperties, function (key) {
      var controlVal = getControlProperty(oControl, key);
      domElement.setAttribute("data-" + key, controlVal);
      return domElement;
    });

    // Inject aggregations
    var aAggregation = Object.keys(getControlAllAggregations(oControl));
    Array.prototype.filter.call(aAggregation, function (key) {
      var controlVal = getAggregationProperty(oControl, key);
      domElement.setAttribute("data-" + key, controlVal);
      return domElement;
    });

    // Inject associations
    var aAssociation = Object.keys(getControlAllAssociations(oControl));
    Array.prototype.filter.call(aAssociation, function (key) {
      var controlVal = getAssociationProperty(oControl, key);
      domElement.setAttribute("data-" + key, controlVal);
      return domElement;
    });

    //Inject bindingContextPath
    var aBindingPathValues = getControlBindingContextPaths(oControl);
    if (aBindingPathValues && aBindingPathValues.length > 0) {
      domElement.setAttribute("data-bindingContextPath-size",  aBindingPathValues.length);
      for (let index = 0; index < aBindingPathValues.length; index++) {
        const sBindingPathValue = aBindingPathValues[index];
        domElement.setAttribute("data-bindingContextPath" + index, sBindingPathValue);
      }
    } else {
      domElement.setAttribute("data-bindingContextPath-size",  0);
    }

    //Inject BindingPath for property
    Array.prototype.filter.call(aProperties, function (key) {
      var oBindingDataStr = getBindingInfoDataString(oControl, key);
      if (oBindingDataStr !== null && oBindingDataStr !== undefined) {
        var sBindingDataStr = oBindingDataStr.toString();
        if (sBindingDataStr && sBindingDataStr.trim() !== "") {
          domElement.setAttribute("data-" + key + "-path", sBindingDataStr);
        }
      } else {
        return false;
      }
      return domElement;
    });

    //Inject BindingPath for aggregation
    Array.prototype.filter.call(aAggregation, function (key) {
      var oBindingDataStr = getBindingInfoDataAggregationString(oControl, key);
      if (oBindingDataStr !== null && oBindingDataStr !== undefined) {
        var sBindingDataStr = oBindingDataStr.toString();
        if (sBindingDataStr && sBindingDataStr.trim() !== "") {
          /*console.log("control-->"+ oControl.getId()
          + ", key-->" + key
          +", binding path-->" + sBindingDataStr);*/
          domElement.setAttribute("data-" + key + "-path", sBindingDataStr);
        }
      } else {
        return false;
      }
      return domElement;
    });

    //Inject BindingPath for associations
    Array.prototype.filter.call(aAssociation, function (key) {
      var oBindingDataStr = getBindingInfoDataAssociationString(oControl, key);
      if (oBindingDataStr !== null && oBindingDataStr !== undefined) {
        var sBindingDataStr = oBindingDataStr.toString();
        if (sBindingDataStr && sBindingDataStr.trim() !== "") {
          /*console.log("control-->"+ oControl.getId()
          + ", key-->" + key
          +", binding path-->" + sBindingDataStr);*/
          domElement.setAttribute("data-" + key + "-path", sBindingDataStr);
        }
      } else {
        return false;
      }
      return domElement;
    });
  }

  function getBindingInfoDataString(oControl, key) {
    var aBindingInfos = [];
    try {
      if (!oControl || !key
        || !oControl.getBindingInfo
        || !oControl.getBindingInfo(key)) return aBindingInfos;
      var aBindingInfoParts = oControl.getBindingInfo(key).parts;
      if (aBindingInfoParts && aBindingInfoParts.length > 0) {
        for (var i = 0; i < aBindingInfoParts.length; i++) {
          if (!aBindingInfoParts[i].path) continue;
          var sJoin = "";
          if (!aBindingInfoParts[i].model) sJoin = aBindingInfoParts[i].path;
          else sJoin = aBindingInfoParts[i].model + ">" + aBindingInfoParts[i].path;
          aBindingInfos.push(sJoin);
        }
      } else {
        sJoin = oControl.getBindingInfo(key).path;
        aBindingInfos.push(sJoin);
      }
    } catch (e) {
      // Just ignore and move forward
    }
    if (aBindingInfos.length > 0) {
      return aBindingInfos.join();
    } else {
      return null;
    }
  }

  function getBindingInfoDataAggregationString(oControl, key) {
    var aBindingInfos = [];
    try {
      if (!oControl || !key
        || !oControl.getBindingInfo
        || !oControl.getBindingInfo(key)
        || !oControl.getBindingInfo(key)) return aBindingInfos;
      var aBindingInfoParts = oControl.getBindingInfo(key).parts;
      if (aBindingInfoParts && aBindingInfoParts.length > 0) {
        for (var i = 0; i < aBindingInfoParts.length; i++) {
          if (!aBindingInfoParts[i].path) continue;
          var sJoin = "";
          if (!aBindingInfoParts[i].model) sJoin = aBindingInfoParts[i].path;
          else sJoin = aBindingInfoParts[i].model + ">" + aBindingInfoParts[i].path;
          aBindingInfos.push(sJoin);
        }
      } else {
        sJoin = oControl.getBindingInfo(key).path;
        aBindingInfos.push(sJoin);
      }
    } catch (e) {
      // Just ignore and move forward
    }
    if (aBindingInfos.length > 0) {
      return aBindingInfos.join();
    } else {
      return null;
    }
  }

  function getBindingInfoDataAssociationString(oControl, key) {
    var aBindingInfos = [];
    try {
      if (!oControl || !key
        || !oControl.getBindingInfo
        || !oControl.getBindingInfo(key)
        || !oControl.getBindingInfo(key)) return aBindingInfos;
      var aBindingInfoParts = oControl.getBindingInfo(key).parts;
      if (aBindingInfoParts && aBindingInfoParts.length > 0) {
        for (var i = 0; i < aBindingInfoParts.length; i++) {
          if (!aBindingInfoParts[i].path) continue;
          var sJoin = "";
          if (!aBindingInfoParts[i].model) sJoin = aBindingInfoParts[i].path;
          else sJoin = aBindingInfoParts[i].model + ">" + aBindingInfoParts[i].path;
          aBindingInfos.push(sJoin);
        }
      } else {
        sJoin = oControl.getBindingInfo(key).path;
        aBindingInfos.push(sJoin);
      }
    } catch (e) {
      // Just ignore and move forward
    }
    if (aBindingInfos.length > 0) {
      return aBindingInfos.join();
    } else {
      return null;
    }
  }

  function convertToDomElement(oControl) {
    if (!oControl || !oControl.getId || !oControl.getId()) { return null; }
    var domElem = document.getElementById(oControl.getId());
    if (domElem) {
      return domElem;
    }
    return null;
  }

  function convertToDomElements(aControls) {
    var aFoundNodes = [];
    Array.prototype.filter.call(aControls, function (oControl) {
      if (!oControl || !oControl.getId || !oControl.getId()) { return false; }
      var domElem = document.getElementById(oControl.getId());
      if (domElem) {
        injectDataForProperties(domElem, oControl);
        aFoundNodes.push(domElem);
      }
      return domElem;
    });
    return aFoundNodes;
  }

  function compareToNextElementProperties(elementProperties, oControl, oParentControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oParentControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oParentControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oParentControl) {
      return bPass;
    }

    var oNextControl = findPrevNextControl(oControl, oParentControl, true);
    if ((!elementProperties || isEmptyObject(elementProperties)) && oNextControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oNextControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oNextControl) {
      return bPass;
    }
    /*console.log("Next Property Control Type -->"
    + oNextControl.getMetadata().getName()
    + ", Id-->" + oNextControl.getId()
    + ", bPass-->"+ bPass);*/
    return compareToElementProperties(elementProperties, oNextControl);
  }

  function compareToDescendantElementProperties(elementProperties, oControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oControl) {
      return bPass;
    }
    var aChildrenControls = [];
    var aAllChildrenNodes = document.getElementById(oControl.getId()).children;
    aCandidateControls = [];
    retrieveValidUI5ControlsSubElements(aAllChildrenNodes);
    var aValidControls = aCandidateControls;
    if ((elementProperties || !isEmptyObject(elementProperties))
      && (!aValidControls || aValidControls.length === 0)) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (aValidControls && aValidControls.length > 0)) {
      return bPass;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (!aValidControls || aValidControls.length === 0)) {
      return bPass;
    }
    Array.prototype.filter.call(aValidControls, function (oChildControl) {
      var bIsEqual = compareToElementProperties(elementProperties, oChildControl);
      if (bIsEqual) {
        aChildrenControls.push(oChildControl);
      }
      return bIsEqual;
    });
    if (aChildrenControls && aChildrenControls.length > 0) {
      return true;
    } else {
      if (!aValidControls) return false;
      for (let index = 0; index < aValidControls.length; index++) {
        const childControl = aValidControls[index];
        if (compareToDescendantElementProperties(elementProperties, childControl)) {
          return true;
        }
      }
      return false;
    }
  }

  function compareToChildElementProperties(elementProperties, oControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oControl) {
      return bPass;
    }
    var aChildrenControls = [];
    var aAllChildrenNodes = document.getElementById(oControl.getId()).children;
    aCandidateControls = [];
    retrieveValidUI5ControlsSubElements(aAllChildrenNodes);
    var aValidControls = aCandidateControls;
    if ((elementProperties || !isEmptyObject(elementProperties))
      && (!aValidControls || aValidControls.length === 0)) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (aValidControls && aValidControls.length > 0)) {
      return bPass;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (!aValidControls || aValidControls.length === 0)) {
      return bPass;
    }
    Array.prototype.filter.call(aValidControls, function (oChildControl) {
      var bIsEqual = compareToElementProperties(elementProperties, oChildControl);
      if (bIsEqual) {
        aChildrenControls.push(oChildControl);
      }
      return bIsEqual;
    });
    if (aChildrenControls && aChildrenControls.length > 0) {
      /*console.log("Child Property Control Type -->"
      + aChildrenControls[0].getMetadata().getName()
      + ", Id-->" + aChildrenControls[0].getId());*/
    }
    return aChildrenControls && aChildrenControls.length > 0;
  }

  function compareToSiblingElementProperties(elementProperties, oControl, oParentControl) {
    var bPass = true;
    if ((!elementProperties || isEmptyObject(elementProperties)) && oParentControl) {
      return bPass;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oParentControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oParentControl) {
      return bPass;
    }
    var aSiblingControls = findSiblingControls(oControl, oParentControl);
    if ((elementProperties || !isEmptyObject(elementProperties))
      && (!aSiblingControls || aSiblingControls.length === 0)) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (aSiblingControls && aSiblingControls.length > 0)) {
      return bPass;
    } else if ((!elementProperties || isEmptyObject(elementProperties))
      && (!aSiblingControls || aSiblingControls.length === 0)) {
      return bPass;
    }
    for (var i = 0; i < aValidControls.length; i++) {
      var bIsEqual = compareToElementProperties(elementProperties, aValidControls[i]);
      if (bIsEqual) {
        return bPass;
      }
    }
    return false;
  }

  function getValidParentControl(oControl) {
    if (!oControl || !oControl.getId || !oControl.getId()) return null;
    var oParentControl = null;
    var domElem = document.getElementById(oControl.getId());
    if (!domElem) return null;
    var domParent = domElem.parentElement;
    for (;;) {
      if (!domParent) return null;
      var nodeId = domParent.getAttribute("id");
      if (nodeId) {
        // eslint-disable-next-line no-undef
        oParentControl = sap.ui.getCore().byId(nodeId);
        if (oParentControl) {
          /*console.log("Candidate Parent Property Control Type -->"
          + oParentControl.getMetadata().getName()
          + ", Id-->" + oParentControl.getId());*/
          return oParentControl;
        }
      }
      domParent = domParent.parentElement;
    }
  }

  function filterByIndex(aControls) {
    if ((index !== null && index !== undefined)
      && aControls && aControls.length > 0) {
      if (typeof index === "object" && index.nodeType) {
        return aControls;
      } else if ((index <= (aControls.length - 1)) && (index >= 0)) {
        return [aControls[index]];
      } else {
        return [];
      }
    }
    return aControls;
  }

  function compareToAncestorProperties(elementProperties, oControl) {
    if ((!elementProperties || isEmptyObject(elementProperties)) && oControl) {
      return true;
    } else if ((elementProperties && !isEmptyObject(elementProperties)) && !oControl) {
      return false;
    } else if ((!elementProperties || isEmptyObject(elementProperties)) && !oControl) {
      return true;
    }
    var oAncestorControl = oControl;
    for (; ;) {
      oAncestorControl = getValidParentControl(oAncestorControl);
      if (!oAncestorControl) return false;
      if (compareToElementProperties(elementProperties, oAncestorControl)) {
        return true;
      }
    }
  }

  // eslint-disable-next-line no-undef
  if (!sap.ui || !sap.ui.getCore()) {
    throw new Error("This is not an UI5 App, please use other locators");
  }
  var nodes = retrieveNodesFromBody(index, opt_parentElement);
  if (!nodes || nodes.length === 0) {
    throw new Error("no node html elements found");
  }

  var aCandidateControl = [];
  var aValidControls = retrieveValidUI5Controls(nodes);
  if (aValidControls === null || aValidControls === undefined) return aCandidateControl;
  //console.log("going in...");
  Array.prototype.filter.call(aValidControls, function (oControl) {
    var isNotCandidate = !compareToElementProperties(ui5Selector.elementProperties, oControl);
    if (isNotCandidate) return false;

    var oParentControl = getValidParentControl(oControl);
    if (!oParentControl && ui5Selector.parentProperties) { throw new Error("no parent control found"); }

    var isParentNotCandidate = !compareToElementProperties(ui5Selector.parentProperties, oParentControl);
    if (isParentNotCandidate) return false;

    var isAncestorNotCandidate = !compareToAncestorProperties(ui5Selector.ancestorProperties, oControl);
    if (isAncestorNotCandidate) return false;

    var isSiblingNotCandidate = !compareToSiblingElementProperties(ui5Selector.siblingProperties, oControl, oParentControl);
    if (isSiblingNotCandidate) return false;

    var isPrevSiblingNotCandidate = !compareToPrevElementProperties(ui5Selector.prevSiblingProperties, oControl, oParentControl);
    if (isPrevSiblingNotCandidate) return false;

    var isNextSiblingNotCandidate = !compareToNextElementProperties(ui5Selector.nextSiblingProperties, oControl, oParentControl);
    if (isNextSiblingNotCandidate) return false;

    var isChildNotCandidate = !compareToChildElementProperties(ui5Selector.childProperties, oControl);
    if (isChildNotCandidate) return false;

    var isDescendantNotCandidate = !compareToDescendantElementProperties(ui5Selector.descendantProperties, oControl);
    if (isDescendantNotCandidate) return false;

    if (oControl !== null && oControl !== undefined) {
      aCandidateControl.push(oControl);
    }
    return oControl !== null && oControl !== undefined;
  });
  aCandidateControl = filterByIndex(aCandidateControl);
  //console.log("Candidates found --->" + aCandidateControl.length);
  //debugger;
  var aNodesFound = convertToDomElements(aCandidateControl);
  return aNodesFound;
};
},{}],3:[function(require,module,exports){
// Aggregation or type of instanceof sap.m.ListItemBase,
// Or of sap.ui.table.Row or sap.ui.core.Item or has aggregation binding
// Ancestor check root aggregations : sap.tnt.NavigationList
//sap.m.ComboBoxBase, sap.m.ListBase, sap.ui.table.Table, sap.m.MultiInput, sap.ui.unified.MenuItemBase, sap.ui.unified.Menu
// check for aggregation/association binding
// Descendant check for element with i18n, binding, dont us ids
// If ancestor item
// If descentant item
// Use wildcards for bindingContextPath with guid
// bindingingContext + etwas (bindingpath)


// Take more in consideration (2)
// No aggregagation -> check for check for element with i18n, binding (ignore Uxfc, prefer strings over numbers, and booleans : enabled, disabled ), ariaLabelledBy, viewName/Id
// ids, viewId, binindContextPath, properties,ariaLabelledBy, check if generic --> pattern <metadata name> + number
// create wildcards check --> * + difference
// If searchField action --> use reuse methods


// Non UI5
// Get nodeName --> li,div, ...
// Dont retrieve elements with no id, or elements with b or span
// If parent, grand or grand-grand no id, take class or custom attributes
// If nothing else found the take b and span elements
// Define sequence of importance
//   0:title,name  1: id, 2:custom, 3:class [name, style, data-help-id, generally *id*, role, key, title...] (dont accept attributes with name: data-/*focus*,*context*, menu*, drag*, click, mouse,change,keydown, keyup, attached, maxlengh, or with value: funtion, (), {}, =, ; )
// 2 + system --> fill
// --> id & *-id*  & [name | title ]  --> 1 is enough (first with star, then with $ and without after) --> if not unque continue with wildcard
// --> other custom with restrictions --> 2 needs
// --> css (class, style)
// If id, concatinate and iterate [concat rules: _, ., [],/,\ ]
// Iterate through attributes
//document.querySelectorAll(*)
// var iframe = document.getElementById("application-ServiceContract-create")
//iframe.contentWindow.document.querySelectorAll('input[id*="btadminh_po_number_sold"]')
//$$('iframe')[1].contentDocument.querySelectorAll('input[id*="btadminh_po_number_sold"]')
/*
<iframe id ='if1'>
    <iframe id ='if2'>
        <iframe id ='if3'>
            <iframe id ='if4'>
                <input type='hidden' id ='elementToBeFound'>
            </iframe>
        </iframe>
    </iframe>
</iframe>
const elem = document.getElementById('if1').contentDocument
.getElementById('if2').contentDocument
.getElementById('if3').contentDocument
.getElementById('if4').contentDocument
.getElementById('elementToBeFound')

Contains innerText
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}
contains('div', 'sometext'); // find "div" that contain "sometext"
contains('div', /^sometext/); // find "div" that start with "sometext"
contains('div', /sometext$/i); // find "div" that end with "sometext", case-insensitive

by.cssContainingText 
---------------------
<ul>
  <li class="pet">Dog</li>
  <li class="pet">Cat</li>
</ul>
Code
// Returns the li for the dog, but not cat.
var dog = element(by.cssContainingText('.pet', 'Dog'));

*/

'use strict';

    var jaroWinkDistance = require('./jaroWinBundle.js');  
   window.jaroWinkelDistance = jaroWinkDistance;
var aBlackListed = [
    //sap.m.Input
    "dateFormat",
    "enableSuggestionsHighlighting",
    "fieldWidth",
    "filterSuggests",
    "maxLength",
    "maxSuggestionWidth",
    "showSuggestion",
    "showTableSuggestionValueHelp",
    "showValueHelp",
    "startSuggestion",
    "suggestionRowValidator",
    "textFormatMode",
    "textFormatter",
    "valueHelpOnly",
    "valueLiveUpdate",
    //sap.m.InputBase
    "showValueStateMessage",
    "textAlign",
    "textDirection",
    "valueState",
    "valueStateText",
    "width",
    //sap.ui.core.Control
    "blocked",
    "busy",
    "busyIndicatorDelay",
    "busyIndicatorSize",
    "fieldGroupIds",
    "visible",
    //sap.m.Button
    "iconDensityAware",
    "iconFirst",
    //sap.m.Select
    "autoAdjustWidth",
    "maxWidth",
    "showSecondaryValues",
    //sap.m.BusyDialog
    "customIconDensityAware",
    "customIconHeight",
    "customIconRotationSpeed",
    "customIconWidth",
    "showCancelButton",
    //sap.m.Carousel
    "height",
    "loop",
    "pageIndicatorPlacement",
    "showBusyIndicator",
    "showPageIndicator",
    //sap.m.CheckBox
    "activeHandling",
    "partiallySelected",
    "useEntireWidth",
    "wrapping",
    //sap.m.Column
    "demandPopin",
    "hAlign",
    "mergeDuplicates",
    "minScreenWidth",
    "popinDisplay",
    "popinHAlign",
    "sortIndicator",
    "styleClass",
    "vAlign",
    //sap.m.ListItemBase
    "highlight",
    "highlightText",
    "unread",
    //sap.m.ComboBox
    "filterSecondaryValues",
    //sap.m.CustomListItem
    "noDataDescription",
    "noDataText",
    //sap.m.VBox
    "alignContent",
    "alignItems",
    "backgroundDesign",
    "direction",
    "fitContainer",
    "justifyContent",
    "renderType",
    "wrap",
    //sap.m.Link
    "emphasized",
    "subtle",
    "validateUrl",
    //sap.m.List
    //"sap.m.ListBase",
    "growing",
    "growingDirection",
    "growingScrollToLoad",
    "growingThreshold",
    "growingTriggerText",
    "headerDesign",
    "inset",
    "keyboardMode",
    "modeAnimationOn",
    "rememberSelections",
    "showNoData",
    "showSeparators",
    "showUnread",
    //sap.m.App
    "backgroundColor",
    "backgroundImage",
    "backgroundOpacity",
    "backgroundRepeat",
    "defaultTransitionName",
    "placement",
    //sap.m.BusyIndicator
    "customIconDensityAware",
    "customIconHeight",
    "customIconRotationSpeed",
    "customIconWidth",
    "design",
    "size",
    //sap.m.DatePicker
    "displayFormat",
    "displayFormatType",
    "initialFocusedDateValue",
    "maxDate",
    "minDate",
    "placeholder",
    "secondaryCalendarType",
    "showValueStateMessage",
    "valueFormat",
    "delimiter",
    "required",
    "enabled",
    "editable",
    //sap.m.DateTimePicker
    "minutesStep",
    "secondsStep",
    //sap.m.Dialog
    "contentHeight",
    "contentWidth",
    "draggable",
    "escapeHandler",
    "horizontalScrolling",
    "resizable",
    "showHeader",
    "stretch",
    "stretchOnPhone",
    "verticalScrolling",
    "valueTextDirection",
    //sap.m.DraftIndicator
    "minDisplayTime",
    //sap.m.FacetFilter
    "liveSearch",
    "showPersonalization",
    "showPopoverOKButton",
    "showReset",
    "showSummaryBar",
    "active",
    //sap.m.FacetFilterList
    "enableBusyIndicator",
    "enableCaseInsensitiveSearch",
    "includeItemInSelection",
    "multiSelect",
    "retainListSequence",
    "sequence",
    "showRemoveFacetIcon",
    "swipeDirection",
    "wordWrap",
    "truncateValueTo",
    //sap.m.FeedInput
    "growingMaxLines",
    "showExceededText",
    //sap.m.FeedListItem
    "convertLinksToAnchorTags",
    "lessLabel",
    "maxCharacters",
    "moreLabel",
    "senderActive",
    "showIcon",
    //sap.m.FlexBox
    "displayInline",
    "justifyContent",
    //sap.m.FlexItemData
    "alignSelf",
    "baseSize",
    "growFactor",
    "minHeight",
    "minWidth",
    "maxHeight",
    "shrinkFactor",
    //sap.m.GenericTile
    "failedText",
    "frameType",
    "sizeBehavior",
    "state",
    "wrappingType",
    "titleTextDirection",
    "upperCase",
    "orientation",
    "scrollStep",
    "scrollTime",
    "showDividers",
    "showOverflowItem",
    //sap.m.IconTabFilter
    "showAll",
    //sap.m.IconTabHeader
    "enableTabReordering",
    "mode",
    "showSelection",
    "showOverflowSelectList",
    "tabDensityMode",
    //sap.m.Image
    "backgroundPosition",
    "backgroundRepeat",
    "backgroundSize",
    "decorative",
    "densityAware",
    "placeholderSymbol",
    "regex",
    "useDefaultActionOnly",
    //sap.m.MenuItem
    "startsSection",
    //sap.m.MessageItem
    "activeTitle",
    "markupDescription",
    "enableFormattedText",
    "showNavButton",
    "asyncDescriptionHandler",
    "asyncURLHandler",
    "initiallyExpanded",
    "groupItems",
    "showDetailsPageHeader",
    "timestamp",
    "groupName"
];

var QmateUtil = function() {
    this.distanceNode = function(aNodes, id) {
        if(aNodes && aNodes.length > 1) {
            return aNodes.length - 1;
        } else if(aNodes && aNodes.length === 1 && aNodes[0].id !== id) {
            return 99;
        } else if(aNodes && aNodes.length === 1 && aNodes[0].id === id) {
            return 0;
        } else {
            return 99;
        }
    }

    this.isIdGeneric = function(val) {
        var ManagedObjectMetadata = sap.ui.require("sap/ui/base/ManagedObjectMetadata");
        return ManagedObjectMetadata.isGeneratedId(val);
        //var matches = val.match(/\d+/g);
        //return matches !== null || val.indexOf("clone") !== -1;
    }

    this.isEmptyObject = function(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    this.isEmptyArray = function(aValue) {
        return Array.isArray(aValue) && aValue.length === 0;
    }

    this.isArrayOfBindingObjects = function(aValue) {
        if(Array.isArray(aValue) && aValue.length > 0) {
            return (
                (aValue[0].hasOwnProperty("model") && aValue[0].hasOwnProperty("path")) || 
                (this.isString(aValue[0]) && !aValue[0].getId)
                );
        }
        return false;
    }

    this.getKeyValue = function(oControlProps, key) {
        if(oControlProps && key !== null && key !== undefined) {
            for (let index = 0; index < oControlProps.length; index++) {
                const prop = oControlProps[index];
                if(prop && prop[key]){
                    return prop[key];
                }
            }
        }
    }

    this.getControlAllProperties = function(oControl) {
        if(!oControl ||
        !oControl.getMetadata ||
        !oControl.getMetadata() ||
        !oControl.getMetadata().getAllProperties
        ) { return null; }
        return oControl.getMetadata().getAllProperties();
    }

    this.getControlAllAggregations = function(oControl) {
        if(!oControl ||
        !oControl.getMetadata ||
        !oControl.getMetadata() ||
        !oControl.getMetadata().getAllAggregations
        ) { return null; }
        return oControl.getMetadata().getAllAggregations();
    }

    this.getControlAllAssociations = function(oControl) {
        if(!oControl ||
        !oControl.getMetadata ||
        !oControl.getMetadata() ||
        !oControl.getMetadata().getAllAssociations
        ) { return null; }
        return oControl.getMetadata().getAllAssociations();
    }
    // Returns if a value is a string
    this.isString = function(value) {
        return typeof value === 'string' || value instanceof String;
    }

    // Returns if a value is really a number
    this.isNumber = function(value) {
        return typeof value === 'number' && isFinite(value);
    }

    // Returns if a value is a function
    this.isFunction = function(value) {
        return typeof value === 'function';
    }

    // Returns if a value is an object
    this.isObject = function(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    // Returns if a value is a boolean
    this.isBoolean = function(value) {
        return typeof value === 'boolean';
    }

    // Returns if value is an error object
    this.isError = function(value) {
        return value instanceof Error && typeof value.message !== 'undefined';
    }

    // Returns if value is a date object
    this.isDate = function(value) {
        return value instanceof Date;
    }

    // Returns if a Symbol
    this.isSymbol = function(value) {
        return typeof value === 'symbol';
    }

    this.getControlProperty = function(oControl, sPropKey) {
        if(!oControl ||
        !oControl.getProperty
        ) { return null; }
        
        return oControl.getProperty(sPropKey);
    }

    this.getAggregationProperty = function(oControl, sPropKey) {
        if (!oControl ||
          !oControl.getAggregation ||
          !oControl.getMetadata() ||
          !oControl.getMetadata().getAggregation ||
          !oControl.getMetadata().getAggregation(sPropKey) ||
          !oControl.getMetadata().getAggregation(sPropKey).get
        ) { return null; }
        return oControl.getMetadata().getAggregation(sPropKey).get(oControl);
    }

    this.getAssociationProperty = function(oControl, sPropKey) {
        if(!oControl ||
        !oControl.getAssociation
        ) { return null; }
        return oControl.getAssociation(sPropKey);
    }

    this.getControlBindingContextPath = function(oControl) {
        if (!oControl) return null;
        var bindingContexts = jQuery.extend({},
        oControl.oPropagatedProperties && oControl.oPropagatedProperties.oBindingContexts,
        oControl.oBindingContexts,
        oControl.mElementBindingContexts
        );
            // reduce object to non-empty contexts
        bindingContexts = Object.keys(bindingContexts).reduce(function (finalContexts, key) {
        if (bindingContexts[key]) {
            finalContexts[key] = bindingContexts[key];
        }
        return finalContexts;
        }, {});

        if (bindingContexts && Object.keys(bindingContexts).length > 0) {
        var aKeys = Object.keys(bindingContexts);
        for (let index = 0; index < aKeys.length; index++) {
            if (aKeys[index] === "$cmd") continue;
            const oBindingContext = bindingContexts[aKeys[index]];
            if (oBindingContext &&
                        oBindingContext.getPath &&
                        oBindingContext.getPath())
            return oBindingContext.getPath();
        }
        }
        return null;
    }

    this.isValidProperties = function(oProperty, oPropValue) {
        if(!oProperty || this.isEmptyObject(oProperty)) return false;

        var aValNames = aBlackListed.filter(function(propName) {
            return Object.keys(oProperty).length > 0
            && propName === Object.keys(oProperty)[0]
        });
        if(aValNames && aValNames.length > 0) return false;

        if(Object.values(oProperty).length <= 0) return false;
        var sPropName = Object.keys(oProperty)[0];
        //var oPropValue = Object.values(oProperty)[0];

        if(oPropValue === null ||  oPropValue === undefined || oPropValue.getId || oPropValue === "") return false;

        return this.isString(oPropValue) || this.isNumber(oPropValue) ||  this.isBoolean(oPropValue) ||
        (Array.isArray(oPropValue) && oPropValue.length > 0 && this.isString(oPropValue[0]));
    }


    this.retrieveDomProperties = function(oNode) {
        var domProperties = [];
        if(!oNode) return domProperties;
        domProperties.push({
            "nodeName" : oNode.nodeName
        });
        if(oNode.attributes && oNode.attributes.length > 0) {
            for (let index = 0; index < oNode.attributes.length; index++) {
                var oElm = oNode.attributes[index];
                if(oElm.nodeName && oElm.nodeValue) {
                    if(
                        //oElm.nodeName.indexOf('id') === -1 &&
                        //oElm.nodeName.indexOf('style') === -1 &&
                        oElm.nodeValue.indexOf('%') === -1 &&
                        oElm.nodeValue.indexOf('px') === -1 &&
                        oElm.nodeValue.indexOf('rem') === -1 &&
                        oElm.nodeValue.indexOf('true') === -1 &&
                        oElm.nodeValue.indexOf('false') === -1 &&
                        isNaN(oElm.nodeValue)) {
                            var nodeNm = oElm.nodeName;
                            var nodeValue = oElm.nodeValue;
                            var nodeVN = {};
                            nodeVN[nodeNm] = nodeValue;
                            domProperties.push(nodeVN);
                    }
                }
            }
        }
        return domProperties;
    }

    this.isControlInViewId = function(oControl, sViewId) {
        try {
        // eslint-disable-next-line no-undef
        if (!oControl || !sap.ui.core.Element || !sap.ui.core.mvc.View) {
            return false;
        }
        if (oControl.getId && sViewId === oControl.getId() &&
            // eslint-disable-next-line no-undef
            oControl instanceof sap.ui.core.mvc.View) {
            return true;
        } else {
            return this.isControlInViewId(oControl.getParent(), sViewId);
        }
        } catch (error) {
        return false;
        }
    },

    this.getControlDirectView = function(oControl) {
        try {
        // eslint-disable-next-line no-undef
        if (!oControl || !sap.ui.core.Element || !sap.ui.core.mvc.View) {
            return null;
        }
        if (oControl.getId &&
            // eslint-disable-next-line no-undef
            oControl instanceof sap.ui.core.mvc.View) {
            return oControl;
        } else {
            return this.getControlDirectView(oControl.getParent());
        }
        } catch (error) {
            return null;
        }
    }

    this.isControlInComponentId = function(oControl, sComponentId) {
        try {
        // eslint-disable-next-line no-undef
        if (!oControl || !sap.ui.core.Element || !sap.ui.core.Component) {
            return false;
        }
        if (oControl.getId && sComponentId === oControl.getId() &&
            // eslint-disable-next-line no-undef
            oControl instanceof sap.ui.core.UIComponent) {
            return true;
        } else {
            return this.isControlInComponentId(oControl.getParent(), sComponentId);
        }
        } catch (error) {
        return false;
        }
    }

    this.getDirectComponent = function(oControl) {
        try {
        // eslint-disable-next-line no-undef
        if (!oControl || !sap.ui.core.Element || !sap.ui.core.Component) {
            return null;
        }
        if (oControl.getId &&
            // eslint-disable-next-line no-undef
            oControl instanceof sap.ui.core.UIComponent) {
            return oControl;
        } else {
            return this.getDirectComponent(oControl.getParent());
        }
        } catch (error) {
            return null;
        }
    }

    this.addViewForControl = function(oControl, elemProperties) {
        // Get View name
        if(sap.ui.core.Element && sap.ui.core.mvc.View && sap.ui.core.UIComponent) {
            var oView = this.getControlDirectView(oControl);
            if(oView && oView.getId() && oControl.getId()) {
                elemProperties.push({
                    'viewId': oView.getId()
                });
                elemProperties.push({
                    'viewName': oView.getViewName()
                });
            }
            
            const oComponent = this.getDirectComponent(oControl);
            if(oComponent && oComponent.getId && oComponent.getId()) {
                elemProperties.push({
                    'componentId': oComponent.getId()
                });
            }
        }
    }

    this.addControlProperties = function(oControl, elemProperties) {
        var mProperties = this.getControlAllProperties(oControl);
        if(!mProperties) return;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return;
        
        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            const sPropValue = this.getControlProperty(oControl, sPropName);
            var oProperty = {};
            oProperty[sPropName] = sPropValue;
            if(this.isValidProperties(oProperty, sPropValue)) {
                elemProperties.push(oProperty);
            }
        }
    };

    this.addControlAggregation = function(oControl, elemProperties) {
        var mProperties = this.getControlAllAggregations(oControl);
        if(!mProperties) return;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return;
        
        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            const sPropValue = this.getAggregationProperty(oControl, sPropName);
            var oProperty = {};
            oProperty[sPropName] = sPropValue;
            if(this.isValidProperties(oProperty, sPropValue)) {
                elemProperties.push(oProperty);
            }
        }
    };

    this.addAssociationProperty = function(oControl, elemProperties) {
        var mProperties = this.getControlAllAssociations(oControl);
        if(!mProperties) return;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return;
        
        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            const sPropValue = this.getAssociationProperty(oControl, sPropName);
            var oProperty = {};
            oProperty[sPropName] = sPropValue;
            if(this.isValidProperties(oProperty, sPropValue)) {
                elemProperties.push(oProperty);
            }
        }
    };

    this.retrieveBindingContextPath = function(oControl) {
        var elemProperties = [];
        var bindPath = {};
        bindPath['bindingContextPath'] = this.getControlBindingContextPath(oControl);
        if(!bindPath['bindingContextPath']) return elemProperties;
        // Add Binding Path
        elemProperties.push(bindPath);
        return elemProperties;
    }

    this.retrieveCompositeBindings = function(oBinding, aBindingInfos){
        if(!oBinding) return;
        if(oBinding.getBindings && oBinding.getBindings() && aBindingInfos) {
            var aBindings = oBinding.getBindings();
            for (var i = 0; i < aBindings.length; i++) {
                for (var j = 0; j < aBindingInfos.length; j++) {
                    try {
                        if(!aBindings[i].getBindings &&
                            aBindingInfos[j].path === aBindings[i].getPath() && 
                            aBindings[i].getValue) {
                                aBindingInfos[j].value = aBindings[i].getValue();
                        } 
                        if(!aBindings[i].getBindings &&
                            aBindingInfos[j].path === aBindings[i].getPath() && 
                            aBindings[i].sInternalType) {
                                aBindingInfos[j].type = aBindings[i].sInternalType;
                        } else if(aBindings[i].getBindings){
                            this.retrieveCompositeBindings(aBindings[i], aBindingInfos);
                        }
                    } catch (error) {
                    }
                }
            }
        } else if(!oBinding.getBindings && aBindingInfos) {
            for (var j = 0; j < aBindingInfos.length; j++) {
                try {
                    if(aBindingInfos[j].path === oBinding.getPath() &&
                        oBinding.getValue) {
                        aBindingInfos[j].value = oBinding.getValue(); 
                    } 
                    if(aBindingInfos[j].path === oBinding.getPath() &&
                        oBinding.sInternalType) {
                            aBindingInfos[j].type = oBinding.sInternalType;
                    }
                } catch (error) {
                }
            }
        }
    }

    this.retrieverBindingPaths = function(oControl, sPropKey) {
        var aBindingInfos = [];
        var aBindingInfoParts = oControl.getBindingInfo(sPropKey).parts;
        try {
            if (aBindingInfoParts && aBindingInfoParts.length > 0) {
                for (var i = 0; i < aBindingInfoParts.length; i++) {
                    var sModel = "";
                    if (!aBindingInfoParts[i].path) continue;
                    if (aBindingInfoParts[i].model) sModel = aBindingInfoParts[i].model;
                    aBindingInfos.push({
                    model: sModel,
                    path: aBindingInfoParts[i].path,
                    value: "",
                    type: "",
                    });
                }
            } else {
                var sBindingDataStr = oControl.getBindingInfo(sPropKey).path;
                var sBindingDataModelStr = oControl.getBindingInfo(sPropKey).model;
                if (sBindingDataStr) {
                    aBindingInfos.push({
                        model: sBindingDataModelStr,
                        path: sBindingDataStr,
                        value: "",
                        type: ""
                    });
                }
            }
            // Get values
            if (oControl.getBinding && oControl.getBinding(sPropKey)) {
                var oBinding = oControl.getBinding(sPropKey);
                this.retrieveCompositeBindings(oBinding, aBindingInfos);
            } 
        } catch (error) {
            //Continue
            console.info(error);
        }
        return aBindingInfos;
    }

    this.getBindDataForAggregation = function(oControl, sPropKey) {
        var aAggregation = this.getControlAllAggregations(oControl);
        var aBindingInfos = [];
        try {
            if (aAggregation.hasOwnProperty(sPropKey)) {
                if(!oControl || !sPropKey
                    || !aAggregation.hasOwnProperty(sPropKey)
                    || !oControl.getBindingInfo
                    || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
                aBindingInfos = this.retrieverBindingPaths(oControl, sPropKey);
            }
        } catch(e) {
    // Do nothing
        }
        return aBindingInfos;
    }

    this.getBindDataForAssociation = function(oControl, sPropKey) {
        var aAssociation = this.getControlAllAssociations(oControl);
        var aBindingInfos = [];
        try {
            if (aAssociation.hasOwnProperty(sPropKey)) {
                if(!oControl || !sPropKey
                    || !aAssociation.hasOwnProperty(sPropKey)
                    || !oControl.getBindingInfo
                    || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
                aBindingInfos = this.retrieverBindingPaths(oControl, sPropKey);
            }
        } catch(e) {
    // Do nothing
        }
        return aBindingInfos;
    }

    this.getBindDataForProperty = function(oControl, sPropKey) {
        var aProperties = this.getControlAllProperties(oControl);
        var aBindingInfos = [];
        try {
            if (aProperties.hasOwnProperty(sPropKey)) {
                if(!oControl || !sPropKey
                    || !aProperties.hasOwnProperty(sPropKey)
                    || !oControl.getBindingInfo
                    || !oControl.getBindingInfo(sPropKey)) return aBindingInfos;
                    aBindingInfos = this.retrieverBindingPaths(oControl, sPropKey);
                }
        } catch(e) {
    // Do nothing
        }
        return aBindingInfos;
    }

    this.retrieveBindingProperties = function (oControl) {
        var elemProperties = [];

        var mProperties = this.getControlAllProperties(oControl);
        if(!mProperties) return elemProperties;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return elemProperties;

        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            let oBindingProp = {};
            oBindingProp[sPropName] = [];
            oBindingProp[sPropName] = this.getBindDataForProperty(oControl, sPropName);
            if(!this.isEmptyArray(oBindingProp[sPropName])){
                // Add Binding Path
                elemProperties.push(oBindingProp);
            }
        }
        return elemProperties;
    }

    this.retrieveAggregationBindingProperties = function(oControl) {
        var elemProperties = [];

        var mProperties = this.getControlAllAggregations(oControl);
        if(!mProperties) return elemProperties;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return elemProperties;

        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            let oBindingProp = {};
            oBindingProp[sPropName] = [];
            oBindingProp[sPropName] = this.getBindDataForAggregation(oControl, sPropName);
            if(!this.isEmptyArray(oBindingProp[sPropName])){
                // Add Binding Path
                elemProperties.push(oBindingProp);
            }
        }
        return elemProperties;
    }

    this.retrieveAssociationBindingProperties = function(oControl) {
        var elemProperties = [];

        var mProperties = this.getControlAllAssociations(oControl);
        if(!mProperties) return elemProperties;
        
        var aPropertiesKeys = Object.keys(mProperties);
        if(aPropertiesKeys && 
            aPropertiesKeys.length <= 0) return elemProperties;

        for (let index = 0; index < aPropertiesKeys.length; index++) {
            const sPropName = aPropertiesKeys[index];
            let oBindingProp = {};
            oBindingProp[sPropName] = [];
            oBindingProp[sPropName] = this.getBindDataForAssociation(oControl, sPropName);
            if(!this.isEmptyArray(oBindingProp[sPropName])){
                // Add Binding Path
                elemProperties.push(oBindingProp);
            }
        }
        return elemProperties;
    }

    this.retrieveUI5BindingProperties = function(oControl) {
        // Get all binding properties
        var bindProps = this.retrieveBindingProperties(oControl);

        // Get all aggregation properties
        var bindAggregProps = this.retrieveAggregationBindingProperties(oControl);

        // Get all associations properties
        var bindAssocProps = this.retrieveAssociationBindingProperties(oControl);

        return [].concat(bindProps).concat(bindAggregProps).concat(bindAssocProps);

    }

    this.retrieveUI5Properties = function(oControl) {
        var elemProperties = [];
        elemProperties.push({
            'id': oControl.getId()
        });
        
        
        // Get View & component name [TODO: fragment?]
        this.addViewForControl(oControl, elemProperties);
        // Get control properties
        this.addControlProperties(oControl, elemProperties);
        // Get aggregation properties
        this.addControlAggregation(oControl, elemProperties);
        // Get association properties
        this.addAssociationProperty(oControl, elemProperties);

        return elemProperties;
    }

    this.retrieveControlType = function(oControl) {
        var elemProperties = [];
        elemProperties.push({
            'metadata': oControl.getMetadata().getName()
        });
        return elemProperties;
    }

    this.generateAllControlSelectorById = function(sControlId) {
        var sapBody = document.getElementsByClassName('sapUiBody');
        if(!sapBody || !sapBody[0]) {
            throw new Error('No body found')
        }
        var oControl = sap.ui.getCore().byId(sControlId);
        return this.generateAllControlSelector(oControl);
    }

    this.generateAllControlSelector = function(oControl) {
        var elemUI5Properties = [];
        var domProperties = [];
        var elemBindingProperties = [];
        var elemBindingContextsPath = [];
        var elemControlType = [];
        if(!oControl) return null;
        var oNode = document.getElementById(oControl.getId());
        // Get all selectors properties
        domProperties = this.retrieveDomProperties(oNode);
        elemUI5Properties = this.retrieveUI5Properties(oControl);
        elemBindingProperties = this.retrieveUI5BindingProperties(oControl);
        elemBindingContextsPath = this.retrieveBindingContextPath(oControl); 
        elemControlType =  this.retrieveControlType(oControl); 
        var propsCollection = {
            "domProperties": domProperties || [],
            "ui5Properties": elemUI5Properties || [],
            "bindingContextPath": elemBindingContextsPath || [],
            "bindingPropertyPaths": elemBindingProperties || [],
            "metadata": elemControlType || []
        }
        return propsCollection;
    }

    this.getAllElementProperties = function(sControlId) {
        return this.generateAllControlSelectorById(sControlId);
    }

    this.getValidParentControl = function(oControl) {
        if (!oControl || !oControl.getId || !oControl.getId()) return null;
        var oParentControl = null;
        var domElem = document.getElementById(oControl.getId());
        if (!domElem) return null;
        var domParent = domElem.parentElement;
        for (;;) {
            if (!domParent) return null;
            var nodeId = domParent.getAttribute("id");
            if (nodeId) {
            // eslint-disable-next-line no-undef
            oParentControl = sap.ui.getCore().byId(nodeId);
            if (oParentControl) {
                /*console.log("Candidate Parent Property Control Type -->"
                + oParentControl.getMetadata().getName()
                + ", Id-->" + oParentControl.getId());*/
                return oParentControl;
            }
            }
            domParent = domParent.parentElement;
        }
    }

    this.findNextAncestor = function(oControl) {
        if(oControl) {
            return this.getValidParentControl(oControl);
        }
    };

    this.findNextAncestorByControlId = function(sControlId) {
        var oControl = sap.ui.getCore().byId(sControlId);
        return this.findNextAncestor(oControl);
    };

    this.getNextAncestorProperties = function(sControlId) {
        var oParentControl = this.findNextAncestorByControlId(sControlId);
        return this.generateAllControlSelector(oParentControl);
    }

    this.retrieveValidUI5ControlsSubElements = function(nodes, aCandidateControls, iMaxCtrl) {
        if (!nodes || nodes.length === 0) {
            //console.log('no node html elements found');
        return aCandidateControls;
        }
        var that = this;
        Array.prototype.filter.call(nodes, function(node) {
            //console.log("node -->" + node);
        var nodeId = node.getAttribute("id");
        if (!nodeId) {
            var childNod = node.children;
            //console.log("Number of child elements-->"+ childNod.length);
            if (!childNod) return false;
            Array.prototype.filter.call(childNod, function(chNode) {
            var chNodeId = chNode.getAttribute("id");
            if (chNodeId) {
                // eslint-disable-next-line no-undef
                var oControl = sap.ui.getCore().byId(chNodeId);
                if (oControl) {
                    //console.log("Control pushed-->"+ oControl.getId());
                aCandidateControls.push(oControl);
                } else {
                    //console.log("Im in else iterate 1");
                that.retrieveValidUI5ControlsSubElements(chNode.children, aCandidateControls);
                return false;
                }
            } else {
                //console.log("Im in else iterate 2");
                that.retrieveValidUI5ControlsSubElements(chNode.children, aCandidateControls);
                return false;
            }
            });
        } else {
            // eslint-disable-next-line no-undef
            var oControl = sap.ui.getCore().byId(nodeId);
            if (oControl) {
                //console.log("Control pushed-->" + oControl.getId());
                //console.log("Control pushed-->"+ oControl.getId());
                
            aCandidateControls.push(oControl);
            } else {
                //console.log("Im in else iterate 3 -->" + node.children.length);
            that.retrieveValidUI5ControlsSubElements(node.children, aCandidateControls);
            return false;
            }
        }
        return oControl;
        });
        return aCandidateControls;
    }

    this.getAllDescendantElementsProps = function(sControlId) {
        let oControl = document.getElementById(sControlId);
        var aPropsForAllDescentants = [];
        var aCandidateControls = [];
        var aValidControls = [];
        if(!oControl) { return aPropsForAllDescentants; }
        var aAllChildrenNodes = oControl.children;
        aValidControls = this.retrieveValidUI5ControlsSubElements(aAllChildrenNodes, aCandidateControls);
        if (!aValidControls || aValidControls.length === 0) return null;
        
        for (let index = 0; index < aValidControls.length; index++) {
            const oControl = aValidControls[index];
            aPropsForAllDescentants.push({
                "id": oControl.getId(),
                "properties": this.generateAllControlSelector(oControl)
            });
        }
        return aPropsForAllDescentants;
    }

    this.findSiblingControls = function(oControl, oParentControl, iMaxCtrl) {
        var aValidControls = [];
        var aCandidateControls = [];
        if (!oControl || !oControl.getId || !oControl.getId()) return null;
        if (!oParentControl.getId ||!oParentControl.getId()) return null;
        var sParentId = oParentControl.getId();
        var aAllSiblingNodes = document.getElementById(sParentId).children;
        aValidControls = this.retrieveValidUI5ControlsSubElements(aAllSiblingNodes, aCandidateControls);
        if (!aValidControls || aValidControls.length === 0) return null;
        var oControlIndx = aValidControls.findIndex(function(element) {
        return element.getId() === oControl.getId();
        }); 
        if (oControlIndx === -1) { throw new Error("Something is very wrong with prev/next control finder"); }
        else {
        let aValidSmallControlPortion = [];    
        aValidControls.splice(oControlIndx, 1);
        if(iMaxCtrl && aValidControls.length > iMaxCtrl) {
            aValidSmallControlPortion = aValidSmallControlPortion.concat(aValidControls.splice(0, iMaxCtrl));
        } else {
            aValidSmallControlPortion = aValidControls;
        }
        return aValidSmallControlPortion;
        }
    }

    this.getAllSiblingProperties = function(sControlId, iMaxCtrl) {
        var allSiblingsProps = [];
        var allSblControls = [];
        var oParentControl = this.findNextAncestorByControlId(sControlId);
        var oControl = sap.ui.getCore().byId(sControlId);
        if (oControl && oParentControl) {
            allSblControls = this.findSiblingControls(oControl, oParentControl, iMaxCtrl);
        }
        if (!allSblControls || allSblControls.length === 0) return null;
        for (let index = 0; index < allSblControls.length; index++) {
            const oCandControl = allSblControls[index];
            allSiblingsProps.push({
                "id": oCandControl.getId(),
                "properties": this.generateAllControlSelector(oCandControl)
            });
        }
        return allSiblingsProps;
    }
};
window.QmateUtilities = new QmateUtil();
module.exports = window.QmateUtilities;
},{"./jaroWinBundle.js":1}],4:[function(require,module,exports){

var QueryBuilder = function() {
    this.buildSelector = function(statement, propsType, existingSelector, parentPropsType, parentLevel) {
        var newSelectorCompl = {};
        if(existingSelector) {
            Object.assign(newSelectorCompl, existingSelector);
        } else {
            newSelectorCompl = {};
        }
        //Reset values
        if(statement && propsType) {
            // Lookup keys of statements
            let keys = Object.keys(statement);
            let oSelectProps = {};
            if(keys && keys.length > 0){
                for (let index = 0; index < keys.length; index++) {
                    let oKey = keys[index];
                    if(oKey === "bindingPropertyPaths"){
                        let mBindingPaths = statement[oKey];
                        let aBindPropKeys = Object.keys(mBindingPaths);
                        for (let index = 0; index < aBindPropKeys.length; index++) {
                            let bindKey = aBindPropKeys[index];
                            let aValues = mBindingPaths[bindKey];
                            let path = "";
                            let aBinds = []
                            for (let j = 0; j < aValues.length; j++) {
                                const oPath = aValues[j];
                                if(oPath.model && oPath.path) path = oPath.model + ">" + oPath.path;
                                else path = oPath.path;
                                aBinds.push({"path": path})
                            }
                            oSelectProps[bindKey] = aBinds; 
                        } 
                    } else if(statement[oKey] && statement[oKey] !== null && statement[oKey] !== undefined
                        || (statement[oKey] && Array.isArray(statement[oKey]) && statement[oKey].length > 0)){
                     oSelectProps[oKey] = statement[oKey];
                    }
                }
            }
            if(parentPropsType) {
                if(!parentLevel) {
                    newSelectorCompl[parentPropsType][propsType] = oSelectProps;
                } else {
                    let selectorLevel = newSelectorCompl[parentPropsType];
                    for (let index = 0; index < parentLevel - 1; index++) {
                        selectorLevel = selectorLevel[parentPropsType];
                    }
                    selectorLevel[propsType] = oSelectProps;
                }
                
            } else {
                newSelectorCompl[propsType] = oSelectProps;
            }
        }
        return newSelectorCompl;
    }
};
window.QueryBuilder = new QueryBuilder();
module.exports = new QueryBuilder();
},{}],5:[function(require,module,exports){
var qmateUtil = require('./qmateUtil');
var ui5All = require('./qmateLocator');
var queryBuilder = require('./queryBuilder');
var deepExtend = require('deep-extend');
var Evaluator = function() {
    this.evaluateBindingContextPath = function(sBindingContextPathVal) {
        var sBinding = sBindingContextPathVal;
        if(sBindingContextPathVal) {
            let aSplBPathAll = []; 
            let aSplBPath = sBindingContextPathVal.split(","); 
            for (let index = 0; index < aSplBPath.length; index++) {
                let sPart = aSplBPath[index];
                let aRest = sPart.split("(");
                if(aRest) {
                    for (let index = 0; index < aRest.length; index++) {
                        const sStr = aRest[index];
                        aSplBPathAll.push(sStr);
                    }
                }
            }
            if(aSplBPathAll && aSplBPathAll.length > 0){
                let aUsedPart = [];
                for (let index = 0; index < aSplBPathAll.length; index++) {
                    let sPart = aSplBPathAll[index];
                    if(sPart.indexOf("guid") === -1 && 
                        sPart.indexOf("true") === -1 &&
                        sPart.indexOf("false") === -1 &&
                        sPart.indexOf("'true'") === -1 &&
                        sPart.indexOf("'false'") === -1) {
                            aUsedPart.push(sPart);
                            if(index < aSplBPathAll.length -1) {
                                aUsedPart.push("*");
                            }
                        }
                }
                if(aUsedPart){
                    sBinding = "";
                    for (let index = 0; index < aUsedPart.length; index++) {
                        sBinding = sBinding + aUsedPart[index];
                    }
                }
            }
        }
        return sBinding;
    }

    this.filterBindingProperties = function(aBindingPropertiesPaths, aExludeProps, aExclPatterns, aExclTypes, aPrefProperties) {
        aBindingProps = {};
        if(aBindingPropertiesPaths && aBindingPropertiesPaths.length > 0) {
            for (let index = 0; index < aBindingPropertiesPaths.length; index++) {
                const oPropObj = aBindingPropertiesPaths[index];
                const key = Object.keys(oPropObj)[0];
                const aValues = oPropObj[key];
                // Exclude props
                let mustExcl = false;
                if(aExludeProps) {
                    for (let i = 0; i < aExludeProps.length; i++) {
                        const exProp = aExludeProps[i];
                        if(exProp && key){
                            const exPropLow = exProp.toLocaleLowerCase();
                            const keyLow = key.toLocaleLowerCase();
                            if(keyLow === exPropLow) {
                                mustExcl = true;
                                break;
                            }
                        }  
                    }
                } 
                if(!mustExcl) {
                    let aBindFiltCand = {};
                    let aValCand = [];
                    if(aExclPatterns) {
                        for (let i = 0; i < aValues.length; i++) {
                            const oValue = aValues[i];
                            const bindPath = oValue.path;
                            let bIsExPattern = false;
                            for (let j = 0; j < aExclPatterns.length; j++) {
                                const exPatern = aExclPatterns[j]; 
                                if(exPatern && bindPath) {
                                    if(bindPath.toLocaleLowerCase().indexOf(exPatern) !== -1){
                                        bIsExPattern = true;
                                        break;
                                    }
                                }
                            }
                            if(!bIsExPattern) {
                                aValCand.push(oValue);
                            }
                        }
                        if(aValCand.length > 0) {
                            aBindFiltCand[key] = aValCand;
                        }
                    } else {
                        aBindFiltCand[key] = aValues;
                    }

                    if(aExclTypes) {
                        let aValCand2 = [];
                        if(aBindFiltCand && aBindFiltCand[key]){
                            for (let i = 0; i < aBindFiltCand[key].length; i++) {
                                const oValue = aBindFiltCand[key][i];
                                const bindType = oValue.type;
                                let bIsExType = false;
                                for (let j = 0; j < aExclTypes.length; j++) {
                                    const exType = aExclTypes[j]; 
                                    if(exType && bindType) {
                                        if(bindType.indexOf(exType) !== -1){
                                            bIsExType = true;
                                            break;
                                        }
                                    }
                                }
                                if(!bIsExType) {
                                    aValCand2.push(oValue);
                                }
                            }
                        }
                        if(aValCand2.length > 0) {
                            aBindingProps[key] = aValCand2;
                        }
                    } else {
                        aBindingProps[key] = aBindFiltCand[key];
                    }
                } 
            }
        }
        if(aPrefProperties && aPrefProperties.length > 0 && aBindingProps){
            // Filtered bindingProp
            let aBindFilteredProp = {}; 
            let aKeys = Object.keys(aBindingProps);
            //Filter only preferable
            for (let index = 0; index < aKeys.length; index++) {
                const sKey = aKeys[index];
                if(aPrefProperties.includes(sKey)){
                    aBindFilteredProp[sKey] = aBindingProps[sKey];
                    return aBindFilteredProp;
                }
            }
            // Default Filtered bindingProp
            aBindFilteredProp1 = {};
            //Filter only preferable first i18n
            for (let index = 0; index < aKeys.length; index++) {
                const sKey = aKeys[index];
                if(aBindingProps[sKey]){
                    let aValues = aBindingProps[sKey];
                   for (let i = 0; i < aValues.length; i++) {
                       const binding = aValues[i];
                       if(binding && binding.model &&
                        binding.model.indexOf("i18") !== -1){
                            aBindFilteredProp1[sKey] = aValues;
                            return aBindFilteredProp1;
                        }
                   }
                }
            }

            //Fallback
            let aBindFilteredProp2 = {};
            if(aKeys && aKeys.length > 0) {
                aBindFilteredProp2[aKeys[0]] = aBindingProps[aKeys[0]];
                return aBindFilteredProp2;
            }
        }
        return aBindingProps;
    }

    this.wildCardIdsViewName = function(id, viewId, compId) {
        let elmId = id;
        if(elmId && (viewId || compId)) {
            if(viewId && elmId.indexOf(viewId) !== -1){
                elmId = id.replace(viewId, "");
            }
            if(compId && elmId.indexOf(compId) !== -1){
                elmId = id.replace(compId, "");
            }
            if(elmId) {
                // Remove ---
                if(elmId.indexOf("-") === 0) {
                    elmId = elmId.replace("-", "");
                }
                if(elmId.indexOf("-") === 0) {
                    elmId = elmId.replace("-", "");
                }
                if(elmId.indexOf("-") === 0) {
                    elmId = elmId.replace("-", "");
                }
                // Remove ::
                if(elmId.indexOf(":") === 0) {
                    elmId = elmId.replace(":", "");
                }
                if(elmId.indexOf(":") === 0) {
                    elmId = elmId.replace(":", "");
                }
                // Remove .
                if(elmId.indexOf(".") === 0) {
                    elmId = elmId.replace(".", "");
                }
                // Remove ,
                if(elmId.indexOf(",") === 0) {
                    elmId = elmId.replace(",", "");
                }
                if(id !== elmId) {
                    elmId = "*" + elmId
                }

            }
        }
        return elmId;
    }

    this.evalElementProperties = function(oElemProperties, isAggregation) {
        if(isAggregation){
            var includedFields = {};
        var finalFields = {};
        var aFoundNodes = [];
        var selector = null;
        var finalSelector= null;
        var dist = 99;
        var finalDist = 999;
        if(!oElemProperties) return {};
        // Add view Name if exists
        const viewName = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewName");
        const id = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
        if(viewName) {
            includedFields["viewName"] = viewName;
        }
        includedFields["metadata"] = oElemProperties.metadata[0].metadata;

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes &&  dist === 0) {
                // Success
                return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Evaluate bindingContextPath
        let bindingContextPath = null;
        if(oElemProperties.bindingContextPath && oElemProperties.bindingContextPath.length > 0) {
            // Remove empty, guid, and booleans
            bindingContextPath = this.evaluateBindingContextPath(oElemProperties.bindingContextPath[0].bindingContextPath);
            if(bindingContextPath) {
                includedFields["bindingContextPath"] = bindingContextPath;
            }
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes &&  dist === 0) {
                // Success
                return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Add bindingProperties [priority i18n!! and title, text, value, and low enabled, editable uxfc/ _fc or fc_ fields,]
        const exclProps = ["mandatory","editable", "visible", "enabled"];
        const aExclTypes = ["boolean", "sap.m.ListMode"];
        const exclPaterns = ["uxfc", "_fc", "fc_"];
        const prefProps = ["value", "text", "tooltip", "title","items"];
        includedFields["bindingPropertyPaths"] = this.filterBindingProperties(oElemProperties.bindingPropertyPaths, exclProps, exclPaterns, aExclTypes, prefProps);
        

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes && dist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        const labelForId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "labelFor");
        if(labelForId){
            if(!qmateUtil.isIdGeneric(labelForId)) {
                const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                includedFields["labelFor"] = this.wildCardIdsViewName(labelForId, viewId, compId);
                }  
        }

        const ariaLabelledBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaLabelledBy");
        if(ariaLabelledBy && ariaLabelledBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaLabelledBy.length; index++) {
                const elemId = ariaLabelledBy[index];
                if(!qmateUtil.isIdGeneric(elemId)) {
                    if(!includedFields["ariaLabelledBy"]) includedFields["ariaLabelledBy"] = [];
                    includedFields["ariaLabelledBy"].push(this.wildCardIdsViewName(elemId, viewId, compId));
                    }   
            }
        }

        const ariaDescribedBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaDescribedBy");
        if(ariaDescribedBy && ariaDescribedBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaDescribedBy.length; index++) {
                const elemId = ariaDescribedBy[index];
                if(!qmateUtil.isIdGeneric(elemId)) {
                    if(!includedFields["ariaDescribedBy"]) includedFields["ariaDescribedBy"] = [];
                    includedFields["ariaDescribedBy"].push(this.wildCardIdsViewName(elemId, viewId, compId));
                    }   
            }
        }

        const icon = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "icon");
        if(icon){
            includedFields["icon"] = icon;
        }

        const src = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "src");
        if(src){
            includedFields["src"] = src;
        }

        if(Object.keys(includedFields).length > 0) {
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        let dist2 = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes && dist2 === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist2
            };
        }

        if(dist2 < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist2;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

          // Add id
          if(id) {
              if(!qmateUtil.isIdGeneric(id)) {
                  const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                  const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                  includedFields["id"] = this.wildCardIdsViewName(id, viewId, compId);
              }
          }

          if(Object.keys(includedFields).length > 0) {
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist2 = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes && dist2 === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist2
            };
        }

        if(dist2 < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist2;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        //Check UI5 properties [no boolean, null, undefined], preferable list [icon, tooltip, text, value, title], [string, number]
        // Check no UI5 property and binding property
        const prefUIProps = ["src", "icon", "value", "text", "tooltip", "title"];
        retObject = this.filterUIProperties(oElemProperties.ui5Properties, includedFields, finalSelector, prefUIProps, "elementProperties", null, finalDist, id);
        
        dist = retObject.distance;
        if(dist === 0) {
            // Success
            return retObject;
        } else {
            let fieldMp = includedFields;
            let aNods = aFoundNodes;
            if(dist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, retObject.selector);
                finalDist = dist;
                fieldMp = retObject.fieldsMap;
                aNods = retObject.aNodes;
            }

            // Didnt succeed
            return {
                "success": false,
                "fieldsMap": fieldMp,
                "selector": finalSelector,
                "aNodes": aNods,
                "distance": finalDist
            };
        }

        } else {
            var includedFields = {};
        var finalFields = {};
        var aFoundNodes = [];
        var selector = null;
        var finalSelector= null;
        var dist = 99;
        var finalDist = 999;
        if(!oElemProperties) return {};
        // Add view Name if exists
        const viewName = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewName");
        if(viewName) {
            includedFields["viewName"] = viewName;
        }
        includedFields["metadata"] = oElemProperties.metadata[0].metadata;

        // Add id
        const id = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
        if(id) {
            if(!qmateUtil.isIdGeneric(id)) {
                const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                includedFields["id"] = this.wildCardIdsViewName(id, viewId, compId);
            }
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes &&  dist === 0) {
                // Success
                return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Evaluate bindingContextPath
        let bindingContextPath = null;
        if(oElemProperties.bindingContextPath && oElemProperties.bindingContextPath.length > 0) {
            // Remove empty, guid, and booleans
            bindingContextPath = this.evaluateBindingContextPath(oElemProperties.bindingContextPath[0].bindingContextPath);
            if(bindingContextPath) {
                includedFields["bindingContextPath"] = bindingContextPath;
            }
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes &&  dist === 0) {
                // Success
                return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Add bindingProperties [priority i18n!! and title, text, value, and low enabled, editable uxfc/ _fc or fc_ fields,]
        const exclProps = ["mandatory","editable", "visible", "enabled"];
        const aExclTypes = ["boolean", "sap.m.ListMode"];
        const exclPaterns = ["uxfc", "_fc", "fc_"];
        const prefProps = ["value", "text", "tooltip", "title","items"];
        includedFields["bindingPropertyPaths"] = this.filterBindingProperties(oElemProperties.bindingPropertyPaths, exclProps, exclPaterns, aExclTypes, prefProps);
        

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        dist = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes && dist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist
            };
        }

        if(dist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        const labelForId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "labelFor");
        if(labelForId){
            if(!qmateUtil.isIdGeneric(labelForId)) {
                const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                includedFields["labelFor"] = this.wildCardIdsViewName(labelForId, viewId, compId);
                }  
        }

        const ariaLabelledBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaLabelledBy");
        if(ariaLabelledBy && ariaLabelledBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaLabelledBy.length; index++) {
                const elemId = ariaLabelledBy[index];
                if(!qmateUtil.isIdGeneric(elemId)) {
                    if(!includedFields["ariaLabelledBy"]) includedFields["ariaLabelledBy"] = [];
                    includedFields["ariaLabelledBy"].push(this.wildCardIdsViewName(elemId, viewId, compId));
                    }   
            }
        }

        const ariaDescribedBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaDescribedBy");
        if(ariaDescribedBy && ariaDescribedBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaDescribedBy.length; index++) {
                const elemId = ariaDescribedBy[index];
                if(!qmateUtil.isIdGeneric(elemId)) {
                    if(!includedFields["ariaDescribedBy"]) includedFields["ariaDescribedBy"] = [];
                    includedFields["ariaDescribedBy"].push(this.wildCardIdsViewName(elemId, viewId, compId));
                    }   
            }
        }

        const icon = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "icon");
        if(icon){
            includedFields["icon"] = icon;
        }

        const src = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "src");
        if(src){
            includedFields["src"] = src;
        }

        if(Object.keys(includedFields).length > 0) {
            selector = queryBuilder.buildSelector(includedFields, "elementProperties");
            aFoundNodes = ui5All(selector);
        }

        let dist2 = qmateUtil.distanceNode(aFoundNodes, id);
        if(aFoundNodes && dist2 === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": dist2
            };
        }

        if(dist2 < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = dist2;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        //Check UI5 properties [no boolean, null, undefined], preferable list [icon, tooltip, text, value, title], [string, number]
        // Check no UI5 property and binding property
        const prefUIProps = ["src", "icon", "value", "text", "tooltip", "title"];
        retObject = this.filterUIProperties(oElemProperties.ui5Properties, includedFields, finalSelector, prefUIProps, "elementProperties", null, finalDist, id);
        
        dist = retObject.distance;
        if(dist === 0) {
            // Success
            return retObject;
        } else {
            let fieldMp = includedFields;
            let aNods = aFoundNodes;
            if(dist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, retObject.selector);
                finalDist = dist;
                fieldMp = retObject.fieldsMap;
                aNods = retObject.aNodes;
            }

            // Didnt succeed
            return {
                "success": false,
                "fieldsMap": fieldMp,
                "selector": finalSelector,
                "aNodes": aNods,
                "distance": finalDist
            };
        }
        }
    }

    this.filterUIProperties = function(ui5Properties, includedFields, oSelector, prefProps, propLevel, parentPropType, distance, id, parentLevel) {
        let addFields = {};
        let selector = {};
        if(!distance)  distance = 99;
        if(ui5Properties) {
            const viewId = qmateUtil.getKeyValue(ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(ui5Properties, "componentId");
            Object.assign(addFields, includedFields);
            let uiSanProps = [];
            for (let index = 0; index < ui5Properties.length; index++) {
                let uiProp = ui5Properties[index];
                let uiPropKey = Object.keys(uiProp)[0];
                let valUIProp = uiProp[uiPropKey];
                let bSameAsPropBind = false;
                // Filter out props used as bindingProperties
                if(addFields["bindingPropertyPaths"]){
                    let mBindingPaths = addFields["bindingPropertyPaths"];
                    let aBindPropKeys = Object.keys(mBindingPaths);
                    for (let i = 0; i < aBindPropKeys.length; i++) {
                        let bindKey = aBindPropKeys[i];
                        if(bindKey === uiPropKey) {
                            bSameAsPropBind = true;
                            break;
                        }
                    }
                }
                //if(!bSameAsPropBind) {
                    //Check for boolean null undefined
                    if(valUIProp !== null && 
                        valUIProp !== undefined && 
                        //!qmateUtil.isBoolean(valUIProp) &&
                        //valUIProp !== "false" && valUIProp !== "true" && 
                        uiPropKey !== "id" &&
                        uiPropKey !== "ariaDescribedBy" &&
                        uiPropKey !== "selectedItemId" &&
                        uiPropKey !== "labelFor" &&
                        uiPropKey !== "icon" &&
                        uiPropKey !== "src" &&
                        uiPropKey !== "ariaLabelledBy" &&
                        uiPropKey !== "selectedItems" &&
                        uiPropKey !== "viewId" &&
                        uiPropKey !== "viewName" &&
                        uiPropKey !== "componentId") {
                        uiSanProps.push(uiProp);
                    }
                //}
                
            }
            // Test with prefProps
            if(uiSanProps && uiSanProps.length > 0) {
                let setFields = {};
                Object.assign(setFields, includedFields);
                for (let index = 0; index < uiSanProps.length; index++) {
                    let uiProp = uiSanProps[index];
                    if(prefProps) {
                        for (let i = 0; i < prefProps.length; i++) {
                            const key = prefProps[i];
                            if(uiProp[key] !== null && uiProp[key] !== undefined) {
                                let valUIProp = uiProp[key];
                                if(valUIProp !== null && valUIProp !== undefined) {
                                    if(!qmateUtil.isString(valUIProp)) {
                                        setFields[key] = valUIProp.toString();
                                    } else {
                                        setFields[key] = valUIProp;
                                    }
                                }
                                selector = queryBuilder.buildSelector(setFields, propLevel, oSelector, parentPropType, parentLevel);
                                let aFoundNodes = ui5All(selector);
                                let distance1 = qmateUtil.distanceNode(aFoundNodes, id);
                                if(aFoundNodes && distance1 === 0) {
                                    // Success
                                    return {
                                        "success": true,
                                        "selector": selector,
                                        "aNodes": aFoundNodes,
                                        "distance": distance1
                                    };
                                } else {
                                    if(distance1 < distance) {
                                        distance = distance1;
                                        oSelector = {};
                                        Object.assign(oSelector,selector);
                                        includedFields = {};
                                        Object.assign(includedFields, setFields);
                                    } else {
                                        setFields = {};
                                        //If not improving reset
                                        Object.assign(setFields, includedFields);
                                    }
                                }
                            }   
                        }
                    } 
                }
                // Check again with rest strings
                let setFields2 = {};
                // Test with only string
                Object.assign(setFields2, includedFields);
                for (let index = 0; index < uiSanProps.length; index++) {
                    let uiProp = uiSanProps[index];
                    const key = Object.keys(uiProp)[0];
                    if(uiProp[key] !== null && uiProp[key] !== undefined) {
                        let valUIProp = uiProp[key];
                        //Check for generic ids
                        if(Array.isArray(valUIProp)){
                            let aNewValProp = [];
                            for (let i = 0; i < valUIProp.length; i++) {
                                const elemId = valUIProp[i];
                                if(valUIProp[i] !== null && valUIProp[i] !== undefined) {
                                    if(!qmateUtil.isString(valUIProp[i])) {
                                        elemId = valUIProp[i].toString();
                                    }
                                }
                                if(!qmateUtil.isIdGeneric(elemId)) {             
                                    aNewValProp.push(this.wildCardIdsViewName(elemId, viewId, compId));
                                }
                            }
                            setFields2[key] = aNewValProp;
                        } else {
                            let elm = valUIProp;
                            if(valUIProp !== null && valUIProp !== undefined) {
                                if(!qmateUtil.isString(valUIProp)) {
                                    elm = valUIProp.toString();
                                }
                            }
                            setFields2[key] = elm;
                        }
                        selector = queryBuilder.buildSelector(setFields2, propLevel, oSelector, parentPropType, parentLevel);
                        let aFoundNodes = ui5All(selector);
                        let distance1 = qmateUtil.distanceNode(aFoundNodes, id);
                        if(aFoundNodes && distance1 === 0) {
                            // Success
                            return {
                                "success": true,
                                "selector": selector,
                                "aNodes": aFoundNodes,
                                "distance": distance1
                            };
                        } else {
                            if(distance1 < distance) {
                                distance = distance1;
                                oSelector = {};
                                Object.assign(oSelector,selector);
                                includedFields = {};
                                Object.assign(includedFields, setFields2);
                            } else {
                                setFields2 = {};
                                //If not improving reset
                                Object.assign(setFields2, includedFields);
                            }
                        }   
                    } 
                }
                // Didnt succeed
                return {
                    "success": false,
                    "fieldsMap": includedFields,
                    "selector": oSelector,
                    "aNodes": [],
                    "distance": distance
                }
            }
        }
         // Didnt succeed
         return {
            "success": false,
            "fieldsMap": includedFields,
            "selector": oSelector,
            "aNodes": [],
            "distance": distance
        }
    }

    this.getElementImportantProps = function(oElemProperties, existingFields, propType, elemId, dist) {
        if(!oElemProperties) return null;
        var includedFields = {};
        var finalFields = {};
        var selector = {};
        var finalSelector= null;
        var finalDist = dist || 999;
        var elemDist = 99;

        includedFields["metadata"] = oElemProperties.metadata[0].metadata;
        // Add view Name if exists
        const viewName = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewName");
        if(viewName) {
            includedFields["viewName"] = viewName;
        }

        
         // Add id
         const id = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
         const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
         const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
         if(id) {
             if(!qmateUtil.isIdGeneric(id)) {
                 includedFields["id"] = this.wildCardIdsViewName(id, viewId, compId);
             }
         }

         if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(existingFields, "elementProperties");
            if(selector.elementProperties){
                selector = queryBuilder.buildSelector(includedFields, propType, selector);
            }
            aFoundNodes = ui5All(selector);
        }
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Evaluate bindingContextPath
        let bindingContextPath = null;
        if(oElemProperties.bindingContextPath && oElemProperties.bindingContextPath.length > 0) {
            // Remove empty, guid, and booleans
            bindingContextPath = this.evaluateBindingContextPath(oElemProperties.bindingContextPath[0].bindingContextPath);
            if(bindingContextPath) {
                includedFields["bindingContextPath"] = bindingContextPath;
            }
            if(Object.keys(includedFields).length > 0) {
                // If bindingContextPath & at least one bindingProperty (test ui5All)
                selector = queryBuilder.buildSelector(existingFields, "elementProperties");
                if(selector.elementProperties){
                    selector = queryBuilder.buildSelector(includedFields, propType, selector);
                }
                aFoundNodes = ui5All(selector);
            }
            
            elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
            if(aFoundNodes &&  elemDist === 0) {
                // Success
                return {
                    "success": true,
                    "selector": selector,
                    "aNodes": aFoundNodes,
                    "fieldsMap": includedFields,
                    "distance": elemDist
                };
            }
    
            if(elemDist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, selector);
                finalDist = elemDist;
                finalFields = {};
                Object.assign(finalFields, includedFields);
            } else {
                includedFields = {};
                Object.assign(includedFields, finalFields);
            }
        }

        // Add bindingProperties [priority i18n!! and title, text, value, and low enabled, editable uxfc/ _fc or fc_ fields,]
        const exclProps = ["mandatory","editable", "visible", "enabled"];
        const aExclTypes = ["boolean", "sap.m.ListMode"];
        const exclPaterns = ["uxfc", "_fc", "fc_"];
        const prefProps = ["value", "text", "tooltip", "title","items"];
        includedFields["bindingPropertyPaths"] = this.filterBindingProperties(oElemProperties.bindingPropertyPaths, exclProps, exclPaterns, aExclTypes, prefProps);
        

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(existingFields, "elementProperties");
            if(selector.elementProperties){
                selector = queryBuilder.buildSelector(includedFields, propType, selector);
            }
            aFoundNodes = ui5All(selector);
        }
        
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        const labelForId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "labelFor");
        if(labelForId){
            if(!qmateUtil.isIdGeneric(labelForId)) {
                const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                includedFields["labelFor"] = this.wildCardIdsViewName(labelForId, viewId, compId);
             }  
        }

        const ariaLabelledBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaLabelledBy");
        if(ariaLabelledBy && ariaLabelledBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaLabelledBy.length; index++) {
                const elemId2 = ariaLabelledBy[index];
                if(!qmateUtil.isIdGeneric(elemId2)) {
                    if(!includedFields["ariaLabelledBy"]) includedFields["ariaLabelledBy"] = [];
                    includedFields["ariaLabelledBy"].push(this.wildCardIdsViewName(elemId2, viewId, compId));
                 }   
            }
        }

        const ariaDescribedBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaDescribedBy");
        if(ariaDescribedBy && ariaDescribedBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaDescribedBy.length; index++) {
                const elemId2 = ariaDescribedBy[index];
                if(!qmateUtil.isIdGeneric(elemId2)) {
                    if(!includedFields["ariaDescribedBy"]) includedFields["ariaDescribedBy"] = [];
                    includedFields["ariaDescribedBy"].push(this.wildCardIdsViewName(elemId2, viewId, compId));
                 }   
            }
        }

        const icon = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "icon");
        if(icon){
            includedFields["icon"] = icon;
        }

        const src = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "src");
        if(src){
            includedFields["src"] = src;
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(existingFields, "elementProperties");
            if(selector.elementProperties){
                selector = queryBuilder.buildSelector(includedFields, propType, selector);
            }
            aFoundNodes = ui5All(selector);
        }
        
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        //Check UI5 properties [no boolean, null, undefined], preferable list [icon, tooltip, text, value, title], [string, number]
        // Check no UI5 property and binding property
        const prefUIProps = ["src", "icon", "value", "text", "tooltip", "title"];
        retObject = this.filterUIProperties(oElemProperties.ui5Properties, includedFields, finalSelector, prefUIProps, propType, null, finalDist, elemId);
        
        elemDist = retObject.distance;
        if(elemDist === 0) {
            // Success
            return retObject;
        } else {
            let fieldMp = includedFields;
            let aNods = aFoundNodes;
            if(elemDist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, retObject.selector);
                finalDist = elemDist;
                fieldMp = retObject.fieldsMap;
                aNods = retObject.aNodes;
            }

            // Didnt succeed
            return {
                "success": false,
                "fieldsMap": fieldMp,
                "selector": finalSelector,
                "aNodes": aNods,
                "distance": finalDist
            };
        }
    }

    this.getElementNestedImportantProps = function(oElemProperties, oSelector, propType, parentPropType, elemId, parentLevel, dist) {
        if(!oElemProperties) return null;
        var includedFields = {};
        var finalFields = {};
        var selector = {};
        var finalSelector= null;
        var finalDist = dist || 999;
        var elemDist = 99;
        // Add view Name if exists
        const viewName = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewName");
        if(viewName) {
            includedFields["viewName"] = viewName;
        }

        includedFields["metadata"] = oElemProperties.metadata[0].metadata;
        // Add id
        const id = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
        const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
        const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
        if(id) {
            if(!qmateUtil.isIdGeneric(id)) {
                includedFields["id"] = this.wildCardIdsViewName(id, viewId, compId);
            }
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, propType, oSelector, parentPropType, parentLevel);
            aFoundNodes = ui5All(selector);
        }
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        // Evaluate bindingContextPath
        let bindingContextPath = null;
        if(oElemProperties.bindingContextPath && oElemProperties.bindingContextPath.length > 0) {
            // Remove empty, guid, and booleans
            bindingContextPath = this.evaluateBindingContextPath(oElemProperties.bindingContextPath[0].bindingContextPath);
            if(bindingContextPath) {
                includedFields["bindingContextPath"] = bindingContextPath;
            }

            if(Object.keys(includedFields).length > 0) {
                // If bindingContextPath & at least one bindingProperty (test ui5All)
                selector = queryBuilder.buildSelector(includedFields, propType, oSelector, parentPropType, parentLevel);
                aFoundNodes = ui5All(selector);
            }
            elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
            if(aFoundNodes &&  elemDist === 0) {
                // Success
                return {
                    "success": true,
                    "selector": selector,
                    "aNodes": aFoundNodes,
                    "fieldsMap": includedFields,
                    "distance": elemDist
                };
            }
    
            if(elemDist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, selector);
                finalDist = elemDist;
                finalFields = {};
                Object.assign(finalFields, includedFields);
            } else {
                includedFields = {};
                Object.assign(includedFields, finalFields);
            }
        }

        // Add bindingProperties [priority i18n!! and title, text, value, and low enabled, editable uxfc/ _fc or fc_ fields,]
        const exclProps = ["mandatory","editable", "visible", "enabled"];
        const aExclTypes = ["boolean", "sap.m.ListMode"];
        const exclPaterns = ["uxfc", "_fc", "fc_"];
        const prefProps = ["value", "text", "tooltip", "title","items"];
        includedFields["bindingPropertyPaths"] = this.filterBindingProperties(oElemProperties.bindingPropertyPaths, exclProps, exclPaterns, aExclTypes, prefProps);

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, propType, oSelector, parentPropType, parentLevel);
            aFoundNodes = ui5All(selector);
        }
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        const labelForId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "labelFor");
        if(labelForId){
            if(!qmateUtil.isIdGeneric(labelForId)) {
                const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
                const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
                includedFields["labelFor"] = this.wildCardIdsViewName(labelForId, viewId, compId);
             }  
        }

        const ariaLabelledBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaLabelledBy");
        if(ariaLabelledBy && ariaLabelledBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaLabelledBy.length; index++) {
                const elemId2 = ariaLabelledBy[index];
                if(!qmateUtil.isIdGeneric(elemId2)) {
                    if(!includedFields["ariaLabelledBy"]) includedFields["ariaLabelledBy"] = [];
                    includedFields["ariaLabelledBy"].push(this.wildCardIdsViewName(elemId2, viewId, compId));
                 }   
            }
        }

        const ariaDescribedBy = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "ariaDescribedBy");
        if(ariaDescribedBy && ariaDescribedBy.length > 0){
            const viewId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "viewId");
            const compId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "componentId");
            for (let index = 0; index < ariaDescribedBy.length; index++) {
                const elemId2 = ariaDescribedBy[index];
                if(!qmateUtil.isIdGeneric(elemId2)) {
                    if(!includedFields["ariaDescribedBy"]) includedFields["ariaDescribedBy"] = [];
                    includedFields["ariaDescribedBy"].push(this.wildCardIdsViewName(elemId2, viewId, compId));
                 }   
            }
        }

        const icon = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "icon");
        if(icon){
            includedFields["icon"] = icon;
        }

        const src = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "src");
        if(src){
            includedFields["src"] = src;
        }

        if(Object.keys(includedFields).length > 0) {
            // If bindingContextPath & at least one bindingProperty (test ui5All)
            selector = queryBuilder.buildSelector(includedFields, propType, oSelector, parentPropType, parentLevel);
            aFoundNodes = ui5All(selector);
        }
        elemDist = qmateUtil.distanceNode(aFoundNodes, elemId);
        if(aFoundNodes &&  elemDist === 0) {
            // Success
            return {
                "success": true,
                "selector": selector,
                "aNodes": aFoundNodes,
                "fieldsMap": includedFields,
                "distance": elemDist
            };
        }

        if(elemDist < finalDist){
            finalSelector={};
            Object.assign(finalSelector, selector);
            finalDist = elemDist;
            finalFields = {};
            Object.assign(finalFields, includedFields);
        } else {
            includedFields = {};
            Object.assign(includedFields, finalFields);
        }

        //Check UI5 properties [no boolean, null, undefined], preferable list [icon, tooltip, text, value, title], [string, number]
        // Check no UI5 property and binding property
        const prefUIProps = ["src", "icon", "value", "text", "tooltip", "title"];
        retObject = this.filterUIProperties(oElemProperties.ui5Properties, includedFields, finalSelector, prefUIProps, propType, parentPropType, finalDist, elemId, parentLevel);

        elemDist = retObject.distance;
        if(elemDist === 0) {
            // Success
            return retObject;
        } else {
            let fieldMp = includedFields;
            let aNods = aFoundNodes;
            if(elemDist < finalDist){
                finalSelector={};
                Object.assign(finalSelector, retObject.selector);
                finalDist = elemDist;
                fieldMp = retObject.fieldsMap;
                aNods = retObject.aNodes;
            }

            // Didnt succeed
            return {
                "success": false,
                "fieldsMap": fieldMp,
                "selector": finalSelector,
                "aNodes": aNods,
                "distance": finalDist
            };
        }
    }

    this.selectorDist = {
        "success": false,
        "distance": 999,
        "fieldsMap": {},
        "selector": {},
        "aNodes": []
    };

    this.exploreDescendantsRecurs = function(sControlId, aDescendentProps, enhancedFields, selector, parentType, parentLevel) {
        let oRes = {};
        let aIds = [];
        if(!aDescendentProps || aDescendentProps.length === 0) return this.selectorDist;
        for (let index = 0;  index < aDescendentProps.length; index++) {
            const descendantProps = aDescendentProps[index];
            // Element is under a aggregation element - try
            if(sControlId !== descendantProps["id"]){
                aIds.push(descendantProps["id"]);
                if(parentType) {
                    oRes = this.getElementNestedImportantProps(descendantProps["properties"], selector, "descendantProperties", parentType, sControlId, parentLevel);
                } else {
                    oRes = this.getElementImportantProps(descendantProps["properties"], enhancedFields, "descendantProperties", sControlId);
                }
                if(oRes.success) {
                    return oRes;
                }
                if(oRes.distance < this.selectorDist.distance) {
                    this.selectorDist.distance = oRes.distance;
                    this.selectorDist.selector = oRes.selector;
                    this.selectorDist.fieldsMap = oRes.fieldsMap;
                    this.selectorDist.aNodes = oRes.aNodes;
                }
            }  
        }
        if(aIds.length === 0) return this.selectorDist;
        let aPromises = [];
        var that = this;
        //Nothing found
        for (let index = 0; index < aIds.length; index++) {
            const id = aIds[index];
            let aNewDescendentProps = qmateUtil.getAllDescendantElementsProps(id);
            aPromises.push(new Promise(function(res,rej){
                if(parentType) {
                    oRes = that.exploreDescendantsRecurs(sControlId, aNewDescendentProps, enhancedFields, selector, parentType, parentLevel);
                } else {
                    oRes = that.exploreDescendantsRecurs(sControlId, aNewDescendentProps, enhancedFields);
                }
                if(oRes.distance < that.selectorDist.distance || oRes.success) {
                    that.selectorDist.distance = oRes.distance;
                    that.selectorDist.selector = oRes.selector;
                    that.selectorDist.fieldsMap = oRes.fieldsMap;
                    that.selectorDist.aNodes = oRes.aNodes;
                }
                res(that.selectorDist);
            }));
        }
        Promise.all(aPromises);
        return this.selectorDist;
    }

    this.evalDescendantProperties = function(sControlId, existingFields, aDescendentProps, selector, parentPropType){
        var enhancedFields = {};
        let oRes = {};
        if(existingFields) {
            Object.assign(enhancedFields, existingFields);
        } else {
            enhancedFields = {};
        }
    
        oRes = this.exploreDescendantsRecurs(sControlId, aDescendentProps, enhancedFields, selector, parentPropType);
        return oRes;
    }

    this.evalSiblingsProperties = function(sControlId, existingFields, aSiblingsProps){
        var enhancedFields = {};
        let oRes = {};
        let finalRes = {};
        let aPromises = [];
        finalRes.success = false;
        finalRes.distance = 999;
        finalRes.fieldsMap = existingFields;
        if(existingFields) {
            Object.assign(enhancedFields, existingFields);
        } else {
            existingFields = {};
        }
        if(!aSiblingsProps || aSiblingsProps.length === 0) return finalRes;
        var that = this;
        for (let index = 0;  index < aSiblingsProps.length; index++) {
            const siblingProps = aSiblingsProps[index];
            aPromises.push(new Promise(function(res,rej){
                oRes = that.getElementImportantProps(siblingProps["properties"], enhancedFields, "siblingProperties", sControlId); 
                if(oRes.distance < finalRes.distance || oRes.success){
                    finalRes = oRes;
                }
                res(finalRes);
            }));
        }
        Promise.all(aPromises);
        // Didnt succeed
        return finalRes;
    }

    this.evalAncestorWithDescProperties = function(existingFields, oElemProperties, oAncestorElemProperties, oAncestorProperties, aDescendentProps, oSelector, parentLevel) {
        var enhancedFields = {};
        let oRes1 = {};
        let oRes2 = {};
        if(existingFields) {
            Object.assign(enhancedFields, existingFields);
        } else {
            enhancedFields = {};
        }
        

        if(oElemProperties && oAncestorElemProperties && oAncestorProperties && 
            aDescendentProps && oElemProperties.ui5Properties && oAncestorElemProperties.ui5Properties) {
            const elemId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
            const ancElemId = qmateUtil.getKeyValue(oAncestorElemProperties.ui5Properties, "id");
        // Case 1 Element is a desc of Ancestor element --> [Opt: Get Ancestor] Get ancestor element + get all descendants except element and control in depth
            if(elemId !== ancElemId) {
                if(!parentLevel) {
                    // Element is under a aggregation element - try
                    oRes1 = this.getElementImportantProps(oAncestorElemProperties, enhancedFields, "ancestorProperties", elemId);
                    if(oRes1.success) {
                        return oRes1;
                    } 
                
                    if(oRes1 && oRes1.selector && oSelector) {
                        let plHoldSelector = {};
                        //Check combi
                        let oSel = deepExtend(plHoldSelector, oRes1.selector, oSelector);
                        let aCandNodes = ui5All(oSel);
                        let distComp = qmateUtil.distanceNode(aCandNodes, elemId);
                        if(aCandNodes && distComp === 0) {
                            return oSel;
                        }
                        if(distComp < oRes1.distance){
                            oRes1.success = false;
                            oRes1.selector = oSel;
                            oRes1.distance = distComp;
                            oRes1.aNodes = aCandNodes;
                        }
                    }

                    parentLevel = null;
                    if(oRes1.selector["ancestorProperties"]) {
                        parentLevel = 1;
                        if(oRes1.selector["ancestorProperties"]["ancestorProperties"]) {
                            parentLevel = 2;
                        }
                    }
                } else {
                    oRes1.selector = oSelector;
                }
                /*
                //Already done once
                else {
                    oRes1 = this.getElementNestedImportantProps(oAncestorElemProperties, oSelector, "ancestorProperties", "ancestorProperties", elemId, parentLevel);
                    if(oRes1.success) {
                        return oRes1;
                    } 
                } */
                
            } else {
                if(!parentLevel) {
                    oRes1 = this.getElementImportantProps(oAncestorProperties, enhancedFields, "ancestorProperties", elemId);
                    if(oRes1.success) {
                        return oRes1;
                    }
                    if(oRes1 && oRes1.selector && oSelector) {
                        let plHoldSelector = {};
                        //Check combi
                        let oSel = deepExtend(plHoldSelector, oRes1.selector, oSelector);
                        let aCandNodes = ui5All(oSel);
                        let distComp = qmateUtil.distanceNode(aCandNodes, elemId);
                        if(aCandNodes && distComp === 0) {
                            return oSel;
                        }
                        if(distComp < oRes1.distance){
                            oRes1.success = false;
                            oRes1.selector = oSel;
                            oRes1.distance = distComp;
                            oRes1.aNodes = aCandNodes;
                        }
                    }

                    parentLevel = null;
                    if(oRes1.selector["ancestorProperties"]) {
                        parentLevel = 1;
                        if(oRes1.selector["ancestorProperties"]["ancestorProperties"]) {
                            parentLevel = 2;
                        }
                    }
                } else {
                    oRes1.selector = oSelector;
                } 
                /*else {
                     // Case 2 Element is the ancestor Element --> Check only descendants + ancestor
                    // Try ancestor of ancestor element
                    oRes1 = this.getElementNestedImportantProps(oAncestorElemProperties, oSelector, "ancestorProperties", "ancestorProperties", elemId, parentLevel);
                    if(oRes1.success) {
                        return oRes1;
                    } 
                }*/
            }
            filtDescentantProps = [];
            //Remove self descendants
            for (let index = 0; index < aDescendentProps.length; index++) {
                const descend = aDescendentProps[index];
                if(descend["id"] !== elemId) {
                    filtDescentantProps.push(descend);
                } 
            }
            if(!parentLevel) {
                // Check descendants
                oRes2 = this.exploreDescendantsRecurs(elemId, filtDescentantProps, enhancedFields, oRes1.selector, "ancestorProperties");
                if(oRes2 && oRes2.success) {
                    return oRes2;
                } 
            } else {
                oRes2 = this.exploreDescendantsRecurs(elemId, filtDescentantProps, enhancedFields, oRes1.selector, "ancestorProperties", parentLevel);
                if(oRes2 && oRes2.success) {
                    return oRes2;
                }
            }
            if(oRes1.distance !== undefined) {
                let selTor = oRes1.selector;
                let distFinal = oRes1.distance;
                let fldMaps = oRes1.fieldsMap;
                if(oRes2.distance < oRes1.distance) {
                    selTor = oRes2.selector;
                    distFinal = oRes2.distance;
                    fldMaps = oRes2.fieldsMap;
                }
                // Didnt succeed
                return {
                    "success": false,
                    "distance": distFinal,
                    "fieldsMap": fldMaps,
                    "selector": selTor,
                    "aNodes": []
                }
            } else {
                return oRes2;
            }
        }
    }

    this.evalAncestorAggrElmProperties = function(oSelector, oElemProperties, oAncestorElemProperties, oAncestorProperties) {
        var enhancedFields = {};
        var oSel = {};
        if(oSelector) {
            Object.assign(oSel, oSelector);
        } else {
            oSel = {};
        }

        let oRes1 = {};
        let oRes2 = {};
        if(oElemProperties && oAncestorElemProperties && oAncestorProperties &&
            oElemProperties.ui5Properties && oAncestorElemProperties.ui5Properties) {
            const elemId = qmateUtil.getKeyValue(oElemProperties.ui5Properties, "id");
            const acPropElemId = qmateUtil.getKeyValue(oAncestorElemProperties.ui5Properties, "id");    
            if(elemId !== acPropElemId) {
                if(oSel["ancestorProperties"]) {
                    // Element is under a aggregation element - try
                    oRes1 = this.getElementNestedImportantProps(oAncestorElemProperties, oSel, "ancestorProperties", "ancestorProperties", elemId);
                    if(oRes1.success) {
                        return oRes1;
                    }
                } else {
                    // Element is under a aggregation element - try
                    oRes1 = this.getElementNestedImportantProps(oAncestorElemProperties, oSel, "ancestorProperties", null, elemId);
                    if(oRes1.success) {
                        return oRes1;
                    }
                }
            }

            if(oSel["ancestorProperties"]) {
                // Element is the aggregation element
                // Try ancestor of ancestor element
                oRes2 = this.getElementNestedImportantProps(oAncestorProperties, oSel, "ancestorProperties", "ancestorProperties", elemId);
                if(oRes2.success) {
                    return oRes2;
                }
            } else {
                oRes2 = this.getElementNestedImportantProps(oAncestorProperties, oSel, "ancestorProperties", null, elemId);
                if(oRes2.success) {
                    return oRes2;
                }       
            }

            if(oRes2.distance < oRes1.distance) {
                // Didnt succeed
                return oRes2;
            } else {
               // Didnt succeed
               return oRes1;
            }
            
        }

        // Didnt succeed
        return {
            "success": false,
            "distance": 99,
            "fieldsMap": {},
            "selector": oSelector,
            "aNodes": []
        }
    }

    this.evalAncestorProperties = function(sControlId, existingFields, oAncestorProperties, level, stopId) {
        var enhancedFields = {};
        if(existingFields) {
            Object.assign(enhancedFields, existingFields);
        } else {
            existingFields = {};
        }
        let oRes2 = {};
        if(oAncestorProperties) {

            // Element is the aggregation element
            // Try ancestor of ancestor element
            oRes2 = this.getElementImportantProps(oAncestorProperties, enhancedFields, "ancestorProperties", sControlId);
            if(oRes2.success) {
                return oRes2;
            }
            if(oRes2.distance < this.selectorDist.distance) {
                this.selectorDist.distance = oRes2.distance;
                this.selectorDist.selector = oRes2.selector;
                this.selectorDist.fieldsMap = oRes2.fieldsMap;
                this.selectorDist.aNodes = oRes2.aNodes;
            }
            if(level && level > 0) {
                level--;
                const elemId = qmateUtil.getKeyValue(oAncestorProperties.ui5Properties, "id");
                let oNextAncestorProperties = qmateUtil.getNextAncestorProperties(elemId);
                if(oNextAncestorProperties && oNextAncestorProperties.ui5Properties) {
                    const ancElemId = qmateUtil.getKeyValue(oNextAncestorProperties.ui5Properties, "id");   
                    if(stopId && ancElemId !== stopId) {
                        let ret1 = this.evalAncestorProperties(sControlId, enhancedFields, oNextAncestorProperties, level, stopId);
                        if(ret1.success) {
                            return ret1;
                        }
                        if(ret1.distance < this.selectorDist.distance) {
                            this.selectorDist.distance = ret1.distance;
                            this.selectorDist.selector = ret1.selector;
                            this.selectorDist.fieldsMap = ret1.fieldsMap;
                            this.selectorDist.aNodes = ret1.aNodes;
                        }
                    } else if(!stopId) {
                        let ret1 = this.evalAncestorProperties(sControlId, enhancedFields, oNextAncestorProperties, level);
                        if(ret1.success) {
                            return ret1;
                        }
                        if(ret1.distance < this.selectorDist.distance) {
                            this.selectorDist.distance = ret1.distance;
                            this.selectorDist.selector = ret1.selector;
                            this.selectorDist.fieldsMap = ret1.fieldsMap;
                            this.selectorDist.aNodes = ret1.aNodes;
                        }
                    } else {
                        // Didnt succeed
                        return this.selectorDist;
                    }            
                }
            } else {
                 // Didnt succeed
                return this.selectorDist;
            }
        }
        // Didnt succeed
        return this.selectorDist;
    }

    this.getSelectorIndex = function(oSelector, id, idx, maxLength) {
        let aFoundNodes=[];
        if(oSelector) {
            if(idx !== undefined && idx !== null && maxLength) {
                // If bindingContextPath & at least one bindingProperty (test ui5All)
                aFoundNodes = ui5All(oSelector, idx);
                if(aFoundNodes.length === 1 && aFoundNodes[0].id === id) {
                    // Success
                    return {
                        "success": true,
                        "index": idx
                    };
                } else if(idx < maxLength) {
                    idx++;
                    return this.getSelectorIndex(oSelector, id, idx, maxLength);
                } else {
                    // Didnt succeed
                    return {
                        "success": false
                    }
                }
                
            } else {
                // If bindingContextPath & at least one bindingProperty (test ui5All)
                aFoundNodes = ui5All(oSelector);
            }
            
            if(aFoundNodes && aFoundNodes.length > 1){
                return this.getSelectorIndex(oSelector, id, idx, aFoundNodes.length);
            }
        } else {
            return null;
        }
    }
    
};
window.ui5All = ui5All;
window.Evaluator = new Evaluator();
module.exports = window.Evaluator;
},{"./qmateLocator":2,"./qmateUtil":3,"./queryBuilder":4,"deep-extend":8}],6:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],7:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":6,"buffer":7,"ieee754":9}],8:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = Buffer.alloc
			? Buffer.alloc(val.length)
			: new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

function safeGetProperty(object, property) {
	return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = safeGetProperty(target, key); // source value
			val = safeGetProperty(obj, key); // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":7}],9:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[5]);
