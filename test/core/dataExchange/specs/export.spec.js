/**
 * Regression testing of data export, loads data from files, and then 
 * assigns to browser.params.export, so that the data gets exported
 */

const utils = require("../utils.js");

describe("Export Data", function () {

  //load the actual files 
  const myFolder1 = "./data/my/folder/data/qs9";
  const subfolder = "./data/another/folder/data/anotherFolder/subfolder";

  // config.export.js
  // params: {
  //   export: {             //Export             
  //     exportData: "./data/my/folder/path/in/exportFile.json",
  //     exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
  //     exportNothing: "./data/my/folder/path/in/noDataFile.json",
  //     exportNothingArray: "./data/my/folder/path/in/noDataInArrayFile.json"
  //   },
  // }
  it("step 1: export data to 'exportData' file", async function () {

    // this test reads data from a file, and puts in browser.params.export
    // so that it gets written to the export file at completion of test
    // data to be read should be in file "purchaseRequisition.json" within 
    // myFolder1 (i.e. within "./data/my/folder/data/qs9")
    // "exportData"  in config, points to the json file that will get overwritten 
    // with data from "purchaseRequisition.json"
    // export: {             //Export             
    //   exportData: "./data/my/folder/path/in/exportFile.json"
    // }, 

    // no assertions are made, file "./data/my/folder/path/in/exportFile.json" has to be 
    // checked manually to see if correct data is present after the test run
    await utils.exportData(myFolder1, "purchaseRequisition", "exportData");

    // add a timestamp
    const dateAdded = (new Date()).toISOString();
    // make "dataAddedOn"  the first key in exportData
    browser.params.export.exportData = { "dataAddedOn": dateAdded, ...browser.params.export.exportData };

  });
  it("step 2: export data to 'exportMoreData' file", async function () {
    // export data from "ServicePurchaseOrder.json" in subfolder
    // no assertions are made, file "./data/my/folder/path/in/moreDataFile.json" has to be 
    // checked manually to see if correct data is present after the test run
    await utils.exportData(subfolder, "ServicePurchaseOrder", "exportMoreData");

    // add a timestamp
    const dateAdded = (new Date()).toISOString();
    // make "dataAddedOn"  the first key in exportMoreData
    browser.params.export.exportMoreData = { "dataAddedOn": dateAdded, ...browser.params.export.exportMoreData };


  });
  it("step 3: export array data to 'exportArrayData' file", async function () {

    // exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",

    if (!browser.params.export.exportArrayData) {
      browser.params.export.exportArrayData = [];
    }
    browser.params.export.exportArrayData = [
      {
        itemNo: "1",
        description: "First item",
        type: "material"
      },
      {
        itemNo: "2",
        description: "Service item",
        type: "service"
      },
      ...browser.params.export.exportArrayData
    ];
    await common.assertion.expectEqual(Array.isArray(browser.params.export.exportArrayData), true);

    // file "./data/my/folder/path/in/arrayDataFile.json" will have an array
    // check manually after test run is complete
  });
  it("step 4: export empty data to 'exportNothing' file", async function () {

    // exportNothing: "./data/my/folder/path/in/noDataFile.json",

    browser.params.export.exportNothing = {};

    // file "./data/my/folder/path/in/noDataFile.json" will be empty
    // check manually after test run is complete
  });
  it("step 5: export empty array data to 'exportNothingArray' file", async function () {

    // exportNothingArray: "./data/my/folder/path/in/noDataInArrayFile.json"

    browser.params.export.exportNothingArray = [];

    // file "./data/my/folder/path/in/noDataInArrayFile.json" will be empty
    // check manually after test run is complete


  });
});
