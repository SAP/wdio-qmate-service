/* eslint-disable no-console */
describe("01_template - describe your test", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  const payload = require("../data/POST/PurchaseOrder_w_Scheduline.json");
  const references = require("../data/POST/references.json");

  /*-------------------------url to the OData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*----------Credentials to access the OData-API------------ */
  const user = "Purchaser";
  const password = "Welcome1!";

  /*  declare service variable for later usage                 */
  let service;

  it("Step 0 - Init service", async function () {
    /*  init service to get an instance of OData service.
        The init will get the XCSRF-Token, cookies, etc for you and store it in the service instance.
        So you don't have to worry about that anymore.
    */
    service = await odata.common.service.init(url, user, password);
  });

  it("Step 1 - Post", async function () {
    /*  we want to work with the current date - therefore we're calling the date reuse function below
        to get a valid EDM.DateTime format - which looks like that: "datetime'2020-12-16T00:00:00'"
    */
    const datetime = ui5.common.date.getToday("datetime");
    payload["to_PurchaseOrderItem"][0].to_ScheduleLine[0].ScheduleLineDeliveryDate = datetime;

    /*  for doing a post request you have to pass the
        1. The service instance which holds the XSCRF-Token, cookies, etc.
        2. The entity set you want to post against
        3. The payload where your data is stored in

        We will then save the response in a variable called 'res'.
    */
    const res = await odata.common.service.post(service, "A_PurchaseOrder", payload);

    /* Now we can access the result of the response and pick for example the document number.
    */
    references.purchaseOrderNumber = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.purchaseOrderNumber);
  });
});