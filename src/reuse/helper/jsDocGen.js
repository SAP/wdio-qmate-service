/* eslint-disable no-console */
"use strict";

const glob = require("glob");
const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

const readPath = path.join(__dirname, "../");
const writePath = path.join(__dirname, "../../documentation");

const filesToInclude = `{index.js,modules/**/*.js}`;

function generateDoc() {
  glob(readPath + filesToInclude, async (err, files) => {

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

    fs.writeFile(writePath + "/doc.md", markdownFile, (err) => {
      if (err) {
        throw err;
      }
      console.log("The files has been saved.");
    });

  });
}

generateDoc();