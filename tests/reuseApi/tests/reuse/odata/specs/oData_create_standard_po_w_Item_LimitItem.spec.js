/* eslint-disable no-console */
describe("oData_create_standard_po_w_Item_LimitItem.spec", function () {
  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //----------------------------------TESTDATA---------------------------------------
  const payload = require("../data/POST/PurchaseOrder_w_Item_LimitItem.json");
  const references = require("../data/POST/references.json");

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const username = "Purchaser";
  const password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */

  let service;

  it("Step 0 - Init service", async function () {
    service = await oData.common.service.init(url, username, password, false);
  });

  it("Step 1 - Post", async function () {

    const res = await oData.common.service.post(service, "A_PurchaseOrder", payload);

    references.odata_po_for_attachments = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.odata_po_for_attachments);
  });

});
