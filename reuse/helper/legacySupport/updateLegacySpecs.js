const fs = require("fs");
const utils = require("./utils");

const fileOrFolderPath = process.argv[2];
const legacyMappingObjects = utils.getLegacyMappingObjects(__dirname + "/legacyMapper.json");
const sortedLegacyMappingObjects = sortLegacyMappingObjects(legacyMappingObjects);
replaceOldNamespacesWithNewNamespacesInFolderOrFile(fileOrFolderPath, sortedLegacyMappingObjects);

function replaceOldNamespacesWithNewNamespacesInFolderOrFile (fileOrFolderPath, legacyMappingObjects) {
  const fileOrFolderLstat = fs.lstatSync(fileOrFolderPath);
  if (fileOrFolderLstat.isFile()) {
    replaceOldNamespacesWithNewNamespacesInFile(fileOrFolderPath, legacyMappingObjects);
  } else if (fileOrFolderLstat.isDirectory()) {
    fs.readdirSync(fileOrFolderPath).forEach(file => {
      replaceOldNamespacesWithNewNamespacesInFolderOrFile(`${fileOrFolderPath}/${file}`, legacyMappingObjects);
    });
  }
}

function replaceOldNamespacesWithNewNamespacesInFile (filePath, legacyMappingObjects) {
  let fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  for (let i = 0; i < legacyMappingObjects.length; i++) {
    const oldNamespace = legacyMappingObjects[i].old;
    const newNamespace = legacyMappingObjects[i].new;
    const oldNamespaceRegexp = new RegExp(`${oldNamespace}`, "g");
    fileContent = fileContent.replace(oldNamespaceRegexp, newNamespace);
  }
  fs.writeFileSync(filePath, fileContent);  
}

function sortLegacyMappingObjects (mappingObjects) {
  return mappingObjects.sort((objectA, objectB) => {
    const namespacePartsCountA = getNumberOfNamespaceParts(objectA.old);
    const namespacePartsCountB = getNumberOfNamespaceParts(objectB.old);
    return namespacePartsCountB - namespacePartsCountA;
  });
}

function getNumberOfNamespaceParts (namespace) {
  return namespace.split(".").length;
}