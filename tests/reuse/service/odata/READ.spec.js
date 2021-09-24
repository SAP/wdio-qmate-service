describe("READ - sample", function () {

  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  /*--------------------------TESTDATA----------------------- */
  // const references = require("./data/references.json");
  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

  /*-----------------------Credentials----------------------- */
  const user = "Purchaser";
  const password = "Welcome1!";
  const references = browser.params.import.data["references"];
  /* declare variables for later usage                        */

  let odata;
  let poNumbGet;


  it("Step0  init service", async function () {
    odata = await service.odata.init(url, user, password);
    console.log(odata);
  });


  it("Step1  GET PurchaseOrder", async function () {
    const keys = {
      "PurchaseOrder": references.odata_po
    };

    console.log("hier steht dene po", references.odata_po);

    let res = await service.odata.get(odata, "A_PurchaseOrder", keys);
    poNumbGet = res.PurchaseOrder;
  });

  it("Step2  Expect Po Numbers to be equal", async function () {
    await expect(references.odata_po).toBe(poNumbGet);
  });
});