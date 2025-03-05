# Best Practices - Data Handling
> Related Topics: [Data Handling](../features/dataHandling.md) | [Advanced Data Handling](../features/advancedDataHandling.md)

- Always decouple the data from the spec. The maintenance of data will become very handy also more transparent. 

- Store your data files inside the *data* folder.

- Create a separate *.json* file for every script. Unless specifically needed by the test scenario to use data from multiple files, it is recommended to keep things simple, and use only one import prefix (that maps to a JSON file) per script.

- Name the file exactly like the script which the data belongs to.

- Structure your data according to the related section of the UI.

- To pass data between different specs, use the [*references.json*](../features/dataHandling.md#reference-data) file and [group](<todo-add-link-to-config-grouped-and-file>) the specs inside the config.

- Use meaningful key names for import and export parameters, and use meaningful names for data folders, subfolders, and *JSON* files.
  ```js title="config.js"
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
  ```json title="data.json"
  {
    "session": {
      "username": "JOHNDOE",
      "password": "abc123!!"
    },
    "userData": {
      "firstName": "John",
      "lastName":  "Doe",
      "address": {
        "street":   "Main Road",
        "number":   "42",
        "zipCode":  "01234",
        "city":     "Metropolis"
      }
    }
  }
  ```

- You can check if data has been imported correctly by using assertions before accessing it. 
  ```js
  const data = browser.config.params.import.yourPrefixSpecName;
  // make an assertion to ensure data was loaded
  await common.assertion.expectDefined(data);
  await common.assertion.expectDefined(data.email);
  ```

(Only for data export)

- Each script should write to different export files, unless the test scenario needs to do otherwise. If different scripts write to same export file, make sure to merge and not overwrite the export data.