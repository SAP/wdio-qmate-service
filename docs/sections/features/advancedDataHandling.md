# Advanced Data Handling

Data can be imported from *JSON* files and used in the tests. Data obtained during the test run can also be saved or exported to *JSON* files.

## Importing Data

### Test configuration for import
Data to be imported may be in a specific *JSON* file, or in a directory, and sub-directories under that directory. In the *config* file, under ``params`` add ``import``, and within it specify the import data.
```js title="config.js"
params: {
  
  import: {                         
    myFolder1: "./data/my/folder/data/<systemName>",
    myFolder2: "data/another/folder/data/anotherFolder",
    myFolder3: "C:/Users/C1234567/data/testFolder",
    yourPrefixSpecName: "./data/my/folder/data/<systemName>/data.json",
    uiUser: "./data/my/folder/data/<systemName>/webUser.json",
  }

},
```

!!! info
    The folders or *JSON* files are specified as key-value pair. In this sample, ``yourPrefixSpecName`` is the key which points to a *JSON* file ``./data/my/folder/data/<systemName>/data.json``. Similarly, the key ``myFolder2`` points to a folder ``data/another/folder/data/anotherFolder``.


!!! tip
    File paths may be relative or absolute. If relative, they are resolved relative to the config file directory.



### Data import from *JSON* file
Data from a *JSON* file will be added under the specified key. Data from ``./data/my/folder/data/<systemName>/data.json`` will be available in ``browser.config.params.import.yourPrefixSpecName``. 

Similarly data from ``./data/my/folder/data/<systemName>/webUser.json`` will be available in ``browser.config.params.import.uiUser``.

```js title="config.js"
params: {

  import: {               
    yourPrefixSpecName: "./data/my/folder/data/<systemName>/data.json",          
    uiUser: "./data/my/folder/data/<systemName>/webUser.json",
  }

},
```

Let's assume the file *./data/my/folder/data/<systemName>/data.json* has the following data:
```json title="data.json"
{
  "name": "Joe Doe",
  "email": "joe.doe@example.com",
  "telephone": "333-000-111-222",
  "amount": 4.79,
  "website": "http://www.userdataexport.test"
}
```
Since ``yourPrefixSpecName`` is the key, to access the ``email`` value in the test spec, we use
``browser.config.params.import.yourPrefixSpecName.email``.

```js
// load entire data from "./data/my/folder/data/<systemName>/data.json"
const userData = browser.config.params.import.yourPrefixSpecName;

// make an assertion to ensure data was loaded
await common.assertion.expectDefined(userData);
await common.assertion.expectDefined(userData.email);

// enter data to input field
await ui5.userInteraction.fill(emailSelector, userData.email);

// define and enter specific data value
const email = browser.config.params.import.yourPrefixSpecName.email;
await ui5.userInteraction.fill(emailSelector, email);
```

### Data import from folders and subfolders
```js title="config.js"
params: {

  import: {                         
    myFolder1: "./data/my/folder/data/<systemName>",
    myFolder2: "./data/another/folder/data/anotherFolder",
  }

},
```
Let us assume that the folders have the following files:
```code
./data/my/folder/data/<systemName>/data.json
./data/my/folder/data/<systemName>/purchaseRequisition.json
./data/another/folder/data/anotherFolder/purchaseRequisition_HI.json
./data/another/folder/data/anotherFolder/purchaseOrders/ServicePurchaseOrder.json
./data/another/folder/data/anotherFolder/purchaseOrders/LimitPurchaseOrder.json
./data/another/folder/data/anotherFolder/my-po-set/Limit-Purchase-Order.json
./data/another/folder/data/anotherFolder/my-po-set/ServicePurchaseOrder.2Items.json
```

- Data in *./data/my/folder/data/<systemName>/data.json* can be accessed using the folder key ``myFolder1``, and the file name prefix, which is ``data`` in this case.
  ```js
  const myData = browser.config.params.import.myFolder1.data;
  ```

- Data in *./data/my/folder/data/<systemName>/purchaseRequisition.json* can be accessed using the folder key ``myFolder1``, and
the file name prefix ``purchaseRequisition``.
  ```js
  const prData = browser.config.params.import.myFolder1.purchaseRequisition;
  ```

