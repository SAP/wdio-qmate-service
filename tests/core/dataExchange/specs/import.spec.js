/** 
 * Regression testing of data import, checks if data loaded into browser.params.import
 * match the actual data in the files. 
 */

// using chai assertion framework in this spec (instead of the default which is "jest"),
// since jest is not available inside the outer "describe" block
const { assert } = require("chai");

const utils = require("../utils.js");

describe("Import Data", function () {

  // load the actual files for comparison against data imported by import, export module in
  // importExportData.js 
  // Refer to config.import.js
  // params : {
  //   import: {            // Verzeichnis Pfad             
  //     myFolder1: "./data/my/folder/data/qs9",
  //     myFolder2: "data/another/folder/data/anotherFolder",
  //     myMissingFolder: "./data/my/folder/missing",
  //     // Eine Datei Pfad (Best Practice should be the same as the script) .....             
  //     yourPrefixSpecName: "./data/my/folder/data/qs9/data.json",
  //     missingFile: "./data/my/folder/missingFile.json",
  //     invalidJsonFile: "./data/my/folder/invalid.json",
  //     uiUser: "./data/my/folder/data/qs9/webUser.json",
  //     emptyObject: "./data/my/folder/data/qs9/empty.json"
  //   },
  // }
  const myFolder1 = "./data/my/folder/data/qs9";
  const myFolder2 = "data/another/folder/data/anotherFolder";
  const yourPrefixSpecName = "./data/my/folder/data/qs9/data.json";
  const uiUser = "./data/my/folder/data/qs9/webUser.json";

  // regression test to check that data has been imported in 
  // beforeSession hook
  // check if data is available in "describe" and not in "it" block
  assert(browser.params.import.myFolder1, "myFolder1 not imported");
  assert(browser.params.import.myFolder2, "myFolder2 not imported");

  it("step 1: check presence of import config params", async function () {

    // folders and valid json files should be loaded
    // missing or inaccessible folders, non-json files, and invalid json files
    // should not be loaded
    await common.assertion.expectDefined(browser.params.import.myFolder1);
    await common.assertion.expectDefined(browser.params.import.myFolder2);
    await common.assertion.expectUndefined(browser.params.import.myMissingFolder);
    await common.assertion.expectDefined(browser.params.import.yourPrefixSpecName);
    await common.assertion.expectUndefined(browser.params.import.missingFile);
    await common.assertion.expectUndefined(browser.params.import.invalidJsonFile);
    await common.assertion.expectDefined(browser.params.import.uiUser);
    await common.assertion.expectEqual(browser.params.import.emptyObject === null, true);

  });

  it("step 2: check if files in 'myFolder1' folder are read", async function () {
    // check if json files and subfolders in myFolder1 (i.e. "./data/my/folder/data/qs9")
    // are read and added to browser.params.import.myFolder1
    await utils.checkImportFolder(myFolder1, "myFolder1");

  });

  it("step 3: check if files in 'myFolder2' folder are read", async function () {
    // check if json files and subfolders in myFolder2 (i.e. "data/another/folder/data/anotherFolder")
    // are read and added to browser.params.import.myFolder2
    await utils.checkImportFolder(myFolder2, "myFolder2");

  });
  it("step 4: check imported data from 'myFolder1'", async function () {
    // check if json data in  file purchaseRequisition.json in myFolder1 (i.e. "./data/my/folder/data/qs9")
    // has been read and added to browser.params.import.myFolder1.purchaseRequisition
    await utils.checkImportedData(myFolder1, ["myFolder1"], "purchaseRequisition");

  });
  it("step 5: check imported data from 'myFolder2'", async function () {
    // check if json data in  file purchaseRequisition_HI.json in myFolder2 (i.e. "data/another/folder/data/anotherFolder")
    // has been read and added to browser.params.import.myFolder2.purchaseRequisition_HI
    await utils.checkImportedData(myFolder2, ["myFolder2"], "purchaseRequisition_HI");

  });
  it("step 6: check imported data for file 'yourPrefixSpecName'", async function () {
    // check if json data in  file pointed to by "yourPrefixSpecName" (i.e. "./data/my/folder/data/qs9/data.json")
    // has been read and added to browser.params.import.yourPrefixSpecName
    await utils.checkImportedDataFromFile(yourPrefixSpecName, "yourPrefixSpecName");

  });
  it("step 7: check imported data for file 'uiUser'", async function () {
    // check if json data in  file pointed to by "uiUser" (i.e. "./data/my/folder/data/qs9/webUser.json")
    // has been read and added to browser.params.import.uiUser
    await utils.checkImportedDataFromFile(uiUser, "uiUser");

  });
  it("step 8: check invalid json is not loaded", async function () {
    await common.assertion.expectUndefined(browser.params.import["invalidJsonFile"]);

  });
  it("step 9: check missing file is not loaded", async function () {
    await common.assertion.expectUndefined(browser.params.import["missingFile"]);

  });
  it("step 10: check missing folder is not loaded", async function () {
    await common.assertion.expectUndefined(browser.params.import["missingFolder"]);

  });
  it("step 11: check files in subfolder are loaded", async function () {
    // check if data in LimitPurchaseOrder.json in subfolder "data/another/folder/data/anotherFolder/subfolder" has
    // been read and is available in browser.params.import.myFolder2.subfolder.LimitPurchaseOrder
    await utils.checkImportedData(myFolder2, ["myFolder2", "subfolder"], "LimitPurchaseOrder");

    // check if data in PurchaseOrderWithScheduline.json in subfolder "data/another/folder/data/anotherFolder/subfolder" has
    // been read and is available in browser.params.import.myFolder2.subfolder.PurchaseOrderWithScheduline
    await utils.checkImportedData(myFolder2, ["myFolder2", "subfolder"], "PurchaseOrderWithScheduline");

  });

  it("step 12: check if JSON file with array is loaded", async function () {
    // check if data in PurchaseOrderItems.json in subfolder "data/another/folder/data/anotherFolder/subfolder" has
    // been read and is available in browser.params.import.myFolder2.subfolder.PurchaseOrderItems
    await utils.checkImportedData(myFolder2, ["myFolder2", "subfolder"], "PurchaseOrderItems");

    // check if this is an array
    const poItems = browser.params.import.myFolder2.subfolder.PurchaseOrderItems;
    await common.assertion.expectEqual(Array.isArray(poItems), true);
  });

  it("step 13: check if subfolders with special characters in their names are loaded", async function () {

    await common.assertion.expectDefined(browser.params.import.myFolder2["purchase-orders"]);

  });
  it("step 14: check files with special characters in their names are loaded", async function () {
    // check if data in Limit-Purchase-Order.json in subfolder "data/another/folder/data/anotherFolder/purchase-orders" has
    // been read and is available in browser.params.import.myFolder2["purchase-orders"]["Limit-Purchase-Order"]
    await utils.checkImportedData(myFolder2, ["myFolder2", "purchase-orders"], "Limit-Purchase-Order");

    // check if data in ServicePurchaseOrder.2Items.json in subfolder "data/another/folder/data/anotherFolder/purchase-orders" has
    // been read and is available in browser.params.import.myFolder2["purchase-orders"]["ServicePurchaseOrder.2Items"]

    await utils.checkImportedData(myFolder2, ["myFolder2", "purchase-orders"], "ServicePurchaseOrder.2Items");

  });

});
