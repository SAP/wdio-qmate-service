/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
    'use strict';

    var utils = require('../modules/utils/utils.js');
    var highLighter = require('../modules/content/highLighter.js');
    var port = chrome.runtime.connect({name: 'content'});

    // ================================================================================
    // Inject needed scripts into the inspected page
    // ================================================================================

    /**
     * Inject javascript file into the page.
     * @param {string} source - file path
     * @callback
     */
    var injectScript = function (source, callback) {
        var script = document.createElement('script');
        script.src = chrome.extension.getURL(source);
        document.head.appendChild(script);

        /**
         * Delete the injected file, when it is loaded.
         */
        script.onload = function () {
            script.parentNode.removeChild(script);

            if (callback) {
                callback();
            }
        };
    };

    injectScript('vendor/ToolsAPI.js', function () {
        injectScript('scripts/injected/main.js', function () {
            // Add this action to the Q
            // This is needed when the devtools are undocked from the current inspected window
            setTimeout(function () {
                port.postMessage({
                    action: 'on-main-script-injection'
                });
            }, 0);
        });
    });

    // ================================================================================
    // Communication
    // ================================================================================

    /**
     * Send message to injected script.
     * @param {Object} message
     */
    var sendCustomMessageToInjectedScript = function (message) {
        document.dispatchEvent(new CustomEvent('ui5-communication-with-injected-script', {
            detail: message
        }));
    };

    // Name space for message handler functions.
    var messageHandler = {

        /**
         * Changes the highlighter position and size,
         * when an element from the ControlTree is hovered.
         * @param {Object} message
         */
        'on-control-tree-hover': function (message) {
            highLighter.setDimensions(message.target);
        }
    };

    port.onMessage.addListener(function (message, messageSender, sendResponse) {
        // Resolve incoming messages
        utils.resolveMessage({
            message: message,
            messageSender: messageSender,
            sendResponse: sendResponse,
            actions: messageHandler
        });

        // Send events to injected script
        sendCustomMessageToInjectedScript(message);
    });

    /**
     * Listener for messages from the injected script.
     */
    document.addEventListener('ui5-communication-with-content-script', function sendEvent(detectEvent) {
        // Send the received event detail object to background page
        port.postMessage(detectEvent.detail);
    }, false);
}());

},{"../modules/content/highLighter.js":2,"../modules/utils/utils.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @typedef {Object} resolveMessageOptions
 * @property {Object} message - port.onMessage.addListener parameter
 * @property {Object} messageSender - port.onMessage.addListener parameter
 * @property {Object} sendResponse - port.onMessage.addListener parameter
 * @property {Object} actions - Object with all the needed actions as methods
 */

/**
 * Calls the needed message action.
 * @param {resolveMessageOptions} options
 * @private
 */
function _resolveMessage(options) {
    if (!options) {
        return;
    }

    var message = options.message;
    var messageSender = options.messageSender;
    var sendResponse = options.sendResponse;
    var actions = options.actions;
    var messageHandlerFunction = actions[message.action];

    if (messageHandlerFunction) {
        messageHandlerFunction(message, messageSender, sendResponse);
    }
}

/**
 * Convert UI5 timestamp to readable date.
 * @param {string} timeStamp  - timestamp in UI5 format ("20150427-1201")
 * @returns {string|undefined}
 * @private
 */
function _convertUI5TimeStampToHumanReadableFormat(timeStamp) {
    var formattedTime = '';

    if (!timeStamp) {
        return;
    }

    // Year
    formattedTime += timeStamp.substr(0, 4) + '/';
    // Month
    formattedTime += timeStamp.substr(4, 2) + '/';
    // Date
    formattedTime += timeStamp.substr(6, 2);

    formattedTime += ' ';

    // Hour
    formattedTime += timeStamp.substr(9, 2) + ':';
    // Minutes
    formattedTime += timeStamp.substr(11, 2) + 'h';

    return formattedTime;
}

/**
 * Set specific class for each OS.
 * @private
 */
function _setOSClassNameToBody() {
    // Set a body attribute for detecting and styling according the OS
    var osName = '';
    if (navigator.appVersion.indexOf('Win') !== -1) {
        osName = 'windows';
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
        osName = 'mac';
    }
    if (navigator.appVersion.indexOf('Linux') !== -1) {
        osName = 'linux';
    }

    document.querySelector('body').setAttribute('os', osName);
}

/**
 * Applies the theme. Default is light.
 * @private
 */
function _applyTheme(theme) {
    var oldLink = document.getElementById('ui5inspector-theme');
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    var url = '/styles/themes/light/light.css';

    if (oldLink) {
        oldLink.remove();
    }

    if (theme === 'dark') {
        url = '/styles/themes/dark/dark.css';
    }

    link.id = 'ui5inspector-theme';
    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
}

module.exports = {
    formatter: {
        convertUI5TimeStampToHumanReadableFormat: _convertUI5TimeStampToHumanReadableFormat
    },
    resolveMessage: _resolveMessage,
    setOSClassName: _setOSClassNameToBody,
    applyTheme: _applyTheme
};

},{}]},{},[1]);
