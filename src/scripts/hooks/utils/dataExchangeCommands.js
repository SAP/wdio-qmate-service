/* eslint-disable no-console */
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const dataExchange = require("../../dataExchange/dataExchange");

async function createTmpDataFolder() {
  try {
    // create tmp folder name to store export data 
    const randomStr = "vyp-exp-" + Math.random().toString(16).substring(2, 10);
    const tmpDir = path.join(os.tmpdir(), randomStr);
    process.env.TMP_EXPORT_PATH = tmpDir;
    await fs.ensureDir(process.env.TMP_EXPORT_PATH);
  } catch (error) {
    // log and continue
    console.warn(`Failed to create tmp data folder`);
    console.warn(error);
  }
}

var DataFolderCommands = function () {
  this.createTmpDataFolder = createTmpDataFolder;
  this.readParams = dataExchange.readParams;
  this.writeExportDataInTmpFile = dataExchange.writeExportDataInTmpFile;
  this.writeExportData = dataExchange.writeExportData;
};

module.exports = new DataFolderCommands();