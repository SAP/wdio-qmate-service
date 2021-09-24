/* eslint-disable no-console */
const fs = require("fs");
const utils = require("./utils");
const yargs = require("yargs");
const path = require("path");

const defaultPathsToIgnore = [
  "node_modules",
  ".git",
  "reports",
  "results",
  ".PNG",
  ".png",
  "package.json",
  "package-lock.json",
  ".yml",
  ".JPG",
  ".jpg",
  ".doc",
  ".pdf",
  ".xls",
  ".pptx",
  ".txt"
];

const argv = yargs
  .option("pathsToIgnore", {
    type: "array",
    alias: "ignore",
    desc: "Paths, file names and file name parts to ignore when updating namespaces",
    default: defaultPathsToIgnore
  })
  .help()
  .alias("help", "h")
  .argv;

const fileOrFolderPathFromCli = argv._[0] || "";
const pathsToIgnore = defaultPathsToIgnore.concat(argv.pathsToIgnore);

const fileOrFolderPath = path.resolve(process.cwd(), fileOrFolderPathFromCli);
const legacyMappingObjects = utils.getLegacyMappingObjects(__dirname + "/legacyMapper.json");
const sortedLegacyMappingObjects = sortLegacyMappingObjects(legacyMappingObjects);
replaceOldNamespacesWithNewNamespacesInFolderOrFile(fileOrFolderPath, sortedLegacyMappingObjects);

function replaceOldNamespacesWithNewNamespacesInFolderOrFile (fileOrFolderPath, legacyMappingObjects) {
  let fileOrFolderLstat;
  try {
    fileOrFolderLstat = fs.lstatSync(fileOrFolderPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Error: File or folder with path ${fileOrFolderPath} does not exist`);
      process.exit();
    } else {
      throw err;
    }
  }
  if (fileOrFolderPathIncludesIgnoredPath(fileOrFolderPath)) {
    return;
  }
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
    const oldNamespaceRegexp = new RegExp(
      `[^\.]${legacyMappingObjects[i].old.replace(
        new RegExp("\\.", "g"), "\\."
      )}`,
      "g");
    const newNamespace = legacyMappingObjects[i].new;
    fileContent = fileContent.replace(oldNamespaceRegexp, (match) => {
      return `${match.charAt(0)}${newNamespace}`;
    });
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

function fileOrFolderPathIncludesIgnoredPath(fileOrFolderPath) {
  return pathsToIgnore.some( folderName => fileOrFolderPath.includes( folderName ));
}