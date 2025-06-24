// Imports
const { build } = require("esbuild");
const prettier = require("prettier");
const path = require("path");
const fs = require("fs");

// Configuration
const sharedConfig = {
  entryPoints: [path.resolve(__dirname, "index.ts")],
  bundle: true,
  minify: false
};
const qmateLocatorPath = path.resolve(__dirname, "../qmateLocator.js");

// Main Logic
async function buildAsync(config) {
  await _buildFile();

  const fileContent = _readQmateLocatorFile();
  const modifiedContent = _removeExportStatement(fileContent);
  const wrappedContent = _wrapContent(modifiedContent);
  const formatted = await _formatContent(wrappedContent);

  _writeFile(formatted);
}

// Helper
async function _buildFile() {
  await build({
    ...sharedConfig,
    platform: "browser",
    format: "esm",
    outfile: qmateLocatorPath
  });
}

function _readQmateLocatorFile() {
  return fs.readFileSync(qmateLocatorPath, "utf-8");
}

function _removeExportStatement(fileContent) {
  const exportRegex = /export\s+\{\s*locate\s*\};/;
  const modifiedContent = fileContent.replace(exportRegex, "");
  return modifiedContent;
}

function _wrapContent(fileContent) {
  return `/* eslint-disable no-undef */
/* eslint-disable no-console */
module.exports = {
  ui5All: function ui5All(ui5Selector, index, opt_parentElement) {
    ${fileContent}
    return locate(ui5Selector, index, opt_parentElement);
  }
}
`;
}

async function _formatContent(wrappedContent) {
  return prettier.format(wrappedContent, {
    filepath: qmateLocatorPath
  });
}

function _writeFile(fileContent) {
  fs.writeFileSync(qmateLocatorPath, fileContent);
}

// Call the build function
buildAsync(sharedConfig);
