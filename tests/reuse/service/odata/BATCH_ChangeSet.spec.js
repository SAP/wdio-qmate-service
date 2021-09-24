describe("BATCH - sample ", function () {
  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const payload = require("../data/POST/PurchaseOrder_w_Scheduline.json");
  const purchaseOrdersNeeded = 10;

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser"; //CB9980000118
  const password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */
  let service;



  it("Step0  init service", async function () {
    service = await oData.common.service.init(url, user, password, false);
  });

  it("Step1  create batch req", async function () {
    let datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    service.createBatch();
    for (let i = 0; i < purchaseOrdersNeeded; i++) {
      service.createChangeSet();
      oData.common.service.post(service, "A_PurchaseOrder", payload);
      service.commitChangeSet();
    }
    let results = await service.sendBatch();

    for (let i = 0; i < results.length; i++) {
      console.log("Purchase Order", results[i].PurchaseOrder);
    }

  });
});