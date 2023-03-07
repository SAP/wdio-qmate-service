// get root folder
const basePath = require("app-root-path");
const fs= require("fs");
const doctrine = require("doctrine");

const reuseRoot = `${basePath}/lib/reuse/modules`;
const namespacesToExclude = ["runtime"];
const modulesToExclude = ["soap.js"];

const reuseApiJson = {};
const namespaces = getNamespaces();
for (const namespace of namespaces) {
  generateNamespaceDoc(namespace);
}
writeJsonDoc();

function getNamespaces() {
  return fs.readdirSync(reuseRoot).filter(namespace => isValidNamespace(namespace));
}

function generateNamespaceDoc(namespace) {
  reuseApiJson[namespace] = {};
  const modules = getModules(namespace);
  for (const module of modules) {
    generateModuleDoc(namespace, module);
  }
}

function writeJsonDoc() {
  const resultString = JSON.stringify(reuseApiJson, null, 2);
  const jsonDocPath = "reuseApi.json";
  fs.writeFileSync(jsonDocPath, resultString);
  // eslint-disable-next-line no-console
  console.log(`Saved generated result in '${jsonDocPath}'`);
}

function getModules(namespace) {
  return fs.readdirSync(`${reuseRoot}/${namespace}`)
    .filter(module => isValidModule(namespace, module))
    .map(module => removeJsFileExtension(module));
}

function generateModuleDoc(namespace, module) {
  const fileContent = fs.readFileSync(`${reuseRoot}/${namespace}/${module}.js`, "utf-8");
  const regex = new RegExp(/\/\*\*(?:(?!\*\/)[\s\S])*@function([\s\S]*?)\*\//, "g");
  const jsDocs = fileContent.match(regex);
  reuseApiJson[namespace][module] = {};
  for (const jsDoc of jsDocs) {
    parseAndUpdateModuleDoc(namespace, module, jsDoc);
  }
}

function removeJsFileExtension(fileName) {
  return fileName.slice(0, -3);
}

function parseAndUpdateModuleDoc(namespace, module, jsDoc) {
  try {
    parseAndWriteModuleDoc(namespace, module, jsDoc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error while generating JSON doc for namespace: '${namespace}' and module '${module}': ${err}`);
  }
}

function parseAndWriteModuleDoc(namespace, module, jsDoc) {
  const ast = doctrine.parse(jsDoc, { unwrap: true, sloppy: true });
  const functionName = getFunctionName(ast);
  if (functionName) {
    reuseApiJson[namespace][module][functionName] = formatAst(functionName, ast);
  }
}

function getFunctionName(ast) {
  const tags = ast["tags"];
  if (!tags.length) {
    return null;
  }
  return tags.find(tag => tag.title === "function").name;
}

function formatAst(functionName, ast) {
  const tags = ast["tags"];
  return {
    type: tags.find(tag => tag.title === "example").description.includes("await") ? "async" : "sync",
    arguments: tags.filter(tag => tag.title === "param").map(tag => {
      return {
        name: tag.name,
        type: (tag.type && tag.type.name && tag.type.name.toLowerCase()) || "string",
        default: tag.default ? tag.default : null
      };
    })
  };
}

function isValidNamespace(namespace) {
  return fs.statSync(`${reuseRoot}/${namespace}`).isDirectory()
    && !namespacesToExclude.includes(namespace);
}

function isValidModule(namespace, module) {
  return fs.statSync(`${reuseRoot}/${namespace}/${module}`).isFile()
    && !modulesToExclude.includes(module)
    && module.slice(-3) === ".js"
    && !startsWithCapital(module);
}

function startsWithCapital(word){
  return word.charAt(0) === word.charAt(0).toUpperCase();
}
