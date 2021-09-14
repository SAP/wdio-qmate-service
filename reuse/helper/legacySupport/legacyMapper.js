const utils = require("./utils");

module.exports = function mapOldNamespacesToNewNamespaces() {
  const legacyMappingObjects = utils.getLegacyMappingObjects(__dirname + "/legacyMapper.json");
  for (let i = 0; i < legacyMappingObjects.length; i++) {
    const currentObject = legacyMappingObjects[i];
    const oldNamespace = currentObject.old;
    const newNamespace = currentObject.new;
    setGlobal(oldNamespace, newNamespace);
  }
};

function getGlobalObjectFor(namespace) {
  const namespaceParts = namespace.split(".");
  let currentGlobalValue = global;

  for (const i of namespaceParts) {
    const value = currentGlobalValue[i];
    currentGlobalValue = value;
  }

  return currentGlobalValue;
}

function getGlobalParentObjectFor(namespace) {
  const namespaceParts = namespace.split(".");
  namespaceParts.splice(-1, 1);
  namespace = namespaceParts.join(".");
  return getGlobalObjectFor(namespace);
}

function assignWrapperFunction(context, fct, oldNamespace, newNamespace) {
  return async function () {
    util.console.warn(`⚠  "${oldNamespace}" is deprecated. Please use "${newNamespace}" instead.`);
    return fct.call(context, ...arguments);
  };
}

function setGlobal(oldNamespace, newNamespace) {
  const newGlobalObject = getGlobalObjectFor(newNamespace);
  const namespaceParts = oldNamespace.split(".");
  let currentGlobalValue = global;

  for (const i in namespaceParts) {

    if (i < namespaceParts.length - 1) {
      if (!currentGlobalValue[namespaceParts[i]]) {
        currentGlobalValue[namespaceParts[i]] = {};
      }
      currentGlobalValue = currentGlobalValue[namespaceParts[i]];

    } else {
      if (typeof newGlobalObject === "object") {
        const newValue = {};
        for (const j in newGlobalObject) {
          const currentValue = newGlobalObject[j];
          if (typeof currentValue === "object") {
            const innerObject = {};
            for (const f in currentValue) {
              innerObject[f] = assignWrapperFunction(currentValue, currentValue[f], oldNamespace, newNamespace);
            }
            newValue[j] = innerObject;
          } else {
            newValue[j] = assignWrapperFunction(newGlobalObject, currentValue, oldNamespace, newNamespace);
          }
        }
        currentGlobalValue[namespaceParts[i]] = newValue;
      } else if (typeof newGlobalObject === "function") {
        const context = getGlobalParentObjectFor(newNamespace);
        currentGlobalValue[namespaceParts[i]] = assignWrapperFunction(context, newGlobalObject, oldNamespace, newNamespace);
      }
    }
  }
}