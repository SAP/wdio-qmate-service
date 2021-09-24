/* eslint-disable no-undef */
/* eslint-disable sap-no-hardcoded-url */

/* disable TLS validation -> SSL certifcates disabled       */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

/*--------------------------TESTDATA----------------------- */
var payload = require("../data/POST/LimitPurchaseOrder.json");
var references = require("../data/references.json");

/*-------------------------url to the odata-API------------ */
// const url = browser.baseUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

/*-----------------------Credentials----------------------- */
const user = "Purchaser";
const password = "super-duper-sensitive-pw";

/* declare variables for later usage                        */

let service;

describe("create_enhancedLimitsPO_with_ConfirmationControlKey.spec.js - create enhanced limits po with supplier confirmations via odata", function () {
  it("Step0 init service", async function () {
    service = await odata.common.service.init(url, user, password, false);
  });

  it("Step1 post", async function () {
    let res = await odata.common.service.post(service, "A_PurchaseOrder", payload);

    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });
});