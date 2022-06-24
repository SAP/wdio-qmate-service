/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
    'use strict';

     // Inject a script file in the current page
     var scriptUI5 = document.createElement('script');
     scriptUI5.src = chrome.extension.getURL('/scripts/injected/detectUI5.js');
     document.head.appendChild(scriptUI5);
 
     // Inject a the qmate util file in the current page
     //var scriptQmate = document.createElement('script');
     //scriptQmate.src = chrome.extension.getURL('/scripts/injected/qmate/utils/qmateUtil.js');
     //document.head.appendChild(scriptQmate);

    // Inject a the qmate util file in the current page
    var scriptElementCentricQmateStrategy = document.createElement('script');
    scriptElementCentricQmateStrategy.src = chrome.extension.getURL('/scripts/injected/qmate/strategies/ui5/elementCentric.js');
    document.head.appendChild(scriptElementCentricQmateStrategy);

    // Inject a the qmate util file in the current page
    var scriptIdAndTextCentricStrategy = document.createElement('script');
    scriptIdAndTextCentricStrategy.src = chrome.extension.getURL('/scripts/injected/qmate/strategies/nonui5/idAndTextCentric.js');
    document.head.appendChild(scriptIdAndTextCentricStrategy);

     // Inject the jaro winkel distance util file in the current page
     //var jaroWinkelScript = document.createElement('script');
     //jaroWinkelScript.src = chrome.extension.getURL('/scripts/injected/qmate/utils/jaroWinBundle.js');
     //document.head.appendChild(jaroWinkelScript);
 
     /**
      * Delete the injected file, when it is loaded.
      */
     scriptUI5.onload = function () {
         scriptUI5.parentNode.removeChild(scriptUI5);
     };
 
     /**
      * Delete the injected file, when it is loaded.
      */
     //scriptQmate.onload = function () {
     //    scriptQmate.parentNode.removeChild(scriptQmate);
     //};

      /**
      * Delete the injected file, when it is loaded.
      */
     scriptElementCentricQmateStrategy.onload = function () {
        scriptElementCentricQmateStrategy.parentNode.removeChild(scriptElementCentricQmateStrategy);
    };

    /**
      * Delete the injected file, when it is loaded.
      */
     scriptIdAndTextCentricStrategy.onload = function () {
        scriptIdAndTextCentricStrategy.parentNode.removeChild(scriptIdAndTextCentricStrategy);
    };

     /**
      * Delete the injected file, when it is loaded.
      */
     //jaroWinkelScript.onload = function () {
     //   jaroWinkelScript.parentNode.removeChild(jaroWinkelScript);
    //};
 
     // Create a port with background page for continuous message communication
     var port = chrome.extension.connect({name: 'do-ui5-detection'});
 
     // Listen for messages from the background page
     port.onMessage.addListener(function (message) {
         if (message.action === 'do-ui5-detection') {
             document.dispatchEvent(new Event('do-ui5-detection-injected'));
         }
     });
 
     /**
      *  Listens for messages from the injected script.
      */
     document.addEventListener('detect-ui5-content', function sendEvent(detectEvent) {
         // Send the received event detail object to background page
         port.postMessage(detectEvent.detail);
     }, false);
}());

},{}]},{},[1]);
