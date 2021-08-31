"use strict";

const fs = require("fs");

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global common
     * @description Global namespace for common modules.
     */
    const common = {
      userInteraction: require("./common/userInteraction.js"),
      assertion: require("./common/assertion.js"),
      navigation: require("./common/navigation.js"),
      console: require("./common/console.js")
    };
    global.common = {
      ...common,
      ...global.common
    };

    /**
     * @global ui5
     * @description Global namespace for UI5 modules.
     */
    const ui5 = {
      userInteraction: require("./ui5/userInteraction.js"),
      assertion: require("./ui5/assertion.js"),
      navigation: require("./ui5/navigation.js"),
      element: require("./ui5/element.js")
    };
    global.ui5 = {
      ...ui5,
      ...global.ui5
    };

    /**
     * @global nonUi5
     * @description Global namespace for non UI5 modules.
     */
    const nonUi5 = {

    };
    global.nonUi5 = {
      ...global.nonUi5,
      ...nonUi5
    };

    mapOldNamespacesToNewNamespaces();
  };
};
module.exports = new ReuseLibrary();


function mapOldNamespacesToNewNamespaces() {
  let legacyMappingFile;
  try {
    legacyMappingFile = fs.readFileSync(__dirname + "/legacyMapping.json");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Unable to read from legacyMapping file. Error: ", e);
  }
  const legacyMappingObjects = JSON.parse(legacyMappingFile);
  for (let i = 0; i < legacyMappingObjects.length; i++) {
    const currentObject = legacyMappingObjects[i];
    const oldNamespace = currentObject.old;
    const newNamespace = currentObject.new;
    setGlobalValue(oldNamespace, getGlobalValue(newNamespace), newNamespace);
  }
}

function getGlobalValue(namespace) {
  const namespaceParts = namespace.split(".");
  let currentGlobalValue = global;
  for (let i = 0; i < namespaceParts.length; i++) {
    const value = currentGlobalValue[namespaceParts[i]];
    currentGlobalValue = value;
  }
  return currentGlobalValue;
}

function setGlobalValue(oldNamespace, value, newNamespace) {
  const namespaceParts = oldNamespace.split(".");
  let currentGlobalValue = global;
  for (let i = 0; i < namespaceParts.length; i++) {
    if (i === namespaceParts.length - 1) {

      const newValue = {};
      for (const f in value) {
        const currentFct = value[f];
        newValue[f] = function () {
          common.console.warn(`Namespace "${oldNamespace}" is deprecated. Please use "${newNamespace}" instead.`);
          currentFct(arguments[0], arguments[1], arguments[2], arguments[3]);
        };
      }
      currentGlobalValue[namespaceParts[i]] = newValue;

    } else {
      if (!currentGlobalValue[namespaceParts[i]]) {
        currentGlobalValue[namespaceParts[i]] = {};
      }
      currentGlobalValue = currentGlobalValue[namespaceParts[i]];
    }
  }
}