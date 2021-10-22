# How to write OData tests in Qmate

## References:

- **1:** For general questions about OData and the capabilities of it please see [Microsoft OData](https://www.odata.org/getting-started/) for more information.
- **2:** If you want to play a around with your OData service we recommend [Postman](https://www.postman.com/).
- **3** The OData reuse-lib is based on the [OData library](https://github.com/SAP/odata-library).
- **4** API-Reference for OData [API](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/reuse/doc.md#odata--object)

## GET started
To start with OData we provide some helpful templates. In this sample we want to create a new script running some POST, GET and MERGE requests. Therefore please download the corresponding [OData Template](https://github.tools.sap/sProcurement/wdio-qmate-service/tree/main/documentation/downloads/templates/oData.zip/) and extract the *.zip* file to your local drive. Inside the template folder you will find all necessary files to get started.

## Samples
> 🛈 In the extracted folder you'll find samples for the common CRUD-Methods and also for BATCH-Requests.

## POST
> 🛈 Please notice that this sample is based on an OData-API.


#### Prerequisites
- **1:** Disable the TLS/SSL verification. This is needed since we're not working with certificates.
```javascript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
```
- **2:** Set the url for the system on which you want to execute your specs.
> Option 1 - generic
```javascript
const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
```

> Option 2 - static
```javascript
const url = "https://qs9-715.wdf.sap.corp/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
```

#### We strongly recommend to use Option 1 since you enable your OData-Tests in multiple systems at once.  
To do so please add the systemUrl parameter in your config.js under the section params.  

```javascript
  params: {
    auth: { //please note that the login is done in the specs itself !
      formType: 'plain',
      //username: 'D056896',
      //password: 'Welcome1!'
    },
    systemUrl: "https://qs9-715.wdf.sap.corp/",
    failFast: false,
    dontShowBrowserLogs: false,
    coverage: {
      status: false, //do not change! status is set in pipelineConfig.yml file
      coverage_files: ['mm_po_manages1'],
      sourcePath: './sourceFolder'
    }
  }
```
#### Why I just can't use the browser.baseUrl instead of browser.params.systemUrl?  
> The issue with the browser.baseUrl in your config.js file is that is used by multiple other specs for integration tests connecting to the Fiori Launchpad and login. Therefore the "/ui" is needed.
```javascript
  baseUrl: "https://qs9-715.wdf.sap.corp/ui?&sap-language=EN",
```

- **3:** Define the credentials for accessing the service.
```javascript
const user      = "Purchaser";
const password  = "Welcome1!";
```

- **4:** Require the payload and also the reference you want to save your result in.
```javascript
const payload   = require("../../data/POST/PurchaseOrder_w_Scheduline.json");
let references  = require("../../data/references.json");
```
PurchaseOrder_w_Scheduline.json
```javascript
{
    "CompanyCode": "1010",
    "PurchaseOrderType": "NB",
    "Supplier": "10300001",
    "PurchasingOrganization": "1010",
    "DocumentCurrency": "JPY",
    "PurchasingGroup": "001",
    "to_PurchaseOrderItem":
        [{
            "PurchaseOrderItem": "0010",
            "Plant": "1010",
            "OrderQuantity": "7",
            "NetPriceAmount": "130.00",
            "NetPriceQuantity": "1",
            "PurchaseOrderItemCategory": "0",
            "Material": "TG11",
            "to_ScheduleLine":
                [{
                    "ScheduleLineOrderQuantity": "7",
                    "ScheduleLineDeliveryDate": "datetime'2019-12-30T00:00:00'"
                }]
        }]
}
```

#### Initialize the Service
To get an working Service-Instance we have to pass the url, username and password.
```javascript
service = await odata.common.service.init(url, user, password);
```

#### Perform a POST-Request 

- **1:** In our scenario we want to have the current date as SchedulineDeliveryDate. 
         Therefore we overwrite the SchedulineDeliveryDate in our payload(PurchaseOrder_w_Scheduline.json).  
         The OData-Test-Client expects the date in [EDM.DateTime](https://www.odata.org/documentation/odata-version-2-0/overview/#:~:text=Edm.DateTime,59%20P.M%2C%20December%209999%20A.D.) with the prefix 'datetime'.  
         E.g.: datetime'2020-06-29T16:58:33'  
         For this you can use the reuse functions mentioned below.

```javascript
let datetime = ui5.common.date.getToday("datetime");
payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;
```

- **2:** To perform a request use the provided [CRUD-Reuse functions](https://github.tools.sap/sProcurement/wdio-qmate-service/blob/main/reuse/doc.md#odata.common.service) and pass several parameters:
    - **1)** service: The Service instance we previously created.
    - **2)** entitySet: The EntitySet you want to send a request to.
    - **3)** payload/options: The payload/options depending on the CRUD-METHOD

- **2.1:** Send the request and save the result.
```javascript
let res = await odata.common.service.post(service, "A_PurchaseOrder", payload);
```

- **3:** Save the result in our reference.json 
```javascript
references.purchaseOrderNumber = res.PurchaseOrder;
```

- **4:** Log the result.
```javascript
console.log("Created Purchase Order ->", references.purchaseOrderNumber);
```


## Troubleshooting / Logging of OData-Services
To enable logging set the enableLogging parameter in the init() function of the service to true as shown below:
```javascript
service = await odata.common.service.init(url, user, password, true);
```
> 🛈 Logging is disabled per default.
