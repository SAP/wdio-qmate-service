/* eslint-disable no-console */
const fs = require("fs-extra");
const path = require("path");
const dataExchangeUtil = require("../../../lib/scripts/dataExchange/dataExchangeUtil");

/** 
 * Utility functions for regression testing of import and export of data.
 * These read data from folders and files, and check against imported data.
 * Or make data from file available for export.
 * 
 */
const utilsMethods = {

  /**
   * @function checkImportFolder - check if json files and subfolders in specified folderPath
   *    have been imported under the specified key.
   * @param {string} folderPath - the folder to read
   * @param {string} paramName - the key to check against
   * @example const myFolder1 = "./data/my/folder/data/<systemName>";
   * await utils.checkImportFolder(myFolder1, "myFolder1");
   *  
   */
  checkImportFolder: async function (folderPath, paramName) {
    folderPath = dataExchangeUtil.getFileAbsPath(folderPath);
    let files = [];
    try {
      files = await fs.readdir(folderPath, { withFileTypes: true });
    } catch (err) {
      console.error(err);
      await common.assertion.expectEqual(true, false);
    }
    // filter out json files
    const jsonFiles = files.filter((file) => !file.isDirectory() && file.name.match(/\.json$/) !== null);
    const jsonFilePrefixes = jsonFiles.map(file => file.name.replace(/^(.*)\.json$/, "$1"));
    const nonJsonFiles = files.filter((file) => !file.isDirectory() && file.name.match(/\.json$/) === null);
    const nonJsonFilePrefixes = nonJsonFiles.map(file => file.name.replace(/^(.*)\.*$/, "$1"));

    // get the subfolders
    let subfolders = files.filter((file) => file.isDirectory());
    subfolders = subfolders.map(file => file.name);

    // check if the json files have been loaded into browser.params.import
    const browserParamKeys = Object.keys(browser.params.import[paramName]);

    for (let i = 0; i < jsonFilePrefixes.length; i++) {
      const prefix = jsonFilePrefixes[i];
      await common.assertion.expectUnequal(browserParamKeys.indexOf(prefix), -1);
    }

    // check if non json files are absent in browser.params.import
    for (let i = 0; i < nonJsonFilePrefixes.length; i++) {
      const prefix = nonJsonFilePrefixes[i];
      await common.assertion.expectEqual(browserParamKeys.indexOf(prefix), -1);
    }

    //check if subfolders are present
    for (let i = 0; i < subfolders.length; i++) {
      const folder = subfolders[i];
      await common.assertion.expectUnequal(browserParamKeys.indexOf(folder), -1);
    }
  },

  /**
   * @function checkImportedData - check if data from json file specified by jsonFilePrefix under
   * folderPath has been added using the params key. In the example below data from 
   * "./data/my/folder/data/<systemName>/subfolder/LimitPurchaseOrder.json" is checked if present in
   * browser.params.import.myFolder1.subfolder.LimitPurchaseOrder
   * @param {string} folderPath - the folder path
   * @param {string[]} params - array of keys
   * @param {string} jsonFilePrefix - the prefix of json file.
   * @example const myFolder1 = "./data/my/folder/data/<systemName>";
   * await utils.checkImportedData(myFolder1, ["myFolder1","subfolder"], "LimitPurchaseOrder");
   */
  checkImportedData: async function (folderPath, params, jsonFilePrefix) {
    folderPath = dataExchangeUtil.getFileAbsPath(folderPath);

    //include subfolders
    params.forEach((param, idx) => {
      if (idx > 0) folderPath = path.resolve(folderPath, param);
    });
    const fileWithPath = path.resolve(folderPath, jsonFilePrefix + ".json");
    let data;
    try {
      data = await dataExchangeUtil.readJson(fileWithPath);
    } catch (err) {
      console.error(err);
      await common.assertion.expectEqual(true, false);
    }

    let importedData = browser.params.import;
    params.forEach(param => {
      importedData = importedData[param] || {};
    });
    //check if the json files have been loaded into browser.params.import
    importedData = importedData[jsonFilePrefix];
    //can't find a method in ui5.assertion to check if two JSON objects match
    // await common.assertion.expectEqual(importedData, data);
    await expect(importedData).toEqual(data);

  },
  /**
   * @function checkImportedDataFromFile - check if data from specified file is available under
   * the specified key
   * @param {string} fileWithPath - file with path
   * @param {string} paramName - the key to use
   * @example const yourPrefixSpecName = "./data/my/folder/data/<systemName>/data.json";
   * await await utils.checkImportedDataFromFile(yourPrefixSpecName, "yourPrefixSpecName");
   */
  checkImportedDataFromFile: async function (fileWithPath, paramName) {
    fileWithPath = dataExchangeUtil.getFileAbsPath(fileWithPath);

    let data;
    try {
      data = await dataExchangeUtil.readJson(fileWithPath);
    } catch (err) {
      console.error(err);
      await common.assertion.expectEqual(true, false);
    }

    //check if the json files have been loaded into browser.params.import
    const importedData = browser.params.import[paramName];
    // await common.assertion.expectEqual(importedData, data);
    await expect(importedData).toEqual(data);

  },

  /**
   * @function exportData - copy data in json file specified by jsonFilePrefix, in specifed folderPath
   * to browser.params.export under key specified by exportParamName
   * @param {string} folderPath - the folder path
   * @param {string} jsonFilePrefix - the json file prefix
   * @param {string} exportParamName - the key to use. In the example below, browser.params.export.exportMoreData
   * will have data from "./data/my/folder/data/anotherFolder/subfolder/ServicePurchaseOrder.json", which
   * at the end of the test run will be written to "./data/my/folder/path/in/moreDataFile.json"
   * @example const exportMoreData = "./data/my/folder/path/in/moreDataFile.json";
   * const subfolder = "./data/my/folder/data/anotherFolder/subfolder";
   * await utils.exportData(subfolder, "ServicePurchaseOrder", "exportMoreData");
   */
  exportData: async function (folderPath, jsonFilePrefix, exportParamName) {
    folderPath = dataExchangeUtil.getFileAbsPath(folderPath);

    const fileWithPath = path.resolve(folderPath, jsonFilePrefix + ".json");
    let data;
    try {
      data = await dataExchangeUtil.readJson(fileWithPath);
    } catch (err) {
      console.error(err);
      await common.assertion.expectEqual(true, false);
    }

    // assign data to browser.params.export, so that it gets written to export file
    // at end of test. 
    // make sure any other data previously in browser.params.export 
    // against the specified key are not lost,
    // unless you really don't  want them
    browser.params.export[exportParamName] = { ...browser.params.export[exportParamName], ...data };

  }
};
module.exports = utilsMethods;