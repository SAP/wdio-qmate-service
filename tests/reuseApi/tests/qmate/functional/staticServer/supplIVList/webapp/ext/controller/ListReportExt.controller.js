jQuery.sap.require("ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade");
jQuery.sap.require("ui.s2p.mm.supplinvoice.list.ext.utils.Constants");
jQuery.sap.require("sap.ui.generic.app.navigation.service.NavType");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.core.routing.HashChanger");
jQuery.sap.require("sap.ushell.services.URLParsing");

sap.ui.controller("ui.s2p.mm.supplinvoice.list.ext.controller.ListReportExt", {

  onAfterRendering: function () {
    var oOwnComponent = this.getOwnerComponent();
    this.oDataModel = oOwnComponent.getAppComponent().getModel();
    ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade.init(this.oDataModel, this.oView);

    this._Constants = ui.s2p.mm.supplinvoice.list.ext.utils.Constants;
    this._ModelFacade = ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade;

    this._oResourceBundle = this._ModelFacade.getResourceBundle();

    this._oTable = this.byId(this.createId(this._Constants.UI_ID_RESPONSIVE_TABLE));
    this._oTable.attachSelectionChange(jQuery.proxy(this.onSelectionChanged, this));

    this._oDeleteButton = this.byId(this.createId(this._Constants.UI_ID_DELETE_BUTTON));

    this._sSortingColumn = this._Constants.SORTING_COLUMN_SUPPLIER_INVOICE_WITH_FISCAL_YEAR;
    this._aNotDeletableInvoices = [];
    this._iNumberOfSelectedTableItems = 0;
    this._iNumberOfCurrentResponses = 0;
    this._bShowMessages = false;

    var that = this;

    var oNavigationHandler = new sap.ui.generic.app.navigation.service.NavigationHandler(this);
    var oParseNavigationPromise = oNavigationHandler.parseNavigation();
    oParseNavigationPromise.done(function (oAppData, oStartupParameters, sNavType) {
      var oFilterbar = that.getFilterbar();

      switch (sNavType) {
        // fallthrough
        case sap.ui.generic.app.navigation.service.NavType.xAppState:
        case sap.ui.generic.app.navigation.service.NavType.URLParams:
          jQuery.proxy(that.handleFilterParamsAfterInit(oStartupParameters), that);
          //that.handleFilterParams(oStartupParameters);
          oFilterbar.search();
          break;
        default:
          break;
      }
    });

    var fnHashChanger = function (oEvent) {
      // when the newHash is empty the link was probably opened via a notification
      if (!oEvent.getParameter("newHash")) {
        var oURLParsing = sap.ushell.Container.getService("URLParsing");
        var sNewHash = oURLParsing.getHash(document.URL);

        var oParams = oURLParsing.parseParameters(sNewHash);
        sap.ui.core.routing.HashChanger.getInstance().detachEvent("hashChanged", fnHashChanger);

        jQuery.sap.delayedCall(50, this, function () {
          this.handleFilterParams(oParams);
          this.getFilterbar().search(true);
          sap.ui.core.routing.HashChanger.getInstance().attachEvent("hashChanged", fnHashChanger);
        });
      }
    }.bind(this);

    sap.ui.core.routing.HashChanger.getInstance().attachEvent("hashChanged", fnHashChanger);
  },

  handleFilterParamsAfterInit: function (oParams) {
    var oFilterbar = this.getFilterbar();
    if (oFilterbar) {
      oFilterbar.attachInitialized(null, jQuery.proxy(this.handleFilterParams, this, oParams));
    }
  },

  handleFilterParams: function (oParams, bClear) {
    var oFilterbar = this.getFilterbar();
    var PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR = "SupplierInvoiceWthnFiscalYear";
    var paramSupplierInvoice;

    if (typeof oParams[PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR] === "string") {
      paramSupplierInvoice = oParams[PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR];
    } else if ($.isArray(oParams[PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR]) && oParams[
      PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR]
      .length > 0) {
      paramSupplierInvoice = oParams[PARAM_NAME_SUPPLIER_INVOICE_WITHIN_FISCAL_YEAR][0];
    }

    if (paramSupplierInvoice) {
      var aInvoices = [];

      paramSupplierInvoice = decodeURIComponent(paramSupplierInvoice);
      paramSupplierInvoice.split("$").forEach(function (sInvoiceNumber) {
        if (/\d{10}\/\d{4}/.test(sInvoiceNumber)) {
          aInvoices.push(sInvoiceNumber);
        }
      });

      if (aInvoices.length > 0) {
        var oFilter = {
          SupplierInvoiceWthnFiscalYear: {
            items: []
          }
        };
        aInvoices.forEach(function (sInvoice) {
          oFilter.SupplierInvoiceWthnFiscalYear.items.push({
            key: sInvoice,
            text: sInvoice
          });
        });
        oFilterbar.clear();
        oFilterbar.setFilterData(oFilter, true);
      }
    }
  },

  getFilterbar: function () {
    return this.getView().byId(this._Constants.UI_ID_FILTERBAR);
  },

  onBeforeRebindTableExtension: function (oEvent) {
    // refresh the button state; when the user changes the filter settings and an item was selected
    // the delete-buttton is still enabled altough the selected item is not visible anymore
    oEvent.getSource().attachEventOnce("dataReceived", this._enableOrDisableDeleteButton, this);
  },

  onSelectionChanged: function () {
    this._enableOrDisableDeleteButton();
  },

  onClickDeleteButton: function () {
    // Get the keys of the selected rows.
    var oSelectedTableItems = this._oTable.getSelectedItems();

    this._bShowMessages = false;

    if (oSelectedTableItems.length > 0) {
      var that = this;

      this._aNotDeletableInvoices = [];
      this._iNumberOfSelectedTableItems = 0;
      this._iNumberOfCurrentResponses = 0;

      // Success callback function.
      var fnSuccess = function (oData, oResponse) {

        this._iNumberOfCurrentResponses++;

        this._addNotDeletableInvoices(oData);

        if (this._iNumberOfCurrentResponses === this._iNumberOfSelectedTableItems) {
          this.oView.setBusy(false);

          this._showDeletionDialog(this, true);

          this._enableOrDisableDeleteButton();
        }
      };

      // Error callback function.
      var fnError = function (oError) {

        this._iNumberOfCurrentResponses++;
        this._bShowMessages = true;

        if (this._bShowMessages) {
          this.oView.setBusy(false);
          this._enableOrDisableDeleteButton();

          this._showDeletionDialog(this, false);

          // If an error message was shown once, then do not show again.	
          this._bShowMessages = false;
        }
      };

      // Show the confirmation dialog so that the selected invoices will be deleted if ok was clicked.
      sap.m.MessageBox.warning(this._oResourceBundle.getText(this._Constants.I18N_DIALOG_DELETE_ALL_SELECTED_ENTRIES), {
        title: this._oResourceBundle.getText(this._Constants.I18N_DELETE_HEADER),
        actions: [sap.m.MessageBox.Action.DELETE, sap.m.MessageBox.Action.CANCEL],
        onClose: function (oAction) {
          if (oAction === that._Constants.ACTION_DELETE) {
            // Set the busy indicator.
            that.oView.setBusy(true);
            that.oView.setBusyIndicatorDelay(that._Constants.BUSY_DELAY);

            // The on confirmed clicked event handler.
            that.fnOnConfirmClicked(oSelectedTableItems, fnSuccess, fnError);
          }
        }
      });
    }
  },

  fnOnConfirmClicked: function (oSelectedTableItems, fnSuccess, fnError) {
    var oParams = {};
    var oSelectedTableItem = {};
    var sPath = "";
    var oProperty = "";
    var sInvoiceStatusAndOrigin = "";

    // The flag that submits all changes for the changeset.
    var bSubmitChanges = false;

    // Save the number of selected table items.
    this._iNumberOfSelectedTableItems = oSelectedTableItems.length;

    // Iterate over all selected items.
    for (var i = 0; i < oSelectedTableItems.length; ++i) {
      oSelectedTableItem = oSelectedTableItems[i];

      sPath = oSelectedTableItem.getBindingContext().getPath();
      oProperty = this.oDataModel.getProperty(sPath);

      oParams.SupplierInvoice = oProperty.SupplierInvoice;
      oParams.FiscalYear = oProperty.FiscalYear;
      oParams.SupplierInvoiceUUID = oProperty.SupplierInvoiceUUID;
      sInvoiceStatusAndOrigin = oProperty.InvoiceStatusAndOrigin;

      if (i === (oSelectedTableItems.length - 1)) {
        bSubmitChanges = true;
      }

      ui.s2p.mm.supplinvoice.list.ext.model.ModelFacade.callFunctionImport(
        this._Constants.FUNCTION_IMPORT_DELETE,
        oParams,
        jQuery.proxy(fnSuccess, this),
        jQuery.proxy(fnError, this),
        bSubmitChanges,
        i + 1); //Changeset - Own changeset for each deletion required from backend. 
    }
  },

  _showDeletionDialog: function (oPointer, bSuccess) {
    // Create an model for the dialog that should be shown.
    if (oPointer.oFailedDeletionDialog) {
      oPointer.oFailedDeletionDialog.destroy();
    }
    oPointer.oFailedDeletionController = sap.ui.controller(oPointer._Constants.OPEN_FAILED_DELETION_VIEW_CONTROLLER_ID);
    oPointer.oFailedDeletionController.setExtensionAPI(this.extensionAPI);
    oPointer.oFailedDeletionDialog = sap.ui.xmlfragment(
      oPointer.createId(oPointer._Constants.DIALOG_FRAGMENT_PREFIX),
      oPointer._Constants.DIALOG_FRAGMENT_FRAGMENT_FAILED_DELETION,
      oPointer.oFailedDeletionController);
    oPointer.getView().addDependent(oPointer.oFailedDeletionDialog);

    // Add the messge view.
    var oMessageTemplate = new sap.m.MessageItem({
      description: "{description}",
      //longtext currently not displayed as longtext of messages do not fit
      type: "{type}",
      title: "{message}"
    });

    var oBackButton = new sap.m.Button({
      icon: sap.ui.core.IconPool.getIconURI("nav-back"),
      visible: false,
      press: function () {
        oPointer._oMessageView.navigateBack();
        this.setVisible(false);
      }
    });

    var oCloseButton = new sap.m.Button({
      text: "Close",
      press: function () {
        this._oPopover.close();
      }
    });
    var sPopoverBarText = "{i18n|sap.suite.ui.generic.template.ListReport|C_SupplierInvoiceList>deleteHeader}";
    var oPopoverBar = null;
    if (bSuccess) {
      oPopoverBar = new sap.m.Bar({
        contentLeft: [oBackButton],
        contentMiddle: [
          new sap.ui.core.Icon({
            color: sap.ui.core.IconColor.Positive,
            src: "sap-icon://message-success"
          }),
          new sap.m.Text({
            text: sPopoverBarText
          })
        ]
      });
    } else {
      oPopoverBar = new sap.m.Bar({
        contentLeft: [oBackButton],
        contentMiddle: [
          new sap.ui.core.Icon({
            color: sap.ui.core.IconColor.Negative,
            src: "sap-icon://message-error"
          }),
          new sap.m.Text({
            text: sPopoverBarText
          })
        ]
      });
    }

    oPointer._oMessageView = new sap.m.MessageView({
      showDetailsPageHeader: false,
      itemSelect: function () {
        oBackButton.setVisible(true);
      },
      items: {
        path: "/",
        template: oMessageTemplate
      }
    });
    var oModel = sap.ui.getCore().getMessageManager().getMessageModel();
    oPointer._oMessageView.setModel(oModel);
    oPointer.oFailedDeletionDialog.setModel(oModel);
    oPointer.oFailedDeletionDialog.setCustomHeader(oPopoverBar);
    oPointer.oFailedDeletionDialog.setShowHeader(true);
    oPointer.oFailedDeletionDialog.setBeginButton(oCloseButton);
    oPointer.oFailedDeletionDialog.addContent(oPointer._oMessageView);

    // The navigateBack forces the oMessageView to update the current success/ error message
    oPointer._oMessageView.navigateBack();
    oPointer.oFailedDeletionDialog.open();
  },

  _addNotDeletableInvoices: function (oData) {
    var oInvoice = {};

    if (oData.Delete.STATUS_CODE === this._Constants.ABAP_TRUE) {
      this._bShowMessages = true;

      oInvoice.InvoiceNumber = oData.Delete.BELNR;
      oInvoice.FiscalYear = oData.Delete.GJAHR;
      oInvoice.SupplierInvoiceUuid = oData.Delete.ROOT_KEY;
      oInvoice.ErrorMessage = oData.Delete.ERR_MSG;
      oInvoice.Identifier = oData.Delete.IDENTIFIER;

      this._aNotDeletableInvoices.push(oInvoice);
    }
  },

  _enableOrDisableDeleteButton: function () {
    var iNumberOfSelectedItems = this._oTable.getSelectedItems().length;

    if (iNumberOfSelectedItems > 0) {
      this._oDeleteButton.setEnabled(true);
    } else {
      this._oDeleteButton.setEnabled(false);
    }
  }
});