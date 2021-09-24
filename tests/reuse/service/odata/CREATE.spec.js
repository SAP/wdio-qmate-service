describe("CREATE - sample", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const payload = require("../data/POST/PurchaseOrder_w_Scheduline.json");
  const references = require("../data/references.json");

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser";
  const password = "Welcome1!";

  /* declare variables for later usage                        */

  let service;

  it("Step0  init service", async function () {
    service = await oData.common.service.init(url, user, password, false);
  });

  it("Step1  post", async function () {
    let datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    let res = await oData.common.service.post(service, "A_PurchaseOrder", payload);

    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });
});