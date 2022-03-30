/* eslint-disable no-console */
/**
 * @class importExportData
 * Import data to be used in test specs from JSON files, or folders.
 * Export data to JSON files.
 */
import fs from 'fs-extra'
import path from "path";
import importExportDataUtil from "./dataExchangeUtil";

class DataExchange {

  /**
   * @function readParams
   * @description read the import and export params in the config file
   * @example await readParams();
   */

  async readParams () {

    if (!browser.config.params) {
      //nothing to do
      return;
    }
    if (!browser.params) {
      browser.params = browser.config.params;
    }
    const importParams = browser.params.import || {};

    // import
    // read folders, and subfolders if directory, otherwise read file
    const params = Object.keys(importParams);
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      // adjust file path if relative
      const fileOrDir = importExportDataUtil.getFileAbsPath(importParams[param]);
      // @ts-ignore
      const isFileReadable = await importExportDataUtil.isReadable(fileOrDir);
      if (isFileReadable) {
        // @ts-ignore
        await importExportDataUtil.readData(fileOrDir, [param]);
      } else {
        delete importParams[param];
        console.warn(
          `"${fileOrDir}" does not exist or is not readable. Please check path or permissions.`
        );
      }
    }

    // for export, create folders and files if not present

    // copy filenames, since the user will overwrite browser.params.export with data
    // the filenames are required to write the json data at end of session
    const exportParams = browser.params.export;
    if (!exportParams) {
      // nothing to export
      return;
    }

    browser.params.exportDataFiles = { ...exportParams };

    // if export file has data, should that be used?

    Object.keys(exportParams).forEach((param) => {
      browser.params.export[param] = null;
    });

  };
  /**
   * @function writeExportDataInTmpFile
   * @description write the data in browser.params.export into temporary files. The data
   * in these temporary files will be merged after all instances complete
   * @example await writeExportDataInTmpFile();
   */
  async writeExportDataInTmpFile () {
    if (!browser.params || !browser.params.exportDataFiles) {
      // no export data files in config.js, nothing to do
      return;
    }

    if (!process.env.TMP_EXPORT_PATH) {
      console.warn("Unexpected error - process.env.TMP_EXPORT_PATH not defined");
      return;
    }
    if (!browser.params.export) {
      console.warn("Unexpected error - browser.params.export not defined, no export data to be written out");
      return;
    }
    const date = new Date().getTime();

    const keyFileWithPath = path.join(process.env.TMP_EXPORT_PATH, date + ".exportDataFiles");

    try {
      await importExportDataUtil.outputJson(keyFileWithPath, browser.params.exportDataFiles, { spaces: 2 });
    } catch (err) {
      console.warn(`Could not write export key data in tmp file ${keyFileWithPath}`);
      console.warn(err);
    }
    const keys = Object.keys(browser.params.exportDataFiles);

    //use for loop so all files get written before promise is resolved
    for (let i = 0; i < keys.length; i++) {
      const param = keys[i];
      const fileWithPath = path.join(process.env.TMP_EXPORT_PATH, param + "." + date);

      const data = browser.params.export[param] || {};

      try {
        await fs.outputJson(fileWithPath, data, { spaces: 2 });
      } catch (err) {
        console.warn(`Could not write export data in tmp file ${fileWithPath}`);
        console.warn(err);
      }
    }
  };
  /**
   * @function writeExportData
   * @description write the data in browser.params.export into the assigned files. Reads the temporary 
   * files and merges the data.
   * @example await writeExportData();
   */
  async writeExportData () {
    if (!process.env.TMP_EXPORT_PATH) {
      console.warn("Unexpected error - process.env.TMP_EXPORT_PATH not defined");
      return;
    }

    let files;
    try {
      files = await fs.readdir(process.env.TMP_EXPORT_PATH);
    } catch (err) {
      console.warn(`Could not read export data in tmp folder ${process.env.TMP_EXPORT_PATH}`);
      console.warn(err);
      return;
    }

    files.sort();
    const exportData: any = {};
    let exportDataFiles: any = {};
    // loop through the files in sequence, for loop ensures all files are
    // read before we go to the next step
    for (const file of files) {
      const fileWithPath = path.resolve(process.env.TMP_EXPORT_PATH, file);
      try {
        const data = await importExportDataUtil.readJson(fileWithPath);
        // if no data (empty object or array) don't do anything
        if (!data || Object.keys(data).length <= 0) {
          continue;
        }
        const match = file.match(/^[0-9]+\.exportDataFiles$/);
        const keyMatch = file.match(/^(.*)\.[0-9]+$/);
        if (match) {
          exportDataFiles = data;
        } else {
          if (keyMatch && keyMatch.length > 1) {
            const key = keyMatch[1];
            if (key) {
              // if array join the elements
              if (Array.isArray(data) && (!exportData[key] || Array.isArray(exportData[key]))) {
                if (exportData[key]) {
                  exportData[key] = [...exportData[key], ...data];
                } else {
                  exportData[key] = [...data];
                }
              } else if (Array.isArray(data) && !exportData[key] && !Array.isArray(exportData[key])) {
                console.warn(`Unexpected array and non array data for export key ${key}`);
                exportData[key] = { ...exportData[key], ...data };
              } else {
                exportData[key] = { ...exportData[key], ...data };
              }
            }
          } else {
            console.warn(`Unexpected error - temporary export file ${fileWithPath} does not have timestamp in its name`);
          }
        }
      } catch (err) {
        console.warn(`Could not read export data in tmp file ${fileWithPath}`);
        console.warn(err);
      }
    }

    const keys = Object.keys(exportDataFiles);
    // use for loop to make sure all files are written before we remove the tmp folder
    for (const param of keys) {
      let fileWithPath = exportDataFiles[param];
      if (!fileWithPath) {
        console.warn(`Unexpected error - no file name for key ${param}`);
        continue;
      }
      // adjust relative file paths
      fileWithPath = importExportDataUtil.getFileAbsPath(fileWithPath);

      const data = exportData[param];
      try {
        await importExportDataUtil.outputJson(fileWithPath, data, { spaces: 2 });
      } catch (err) {
        console.warn(`Could not write export data to file, make sure that ${fileWithPath} is valid and writable`);
        console.warn(err);
      }
    }

    try {
      // remove tmp folder, ignore if this call fails
      await fs.remove(process.env.TMP_EXPORT_PATH);
    } catch (err) {
      console.warn(`Could not remove temporary folder ${process.env.TMP_EXPORT_PATH}`);

      console.warn(err);
    }

  };

};
module.exports = new DataExchange();
