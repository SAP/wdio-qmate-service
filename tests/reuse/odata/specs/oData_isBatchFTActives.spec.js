describe("oData_create_po_witch_batches.spec", function () {
  /* disable TLS validation -> SSL certifcates disabled       */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  //----------------------------------TESTDATA---------------------------------------
  const references = require("../data/POST/references.json");

  /*-------------------------url to the oData-API------------ */
  const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";

  /*-----------------------Credentials----------------------- */
  const username = "Purchaser";
  const password = "super-duper-sensitive-pw";

  /* declare variables for later usage                        */

  let service;

  it("Step 0 - Init service", async function () {
    service = await oData.common.service.init(url, username, password, false);
  });

  it("Step 1 - Get status of feature toggle", async function () {
    references.isFeatureToggleActive = await oData.common.service.isFeatureToggleActivated(service, references.featureToggleForBatches);
  });

});
