# Importing and exporting data
Data can be imported from JSON files and used in the tests. Data obtained during the test run
can also be saved or exported to JSON files.

For handling dynamic data between test specs in the same test run, one can use the approach [here](./data.md)

## Test configuration for import
Data to be imported may be in a specific JSON file, or in a directory, and sub-directories under that directory. In the config file, under "params" add "import", and within it specify the import data.
```javascript
// file config.js
    params: {
    
        import: {                         
            myFolder1: "./data/my/folder/data/qs9",
            myFolder2: "data/another/folder/data/anotherFolder",
            myFolder3: "C:/Users/C1234567/data/testFolder",
            yourPrefixSpecName: "./data/my/folder/data/qs9/data.json",
            uiUser: "./data/my/folder/data/qs9/webUser.json",
        },
    
    },
```
 The folders and JSON files are specified as parameters with a key. In the config "yourPrefixSpecName" is the key which points to a JSON file "./data/my/folder/data/qs9/data.json". Similarly "myFolder2" key points to a folder "data/another/folder/data/anotherFolder".

File paths may be relative or absolute. If relative, then they are resolved relative to the 
config file directory.



## Data import from JSON file
Data from a JSON file will be added under the specified key. Data from "./data/my/folder/data/qs9/data.json" will be available in browser.params.import.yourPrefixSpecName . 

Similarly data from "./data/my/folder/data/qs9/webUser.json" will be available in
browser.params.import.uiUser .

```javascript
// file config.js
    params: {
    
        import: {               
            yourPrefixSpecName: "./data/my/folder/data/qs9/data.json",          
            uiUser: "./data/my/folder/data/qs9/webUser.json",
        },
    
    },
```
Let's assume that "./data/my/folder/data/qs9/data.json" has data as follows.
```javascript
{
  "name": "Joe Doe",
  "email": "joe.doe@example.com",
  "telephone": "333-000-111-222",
  "amount": 4.79,
  "website": "http://www.userdataexport.test"
}
```

Since "yourPrefixSpecName" is key, to access the "email" value in the test spec, we use
browser.params.import.yourPrefixSpecName.email .

```javascript
// to access the entire JSON data, userData will have the entire JSON data from "./data/my/folder/data/qs9/data.json"
const userData = browser.params.import.yourPrefixSpecName;
// make an assertion to ensure data was loaded
await ui5.common.assertion.expectDefined(userData);
await ui5.common.assertion.expectDefined(userData.email);

await ui5.common.userInteraction.fill(emailSelector, userData.email);

// to access specific field - email
const email = browser.params.import.yourPrefixSpecName.email;
await ui5.common.userInteraction.fill(emailSelector, email);

```

## Data import from folders and subfolders

```javascript
// file config.js
    params: {
    
        import: {                         
            myFolder1: "./data/my/folder/data/qs9",
            myFolder2: "./data/another/folder/data/anotherFolder",
        },
    
    },
```
Let us assume that the folders have the following files
```code
./data/my/folder/data/qs9/data.json
./data/my/folder/data/qs9/purchaseRequisition.json
./data/another/folder/data/anotherFolder/purchaseRequisition_HI.json
./data/another/folder/data/anotherFolder/purchaseOrders/ServicePurchaseOrder.json
./data/another/folder/data/anotherFolder/purchaseOrders/LimitPurchaseOrder.json
./data/another/folder/data/anotherFolder/my-po-set/Limit-Purchase-Order.json
./data/another/folder/data/anotherFolder/my-po-set/ServicePurchaseOrder.2Items.json
```

Data in "./data/my/folder/data/qs9/data.json" can be accessed using the folder key "myFolder1", and
the file name prefix, which is "data" in this case.
```javascript
const myData = browser.params.import.myFolder1.data;
```

Data in "./data/my/folder/data/qs9/purchaseRequisition.json" can be accessed using the folder key "myFolder1", and
the file name prefix "purchaseRequisition".
```javascript
const prData = browser.params.import.myFolder1.purchaseRequisition;
```

Similarly data in "data/another/folder/data/anotherFolder" can be accessed using the folder key "myFolder2", subfolder name and file prefix as keys.

```javascript
// data in data/another/folder/data/anotherFolder/purchaseRequisition_HI.json
const prDataHI = browser.params.import.myFolder2.purchaseRequisition_HI;

// data in data/another/folder/data/anotherFolder/purchaseOrders/ServicePurchaseOrder.json
const servicePO = browser.params.import.myFolder2.purchaseOrders.ServicePurchaseOrder;

// data in data/another/folder/data/anotherFolder/purchaseOrders/LimitPurchaseOrder.json
const limitPO = browser.params.import.myFolder2.purchaseOrders.LimitPurchaseOrder;
```
> 🛈 Note: It is recommended that the subfolder names and JSON file names used to import data do not have special characters. 

However if there are special characters in the file name or subfolder name, then the dot notation can't
be used. In that case do as follows
```javascript
// data in data/another/folder/data/anotherFolder/my-po-set/Limit-Purchase-Order.json
const limitPO = browser.params.import.myFolder2["my-po-set"]["Limit-Purchase-Order"];

// data in data/another/folder/data/anotherFolder/my-po-set/ServicePurchaseOrder.2Items.json
const servicePO = browser.params.import.myFolder2["my-po-set"]["ServicePurchaseOrder.2Items"];

```