- Similarly data in *data/another/folder/data/anotherFolder* can be accessed using the folder key ``myFolder2``, subfolder name and file prefix as keys.
  ```js title="data/another/folder/data/anotherFolder/purchaseRequisition_HI.json"
  const prDataHI = browser.config.params.import.myFolder2.purchaseRequisition_HI;
  ```
  ```js title="data/another/folder/data/anotherFolder/purchaseOrders/ServicePurchaseOrder.json"
  const servicePO = browser.config.params.import.myFolder2.purchaseOrders.ServicePurchaseOrder;
  ```
  ```js title="data/another/folder/data/anotherFolder/purchaseOrders/LimitPurchaseOrder.json"
  const limitPO = browser.config.params.import.myFolder2.purchaseOrders.LimitPurchaseOrder;
  ```

!!! tip
    It is recommended that the subfolder names and *JSON* file names used to import data do not have special characters. 

If there are special characters in the file name or subfolder name, then the dot notation can't be used. In that case, you can use the following syntax:
```js title="data/another/folder/data/anotherFolder/my-po-set/Limit-Purchase-Order.json"
const limitPO = browser.config.params.import.myFolder2["my-po-set"]["Limit-Purchase-Order"];
```
```js title="data/another/folder/data/anotherFolder/my-po-set/ServicePurchaseOrder.2Items.json"
const servicePO = browser.config.params.import.myFolder2["my-po-set"]["ServicePurchaseOrder.2Items"];
```

!!! warning
    Qmate will not fail if import files and folders are missing, not readable, or have an invalid *JSON*. In such cases, warnings are logged on the console, and the data corresponding to those files and folders will remain undefined.


## Exporting Data

### Test configuration for export
Data can be exported persistently to one or more files. In the sample configuration file under ``params``, add ``export`` with a list of file names as shown below. 
```js title="config.js"
params: {

  export: {          
    exportData: "./data/my/folder/path/in/exportFile.json",
    exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
    exportArrayData: "./data/my/folder/path/in/arrayDataFile.json"
  }

},
```

### Exporting data to *JSON* file
The data in ``browser.config.params.export`` is written to output files at the end of the test run. The export file is created or overwritten if already present. Any intermediate folders are also created if necessary.
```js
it("Step 01: export data to 'exportData' file", async function () {
  // exportData: "./data/my/folder/path/in/exportFile.json",
  browser.config.params.export.exportData = { 
    name: "joe", 
    description: "exported into exportFile.json" 
  };
});

it("Step 02: export data to 'exportMoreData' file", async function () {
  // exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
  browser.config.params.export.exportMoreData = { 
    name: "jack", 
    description: "exported into moreDataFile.json" 
  };
});

it("Step 03: export array data to 'exportArrayData' file", async function () {
  // exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",
  browser.config.params.export.exportArrayData = [
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
  await common.assertion.expectEqual(Array.isArray(browser.config.params.export.exportArrayData), true);

  // file "./data/my/folder/path/in/arrayDataFile.json" will have the array data
  // check manually after test run is complete
});

```
At the end of the test run, the file *./data/my/folder/path/in/exportFile.json* will look like: 
```json
{ 
  name: "joe",
  description: "exported into exportFile.json"
}
```

File *./data/my/folder/path/in/moreDataFile.json* will look like: 
```json
{ 
  name: "jack", 
  description: "exported into moreDataFile.json" 
}
```

File *./data/my/folder/path/in/moreDataFile.json* will look like: 
```json
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

!!! warning
    If you are adding export data to the same export key, make sure you don't overwrite previous data.

    ```js
    // browser.config.params.export.exportData has data assigned to it from previous steps
    browser.config.params.export.exportData["name"] = "joe";

    // or if browser.config.params.export.exportData is an Array
    if(Array.isArray(browser.config.params.export.exportData)) {
        // add an element to an array
        browser.config.params.export.exportData.push({name: "Joe"});
    }
    ```

!!! info
    If there is no data assigned to an export key, then the export file corresponding to that key will be empty. Doing any of the following things will create an empty *JSON* file.

    ```js
    // "./data/my/folder/path/in/exportFile.json" will be a blank file at end of test run
    browser.config.params.export.exportData = null;
    // or
    browser.config.params.export.exportData = {};
    // or
    browser.config.params.export.exportData = [];
    ```

### Parallel test runs and exporting data
If tests are running in parallel, there will be multiple browser instances and each test run will have it's own browser instance. If these parallel instances write to the same export file, then the export data from parallel test instances is merged together and written out to the file.

!!! warning
    This module does not fail if export files are not writable or if the export folder is inaccessible. In such cases, warnings are logged on the console, and export data will not get written out.
