/** 
 * Used in parallel test, to check if exported data is merged before it is saved 
 * Refer to config.parallel.js and config.parallel.shard.js to see where this spec is included
 */
describe("Export Data Slow", function () {

  // config.js
  // export: {             //Export             
  //   exportData: "./data/my/folder/path/in/exportFile.json",
  //   exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
  //   exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",
  //   exportNothing: "./data/my/folder/path/in/noDataFile.json",
  //   exportNothingArray: "./data/my/folder/path/in/noDataInArrayFile.json"
  // },

  it("step 1: export data to 'exportData' file after sleep 20 secs", async function () {

    // sleep to delay the test. In a parallel test 
    // this will finish last.
    // The data exported here will be merged with data exported by other
    // parallel test instances.    
    await browser.pause(20000);
    // add a timestamp
    const dateAdded = (new Date()).toISOString();
    browser.params.export.exportData = {
      "speed": "slow", "dataAddedOn": dateAdded,
      "slow": true,
      ...browser.params.export.exportData
    };

  });
  it("step 2: export array data to 'exportArrayData' file", async function () {

    // we are adding to existing export data, in case other scripts also write to the same key "exportArrayData"
    const dateAdded = (new Date()).toISOString();
    if (!browser.params.export.exportArrayData) {
      browser.params.export.exportArrayData = [];
    }
    browser.params.export.exportArrayData = [
      {
        "speed": "slow", "dataAddedOn": dateAdded,
        "slow": true
      },
      ...browser.params.export.exportArrayData
    ];

  });


});
