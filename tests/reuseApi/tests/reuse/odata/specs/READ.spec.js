/* eslint-disable no-console */
describe("READ - sample", function () {

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
  let poNumbGet;


  it("Step 0 - Init service", async function () {
    service = await oData.common.service.init(url, user, password);
  });

  it("Step 1 - Post", async function () {
    const datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    const res = await odata.common.service.post(service, "A_PurchaseOrder", payload);

    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });

  it("Step 2 - GET PurchaseOrder", async function () {
    const keys = {
      "PurchaseOrder": references.purchaseOrderNumber,
    };

    const res = await oData.common.service.get(service, "A_PurchaseOrder", keys);
    poNumbGet = res.PurchaseOrder;
  });

  it("Step 3 - Expect Po Numbers to be equal", async function () {
    await expect(references.purchaseOrderNumber).toBe(poNumbGet);
  });
});