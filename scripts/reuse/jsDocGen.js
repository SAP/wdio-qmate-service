"use strict";

const glob = require("glob");
const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");
var sBasePath = path.resolve(__dirname);
var sOutPath = path.resolve(__dirname, "..", "..", "documentation");
glob(sBasePath + "/**/*.js", function (err, files) {
  if (files && files.length > 0) {
    files = files.filter((file) => {
      return file.indexOf("jsDocGen") === -1 &&
        file.indexOf("clientsideUI5scripts") === -1;
    });
  }
  jsdoc2md.render({
    "files": files
  }).then(function (markdownString) {
    fs.writeFile(sOutPath + "/doc.md", markdownString, (err) => {
      if (err) {
        throw err;
      }
      console.log("The file has been saved!");
    });
  });
});
