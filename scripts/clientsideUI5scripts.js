/* eslint-disable no-undef */
var functions = {};

functions.execQUnits = function (mScriptParams, done) {
  if (QUnit) {
    QUnit.config.current = true;
    QUnit.start();
    QUnit.done(function (details) {
      const msg = "Total: " + details.total + "," + " Failed: " + details.failed + "," + " Passed: " + details.passed + "," + " Runtime: " + details.runtime;
      console.log(msg);
      if (details.failed > 0) {
        done(null);
      }
      done(msg);
    });
  }
};

functions.loadMockData = function (mScriptParams, done) {
  if (!mScriptParams.responsePath) throw new Error("Please give a valid file path");
  try {
    var oData = null;
    var isText = mScriptParams.isText;
    var responsePath = mScriptParams.responsePath;
    if (isText && isText !== "false") {
      var oResponse = jQuery.sap.sjax({
        url: responsePath,
        dataType: "text"
      });
    } else {
      oResponse = jQuery.sap.sjax({
        url: responsePath,
        dataType: "json"
      });
    }
    if (oResponse.success) {
      if (isText && isText !== "false" && oResponse.data) {
        oData = oResponse.data;
      } else if (oResponse.data.d) {
        if (oResponse.data.d.results) {
          oData = oResponse.data.d.results;
        } else if (oResponse.data.d) {
          // Function Import or single data
          oData = oResponse.data;
        } else {
          throw new Error("The mock data are invalid");
        }
      } else {
        if (Array.isArray(oResponse.data)) {
          oData = oResponse.data;
        } else {
          throw new Error("The mock data could not be loaded due to wrong format!");
        }
      }
      if (isText && isText !== "false") {
        return done(oData);
      } else {
        return done(oData);
      }
    }
    done();
  } catch (error) {
    throw new Error("File could not be retrieved, details: " + error);
  }
};

functions.getUI5ControlProperty = function (mScriptParams) {
  if (!mScriptParams.elementId || !mScriptParams.property) throw new Error("Please give a valid element property with appropriate id");
  try {
    var oUI5Element = sap.ui.core.Element.registry.get(mScriptParams.elementId);
  } catch (error) {
    throw new Error("Control could not be retrieved, details: " + error);
  }
  try {
    return oUI5Element.getProperty(mScriptParams.property);
  } catch (error) {
    throw new Error("Not valid property name, please specify a valid property name, details:" + error);
  }
};

functions.getUI5AggregationProperty = function (mScriptParams) {
  if (!mScriptParams.elementId || !mScriptParams.property) throw new Error("Please give a valid element property with appropriate id");
  try {
    var oUI5Element = sap.ui.core.Element.registry.get(mScriptParams.elementId);
  } catch (error) {
    throw new Error("Control could not be retrieved, details: " + error);
  }
  try {
    return oUI5Element.getAggregation(mScriptParams.property);
  } catch (error) {
    throw new Error("Not valid property name, please specify a valid aggregation property name, details:" + error);
  }
};

functions.getUI5AssociationProperty = function (mScriptParams) {
  if (!mScriptParams.elementId || !mScriptParams.property) throw new Error("Please give a valid element property with appropriate id");
  try {
    var oUI5Element = sap.ui.core.Element.registry.get(mScriptParams.elementId);
  } catch (error) {
    throw new Error("Control could not be retrieved, details: " + error);
  }
  try {
    return oUI5Element.getAssociation(mScriptParams.property);
  } catch (error) {
    throw new Error("Not valid property name, please specify a valid associaion property name, details:" + error);
  }
};

functions.getControlBindingContextPath = function (mScriptParams) {
  if (!mScriptParams.elementId) throw new Error("Please give a valid element with appropriate id");
  try {
    var oUI5Element = sap.ui.core.Element.registry.get(mScriptParams.elementId);
  } catch (error) {
    throw new Error("Control could not be retrieved, details: " + error);
  }
  if (!oUI5Element) return null;
  var bindingContexts = jQuery.extend({},
    oUI5Element.oPropagatedProperties && oUI5Element.oPropagatedProperties.oBindingContexts,
    oUI5Element.oBindingContexts,
    oUI5Element.mElementBindingContexts
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
      const oBindingContext = bindingContexts[aKeys[index]];
      if (oBindingContext &&
        oBindingContext.getPath &&
        oBindingContext.getPath())
        return oBindingContext.getPath();
    }
  }
  return null;
};

