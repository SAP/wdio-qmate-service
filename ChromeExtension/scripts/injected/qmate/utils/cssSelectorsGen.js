/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
