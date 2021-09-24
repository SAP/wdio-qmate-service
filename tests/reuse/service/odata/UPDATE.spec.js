describe("UPDATE - sample", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const references = require("../data/references.json");
  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser";
  const password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */

  let service;
  let intialDate;
  let patchDate;

  it("Step0  init service", async function () {
    service = await oData.common.service.init(url, user, password);
  });

  it("Step1  GET intial SchedulineDeliveryDate", async function () {
    const serviceKeys = {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1"
    };
    let res = await oData.common.service.get(service, "A_PurchaseOrderScheduleLine", serviceKeys);
    intialDate = res.ScheduleLineDeliveryDate;
    console.log("Scheduline Delivery Date -> ", intialDate);
  });


  it("Step2  Update PurchaseOrder", async function () {
    //browser sleep is needed due to PO could still be blocked from previous GET-Request
    await browser.sleep(2500);

    //url for posting against A_PurchaseOrderScheduleLine would normally look like:
    //PurchasingDocument='4500007090',PurchasingDocumentItem='10',ScheduleLine='1')
    //by given keys in the payload for the merge request it will be automatically adjusted to:
    //(PurchasingDocument='4500007090',PurchasingDocumentItem='10',ScheduleLine='1')"
    let res = await oData.common.service.merge(service, "A_PurchaseOrderScheduleLine", {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1",
      "ScheduleLineDeliveryDate": ui5.common.date.getTomorrow("datetime")
    });
    console.log("Merge response -> ", res);
  });

  it("Step3  GET patched SchedulineDeliveryDate", async function () {
    const serviceKeys = {
      "PurchasingDocument": references.purchaseOrderNumber,
      "PurchasingDocumentItem": "10",
      "ScheduleLine": "1"
    };

    let res = await oData.common.service.get(service, "A_PurchaseOrderScheduleLine", serviceKeys);
    patchDate = res.ScheduleLineDeliveryDate;
    console.log("Scheduline Delivery Date -> ", patchDate);
  });

  it("Step4  Expect dates not to be equal", async function () {
    expect(intialDate).not.toBe(patchDate);
  });
});