functions.getControlPropertyBinding = function (mScriptParams) {
  if (!mScriptParams.elementId || !mScriptParams.property) throw new Error("Please give a valid element property with appropriate id");
  try {
    var oControl = sap.ui.core.Element.registry.get(mScriptParams.elementId);
  } catch (error) {
    throw new Error("Control could not be retrieved, details: " + error);
  }
  var aBindingInfos = [];
  var aBindingInfoParts = oControl.getBindingInfo(mScriptParams.property).parts;
  if (aBindingInfoParts && aBindingInfoParts.length > 0) {
    //console.log("Binding length has property--------> "+ sPropKey+ ", " + aBindingInfoParts.length);
    for (var i = 0; i < aBindingInfoParts.length; i++) {
      var sModel = "";
      //console.log("Binding parts path--------> "+ aBindingInfoParts[i].path);
      if (!aBindingInfoParts[i].path) continue;
      if (aBindingInfoParts[i].model) sModel = aBindingInfoParts[i].model;
      aBindingInfos.push({
        model: sModel,
        path: aBindingInfoParts[i].path
      });
    }
  } else {
    var sBindingDataStr = oControl.getBindingInfo(sPropKey).path;
    if (sBindingDataStr) {
      aBindingInfos.push({
        model: "",
        path: sBindingDataStr
      });
    }
  }
  return aBindingInfos;
};

functions.loadUI5CoreAndAutowaiter = function () {
  try {
    if (
      window.sap &&
      window.sap.ui.getCore &&
      window.sap.ui.getCore() &&
      !window.sap.ui.getCore().isLocked() &&
      !window.sap.ui.getCore().getUIDirty() &&
      document.readyState === "complete"
    ) {
      sap.ui.require([
        "sap/ui/test/_ControlFinder",
        "sap/ui/test/RecordReplay",
        "sap/base/Log"
      ], function (_ControlFinder, RecordReplay, Log) {
        // Use log globally
        window.Log = Log;
        // Attach RecordReplay globally
        if (RecordReplay) {
          window.RecordReplay = RecordReplay;
        } else {
          window.RecordReplay = null;
        }
        //Workaround until I get multiple results
        if (_ControlFinder) {
          window._ControlFinder = _ControlFinder;
        } else {
          // _findElements
          window._ControlFinder = null;
        }
      });
    }
    if (window.RecordReplay && window._ControlFinder && window.Log) {
      return true;
    }
    return false;
  } catch (oError) {
    return false;
  }
};

functions.loadUI5Page = function (mScriptParams) {
  return window.RecordReplay.waitForUI5({
    timeout: mScriptParams.waitForUI5Timeout,
    interval: mScriptParams.waitForUI5PollingInterval
  }).then(function () {
    window.Log.warning("Finish loading");
    // Can use also interactWithControl
    return true;
  }).catch(function (err) {
    return false;
  });
};

