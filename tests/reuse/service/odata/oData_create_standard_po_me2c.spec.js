describe("oData_create_standard_po_me2c.spec", function () {
    /* disable TLS validation -> SSL certifcates disabled       */
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    //----------------------------------TESTDATA---------------------------------------
    var payload = require("../data/POST/StandardPurchaseOrder.json");
    var references = require("../data/references.json");

    /*-------------------------url to the oData-API------------ */
    const url = browser.params.systemUrl + "/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";

    /*-----------------------Credentials----------------------- */
    let username = "Purchaser";
    let password = "Welcome1!";

    /* declare variables for later usage                        */

    let service;

    it("Step0  init service", async function () {
        service = await oData.common.service.init(url, username, password, false);
    });

    it("Step1  post", async function () {

        let res = await oData.common.service.post(service, "A_PurchaseOrder", payload);

        references.odata_po = res.PurchaseOrder;
        console.log("Created Purchase Order ->", references.odata_po);
    });

});
