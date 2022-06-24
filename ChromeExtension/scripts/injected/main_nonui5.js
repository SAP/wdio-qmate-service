/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

    'use strict';
    var ui5inspector = require('../modules/injected/ui5inspector.js');
    var message = require('../modules/injected/message.js');
    var highLighter = require('../modules/content/highLighter.js');
    var idAndTextCentric = require('./qmate/strategies/nonui5/idAndTextCentric');
    var reuseAction = require('./qmate/utils/reuseActions');
    // Create global reference for the extension.
    ui5inspector.createReferences();
    // Name space for message handler functions.
    var messageHandler = {

         /**
         * Select ControlTree element, based on selection in the Element panel.
         * @param {Object} message
         */
        'on-select-element': function (oMess) {
            let mQmateOptionCode = {};
            let mResultFrameElem = {};
            let findElement = null;
            if (oMess.detail && oMess.detail.isQmateAttrSet && idAndTextCentric) {
                let findElems = document.querySelectorAll("[data-vyp-finder='1']");
                if(findElems && findElems.length === 1) {
                    findElement = findElems[0];
                } else {
                    // Check frames
                    mResultFrameElem = idAndTextCentric.getElementWithQmateAttribute();
                    findElement = mResultFrameElem.element;
                }
                try {
                    if(findElement && findElement.element){
                        findElement = findElement.element
                    }
                    if(findElement){
                        findElement.removeAttribute("data-vyp-finder");
                        mQmateOptionCode = idAndTextCentric.buildElementSelectors(findElement, mResultFrameElem.frames);
                    }
                } catch (error) {
                    if(findElement && findElement.element) {
                        findElement = findElement.element;
                    }
                    if(findElement){
                        findElement.removeAttribute("data-vyp-finder");
                    }
                }
                message.sendNonUI5({
                    action: 'on-qmate-nonui5-data',
                    qmateSourceOptions: mQmateOptionCode,
                });
            }
        },

        'do-run-nonui5-qmate': function (oMess) {
            if(oMess && oMess.detail) {
                let oContDocument = document; 
                let bActionSuccess = false;
                let oElement = null;
                let count = 0;
                if(oMess.detail.iframes && oMess.detail.iframes.length > 0) {
                    for (let index = 0; index < oMess.detail.iframes.length; index++) {
                        let valFrame = oMess.detail.iframes[index];
                        
                        if(valFrame.length > 1 && 
                            valFrame.substring(0, 0) === valFrame.substring(1, 1)) {
                            valFrame = valFrame.substring(1, valFrame.length - 1)
                        } 
                        let oFrame = oContDocument.querySelector(valFrame);
                        if(oFrame && oFrame.contentDocument) {
                            oContDocument = oFrame.contentDocument;
                        }
                    }
                }
                if(oMess.detail.selector && oContDocument) {
                    if(!oMess.detail.selector.method || !oMess.detail.selector.value) {
                        oElement = null;
                    } else {
                        let val = "";
                        if(oMess.detail.selector.value.length > 1 && 
                            oMess.detail.selector.value.substring(0, 0) === oMess.detail.selector.value.substring(1, 1)) {
                                val = oMess.detail.selector.value.substring(1, oMess.detail.selector.value.length - 1)
                        } else {
                            val = oMess.detail.selector.value;
                        }

                        if(oMess.detail.selector.method === "nonUi5.element.getByCssContainingText") {
                            let sText = "";
                            if(oMess.detail.selector.text && oMess.detail.selector.text.length > 1 && 
                                oMess.detail.selector.text.substring(0, 0) === oMess.detail.selector.text.substring(1, 1)) {
                                    sText = oMess.detail.selector.text.substring(1, oMess.detail.selector.text.length - 1)
                            } else {
                                sText = oMess.detail.selector.text;
                            }

                            let aRes = idAndTextCentric.containsText(
                                val, 
                                sText, 
                                oContDocument);

                            if(aRes && aRes.length === 1) {
                                oElement = aRes[0];
                            }
                            count = aRes.length;
                        } else if(oMess.detail.selector.method === "nonUi5.element.getByCss") {
                            let aSelector = oContDocument.querySelectorAll(val);
                            if(aSelector && aSelector.length === 1) {
                                oElement = aSelector[0];
                            }
                            count = aSelector.length;
                        } else if(oMess.detail.selector.method === "nonUi5.element.getByXPath") {
                            let xPathRes = oContDocument.evaluate(
                                val, 
                                oContDocument, 
                                null, 
                                XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                                null
                            );
                            let oElem = xPathRes.iterateNext();
                            if(oElem) {
                                count++;
                                oElement = oElem;
                                let oElemNext = {};
                                oElemNext =  xPathRes.iterateNext();
                                if(oElemNext) {
                                    count++;
                                    while (oElemNext) {
                                        oElemNext = iterator.iterateNext();
                                        count++;
                                    }
                                } 
                                if(count > 1){
                                    oElement = null;
                                }
                            } 
                        }   
                    }
                }

                if(oElement && oMess.detail.qmateAction.method) {
                    let val = "";
                    if(oMess.detail.qmateAction.entValue.length > 1 && 
                        oMess.detail.qmateAction.entValue.substring(0, 0) === oMess.detail.qmateAction.entValue.substring(1, 1)) {
                        val = oMess.detail.qmateAction.entValue.substring(1, oMess.detail.qmateAction.entValue.length - 1)
                    } else {
                        val = oMess.detail.qmateAction.entValue;
                    }
                    bActionSuccess = reuseAction.doNonUI5Action(
                        oMess.detail.qmateAction.method, 
                        oElement, 
                        val
                    );        
                } else if(oElement){
                    bActionSuccess = true;
                }

                //Highlight element if succeeded
                if(bActionSuccess && oElement && oContDocument) {
                    // Weird effects being in iframe... never get hiden and freezes the ui
                    //highLighter.setDimensionsNonUI5(oElement, oContDocument);
                }

                message.sendNonUI5({
                    action: 'on-nonui5-qmate-progress',
                    success: bActionSuccess,
                    count: count,
                });
            }
        }
    };
    /**
     * Register custom event for communication with the injected.
     */
    ui5inspector.registerEventListener('ui-communication-with-injected-script', function communicationWithContentScript(event) {
        var action = event.detail.action;
        if( 
            action === 'on-select-element' || 
            action === 'on-qmate-nonui5-data' ||
            action === 'do-run-nonui5-qmate' ||
            action === 'on-nonui5-qmate-progress'){
            if (messageHandler[action]) {
                messageHandler[action](event);
            }
        }
    });
},{"../modules/content/highLighter.js":6,"../modules/injected/message.js":7,"../modules/injected/ui5inspector.js":8,"./qmate/strategies/nonui5/idAndTextCentric":2,"./qmate/utils/reuseActions":4}],2:[function(require,module,exports){
// Non UI5
// Get nodeName --> li,div, ...

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

/*
Algorithm
------------------
1. Go through the dom and retrieve all iframes (generate all underlying switches)
-->await nonUi5.element.switchToIframe("iframe[id='frame01']");
--> Switch in chrome (if necessary) with client script
--> Generate selectors for iframe switch use qmate reuse

Generate multiple vairants (one must be without id). Expose options as dropdown
-->let elem = await nonUi5.element.getByCss(".input01", 1, 10000);
1. Find tag (node type)
2. Try each individual attribute 
-> Sequence of priority string, numbers, boolean
 -> If id, concatinate and iterate [concat rules: -,_, ., :, [],/,\ ] -> test uniqueness (first with star, then with $ and without after)
    -> Check uniqness of id parts
 -> Use distance as a proof of improovement
3. Try combination of each attribute values (if multiple exists class, style..)
    --> Use distance as a proof of improovement
4. Try combination of different attributes
    --> Use distance as a proof of improovement
5. Try combination of attributes and contains innerText
    --> let elem = await nonUi5.element.getByCssContainingText(".input02", "John Doe", 2, 10000); 
    --> Use string attributes like name, id, title, aria, custom, class,
    --> Use distance as a proof of improovement
6. Use generic selector generator
    --> Remove replicated choices from above
    --> Use distance as a proof of improovement
7. Use xpath as fallback
--> Test with document evaluate

var a_tags = document.evaluate( '//a', document, null, XPathResult.ANY_TYPE, null);
var a = a_tags.iterateNext();

while (a) {
 console.log(a);
 a = a_tags.iterateNext();
}  

As preferable choose shortest path
 */

var firstDegreeAttributes = [
    'title',
    'tooltip',
    'name',
    'value',
    'id',
    'data-sap-ui',
    'src',
    'alt',
    'aria-labelledby',
    'aria-describedby',
    'aria-label',
    'aria-controls',
    'aria-colindex',
    'aria-rowindex'
  ];
var secondDegreeAttributes = [
    'type',
    'action',
    'for',
    'data-tl-id',
    'data-id',
    'style',
    'role',
    'class'
];
var cssSelectors = require('../../utils/cssSelectorsGen');
var xPathSelectors = require('../../utils/xPathGenerator');
var IdAndTextCentricStrategy = function() {
    var framArray = [];
    var aBlackListed = [];
    this.getIframe = function(oElement, oframeElement) {
        let aElms = oframeElement.contentDocument.querySelectorAll("[data-vyp-finder='1']");
        if(aElms && aElms.length === 1 && oElement.isSameNode(aElms[0])) {
            return oframeElement;
        } else {
            let frameChain = {};
            framArray.push(frameChain);
            frameChain["parent"] = oframeElement;
            frameChain["children"] = [];
            var aFrameElements = oframeElement.contentDocument.getElementsByTagName("iframe");
            if(aFrameElements && aFrameElements.length > 0)
                for (let index = 0; index < aFrameElements.length; index++) {
                    let iframElem = aFrameElements[index];
                    frameChain["children"].push(iframElem);
                    let framElement = this.getIframe(oElement, iframElem);  
                    if(framElement) return framElement;
                }
        }
        return null;
    };

    this.getIframeElement = function(oframeElement) {
        let frameChain = {};
        framArray.push(frameChain);
        frameChain["parent"] = oframeElement;
        frameChain["children"] = [];
        if(!oframeElement.contentDocument) return null;
        let aElms = oframeElement.contentDocument.querySelectorAll("[data-vyp-finder='1']");
        if(aElms && aElms.length === 1) {
            return {
                "iframe": oframeElement,
                "element": aElms[0]
            };
        } else {
            var aFrameElements = oframeElement.contentDocument.getElementsByTagName("iframe");
            if(aFrameElements && aFrameElements.length > 0)
                for (let index = 0; index < aFrameElements.length; index++) {
                    let iframElem = aFrameElements[index];
                    frameChain["children"].push(iframElem);
                    let oElm = this.getIframeElement(iframElem);  
                    if(oElm) {
                        return oElm;
                    }
                }
        }
        return null;
    };

    this.getTopDownAllIframes = function(aFrames) {
        var aFrameSels = [];
        
        //Button up
        // var elm = oElm.getRootNode();
        //if(elm.getElementById) {
        //    if(window.frameElement) {
        //        var ifrm = window.frameElement;
        //    }
        // }
        //-->(window.parent != window.top)
        //document = selectedElement.getRootNode()
        //while --> dd.defaultView.document.isSameNode(this.window.top.document)
        //while --> dd.defaultView.frameElement != null
        //--> document = dd.defaultView.frameElement.getRootNode()
        /*while(oElm) {
            if(oElm && oElm.nodeName === "IFRAME") {
                // 0 --> nearest, n --> farest
                aFrames.push(oElm);
            }
            oElm = oElm.parentNode;
        }
            const elem = document.getElementById('if1').contentDocument
            .getElementById('if2').contentDocument
            .getElementById('if3').contentDocument
            .getElementById('if4').contentDocument
            .getElementById('elementToBeFound')
            
        
        */
        /*if(window.top === window) {
            let aElms = document.querySelectorAll("[data-vyp-finder='1']");
            if(aElms && aElms.length === 1 && oElement.isSameNode(aElms[0])) {
                return aFrameSels;
            } else {
                framArray = [];
                var aFrameElements = document.getElementsByTagName("iframe");
                for (let index = 0; index < aFrameElements.length; index++) {
                    let iframElem = aFrameElements[index];
                    let candFrame = this.getIframe(oElement, iframElem);
                    if(candFrame){
                        aFrames.push(candFrame);
                        break;
                    } 
                }
            }
        }*/
        if(aFrames && aFrames.length > 0) {
             // Reverse n --> nearest, 0 --> farest
            for (let index = aFrames.length - 1; index >= 0; index--) {
                let oFrame = aFrames[index];
                const strSel = cssSelectors.getSelector(oFrame, oFrame.ownerDocument);
                if(this.testCssSelectors(strSel, oFrame, oFrame.ownerDocument)){
                    aFrameSels.push(strSel);
                }
            }
        }
        return aFrameSels;
    };

    this.getIframeChain = function(oElmFrame, frameHierachyBuilder) {
        if(framArray.length > 0) {
            var nextFrame = oElmFrame;
            for (let index = 0; index < framArray.length; index++) {
                const oFrameMap = framArray[index];
                if(oFrameMap && oFrameMap["children"] && oFrameMap["children"].length > 0) {
                    for (let i = 0; i < oFrameMap["children"].length; i++) {
                        const oChildFrame = oFrameMap["children"][i];
                        if(oChildFrame.isSameNode(nextFrame)){
                            frameHierachyBuilder.push(oFrameMap["parent"]);
                            nextFrame = oFrameMap["parent"];
                            this.getIframeChain(nextFrame, frameHierachyBuilder);
                        }
                    }
                }
            }
        }
    }

    this.getElementWithQmateAttribute = function() {
        var oElm = null;
        frameHierachyBuilder = [];
        framArray = [];
        if(window.top === window) {
            var aFrameElements = document.getElementsByTagName("iframe");
            for (let index = 0; index < aFrameElements.length; index++) {
                let iframElem = aFrameElements[index];
                let oElFramObj = this.getIframeElement(iframElem);
                if(oElFramObj && oElFramObj.element){
                    oElm = oElFramObj.element;
                    frameHierachyBuilder.push(oElFramObj.iframe);
                    break;
                } 
            }
            if(framArray.length > 0 && frameHierachyBuilder.length > 0) {
                this.getIframeChain(frameHierachyBuilder[0], frameHierachyBuilder);
            }
        }
        return {
            "element": oElm,
            "frames": frameHierachyBuilder
        };
    };

    this.generateQmateCodeForCssIframe = function(aFrames) {
        aResSelectors = this.getTopDownAllIframes(aFrames);
        var mResults = {};
        if(aResSelectors) {
            for (let index = 0; index < aResSelectors.length; index++) {
                const sSel = aResSelectors[index];
                let sKey = 'iframe ' + (index + 1);
                mResults[sKey] = { "selector": sSel, "action": ''};
                mResults[sKey]["action"] = 'nonUi5.element.switchToIframe';
            }
        }
        return mResults;
    };

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
                        oElm.nodeValue.indexOf('%') === -1 &&
                        oElm.nodeValue.indexOf('px') === -1 &&
                        oElm.nodeValue.indexOf('rem') === -1 &&
                        oElm.nodeValue.indexOf('true') === -1 &&
                        oElm.nodeValue.indexOf('false') === -1) {
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
    };

    this.containsText = function(selector, text, contentDocument) {
        try {
            var elements = contentDocument.querySelectorAll(selector);
            return Array.prototype.filter.call(elements, function(element){
            if(!text || !element.textContent) return false;
                return element.textContent.indexOf(text) !== -1;
            });
        } catch (error) {
            // Return empty
            return [];
        }
    };

    this.distance = function(sSelector, oElem, contentDocument, isXpath) {
        var aElms = [];
        if(sSelector){
            try {
                if(isXpath) {
                    let xPathRes = contentDocument.evaluate(sXpathSelector, contentDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    let oElem = xPathRes.iterateNext(); 
                    if(!oElem) {
                        return 99;
                    } 
                    let count = 1;
                    while (oElem) {
                        oElem = iterator.iterateNext();
                        count++;
                    } 
                    if(count === 1){
                        if(this.testXPathSelectors(sSelector, oElem, contentDocument)){
                            return 0;
                        }
                    }
                    return count + 1;
                } else {
                    aElms = contentDocument.querySelectorAll(sSelector);
                    if(aElms.length === 0) return  99;
                    if(aElms.length === 1) {
                        if(this.testCssSelectors(sSelector, oElem, contentDocument)){
                            return 0;
                        }
                    }
                    return aElms.length + 1;
                }   
            } catch (error) {
                // Invalid selector just ignore
                return 999;
            }
        }
        return 999;
    };

    this.testCssSelectors= function(sSelector, oElement, contentDocument) {
        if(sSelector && oElement){
            try {
                if(contentDocument.querySelectorAll(sSelector).length > 1 ||
                contentDocument.querySelectorAll(sSelector).length === 0) {
                    return null;
                }
                let oElem = contentDocument.querySelector(sSelector);
                if(oElement.isEqualNode(oElem) &&
                    oElement.isSameNode(oElem)){
                        return oElem;
                } 
            } catch (error) {
               return null; 
            }
        }
        return null;
    };

    this.testXPathSelectors = function(sXpathSelector, oElement, contentDocument) {
        if(sXpathSelector && oElement){
            try {
                var xPathRes = contentDocument.evaluate(sXpathSelector, contentDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                var oElem = xPathRes.iterateNext();
                if(!oElem) {
                    //Retry
                    xPathRes = contentDocument.evaluate(sXpathSelector, contentDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    oElem = xPathRes.iterateNext();
                } 
                var nextElm = xPathRes.iterateNext();
                if(!oElem || nextElm) {
                    return null;
                } 
                if(oElement.isEqualNode(oElem) &&
                    oElement.isSameNode(oElem)){
                        return oElem;
                }
            } catch (error) {
                return null; 
            }
        }
        return null;
    };

    ////TO BE CONSIDERED LATER IF INDEX IS NEEDED
    /*
      this.testXPathSelectors = function(sXpathSelector, oElement, contentDocument) {
        if(sXpathSelector && oElement){
            var xPathRes = contentDocument.evaluate(sXpathSelector, contentDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            var oElem = xPathRes.iterateNext();
            if(!oElem) {
                return null;
            }
            if(oElement.isEqualNode(oElem) &&
                oElement.isSameNode(oElem)){
                    return {
                        "element": oElem,
                        "index": 0
                    };
            }
            let index = 1;
            while (oElem && !oElement.isSameNode(oElem)) {
                oElem = xPathRes.iterateNext();
                if(oElement.isEqualNode(oElem) &&
                oElement.isSameNode(oElem)){
                    return {
                        "element": oElem,
                        "index": index
                    };
                }
                index++;
            }
        }
        return null;
    };
    
    */

    this.getDomPropertyObject = function(aDomProps, sKey) {
        for (let index = 0; index < aDomProps.length; index++) {
            const oAttr = aDomProps[index];
            let key = Object.keys(oAttr)[0];
            let val = oAttr[key];
            if(key === sKey) {
                return oAttr;
            }
        }
    };
    
    this.getAllDomPropertyKeys = function(aDomAttrs) {
        let aAttrNames = [];
        for (let index = 0; index < aDomAttrs.length; index++) {
            const oAttr = aDomAttrs[index];
            let key = Object.keys(oAttr)[0];
            aAttrNames.push(key);
        }
        return aAttrNames;
    };

    this.testId = function (sId, sSelector, oElem, contentDocument){
        var conC = ['#','-','_','.',':','[',']','/'];
        
        for (let index = 0; index < conC.length; index++) {
            const sChar = conC[index];
            let aConc = sId.split(sChar);
            let sPart = "";
            for (let i = 0; i < aConc.length; i++) {
                if(sPart) {
                    sPart = sPart + sChar + aConc[i];
                } else {
                    sPart = aConc[i];
                }
                let sSel = "";
                if(i <= aConc.length - 2 && sPart !== sId) {
                    sSel = sSelector + "[id*='" + sPart + "']";
                } else {
                    sSel = sSelector + "[id='" + sPart + "']";
                }
                if(this.distance(sSel, oElem, contentDocument) === 0) {
                    return sSel;
                }
            }
        }
        return null;
    };

    this.getSelectorsEachAtributeWithText = function(oElement, contentDocument) {
        let aSels = [];
        if(oElement.textContent){
            let aAttrs = this.retrieveDomProperties(oElement);
            let oAttr = this.getDomPropertyObject(aAttrs, "nodeName");
            let sSelector = "";
            if(oAttr){
                sSelector = oAttr["nodeName"];
            }
            for (let index = 0; index < aAttrs.length; index++) {
                const oAttr = aAttrs[index];
                let key = Object.keys(oAttr)[0];
                let val = oAttr[key];
                if(val.indexOf('};') !== -1 || val.indexOf('}') !== -1
                || val.indexOf('{') !== -1 || val.indexOf(');') !== -1) {
                    continue;
                }
                if(key !== "nodeName") {
                    let sSel = sSelector;
                    if(key === "id") {
                        let sIdSel = this.testId(val, sSelector, oElement, contentDocument);
                        if(sIdSel) aSels.push(sIdSel);
                        sSel = sSel + "[" + key + "='" + val + "']";
                        if(oElement.textContent !== null && oElement.textContent !== undefined) {
                            let aRes = this.containsText(sSel, oElement.textContent.trim(), contentDocument);
                            if(aRes && aRes.length === 1) {
                                sSel = sSel + '", "' + oElement.textContent.trim();
                                aSels.push(sSel);
                            }
                        }
                    } else {
                        sSel = sSel + "[" + key + "='" + val + "']";
                        if(oElement.textContent !== null && oElement.textContent !== undefined) {
                            let aRes = this.containsText(sSel, oElement.textContent.trim(), contentDocument);
                            if(aRes && aRes.length === 1) {
                                sSel = sSel + '", "' + oElement.textContent.trim();
                                aSels.push(sSel);
                            }
                        }
                    }
                } else {
                    if(oElement.textContent !== null && oElement.textContent !== undefined) {
                        let aRes = this.containsText(sSelector, oElement.textContent.trim(), contentDocument);
                        if(aRes && aRes.length === 1) {
                            sSel = sSelector + '", "' + oElement.textContent.trim();
                            aSels.push(sSel);
                        }
                    }
                }
            }
        }
        return aSels;
    };
    
    this.getSelectorsEachAtribute = function(oElement, contentDocument) {
        let aSels = [];
        let aAttrs = this.retrieveDomProperties(oElement);
        let oAttr = this.getDomPropertyObject(aAttrs, "nodeName");
        let sSelector = oAttr["nodeName"];
        for (let index = 0; index < aAttrs.length; index++) {
            const oAttr = aAttrs[index];
            let key = Object.keys(oAttr)[0];
            let val = oAttr[key];
            if(val.indexOf('};') !== -1 || val.indexOf('}') !== -1
            || val.indexOf('{') !== -1 || val.indexOf(');') !== -1) {
                aBlackListed.push(key);
                continue;
            }
            if(key !== "nodeName") {
                let sSel = sSelector;
                if(key === "id") {
                    let sIdSel = this.testId(val, sSelector, oElement, contentDocument);
                    if(sIdSel)  aSels.push(sIdSel);
                } else {
                    sSel = sSel + "[" + key + "='" + val + "']";
                    if(this.distance(sSel, oElement, contentDocument) === 0) {
                        aSels.push(sSel);
                    }
                }
            } else {
                if(this.distance(sSelector, oElement, contentDocument) === 0) {
                    aSels.push(sSelector);
                }
            }
        }
        return aSels;
    };

    this.combiCandAttrs = function(oElement, contentDocument) {
        let aSels = [];
        let aAttrs = this.retrieveDomProperties(oElement);
        let oAttr = this.getDomPropertyObject(aAttrs, "nodeName");
        let sSelector = oAttr["nodeName"];
        let dist = 999;
        let finalSel = sSelector;
        if(aCandAttributes) {
            let sSel = sSelector;
            for (let index = 0; index < aCandAttributes.length; index++) {
                const oAttr = aCandAttributes[index];
                let key = Object.keys(oAttr)[0];
                let val = oAttr[key];
                if(val.indexOf('};') !== -1 || val.indexOf('}') !== -1
                || val.indexOf('{') !== -1 || val.indexOf(');') !== -1) {
                    continue;
                }
                if(key !== "nodeName") {
                    if(key === "id") {
                        let sIdSel = this.testId(val, sSelector, oElement, contentDocument);
                        if(sIdSel) {
                            aSels.push(sIdSel);
                            sSel = sSelector;
                        }
                    } else {
                        sSel = sSel + "[" + key + "='" + val + "']";
                        let dSel = this.distance(sSel, oElement, contentDocument);
                        if(dSel === 0) {
                            aSels.push(dSel);
                            sSel = sSelector;
                            continue;
                        }
                        if(dSel < dist) {
                            dist = dSel;
                            finalSel = sSel;
                        } else {
                            sSel = finalSel;
                        }
                    }
                }
            }
        }
        return aSels;
    }

    var aCandAttributes = [];
    this.getSelectorsEachTogetherAtribute = function(oElement, contentDocument) {
        let aSels = [];
        let aAttrs = this.retrieveDomProperties(oElement);
        let oAttr = this.getDomPropertyObject(aAttrs, "nodeName");
        let sSelector = oAttr["nodeName"];
        let sSel = sSelector;
        for (let index = 0; index < aAttrs.length; index++) {
            const oAttr = aAttrs[index];
            let key = Object.keys(oAttr)[0];
            let val = oAttr[key];
            if(val.indexOf('};') !== -1 || val.indexOf('}') !== -1
            || val.indexOf('{') !== -1 || val.indexOf(');') !== -1) {
                continue;
            }
            let dist = 999;
            if(key !== "nodeName") {
                let sSelNew = sSel + "[" + key + "='" + val + "']";
                if(key === "id") {
                    let sIdSel = this.testId(val, sSelector, oElement, contentDocument);
                    if(sIdSel) {
                        aSels.push(sIdSel);
                        sSel = sSelector;
                    } else {
                        let dSel = this.distance(sSelNew, oElement, contentDocument);
                        if(dSel === 0) {
                            aSels.push(sSelNew);
                            sSel = sSelector;
                            continue;
                        }
                        if(sSelNew && dSel < dist) {
                            dist = dSel;
                            sSel = sSelNew;
                            oAttr.dist = dist;
                            aCandAttributes.push(oAttr);
                        }
                    }
                } else {
                    let dSel = this.distance(sSelNew, oElement, contentDocument);
                    if(dSel === 0) {
                        aSels.push(sSelNew);
                        sSel = sSelector;
                        continue;
                    }
                    if(sSelNew && dSel < dist) {
                        dist = dSel;
                        sSel = sSelNew;
                        oAttr.dist = dist;
                        aCandAttributes.push(oAttr);
                    }
                }
            }
        }
        if(aSels.length === 0 && aCandAttributes.length > 5) {
            aCandAttributes = this.sortDescDistance(aCandAttributes);
            aCandAttributes.length = 5;
        }
        if(aCandAttributes) {
            for (let index = 0; index < aCandAttributes.length; index++) {
                let oAttr = aCandAttributes[index];
                if(oAttr.dist !== undefined && oAttr.dist !== null) {
                    delete oAttr.dist;
                }
            }
        }
        return aSels;
    };

    this.mergeUniqueArrays = function(aItems1, aItems2) {
        if(!aItems1 && !aItems2) return [];
        if(!aItems1) return aItems2;
        if(!aItems2) return aItems1;
        return aItems1.concat(aItems2.filter((item) => aItems1.indexOf(item) < 0))
    };

    this.validateSelectors= function(oElement, aSelectors, contentDocument, isXpath){
        var aSels = [];
        for (let index = 0; index < aSelectors.length; index++) {
            let sSel = aSelectors[index];
            if(isXpath) {
                let oElem = this.testXPathSelectors(sSel, oElement, contentDocument);
                if(oElem) {
                    aSels.push(sSel);
                }
            } else {
                let oElem = this.testCssSelectors(sSel, oElement, contentDocument);
                if(oElem) {
                    aSels.push(sSel);
                }
            }
        }
        return aSels;
    };

    this.mergeResultsIntoOneArray= function(
        oElement, 
        aOwnSelectors,
        aOwnSelectorsWithText,
        aSelectorsAttrFirst,
        aSelectorsAttrFirstSec,
        aSelectorsAttrFirstSecNoId,
        aSelectorsAttrOwnAll,
        aSelectorsAttrOwnAllNoIdLike, contentDocument){
            let allSelectors = [];
            let aValidOwnSelectorsAttrFirst = this.validateSelectors(oElement, aOwnSelectors, contentDocument);
            let aValidSelectorsAttrFirst = this.validateSelectors(oElement, aSelectorsAttrFirst, contentDocument);
            if(aValidOwnSelectorsAttrFirst) {
                allSelectors = this.mergeUniqueArrays(aValidOwnSelectorsAttrFirst, aValidSelectorsAttrFirst);
            } else {
                allSelectors = [].concat(aValidSelectorsAttrFirst);
            }

            //Text already validated dont repeat yourself
            if(aOwnSelectorsWithText) {
                allSelectors = this.mergeUniqueArrays(allSelectors, aOwnSelectorsWithText);
            }

            let aValidSelectorsAttrFirstSec = this.validateSelectors(oElement, aSelectorsAttrFirstSec, contentDocument);
            allSelectors = this.mergeUniqueArrays(allSelectors, aValidSelectorsAttrFirstSec);

            let aValidSelectorsAttrFirstSecNoId = this.validateSelectors(oElement, aSelectorsAttrFirstSecNoId, contentDocument);
            allSelectors = this.mergeUniqueArrays(allSelectors, aValidSelectorsAttrFirstSecNoId);

            let aValidSelectorsAttrOwnAll = this.validateSelectors(oElement, aSelectorsAttrOwnAll, contentDocument);
            allSelectors = this.mergeUniqueArrays(allSelectors, aValidSelectorsAttrOwnAll);

            let aValidSelectorsAttrOwnAllNoIdLike = this.validateSelectors(oElement, aSelectorsAttrOwnAllNoIdLike, contentDocument);
            allSelectors = this.mergeUniqueArrays(allSelectors, aValidSelectorsAttrOwnAllNoIdLike);
            
            return this.sortShorterFirstCssSelectors(allSelectors);
    };

    this.sortShorterFirstCssSelectors= function(allSelectors) {
        return [].concat(allSelectors).sort(function(a, b) {
            return a.length - b.length || // sort by length, if equal then
                   a.localeCompare(b);    // sort by dictionary order
          });
    };

    this.sortDescDistance = function(candSelectors) {
        return [].concat(candSelectors).sort(function(a, b) {
            return a.dist > b.dist;
          });
    };


    this.generateQmateCodeForCss = function(aResSelectors) {
        var mResults = {};
        if(aResSelectors) {
            for (let index = 0; index < aResSelectors.length; index++) {
                const sSel = aResSelectors[index];
                let sKey = "alternative css " + (index + 1);
                mResults[sKey] = { "selector": sSel, "action": ''};
                if(sSel.indexOf('", "') !== -1) {
                    mResults[sKey]["action"] = 'nonUi5.element.getByCssContainingText'; 
                } else {
                    mResults[sKey]["action"] = 'nonUi5.element.getByCss';
                }
            }
        }
        return mResults;
    };

    this.generateQmateCodeForXPath = function(aResSelectors) {
        var mResults = {};
        if(aResSelectors) {
            for (let index = 0; index < aResSelectors.length; index++) {
                const sSel = aResSelectors[index];
                let sKey = "alternative xpath " + (index + 1);
                mResults[sKey] = { "selector": sSel, "action": ''};
                mResults[sKey]["action"] = 'nonUi5.element.getByXPath';
            }
        }
        return mResults;
    };

    this.testAndSortAllXpaths= function(aResSelectors, oElem, contentDocument) {
        if(aResSelectors) {
            let aSelectors = this.validateSelectors(oElem, aResSelectors, contentDocument, true);
            return this.sortShorterFirstCssSelectors(aSelectors);
        }
        return [];
    }

    this.getAllElementSelectors = function(oElement, oContentDocument) {
        aBlackListed = [];    
        aCandAttributes = [];
        let aOwnSelectors = this.getSelectorsEachAtribute(oElement, oContentDocument);
        let aOwnSelectorsWithText = [];
        if(aOwnSelectors.length < 6) {
            aOwnSelectors = this.mergeUniqueArrays(aOwnSelectors, this.getSelectorsEachTogetherAtribute(oElement, oContentDocument));
            if(aOwnSelectors.length < 3) {
                if(aCandAttributes.length > 0) {
                    aOwnSelectors = this.mergeUniqueArrays(aOwnSelectors, this.combiCandAttrs(oElement, oContentDocument));
                }
            }
            aOwnSelectorsWithText = this.getSelectorsEachAtributeWithText(oElement, oContentDocument);
        }
        //Clear blacklisted attributes
        firstDegreeAttributes = firstDegreeAttributes.filter(function(value){ 
            return !aBlackListed.includes(value);
        });
        //Second blacklisted attributes
        secondDegreeAttributes = secondDegreeAttributes.filter(function(value){ 
            return !aBlackListed.includes(value);
        });
        //Use first degree attributes
        let aSelectorsAttrFirst = cssSelectors.getSelectors(oElement, oContentDocument, firstDegreeAttributes);
        //Use first degree + second degree
        let aSelectorsAttrFirstSec = cssSelectors.getSelectors(oElement, oContentDocument, this.mergeUniqueArrays(firstDegreeAttributes, secondDegreeAttributes));
        //Use first degree without id + second degree
        let aFirstDegreeAttrs = [].concat(firstDegreeAttributes);
        let aFilteredWithoutId = aFirstDegreeAttrs.filter(function(value){ 
            return value !== 'aria-labelledby' && 
            value !== 'id' &&
            value !== 'data-sap-ui' && 
            value !== 'aria-describedby';
        });
        let aSelectorsAttrFirstSecNoId = cssSelectors.getSelectors(oElement, oContentDocument, this.mergeUniqueArrays(aFilteredWithoutId, secondDegreeAttributes));
        // Use all attributes given by element
        let aAttrs = this.retrieveDomProperties(oElement);
        let aAttrsName = this.getAllDomPropertyKeys(aAttrs) || [];
        //Clear blacklisted attributes
        aAttrsName = aAttrsName.filter(function(value){ 
            return !aBlackListed.includes(value);
        });
        let aSelectorsAttrOwnAll = cssSelectors.getSelectors(oElement,oContentDocument, aAttrsName);
        // Use all attributes except id like fields.
        aAttrs = this.retrieveDomProperties(oElement);
        aAttrsName = this.getAllDomPropertyKeys(aAttrs) || [];
        //Clear blacklisted attributes
        aAttrsName = aAttrsName.filter(function(value){ 
            return !aBlackListed.includes(value);
        });
        aFilteredWithoutId = aAttrsName.filter(function(value){ 
            return value !== 'aria-labelledby' && 
            value !== 'id' &&
            value !== 'data-sap-ui' && 
            value !== 'aria-describedby';
        });
        let aSelectorsAttrOwnAllNoIdLike = cssSelectors.getSelectors(oElement, oContentDocument, aFilteredWithoutId);

        // Merge all results
        let mergedResults = this.mergeResultsIntoOneArray(
            oElement,
            aOwnSelectors,
            aOwnSelectorsWithText, 
            aSelectorsAttrFirst,
            aSelectorsAttrFirstSec,
            aSelectorsAttrFirstSecNoId,
            aSelectorsAttrOwnAll,
            aSelectorsAttrOwnAllNoIdLike,
            oContentDocument
        );

        /*if(mergedResults && mergedResults.length > 5){
            //Generate Qmate reuse methods
            return this.generateQmateCodeForCss(mergedResults);
        } else {*/
            // Fallback xPath
        xPathSelectors.setDocumentRoot(oContentDocument);
        let allAttributes = aAttrsName.concat(firstDegreeAttributes).concat(secondDegreeAttributes);
        aAllXpaths = xPathSelectors.findAllXpaths(oElement, allAttributes);
        let mergeXpaths = [].concat(this.testAndSortAllXpaths(aAllXpaths, oElement, oContentDocument));
        //Generate Qmate reuse methods
        let mResCss = this.generateQmateCodeForCss(mergedResults);
        let mResXPath = this.generateQmateCodeForXPath(mergeXpaths);

            return Object.assign(mResCss, mResXPath);
        //}
    };

    this.buildElementSelectors = function(oElement, aFrames) {
        var mOption = {};
        var mFrameResults = {};
        var mSelsActionResults = {};
        var oContentDocument = document;
        if(oElement) {
            mFrameResults = this.generateQmateCodeForCssIframe(aFrames);
            if(aFrames && aFrames.length > 0) {
                let oContFrame = aFrames[0];
                oContentDocument = oContFrame.contentDocument;
            }
            mSelsActionResults = this.getAllElementSelectors(oElement, oContentDocument);
            let sCodeFrag = "";
            if(mFrameResults) {
                let oFramesKeys = Object.keys(mFrameResults);
                for (let index = 0; index < oFramesKeys.length; index++) {
                    const sKey = oFramesKeys[index];
                    let sSel = mFrameResults[sKey]["selector"];
                    let sActions = mFrameResults[sKey]["action"];
                    sCodeFrag = sCodeFrag + 'await ' + sActions +'("' + sSel + '");';
                }
            }
            if(!mSelsActionResults) return "No valid selector could be generated";
            if(mSelsActionResults) {
                let oSelsKeys = Object.keys(mSelsActionResults);
                for (let index = 0; index < oSelsKeys.length; index++) {
                    const sKey = oSelsKeys[index];
                    let sSel = mSelsActionResults[sKey]["selector"];
                    let sActions = mSelsActionResults[sKey]["action"];
                    let sCode = sCodeFrag + 'let elem = await ' + sActions + '("' + sSel + '");';
                    mOption[sKey]= sCode;
                }
            }
        }
        return mOption;
    };
};
window.IdAndTextCentricStrategy = new IdAndTextCentricStrategy();
module.exports = window.IdAndTextCentricStrategy;
},{"../../utils/cssSelectorsGen":3,"../../utils/xPathGenerator":5}],3:[function(require,module,exports){
// Inspired
//https://github.com/afloesch/css-selector

// check that selector is unique and matches the given html element
function testSelector(element, selector, contentDocument) {
    try {
        var check = contentDocument.querySelectorAll(selector);
      
        if(check.length && check.length === 1 && check[0] === element) {
          return true;
        }
      
        return false;
    } catch (error) {
        return false;
    }
  }
  
  // check if element is an anchor tag and generate a unique selector for that case
  function getLinkSelector(element) {
    var link = element.getAttribute('href');
  
    if(link) {
  
      // these kinds of js links make for bad selectors
      if(link === "#") {
        return null;
      }
  
      // cutout any query string params from the link and create a "contains" selector
      if(link.match('\\?')) {
        var parts = link.split('?', 1);
        return element.tagName + "[href*='" + parts[0] + "']"
      } else {
        return element.tagName + "[href='" + link + "']";
      }
    }
  
    return null;
  }
  
  // check for identifying attributes on html element
  function checkForAttribute(element, attributes) {
    var selector = null;
  
    for(var i = 0; i < attributes.length; i++) {
  
      var attr = element.getAttribute(attributes[i]);
  
      // if the attribute is found create a selector for it and break the loop and
      // return it
      if(attr) {
        var clean = attr.replace(new RegExp("'", 'g'), "\\\'");
        selector = element.tagName + "[" + attributes[i] + "='" + clean + "']";
        break;
      }
    }
  
    return selector;
  }
  
  // try to generate a unique selector for an html element based off of the set
  // attributes
  function getUniqueAttributeSelector(element, attributes, contentDocument) {
    var selector = null;
  
    for(var i = 0; i < attributes.length; i++) {
  
      var attr = element.getAttribute(attributes[i]);
  
      // if the attribute is found create a selector for it
      if(attr) {
        var clean = attr.replace(new RegExp("'", 'g'), "\\\'");
        var s = element.tagName + "[" + attributes[i] + "='" + clean + "']";
      }
  
      // if there's a selector and it's unique then break the loop and return it
      if(s && testSelector(element, s, contentDocument)) {
        selector = s;
        break;
      }
    }
  
    return selector;
  }
  
  // check if the element given is inside a button or anchor tag and return the
  // link element if there is one
  function checkForBetterParent(element) {
    var e = element;
  
    // walk up the element parent nodes looking for any known link elements
    while(e.parentElement) {
      // if a known link element is found then break the loop and return that element
      if(e.parentElement.tagName === "BUTTON" || e.parentElement.tagName === "A") {
        element = e.parentElement;
        break;
      }
      e = e.parentElement;
    }
  
    return element;
  }
  
  function getIndexPosition(element) {
    var index = 1;
    var e = element;
  
    while(e.previousElementSibling) {
      index++;
      e = e.previousElementSibling;
    }
  
    return index;
  }
  
  // walk up the DOM from the element node given, until the BODY is reached, and return
  // a css selector from the journey
  function getCssSelector(element, attributes, contentDocument) {
    var e = element;
    var string = "";
  
    while(e) {
  
      // if there is an attribute of interest on the node then create a selector
      var attrSelector = checkForAttribute(e, attributes);
  
      if(attrSelector) {
        string = attrSelector + string;
      } else {
        var index = getIndexPosition(e);
        if (index >= 1) {
          string = e.tagName + ':nth-child(' + index + ')' + string;
        } else {
          string = e.tagName + string;
        }
      }
  
      if (testSelector(element, string, contentDocument)) {
        e = null;
        break;
      }
  
      // if the element has a parent element then continue the loop
      if(e.parentElement &&
         e.parentElement.tagName !== "BODY" &&
         e.parentElement.tagName !== "HTML") {
        string = " > " + string;
        e = e.parentElement;
      } else if (e.parentElement && e.parentElement.tagName === "BODY") {
        string = 'BODY > ' + string;
        e = null;
        break;
      } else if (e.parentElement && e.parentElement.tagName === "HTML") {
        string = 'HTML > ' + string;
        e = null;
        break;
      } else {
        e = null;
      }
    }
  
    return string.toString();
  }
  
  // get a selector for the given element
  function makeSelectors(element, multi, customAttributes, preferLink, contentDocument) {
  
    var selectors = [];
    var item = element;
    var attributes = [
      'name',
      'id',
      'type',
      'action',
      'for',
      'src',
      'alt',
      'data-tl-id',
      'data-id',
      'aria-label'
    ];
  
    if (customAttributes && Array.isArray(customAttributes)) {
      attributes = customAttributes;
    }
  
    if (preferLink) {
      item = checkForBetterParent(item);
    }
  
    var anchorSelector = getLinkSelector(item);
    var attrSelector = getUniqueAttributeSelector(item, attributes, contentDocument);
    var cssSelector1 = getCssSelector(item, attributes, contentDocument);
    var cssSelector2 = getCssSelector(item, [], contentDocument);
    var cssSelector3 = getCssSelector(item, ['id', 'name'], contentDocument);
  
    if(anchorSelector) {
      selectors.push(anchorSelector);
    }
  
    if(attrSelector) {
      selectors.push(attrSelector);
    }
  
    if(cssSelector1 && selectors.indexOf(cssSelector1) < 0) {
      selectors.push(cssSelector1);
    }
  
    if(cssSelector2 && selectors.indexOf(cssSelector2) < 0) {
      selectors.push(cssSelector2);
    }
  
    if(cssSelector3 && selectors.indexOf(cssSelector3) < 0) {
      selectors.push(cssSelector3);
    }
  
    if (!multi) return selectors[0];
  
    return selectors;
  }
  
  function getSelectors(oElem, contentDocument, attributes, link) {
    if(!contentDocument) contentDocument = document;
    return makeSelectors(oElem, true, attributes, link, contentDocument);
  }
  
  function getSelector(oElem, contentDocument, attributes, link) {
    if(!contentDocument) contentDocument = document;
    return makeSelectors(oElem, false, attributes, link, contentDocument);
  }
  
  module.exports = {
    getSelectors: getSelectors,
    getSelector: getSelector
  };
},{}],4:[function(require,module,exports){
var ReuseDictionary = {
    "no action": "ui5.element.getDisplayed",
    "click": "ui5.userInteraction.click",
    "clear": "ui5.userInteraction.clear",
    "clearAndRetry": "ui5.userInteraction.clearAndRetry",
    "fill": "ui5.userInteraction.fill",
    "fillAndRetry":"ui5.userInteraction.fillAndRetry",
    "clearAndFill": "ui5.userInteraction.clearAndFill",
    "clearAndFillAndRetry": "ui5.userInteraction.clearAndFillAndRetry"

};

var ReuseActions = function(){
    this.doNonUI5Action = function(sAction, oElm, sVal) {
        if(sAction && oElm) {
            if(sAction === ""){
                return true;
            } else if(sVal && sAction.indexOf("clearAndFill")!== -1 || sAction.indexOf("clearAndFillAndRetry")!== -1) {
                this.setValueNonUI5(oElm, "");
                return this.setValueNonUI5(oElm, sVal);
            } else if(sVal && sAction.indexOf("fill")!== -1 || sAction.indexOf("fillAndRetry")!== -1) {
                return this.setValueNonUI5(oElm, sVal);
            } else if(sAction.indexOf("clear")!== -1 || sAction.indexOf("clearAndRetry")!== -1) {
                return this.setValueNonUI5(oElm, "");
            } else if(sAction.indexOf("click")!== -1) {
                return this.clickNonUI5(oElm);
            } 
        }
        return false;
    },

     //nonUi5.userInteraction.click
     this.clickNonUI5 = function(oElm) {
        if(oElm.click) {
            oElm.click();
            return true;
        }
        return false;
    },

    //nonUi5.userInteraction.clear
    //nonUi5.userInteraction.clearAndRetry
    //nonUi5.userInteraction.fill
    //nonUi5.userInteraction.fillAndRetry
    //nonUi5.userInteraction.clearAndFill
    //nonUi5.userInteraction.clearAndFillAndRetry
    this.setValueNonUI5 = function(oElm, val) {
        if(oElm && (oElm.value !== null && oElm.value !== undefined)) {
            oElm.value = val;
            return true;
        } 
        return false;
    }



    this.doAction = function(sAction, oElm, sVal) {
        if(sAction && oElm) {
            if(sAction === "no action"){
                return true;
            } else if(sAction === "click") {
                return this.click(oElm);
            } else if(sAction === "clear" || sAction === "clearAndRetry") {
                return this.setValue(oElm, "");
            } else if(sVal && sAction === "fill" || sAction === "fillAndRetry") {
                return this.setValue(oElm, sVal);
            } else if(sVal && sAction === "clearAndFill" || sAction === "clearAndFillAndRetry") {
                this.setValue(oElm, "");
                return this.setValue(oElm, sVal);
            }
        }
        return false;
    },
    //ui5.userInteraction.click
    this.click = function(oElm) {
        let oControl = sap.ui.getCore().byId(oElm.id);
        if(oControl && oControl.firePress) {
            oControl.firePress();
            return true;
        } else if(oControl && oControl.fireSelect){
            oControl.fireSelect();
            return true;
        }
        if(oElm.click) {
            oElm.click();
            return true;
        }
        return false;
    },
    //ui5.userInteraction.clear
    //ui5.userInteraction.clearAndRetry
    //ui5.userInteraction.fill
    //ui5.userInteraction.fillAndRetry
    //ui5.userInteraction.clearAndFill
    //ui5.userInteraction.clearAndFillAndRetry
    this.setValue = function(oElm, val) {

        let oControl = sap.ui.getCore().byId(oElm.id);
        if(oControl && oControl.setValue) {
            oControl.setValue(val);
            return true;
        }

        if(oControl && oControl.setText) {
            oControl.setText(val);
            return true;
        }

        let nElem = document.querySelector('input[id*="' + oElm.id + '"]');
        if(nElem && (nElem.value !== null && nElem.value !== undefined)) {
            nElem.value = val;
            return true;
        }

        nElem = document.querySelector('textarea[id*="' + oElm.id + '"]');
        if(nElem && (nElem.value !== null && nElem.value !== undefined)) {
            nElem.value = val;
            return true;
        }

        if(oElm.value !== null && oElm.value !== undefined) {
            oElm.value = val;
            return true;
        } 
        return false;
    }
    
};
module.exports = new ReuseActions();
},{}],5:[function(require,module,exports){
// Inspired  
//https://github.com/yifeikong/xpath_gen
function unique(list, keyFn) {
    seen = new Set();
    result = []
    for (let el of list) {
        if (keyFn == undefined)
            hashKey = el;
        else
            hashKey = keyFn(el)
        if (!seen.has(hashKey)) {
            result.push(el)
            seen.add(hashKey)
        }
    }
    return result;
}

var _oContentDocument = null;

var xPathSelector = {

    setDocumentRoot: function(oContentDocument) {
        _oContentDocument = oContentDocument;
    },

    /**
     * get root element of a list of HTMLElement
     * DEPRECATED
     * @param  {HTMLElement} root     the lca must be a decedent of this element
     * @param  {Array} elements       find root of these elements
     * @return {HTMLElement}          the lowest common ancestor
     */
    _lowestCommonAncestor: function(root, elements) {
    if (elements.length > 2) {
        let firstHalf = elements.slice(0, elements.length / 2);
        let secondHalf = elements.slice(elements.length / 2, elements.length);
        return this._lowestCommonAncestor(root,
        [this._lowestCommonAncestor(root, firstHalf), 
            this._lowestCommonAncestor(root, secondHalf)]);
    } else if (elements.length == 1) {
        return elements[0];
    } else {
        // elements.length == 2
        let paths = [[], []]; // path for two elements
        for (let i of [0, 1]) {
        for (let e = elements[i]; e != root; e = e.parent) {
            paths[i].push(e);
        }
        }
        for (let i of [0, 1]) 
        paths[i].reverse();

        let i = 0;
        for (; paths[0][i] != paths[1][i]; i++);

        return paths[i-1];
    }
    },

    /**
     * Get xpath expression of an element, from root to this element, no attr will be used.
     *
     * @param {HTMLElement} element, which to find xpath of
     * @param {HTMLElement} root, element as xpath root, by default, it's content document
     * @return {string} xpath expression between root and element
     */
    _findPathBetween: function(element, root=_oContentDocument) {
    let paths = [];

    for (; element && element.nodeType == Node.ELEMENT_NODE && element != root; element = element.parentNode) {

        let index = 0;

        for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
            continue;
        if (sibling.nodeName == element.nodeName)
            ++index;
        }

        let hasFollowingSiblings = false;
        for (let sibling = element.nextSibling; sibling && !hasFollowingSiblings; sibling = sibling.nextSibling) {
        if (sibling.nodeName == element.nodeName)
            hasFollowingSiblings = true;
        }

        let pathIndex = (index || hasFollowingSiblings ? '[' + (index + 1) + ']' : '');
        paths.unshift(element.tagName.toLowerCase() + pathIndex);
    }
    return paths.join('/');
    },

    _findXpath: function(element, baseElement, basePath, relative) {
    if (baseElement == null)
        return null;
    if (baseElement == element)
        return basePath;
    if (relative) {
        return `${basePath}//${element.tagName.toLowerCase()}`;
    } else {
        return `${basePath}/${this._findPathBetween(element, baseElement)}`;
    }
    },

    /**
     * find xpath for given element by text value
     *
     * @param {HTMLElement} element, which element to find xpath of
     * @param {bool} relative, relative path between base element and element or not
     * @return {string} xpath
     */
    findXpathByText: function(element, relative) {
    let baseElement = null;
    for (let e = element; e && e.nodeType == Node.ELEMENT_NODE; e = e.parentNode) {
        if (e.textContent && e.textContent.length < 32) {
        baseElement = e;
        break;
        }
    }
    let basePath = null;
    if (baseElement)
        basePath = `.//*[text()='${baseElement.textContent}']`;
    return this._findXpath(element, baseElement, basePath, relative);
    },

    /**
     * THIS METHOD IS DEPRECATED!
     * find xpath for given element
     *
     * @param {HTMLElement} element, which element to find xpath of
     * @param {string} attr, which attribute, the attribute of root element
     * @param {bool} relative, relative path between base element and element or not
     * @return {string} xpath from root to element
     */
    findXpathByAttr: function(element, attr, relative) {
    let baseElement = null;
    for (let e = element; e && e.nodeType == Node.ELEMENT_NODE; e = e.parentNode) {
        if (e.hasAttribute(attr) && e.getAttribute(attr)) {
        baseElement = e;
        break;
        }
    }
    let basePath = null;
    if (baseElement)
        basePath = `.//*[@${attr}='${baseElement.getAttribute(attr)}']`;
    return this._findXpath(element, baseElement, basePath, relative);
    },

    /**
     * postfix xpath for useful information
     */
    postfixXpath: function(element, xpath) {
    ret = []
    if (element.tagName == 'A') {
        ret.push(xpath + '/@href');
        ret.push(xpath + '/text()');
    } else if (element.tagName == 'IMG') {
        ret.push(xpath + '/@src');
    } else if (element.tagName == 'INPUT') {
        ret.push(xpath + '/@value');
    } else {
        ret.push(xpath + '/text()');
    }
    return ret
    },

    removePostfix: function(valueXpath) {
    return valueXpath.replace('/text()', '').replace('/@href', '').replace('/@src', '')
    },

    /**
     * find possible xpaths by going up to document root
     *
     * @param {HTMLElement} element, which element to find xpath of
     * @param {array} ignore, which attributes to ignore in finding going up
     */
    findPossibleXpaths: function(element) {
    let xpaths = [];
    let currentElement = element;
    let upCount = 0;
    while (currentElement &&
            currentElement.nodeType == Node.ELEMENT_NODE &&
            currentElement.tagName != 'BODY') {
        upCount++;
        if (upCount > 10) {
        break; 
        }
        for (let attribute of currentElement.attributes) {
        if (this.badAttributes.has(attribute.name))
            continue;
        let name = attribute.name;
        let value = attribute.value;
        if (name == 'id' && !value)
            continue;
        if (name == 'class' && !value)
            continue;
        if (name == 'class' && value.includes(' ') && value.length > 32)
            continue;
        let basePath = `.//*[@${name}='${value}']`;
        for (let relative of [true, false]) {
            // skip parent element relative paths
            // if (relative == true && currentElement == element.parentNode)
            //   continue;
            let elementXpath = this._findXpath(element, currentElement, basePath, relative)
            //console.log(`find element xpath ${elementXpath}, relative=${relative}`)
            // it seems that to find the value xpath automatically is not viable
            // let valueXpaths = this.postfixXpath(element, elementXpath);
            // for (let valueXpath of valueXpaths) {
            //   xpaths.push([elementXpath, valueXpath]);
            // }
            xpaths.unshift(elementXpath)
        }
        }
        currentElement = currentElement.parentNode
    }
    for (let relative of [true, false]) {
        let elementXpath = this.findXpathByText(element, relative);
        if (elementXpath) {
        //let valueXpaths = this.postfixXpath(element, elementXpath);
        //for (let valueXpath of valueXpaths) {
        //  xpaths.push([elementXpath, valueXpath]);
        //}
        xpaths.push(elementXpath);
        }
    }
    // xpaths = unique(xpaths, function(xpath) {return xpath[1];})
    xpaths = unique(xpaths)
    return xpaths;
    },

    badAttributes: new Set(['data-xpal', 'alt', 'async', 'cite', 'code', 'content', 'disabled',
    'download', 'enctype', 'for', 'href', 'hreflang', 'ping', 'poster',
    'rel', 'src', 'lsdata', 'lsevents']),

    /**
     * find all xpaths possible based on id, class, name, text
     */
    findAllXpaths: function(element, arrAttributes) {
        if(!_oContentDocument) {
            _oContentDocument = document;
        }
        let allAttributes = ['id', 'name', 'class'];
        if(arrAttributes && arrAttributes.length > 0) {
            allAttributes = allAttributes.concat(arrAttributes);
        }
        let xpaths = []
        for (let attr of allAttributes) {
            for (let relative of [true, false]) {
            let xpath = this.findXpathByAttr(element, attr, relative);
            //console.log(`find xpath for ${element.tagName} by ${attr}, relative: ${relative}: ${xpath}`)
            if (xpath)
                xpaths.push(xpath)
            }
        }
        for (let relative of [true, false]) {
            let xpath = this.findXpathByText(element, relative);
            if (xpath)
            xpaths.push(xpath)
        }
        xpaths = unique(xpaths)
        return xpaths;
    }
};
module.exports = xPathSelector;
},{}],6:[function(require,module,exports){
'use strict';

// Reference for the highlighter DOM element
var _highLighter = null;

/**
 * Hide the highlighter.
 * @private
 */
function _hideHighLighter() {
    _highLighter.style.display = 'none';
}

/**
 * Show the highlighter.
 * @private
 */
function _showHighLighter() {
    _highLighter.style.display = 'block';
}

/**
 * Create DOM element for visual highlighting.
 * @private
 */
function _createHighLighter(oDocument) {
    if(!oDocument) {
        oDocument = document;
    }

    var highLighter = oDocument.createElement('div');
    highLighter.style.cssText = 'box-sizing: border-box;border:1px solid blue;background: rgba(20, 20, 200, 0.4);position: absolute';

    var highLighterWrapper = oDocument.createElement('div');
    highLighterWrapper.id = 'ui5-highlighter';
    highLighterWrapper.style.cssText = 'position: fixed;top:0;right:0;bottom:0;left:0;z-index: 1000;overflow: hidden;';
    highLighterWrapper.appendChild(highLighter);

    oDocument.body.appendChild(highLighterWrapper);

    // Save reference for later usage
    _highLighter = oDocument.getElementById('ui5-highlighter');

    // Add event handler
    _highLighter.onmouseover = _hideHighLighter;
}

/**
 * Highlight controls.
 * @type {{setDimensions: Function}}
 */
module.exports = {
    /**
     * Set the position of the visual highlighter.
     * @param {string} elementId - The id of the DOM element that need to be highlighted
     * @returns {exports}
     */
    setDimensions: function (elementId) {
        var highlighter;
        var targetDomElement;
        var targetRect;

        if (_highLighter === null && !document.getElementById('ui5-highlighter')) {
            _createHighLighter();
        } else {
            _showHighLighter();
        }

        highlighter = _highLighter.firstElementChild;
        targetDomElement = document.getElementById(elementId);

        if (targetDomElement) {
            targetRect = targetDomElement.getBoundingClientRect();

            highlighter.style.top = targetRect.top + 'px';
            highlighter.style.left = targetRect.left + 'px';
            highlighter.style.height = targetRect.height + 'px';
            highlighter.style.width = targetRect.width + 'px';
        }
        return this;
    },

    setDimensionsNonUI5: function (targetDomElement, oDocument) {
        var highlighter;
        var targetRect;

        if (_highLighter === null || !oDocument.getElementById('ui5-highlighter')) {
            _createHighLighter(oDocument);
        } else {
            _showHighLighter();
        }
        highlighter = _highLighter.firstElementChild;
        if (targetDomElement) {
            targetRect = targetDomElement.getBoundingClientRect();

            highlighter.style.top = targetRect.top + 'px';
            highlighter.style.left = targetRect.left + 'px';
            highlighter.style.height = targetRect.height + 'px';
            highlighter.style.width = targetRect.width + 'px';
        }
        return this;
    }
};

},{}],7:[function(require,module,exports){
'use strict';

//Fallback if circular ref is detected
function simpleStringify(object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

/**
 * Creates a parser that simplifies complex objects by removing non-serializable functions and complex instances.
 * @constructor
 */
function ObjectParser() {
}

/**
 * Checks whether a given object is a simple/plain object.
 * @param {Object} object - input object, must not be null
 * @returns {boolean} true if simple object, false else
 * @private
 */
ObjectParser.prototype._isSimpleObject = function (object) {
    // Check if toString output indicates object
    if (typeof object.toString === 'function' && object.toString() !== '[object Object]') {
        return false;
    }
    var proto = object.prototype;
    // Check if prototype is missing
    if (!proto) {
        return true;
    }
    // Check if constructed by a global object function
    var Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === 'function' && Ctor.toString() === 'function() {}';
};

ObjectParser.prototype._deepCopy = function (object, predecessors) {
    this.visitedObjects.push(object);
    var targetObject = Array.isArray(object) ? [] : {};
    this.createdObjects.push(targetObject);
    var currentPredecessors = predecessors.slice(0);
    currentPredecessors.push(object);
    for (var sKey in object) {
        // Ignore undefined and functions (similar to JSON.stringify)
        if (object[sKey] !== undefined && typeof object[sKey] !== 'function') {
            // Recursive call
            targetObject[sKey] = this._parseObject(object[sKey], currentPredecessors);
        }
    }
    return targetObject;
};

/**
 * Deep copies an object.
 * @param {Object} object - the object, must not be null
 * @param {Array} predecessors - list of predecessors to detect circular references
 * @returns {Array|Object} the deep copied object
 * @private
 */
function _prepareMessage(object) {
    var target = {};
    var todo = [{source: object, target: target}];
    var done = [];
    var doneTargets = [];
    var current;
    while ((current = todo.pop()) !== undefined) {
        done.push(current.source);
        doneTargets.push(current.target);
        for (var sKey in current.source) {
            if (!Object.prototype.hasOwnProperty.call(current.source, sKey)) {
                continue;
            }
            var child = current.source[sKey];
            if (child === undefined || typeof child === 'function') {
                // Ignore undefined and functions (similar to JSON.stringify)
                continue;
            }
            var index = done.indexOf(child);
            if (index !== -1) {
                // Resolve detected circular references by using already parsed/created target
                current.target[sKey] = null;
            } else if (child !== null && typeof child === 'object') {
                // Deep copy objects by adding them to the to-do list (iterative approach)
                current.target[sKey] = Array.isArray(child) ? [] : {};
                todo.push({target: current.target[sKey], source: child});
            } else {
                // Copy the unhandled types that are left: 'number', 'boolean', 'string', and null
                current.target[sKey] = child;
            }
        }
    }
    return targetObject;
};

/**
 * Parses an object recursively.
 * @param {*} object - the object to parse, can be a simple type
 * @param {Array} predecessors - list of predecessors to detect circular references
 * @returns {*} returns the parsed object
 * @private
 */
ObjectParser.prototype._parseObject = function (object, predecessors) {
    // Resolve simple type
    if (object === null || typeof object === 'number' || typeof object === 'boolean' || typeof object === 'string') {
        return object;
    }
    // Ignore complex types
    if (!Array.isArray(object) && !this._isSimpleObject(object)) {
        return '<OBJECT>';
    }
    // Ignore & mark circular reference
    if (predecessors.indexOf(object) !== -1) {
        return '<CIRCULAR REFERENCE>';
    }
    // Resolve simple reference
    var referenceIndex = this.visitedObjects.indexOf(object);
    if (referenceIndex !== -1) {
        return this.createdObjects[referenceIndex];
    }
    // Handle object by deep copy
    return this._deepCopy(object, predecessors);
};

/**
 * Parses given object into a JSON object removing all functions and remove circular references.
 * @param {Object} object - input object
 * @returns {Object} JSON object
 */
ObjectParser.prototype.parse = function (object) {
    this.visitedObjects = [];
    this.createdObjects = [];
    return this._parseObject(object, []);
};

var messageParser = new ObjectParser();

module.exports = {
    /**
     * Send message to content script.
     * @param {Object} object
     */
    send: function (object) {
        
         var message = {
            detail: messageParser.parse(object)
        };
        // SmartLink bug is fixed
        /*try {
            var message = {
                detail: JSON.parse(JSON.stringify(object))
            };
        } catch (error) {
            message = {
                detail: JSON.parse(simpleStringify(object))
            };
        }*/
        document.dispatchEvent(new CustomEvent('ui5-communication-with-content-script', message));
    },

    sendNonUI5: function(object){
        try {
            var message = {
                detail: JSON.parse(JSON.stringify(object))
            };
            
        } catch (error) {
            message = {
                detail: JSON.parse(simpleStringify(object))
            };
        }
        document.dispatchEvent(new CustomEvent('ui-communication-with-content-script', message));   
    }
};

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Create global reference for the extension.
 * @private
 */
function _createReferences() {
    if (window.ui5inspector === undefined) {
        window.ui5inspector = {
            events: Object.create(null)
        };
    }
}

/**
 * Register event listener if is not already registered.
 * @param {string} eventName - the name of the event that will be register
 * @callback
 * @private
 */
function _registerEventListener(eventName, callback) {
    if (window.ui5inspector.events[eventName] === undefined) {
        // Register reference
        window.ui5inspector.events[eventName] = {
            callback: callback.name,
            state: 'registered'
        };

        document.addEventListener(eventName, callback, false);
    }
}

module.exports = {
    createReferences: _createReferences,
    registerEventListener: _registerEventListener
};

},{}]},{},[1]);
