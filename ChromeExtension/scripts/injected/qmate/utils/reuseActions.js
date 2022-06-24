/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
