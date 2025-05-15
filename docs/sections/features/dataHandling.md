# Data Handling
> Related Topics: [Best Practices - Data Handling](../bestPractices/dataHandling.md) | [Advanced Data Handling](./advancedDataHandling.md)

## Data Types
There are basically two different types of data being used within your test execution.
### Input Data
Input data is the data defined by the scenario to perform all types of user inputs within the test execution. It is recommended to **create one JSON file for each spec** or test. A common pattern is to **name the data file exactly like the spec file**. E.g. `createSupplierInvoice.json` contains all and exclusively the required data for the test `createSupplierInvoice.spec.js`. With that, the relationship between the data and the test itself is clear and the data is easily maintainable. Your data file could look like:
```json title="data/createSupplierInvoice.json"
{
  "session": {
    "username": "<username",
    "password": "<password>"
  },
  "generalInformation": {
    "companyCode": "1010",
    "postingDate": "today",
  }
}
```
As you can see above, the data is separated into different sections like `session` and `generalInformation`. To keep transparency, it is recommended to follow that approach and define your data according to the related section of the UI. 

### Reference Data
For some cases - especially for scenario testing - it is required to pass dynamically created data between different specs. For example, your first script is creating a document number you might require inside the process of the second script. Therefore this data needs to be shared during the runtime between multiple scripts. To do so, you can create a `reference.json` file within your data folder which will then be imported in all related scripts.
```json title="data/references.json"
{
  "purchaseOrderNumber": null,
  "supplierInvoiceNumber": null
}
```
!!! info
    Here, the initial values are not set (set to `null`), since they will be [stored](#store-data) during the runtime of your test execution. 


## Data Import
With the following approach, it is possible to dynamically define (different) data and data paths independently from the actual location of the specs or data files. Thus, it is the recommended way to handle your test data.

### Define data paths
Commonly, your data is stored inside the *data* folder of your test suite. Therefore the path pointing to the data file(s) is defined in the configuration file like:
```js title="config.js"
params: {
  import: {
    data: "./data/"
  }
},
```
!!! tip
    For some special cases, you might require to defined multiple and more advanced data paths. Please find further information under [Advanced Data Handling](./advancedDataHandling.md).

### Load data
To import data inside your spec, add the following code at the top of your test / describe block:
```js title="specs/createSupplierInvoice.spec"
const data = browser.config.params.import.data["createSupplierInvoice"];
const references = browser.config.params.import.data["references"];
```

!!! tip
    Alternatively, you can load the data with the following [reuse method](https://pages.github.tools.sap/sProcurement/wdio-qmate-service-ts/doc/#util.data.getData){target="__blank"}:
    ```js
    const data = util.data.getData("createSupplierInvoice");
    ```
    This function only works for data located in the folder defined as ``data`` in the config.

### Store data
To store any value inside the imported file and make it available for other specs within the same group, use the following code **inside a step (it block)**:
```javascript title="specs/createPurchaseOrder.spec"
references.documentNumber = "4500012345";
```
!!! warning
    To be able to share data between different scripts, the specs need to be grouped together inside the configuration file. Please find more information under [Configuration - Specs](https://pages.github.tools.sap/sProcurement/qmate-profiles/sections/parameters/main/#specs){target="__blank"}. Please consider, that the data is only stored during the runtime of the test execution. To store data persistently, please see chapter [Advanced Data Handling](./advancedDataHandling.md).

### Read data
To read data from the input data or reference file, use the following code **inside a step (it block)**:
=== "Input Data"

    ```javascript title="specs/createSupplierInvoice.spec"
    const companyCode = data.generalInformation.companyCode;
    ```

=== "Reference Data"

    ```javascript title="specs/createSupplierInvoice.spec"
    const purchaseOrderNumber = references.purchaseOrderNumber;
    ```
