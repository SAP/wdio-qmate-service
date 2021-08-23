/* eslint-disable no-console */
describe("CREATE - sample", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const payload = require("../data/POST/PurchaseOrder_w_Scheduline.json");
  const references = require("../data/POST/references.json");

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser";
  const password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */

  let service;

  it("Step 0 - Init service", async function () {
    service = await oData.common.service.init(url, user, password, false);
  });

  it("Step 1 - Post", async function () {
    const res = await oData.common.service.post(service, "A_PurchaseOrder", payload);

    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });
});