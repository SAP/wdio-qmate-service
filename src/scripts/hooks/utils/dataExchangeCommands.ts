/* eslint-disable no-console */
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
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

class DataFolderCommands {
  createTmpDataFolder = createTmpDataFolder;
  readParams = dataExchange.readParams;
  writeExportDataInTmpFile = dataExchange.writeExportDataInTmpFile;
  writeExportData = dataExchange.writeExportData;
};

export default new DataFolderCommands();