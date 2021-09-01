/* eslint-disable no-console */
"use strict";

const glob = require("glob");
const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

const basePath = path.resolve(__dirname);
const filesToInclude = `${basePath}\\**\\*.js`;

function generateDoc() {
  glob(filesToInclude, async (err, files) => {

    if (err) {
      throw err;
    }
    console.log(files);

    let markdownFile;
    try {
      markdownFile = await jsdoc2md.render({
        "files": files
      });
    } catch (error) {
      console.log("\x1b[33m%s\x1b[0m", `Error while rendering the files. Please investigate.`);
      console.error(error);
      return;
    }

    fs.writeFile(basePath + "/doc.md", markdownFile, (err) => {
      if (err) {
        throw err;
      }
    });

  });
}

generateDoc();