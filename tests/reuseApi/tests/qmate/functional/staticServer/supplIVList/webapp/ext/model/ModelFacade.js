jQuery.sap.declare("ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade");
jQuery.sap.require("ui.s2p.mm.supplinvoice.list.ext.utils.Constants");
ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade = {

  /**
   * On add new Upload button click event
   *
   * @param {object} oDataModel The Application ODataModel
   * @param {object} oView The View object
   */
  init: function (oDataModel, oView) {
    this._Constants = ui.s2p.mm.supplinvoice.list.ext.utils.Constants;
    this.oDataModel = oDataModel;

    this.oDataModel.setDeferredBatchGroups([1]);
    this.oDataModel.setChangeGroups({
      "*": {
        groupId: this._Constants.MAIN_BATCH_GROUP,
        changeSetId: this._Constants.MAIN_CHANGESET,
        single: false
      }
    });
    this.oDataModel.setRefreshAfterChange(false);
    this.oResourceBundle = oView
      .getModel("i18n|sap.suite.ui.generic.template.ListReport|C_SupplierInvoiceList")
      .getResourceBundle();
  },

  /**
   * Call function import with its name
   *
   * @returns {void}
   * @param {object} sName The function import name to be called
   * @param {object} oParams The function import parameters
   * @param {object} fnSuccess The success callback function
   * @param {object} fnError The error callback function
   * @param {bool} bSubmitChanges Flag used if changes should be submitted directly
   * @param {string} sChangeSet The event parameter
   */
  callFunctionImport: function (sName, oParams, fnSuccess, fnError, bSubmitChanges, sChangeSet) {
    var sChangeSetId = this._Constants.MAIN_CHANGESET;
    if (sChangeSet) {
      sChangeSetId = sChangeSet;
    }

    // Call the function import (defered)
    this.oDataModel.callFunction("/" + sName, {
      groupId: this._Constants.MAIN_BATCH_GROUP,
      changeSetId: sChangeSetId,
      success: fnSuccess,
      error: fnError,
      urlParameters: oParams,
      method: "POST"
    });
    //Submit changes directly?
    if (bSubmitChanges) {
      this.oDataModel.submitChanges();
    }
  },

  getODataModel: function () {
    return this.oDataModel;
  },

  getResourceBundle: function () {
    return this.oResourceBundle;
  }
};