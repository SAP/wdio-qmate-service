const { build } = require("esbuild");
const prettier = require("prettier");
const path = require("path");


const sharedConfig = {
  entryPoints: [path.resolve(__dirname,"index.ts")],
  bundle: true,
  minify: false
};
async function buildAsync(config) {
  await build({
    ...sharedConfig,
    platform: "browser",
    format: "esm",
    outfile: path.resolve(__dirname,"../qmateLocator.js")
  });

  // open file and wrap it in a function
  const fs = require("fs");
  const filedContent = fs.readFileSync(path.resolve(__dirname, "../qmateLocator.js"), "utf-8");
  // remove the export statement "export {
  //  locate
  //};" at the end of the file
  const exportRegex = /export\s+\{\s*locate\s*\};/;
  const modifiedContent = filedContent.replace(exportRegex, "");
  const wrappedContent =
    "/* eslint-disable no-undef */\n" +
    "/* eslint-disable no-console */\n" +
    "module.exports = { \n ui5All: function ui5All(ui5Selector, index, opt_parentElement) {\n" +
    modifiedContent +
    "\n" +
    "return locate(ui5Selector, index, opt_parentElement);\n" +
    "}\n}\n";
  const options = await prettier.resolveConfig(path.resolve(__dirname, "../qmateLocator.js"));
  const formatted = await prettier.format(wrappedContent, {
    filepath: path.resolve(__dirname, "../qmateLocator.js")
  });
  fs.writeFileSync(path.resolve(__dirname, "../qmateLocator.js"), formatted);

}
buildAsync(sharedConfig);
