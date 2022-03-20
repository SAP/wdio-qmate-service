module.exports = {
  ui5All: function ui5All(ui5Selector, index, opt_parentElement) {

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
      if ((sValue === undefined || sValue === null)
          && (sWild === undefined || sWild === null)) return true;
      else {
        if (sValue === undefined || sValue === null) sValue = "";
        if (sWild === undefined || sWild === null) sWild = "";
      }
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
                  if (bFound) {
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
        domElement.setAttribute("data-bindingContextPath-size", aBindingPathValues.length);
        for (let index = 0; index < aBindingPathValues.length; index++) {
          const sBindingPathValue = aBindingPathValues[index];
          domElement.setAttribute("data-bindingContextPath" + index, sBindingPathValue);
        }
      } else {
        domElement.setAttribute("data-bindingContextPath-size", 0);
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
      for (; ;) {
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

    if (!ui5Selector) {
      throw new Error(`The selector your provided ${ui5Selector} is undefined/null, please provide a valid selector`);
    }

    if (!ui5Selector.elementProperties) {
      throw new Error(`The selector your provided ${JSON.stringify(ui5Selector)} does not contain elementProperties, please provide a valid selector with elementProperties`);
    }
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
    return convertToDomElements(aCandidateControl);
  }
};