const yargs = require("yargs");
const fs = require("fs");

const options = yargs
  .usage("Usage: -f <file_or_folder>")
  .option("f", { alias: "fileOrFolder", describe: "File or folder with old specs", type: "string", demandOption: true })
  .argv;

const fileOrFolderPath = `${process.cwd()}/${options.fileOrFolder}`;
const legacyMappingObjects = getLegacyMappingObjects();
mapLegacyNamespacesToNewNamespaces(fileOrFolderPath, legacyMappingObjects);

function mapLegacyNamespacesToNewNamespaces (fileOrFolderPath, legacyMappingObjects) {
  const fileOrFolderLstat = fs.lstatSync(fileOrFolderPath);
  if (fileOrFolderLstat.isFile()) {
    mapLegacyNamespacesToNewOnesInFile(fileOrFolderPath, legacyMappingObjects);
  } else if (fileOrFolderLstat.isDirectory()) {
    fs.readdirSync(fileOrFolderPath).forEach(file => {
      mapLegacyNamespacesToNewNamespaces(`${fileOrFolderPath}/${file}`, legacyMappingObjects);
    });
  }
}

function mapLegacyNamespacesToNewOnesInFile (filePath, legacyMappingObjects) {
  let fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  for (let i = 0; i < legacyMappingObjects.length; i++) {
    const oldNamespace = legacyMappingObjects[i].old;
    const newNamespace = legacyMappingObjects[i].new;
    const oldNamespaceRegexp = new RegExp(`${oldNamespace}`, "g");
    fileContent = fileContent.replace(oldNamespaceRegexp, newNamespace);
  }
  fs.writeFileSync(filePath, fileContent);  
}

function getLegacyMappingObjects () {
  let legacyMappingFile;
  try {
    legacyMappingFile = fs.readFileSync(__dirname + "/legacyMapper.json");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Unable to read from legacyMapping file. Error: ", e);
  }
  return JSON.parse(legacyMappingFile);
}
