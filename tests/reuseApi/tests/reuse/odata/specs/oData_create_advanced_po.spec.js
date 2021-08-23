/* eslint-disable no-console */
describe("oData_create_advanced_po.spec", function () {
  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //----------------------------------TESTDATA---------------------------------------
  const payload = require("../data/POST/Advanced_PurchaseOrder.json");
  const references = require("../data/POST/references.json");

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const username = "Purchaser";
  const password = "Welcome1!";

  /* declare variables for later usage                        */

  let service;

  it("Step 0 - Init service", async function () {
    service = await oData.common.service.init(url, username, password, false);
  });

  it("Step 1 - Post", async function () {
    const datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    const res = await oData.common.service.post(service, "A_PurchaseOrder", payload);

    references.odata_po = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.odata_po);
  });

});