functions.waitForAngular = function (rootSelector, interval, callback) {

  var findBusyIndicator = function () {
    return Boolean(Array.from(document.getElementsByClassName("sapUiLocalBusyIndicator")).find(function (elem) {
      var rect = elem.getBoundingClientRect();
      var aModalDialog = Array.from(document.getElementsByClassName("sapMDialog"));
      var nModalCount = 0;
      if (aModalDialog && aModalDialog.length) {
        nModalCount = aModalDialog.length;
      }
      return (rect.x > 0 || rect.y > 0) && rect.width > 0 && rect.height > 0 && nModalCount === 0;
    }));
  };

  function defineTestCooperation() {
    var TestCooperation = function (oCore) {

      this._bSameTick = false;
      this.iPendingXHRs = 0;
      this.aDoNotTrack = [];
      this.aPendingCallbacks = [];
      this.oCore = oCore;

      this._wrapXHR();

      this.oCore.attachUIUpdated(this._tryToExecuteCallbacks);
    };

    // Constants for TestCooperation class
    TestCooperation.EXECUTE_CALLBACKS_REG_EXP = /_tryToExecuteCallbacks/;

    TestCooperation.prototype.notifyWhenStable = function (fnCallback) {
      if (this.isStable()) {
        fnCallback();
      } else {
        this.aPendingCallbacks.push(fnCallback);
      }
    };

    TestCooperation.prototype.isStable = function () {
      return (!this.oCore.getUIDirty() && this.aPendingCallbacks.length === 0);
    };

    TestCooperation.prototype._wrapXHR = function () {
      var that = this,
        fnOriginalSend = window.XMLHttpRequest.prototype.send;
      window.XMLHttpRequest.prototype.send = function () {
        this.addEventListener("readystatechange", function () {
          if (this.readyState == 4 && this.isTracked) {
            that.iPendingXHRs--;
            that._tryToExecuteCallbacks();
          }
        });
        this.isTracked = true;
        that.iPendingXHRs++;
        fnOriginalSend.apply(this, arguments);
      };
    };

    TestCooperation.prototype._tryToExecuteCallbacks = function () {
      if (!this._bSameTick) {
        var that = this;
        this._bSameTick = true;
        window.setTimeout(function () {
          if (!that.oCore.getUIDirty() && that.aPendingCallbacks.length > 0) {
            do {
              var fnCallback = that.aPendingCallbacks.shift();
              fnCallback();
            } while (!that.oCore.getUIDirty() && that.aPendingCallbacks.length > 0);
          }
          that._bSameTick = false;
        }, 0);
      }
    };

    return TestCooperation;
  }

  function waitForRendered() {
    if (
      window.sap &&
      window.sap.ui.getCore &&
      window.sap.ui.getCore() &&
      !window.sap.ui.getCore().isLocked() &&
      !window.sap.ui.getCore().getUIDirty() &&
      !findBusyIndicator() &&           // comment out in case of invisible busyIndicator (i.e. My Inbox) to prevent test getting stuck
      document.readyState == "complete"
    ) {
      callback();
    } else {
      window.setTimeout(waitForRendered, interval);
    }
  }

  var i = 0;
  function waitForFirstRendered(cb) {
    if (
      window.sap &&
      window.sap.ui.getCore &&
      window.sap.ui.getCore() &&
      !window.sap.ui.getCore().isLocked() &&
      !window.sap.ui.getCore().getUIDirty() &&
      !findBusyIndicator() &&          // comment out in case of invisible busyIndicator (i.e. My Inbox) to prevent test getting stuck
      document.readyState == "complete"
    ) {
      findui5Busy();
    } else {
      window.setTimeout(waitForFirstRendered, interval);
    }
  }

  function findui5Busy() {
    setTimeout(function () {
      if (!window.sap) {
        return window.setTimeout(waitForRendered, interval);
      }
      var oLcaTestCooperation = window.oLcaTestCooperation;
      if (!oLcaTestCooperation) {
        var LcaTestCooperation = window.TestCooperation || defineTestCooperation();
        /* eslint-disable-next-line no-redeclare */
        var oLcaTestCooperation = new LcaTestCooperation({
          getUIDirty: window.sap.ui.getCore().getUIDirty.bind(window.sap.ui.getCore()),
          attachUIUpdated: function () {

          }
        });
        window.oLcaTestCooperation = oLcaTestCooperation;
      }

      if (!oLcaTestCooperation.isStable()) {

        setTimeout(findui5Busy, interval);
      } else {
        window.setTimeout(waitForRendered, interval);
      }
    }, 10);
  }

  window.setTimeout(function () {
    waitForFirstRendered(findui5Busy);
  }, interval);






};

/* Publish all the functions as strings to pass to WebDriver's
* exec[Async]Script.  In addition, also include a script that will
* install all the functions on window (for debugging.)
*
* We also wrap any exceptions thrown by a clientSideScripts function
* that is not an instance of the Error type into an Error type.  If we
* don't do so, then the resulting stack trace is completely unhelpful
* and the exception message is just 'unknown error.'  These types of
* exceptins are the common case for dart2js code.  This wrapping gives
* us the Dart stack trace and exception message.
*/
var util = require("util");
var scriptsList = [];
var scriptFmt = (
  "try { return (%s).apply(this, arguments); }\n" +
  "catch(e) { throw (e instanceof Error) ? e : new Error(e); }");
for (var fnName in functions) {
  if (functions.hasOwnProperty(fnName)) {
    exports[fnName] = util.format(scriptFmt, functions[fnName]);
    scriptsList.push(util.format("%s: %s", fnName, functions[fnName]));
  }
}

exports.installInBrowser = (util.format(
  "window.clientSideScripts = {%s};", scriptsList.join(", ")));
