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
      navigation: require("./common/navigation.js")
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

function mapOldNamespacesToNewNamespaces () {
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
    setGlobalValue(oldNamespace, getGlobalValue(newNamespace));
  }
}

function getGlobalValue(namespace) {
  // split namespace into parts by dot
  const namespaceParts = namespace.split(".");
  // create a variable for navigating through global's values
  let currentGlobalValue = global;
  // loop through namespace parts
  for (let i = 0; i < namespaceParts.length; i++) {
    // get current global value for the namespace part
    const value = currentGlobalValue[namespaceParts[i]];
    // assign it to the current global value
    currentGlobalValue = value;
  }
  return currentGlobalValue;
}

function setGlobalValue(namespace, value) {
  // split namespace into parts by dot
  const namespaceParts = namespace.split(".");
  // create a variable for navigating through global's values
  let currentGlobalValue = global;
  // loop through namespace parts
  for (let i = 0; i < namespaceParts.length; i++) {
    // if this is the last namespace part
    if (i === namespaceParts.length - 1) {
      // assign value to the namespace
      currentGlobalValue[namespaceParts[i]] = value;
    } else {
      // in case current global value for the namespace is undefined
      if (!currentGlobalValue[namespaceParts[i]]) {
        currentGlobalValue[namespaceParts[i]] = {};
      }
      // use value for the namespace part as a currentGlobalValue in further steps
      currentGlobalValue = currentGlobalValue[namespaceParts[i]];
    }
  }
}