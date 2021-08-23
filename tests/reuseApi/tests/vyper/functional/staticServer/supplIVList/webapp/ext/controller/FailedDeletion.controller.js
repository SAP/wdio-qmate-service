sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("ui.s2p.mm.supplinvoice.list.ext.controller.FailedDeletion", {

    setExtensionAPI: function (oExtensionAPI) {
      this.oExtensionAPI = oExtensionAPI;
    },

    onClosePressed: function (oEvent) {
      // Delete the messages from the request before.
      sap.ui.getCore().getMessageManager().removeAllMessages();
      var oDialog = sap.ui.getCore().byId(oEvent.getSource().getParent().getId());
      this.oExtensionAPI.refreshTable();
      oDialog.close();
    }
  });
});