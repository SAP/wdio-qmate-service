/* eslint-disable no-console */
"use strict";

const { glob } = require("glob");
const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

const readPath = path.join(__dirname, "../");
const writePath = path.join(__dirname, "../../../docs");

const filesToInclude = `**/*.{js,ts}`;

async function generateDoc() {
  try {
    const files = await glob(filesToInclude, { cwd: readPath });
    files.sort();
    console.log(files);

    const markdownFile = await jsdoc2md.render({
      files: files.map((file) => path.join(readPath, file))
    });

    fs.writeFile(path.join(writePath, "doc.md"), markdownFile, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log("The file has been saved.");
    });
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", `Error while rendering the files. Please investigate.`);
    console.error(error);
  }
}

generateDoc();
