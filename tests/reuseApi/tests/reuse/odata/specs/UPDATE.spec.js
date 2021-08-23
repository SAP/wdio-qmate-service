/* eslint-disable no-console */
describe("UPDATE - sample", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const payload = require("../data/POST/PurchaseOrder_w_Scheduline.json");
  const references = require("../data/POST/references.json");
  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser";
  const password = "Welcome1!";

  /* declare variables for later usage                        */

  let service;
  let intialDate;
  let patchDate;

  it("Step 0 - init service", async function () {
    service = await oData.common.service.init(url, user, password);
  });

  it("Step 1 - post", async function () {
    const datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    const res = await odata.common.service.post(service, "A_PurchaseOrder", payload);

    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });

  it("Step 2 - GET intial SchedulineDeliveryDate", async function () {
    const serviceKeys = {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1"
    };
    const res = await oData.common.service.get(service, "A_PurchaseOrderScheduleLine", serviceKeys);
    intialDate = res.ScheduleLineDeliveryDate;
    console.log("Scheduline Delivery Date -> ", intialDate);
  });

  it("Step 3 - Update PurchaseOrder", async function () {
    //url for posting against A_PurchaseOrderScheduleLine would normally look like:
    //PurchasingDocument='4500007090',PurchasingDocumentItem='10',ScheduleLine='1')
    //by given keys in the payload for the merge request it will be automatically adjusted to:
    //(PurchasingDocument='4500007090',PurchasingDocumentItem='10',ScheduleLine='1')"
    const res = await oData.common.service.merge(service, "A_PurchaseOrderScheduleLine", {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1",
      "ScheduleLineDeliveryDate": ui5.common.date.getTomorrow("datetime")
    });
    console.log("Merge response -> ", res);
  });

  it("Step 4 - GET patched SchedulineDeliveryDate", async function () {
    const serviceKeys = {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1"
    };

    const res = await oData.common.service.get(service, "A_PurchaseOrderScheduleLine", serviceKeys);
    patchDate = res.ScheduleLineDeliveryDate;
    console.log("Scheduline Delivery Date -> ", patchDate);
  });

  it("Step 5 - Expect dates not to be equal", async function () {
    expect(intialDate).not.toBe(patchDate);
  });
});