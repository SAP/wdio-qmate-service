/** 
 * Used in parallel test, to check if exported data is merged before it is saved 
 * Refer to config.parallel.js and config.parallel.shard.js to see where this spec is included
 */
describe("Export Data Fast", function () {

  // config.js
  // export: {             //Export             
  //   exportData: "./data/my/folder/path/in/exportFile.json",
  //   exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
  //   exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",
  //   exportNothing: "./data/my/folder/path/in/noDataFile.json",
  //   exportNothingArray: "./data/my/folder/path/in/noDataInArrayFile.json"
  // },

  it("step 1: export data to 'exportData' file", async function () {

    // there is no sleep here. In a parallel test run
    // this will finish first.
    // The data exported here will be merged with data exported by other
    // parallel test instances
    const dateAdded = (new Date()).toISOString();
    browser.params.export.exportData = {
      "speed": "fast", "dataAddedOn": dateAdded,
      "fast": true,
      ...browser.params.export.exportData
    };

  });
  it("step 2: export array data to 'exportArrayData' file", async function () {

    // export array data
    const dateAdded = (new Date()).toISOString();
    if (!browser.params.export.exportArrayData) {
      browser.params.export.exportArrayData = [];
    }
    browser.params.export.exportArrayData = [
      {
        "speed": "fast", "dataAddedOn": dateAdded,
        "fast": true
      },
      ...browser.params.export.exportArrayData
    ];


  });

});