> 🛈 Note: This module does not fail if import files and folders are missing, not readable, or have invalid JSON. In such cases, warnings are logged on the console, and the data corresponding to those files and folders will remain undefined.

## Exporting data

## Test configuration for export
Data can be exported to one or more files. In the test configuration file under "params", add "export" with a list of file names as shown here. 

```javascript
// file config.js
    params: {
    
        export: {             //Export             
            exportData: "./data/my/folder/path/in/exportFile.json",
            exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
            exportArrayData: "./data/my/folder/path/in/arrayDataFile.json"
        },
    
    },
```
## Exporting data to JSON file
The data in browser.params.export is written to output files at the end of the test run. The export file is created or overwritten if already present. Any intermediate folders are also created if necessary.

```javascript
it("step 1: export data to 'exportData' file", async function () {

    // exportData: "./data/my/folder/path/in/exportFile.json",
    browser.params.export.exportData = { name: "joe", description: "exported into exportFile.json" };

  });
}
it("step 2: export data to 'exportMoreData' file", async function () {

    // exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
    browser.params.export.exportMoreData = { name: "jack", description: "exported into moreDataFile.json" };

  });
}
it("step 3: export array data to 'exportArrayData' file", async function () {

    // exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",

    browser.params.export.exportArrayData = [
      {
        itemNo: "1",
        description: "exported into arrayDataFile.json",
        type: "material"
      },
      {
        itemNo: "2",
        description: "Service item",
        type: "service"
      }
    ];
    await ui5.common.assertion.expectEqual(Array.isArray(browser.params.export.exportArrayData), true);

    // file "./data/my/folder/path/in/arrayDataFile.json" will have the array data
    // check manually after test run is complete
  });
```
At the end of the test run, file "./data/my/folder/path/in/exportFile.json" will have 
```javascript
{ name: "joe", description: "exported into exportFile.json" }
```
File "./data/my/folder/path/in/moreDataFile.json" will have 
```javascript
{ name: "jack", description: "exported into moreDataFile.json" }
```
File "./data/my/folder/path/in/moreDataFile.json" will have 
```javascript
[
    {
    itemNo: "1",
    description: "exported into arrayDataFile.json",
    type: "material"
    },
    {
    itemNo: "2",
    description: "Service item",
    type: "service"
    }
]
```

If you are adding export data to the same export key, make sure you don't overwrite previous data.

```javascript
// browser.params.export.exportData has data assigned to it from previous steps
browser.params.export.exportData["name"] = "joe";

// or using ES6
browser.params.export.exportData = {...browser.params.export.exportData, name: "joe"};

// or if browser.params.export.exportData is an Array
if(Array.isArray(browser.params.export.exportData)) {
    // add an element to an array
    browser.params.export.exportData.push({name: "Joe"});
}
```

If there is no data assigned to an export key, then the export file corresponding to that key  
will be empty.

```javascript
// doing any of these things will create an empty JSON file
// "./data/my/folder/path/in/exportFile.json" will be a blank file at end of test run
browser.params.export.exportData = null;
// or
browser.params.export.exportData = {};
// or
browser.params.export.exportData = [];
```

## Parallel test runs and exporting data

If tests are run in parallel, then there will be multiple browser instances, each test run will
have it's own browser instance.

If these parallel instances write to the same export file, then the export data from parallel test instances is merged together and written out to the file.

> 🛈 Note: This module does not fail if export files are not writable or if the export folder is inaccessible. In such cases, warnings are logged on the console, and export data will not get written out.

## Best Practice

- Always check if data has been imported using assertions before using them. 
```javascript
const userData = browser.params.import.yourPrefixSpecName;
// make an assertion to ensure data was loaded
await ui5.common.assertion.expectDefined(userData);
await ui5.common.assertion.expectDefined(userData.email);
```

- Always decouple the data from your scripts. 

- Store your data files inside the *data* folder.

- Use imported data from only one *.json* file for every script. Unless specifically needed by the test scenario to use data from multiple files, it is recommended to keep things simple, and use only one import prefix (that maps to a JSON file) per script.

- Each script should write to different export files, unless the test scenario needs to do otherwise. If different scripts write to same export file, make sure to merge and not overwrite the export data.

- Name the spec file so that it is clear what data files are imported and exported in the spec.

- Use meaningful key names for import and export parameters, and use meaningful names for data folders, subfolders, and JSON files
```javascript
// file config.js
    params: {
    
        import: {                         
            purchaseOrder: "./data/purchaseOrder.json",
            ordersFolder: "./data/orders"
        },
        export: {
            supplierInvoice: "./data/export/supplierInvoice.json"
        }
    
    },
```

- Structure your data.

```javascript
{
    "firstName": "John",
    "lastName":  "Doe",
    "address": {
        "street":   "Main Road",
        "number":   "42",
        "zipCode":  "12345",
        "city":     "Metropolis"
    }
}
```


