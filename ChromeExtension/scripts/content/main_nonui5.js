/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
    'use strict';

    var utils = require('../modules/utils/utils.js');
    var port = chrome.runtime.connect({name: 'contentNonUI5'});
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
    injectScript('/scripts/injected/main_nonui5.js', function () {
    });

    // ================================================================================
    // Communication
    // ================================================================================

    /**
     * Send message to injected script.
     * @param {Object} message
     */
    var sendCustomMessageToInjectedScript = function (message) {
        document.dispatchEvent(new CustomEvent('ui-communication-with-injected-script', {
            detail: message
        }));
    };

    // Name space for message handler functions.
    var messageHandler = {
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
    document.addEventListener('ui-communication-with-content-script', function sendEvent(detectEvent) {
        // Send the received event detail object to background page
        port.postMessage(detectEvent.detail);
    }, false);
}());

},{"../modules/utils/utils.js":2}],2:[function(require,module,exports){
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
