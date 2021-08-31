const fs = require("fs");

module.exports = function mapOldNamespacesToNewNamespaces() {
  let legacyMappingFile;
  try {
    legacyMappingFile = fs.readFileSync(__dirname + "/legacyMapper.json");
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
};

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

      if (typeof value === "object") {
        const newValue = {};
        for (const f in value) {
          const currentFct = value[f];
          newValue[f] = function () {
            common.console.warn(`Namespace "${oldNamespace}" is deprecated. Please use "${newNamespace}" instead.`);
            currentFct(arguments[0], arguments[1], arguments[2], arguments[3]);
          };
        }
        currentGlobalValue[namespaceParts[i]] = newValue;
      } else if (typeof value === "function") {
        currentGlobalValue[namespaceParts[i]] = function () {
          common.console.warn(`Function "${oldNamespace}" is deprecated. Please use "${newNamespace}" instead.`);
          value(arguments[0], arguments[1], arguments[2], arguments[3]);
        };
      }

    } else {
      if (!currentGlobalValue[namespaceParts[i]]) {
        currentGlobalValue[namespaceParts[i]] = {};
      }
      currentGlobalValue = currentGlobalValue[namespaceParts[i]];
    }
  }
}