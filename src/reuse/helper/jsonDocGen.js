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
  fs.writeFileSync(`reuseApi.json`, resultString);
}

function getModules(namespace) {
  return fs.readdirSync(`${reuseRoot}/${namespace}`).filter(module => isValidModule(namespace, module));
}

function generateModuleDoc(namespace, module) {
  const fileContent = fs.readFileSync(`${reuseRoot}/${namespace}/${module}`, "utf-8");
  const regex = new RegExp(/\/\*\*(?:(?!\*\/)[\s\S])*@function([\s\S]*?)\*\//, "g");
  const jsDocs = fileContent.match(regex);
  for (const jsDoc of jsDocs) {
    parseAndUpdateModuleDoc(namespace, module, jsDoc);
  }
}

function parseAndUpdateModuleDoc(namespace, module, jsDoc) {
  try {
    parseAndWriteModuleDoc(namespace, module, jsDoc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error while generating JSON doc: ${err}. Namespace: ${namespace}; module: ${module}`);
  }
}

function parseAndWriteModuleDoc(namespace, module, jsDoc) {
  const ast = doctrine.parse(jsDoc, { unwrap: true, sloppy: true });
  reuseApiJson[namespace][module.slice(0, -3)] = formatAst(ast);
}

function formatAst(ast) {
  const tags = ast["tags"];
  const functionName = tags.find(tag => tag.title === "function").name;
  return {
    [functionName]: {
      type: tags.find(tag => tag.title === "example").description.includes("await") ? "async" : "sync",
      arguments: tags.filter(tag => tag.title === "param").map(tag => {
        return {
          name: tag.name,
          type: (tag.type && tag.type.name && tag.type.name.toLowerCase()) || "string",
          default: tag.default ? tag.default : null
        };
      })
    }
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
