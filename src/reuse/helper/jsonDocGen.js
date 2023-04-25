/* eslint-disable no-console */
// get root folder
const basePath = require("app-root-path");
const fs = require("fs");
const doctrine = require("doctrine");

const namespacesToExclude = ["runtime"];

const reuseRoot = `${basePath}/lib/reuse/modules`;
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
  console.log(`Saved generated result in '${jsonDocPath}'`);
}

function isValidNamespace(namespace) {
  return fs.statSync(`${reuseRoot}/${namespace}`).isDirectory()
    && !namespacesToExclude.includes(namespace);
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

function isValidModule(namespace, module) {
  return fs.statSync(`${reuseRoot}/${namespace}/${module}`).isFile()
    && module.slice(-3) === ".js"
    && !startsWithCapital(module);
}

function removeJsFileExtension(fileName) {
  return fileName.slice(0, -3);
}

function parseAndUpdateModuleDoc(namespace, module, jsDoc) {
  try {
    parseAndWriteModuleDoc(namespace, module, jsDoc);
  } catch (err) {
    console.error(`Error while generating JSON doc for namespace: '${namespace}' and module: '${module}': ${err}`);
  }
}

function startsWithCapital(word){
  return word.charAt(0) === word.charAt(0).toUpperCase();
}

function parseAndWriteModuleDoc(namespace, module, jsDoc) {
  const functionAst = doctrine.parse(jsDoc, { unwrap: true, sloppy: true });
  const functionName = getFunctionName(functionAst);
  if (functionName) {
    reuseApiJson[namespace][module][functionName] = formatFunctionAst(functionAst);
  }
}

function getFunctionName(ast) {
  const tags = ast["tags"];
  if (!tags.length) {
    return null;
  }
  return tags.find(tag => tag.title === "function").name;
}

function formatFunctionAst(ast) {
  const tags = ast["tags"];
  return {
    type: getFunctionType(tags),
    arguments: getArguments(tags),
    returnType: getReturnType(tags)
  };
}

function getFunctionType(tags) {
  return tags.find(tag => tag.title === "example").description.includes("await") ? "async" : "sync";
}

function getArguments(tags) {
  return tags.filter(tag => tag.title === "param").map(tag => {
    return mapTagToArgument(tag);
  });
}

function getReturnType(tags) {
  const returnTags = tags.filter(tag => tag.title === "returns");
  if (!returnTags.length) {
    return undefined;
  }
  return parseReturnTypeFromReturnTag(returnTags[0]);
}

function mapTagToArgument(tag) {
  return {
    name: tag.name,
    type: getArgumentType(tag),
    default: getArgumentDefaultValue(tag)
  };
}

function parseReturnTypeFromReturnTag(tag) {
  if (tag.type.name) {
    return tag.type.name.toLowerCase();
  }
  if (tag.type.expression) {
    return tag.type.expression.name.toLowerCase();
  }
  return undefined;
}

function getArgumentType(tag) {
  if (cannotParseArgumentTypeFromTag(tag)) {
    return "string";
  }
  if (canParseArgumentTypeFromTagName(tag)) {
    return parseArgumentTypeFromTagName(tag);
  } else if (canParseArgumentTypeFromTagExpression(tag)) {
    return parseArgumentTypeFromTagExpression(tag);
  }
}

function getArgumentDefaultValue(tag) {
  if (!tag.default) {
    return null;
  }
  return getArgumentDefaultValueBasedOnType(tag);
}

function cannotParseArgumentTypeFromTag(tag) {
  return !canParseArgumentTypeFromTag(tag);
}

function canParseArgumentTypeFromTag(tag) {
  return tag.type
    && (canParseArgumentTypeFromTagName(tag)
      || canParseArgumentTypeFromTagExpression(tag));
}

function canParseArgumentTypeFromTagName(tag) {
  return !!tag.type.name;
}

function parseArgumentTypeFromTagName(tag) {
  return tag.type.name.toLowerCase();
}

function canParseArgumentTypeFromTagExpression(tag) {
  return tag.type.expression && tag.type.expression.name;
}

function parseArgumentTypeFromTagExpression(tag) {
  return tag.type.expression.name.toLowerCase();
}

function getArgumentDefaultValueBasedOnType(tag) {
  const type = getArgumentType(tag);
  if (type === "number") {
    return parseInt(tag.default);
  }
  if (type === "boolean") {
    return Boolean(tag.default);
  }
  return tag.default;
}
