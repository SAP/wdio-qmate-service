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
},{"./jaroWinBundle.js":1}]},{},[2]);
