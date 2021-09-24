describe("oData_create_standard_po.spec", function () {
  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //----------------------------------TESTDATA---------------------------------------
  var payload = require("./data/POST/StandardPurchaseOrder.json");
  // var references = require("./data/references.json");
  const references = browser.params.import.data["references"];

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  let username = "Purchaser";
  let password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */

  let srv;

  it("Step0  init srv", async function () {
    srv = await service.odata.init(url, username, password, false);
  });

  it("Step1  post", async function () {

    let res = await service.odata.post(srv, "A_PurchaseOrder", payload);

    references.odata_po = res.PurchaseOrder;
    console.log("Created Purchase Order ->", references.odata_po);
  });

});