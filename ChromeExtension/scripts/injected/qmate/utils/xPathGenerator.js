/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
