describe("Scripts for supplier Invoice List", function () {

  it("navigate", async function () {
    browser.ignoreSynchronization = true;
    await browser.sleep(2000);
    await browser.driver.get(
      "https://localhost:4431/webapp/test/flpSandboxMockServer.html#SupplierInvoice-list1?SupplierInvoiceWthnFiscalYear=5105602883%252F2019"
    );
    await browser.refresh();
    browser.ignoreSynchronization = false;
  });

  it("Expand filter bar", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "icon": "sap-icon://slim-arrow-down"
        }
      },
      "parentProperties": {
        "metadata": "sap.f.DynamicPageTitle",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Text",
        "mProperties": {
          "text": "Filtered By (1): Invoice Number"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://slim-arrow-down"
        }
      }
    };

    /*var ui5ControlProperties = {
    "elementProperties":{"metadata":"sap.ui.core.Icon","mProperties":{"src":"sap-icon://slim-arrow-down"}},
    "parentProperties":{"metadata":"sap.m.Button","mProperties":{"icon":"sap-icon://slim-arrow-down"}},
    "prevSiblingProperties":{},
    "nextSiblingProperties":{},
    "childProperties":{}
    };*/
    try {
      var elem = await common.locator.getDisplayedElement(ui5ControlProperties, 0, 60000);
      //await browser.sleep(10000);
      //var EC = protractor.ExpectedConditions;
      //await browser.wait(EC.elementToBeClickable(element(by.ui5All(ui5ControlProperties))), 30000, "Timeout by waiting for element is clickable.");
      await elem.click();
      //await common.userInteraction.click(ui5ControlProperties);
    } catch (e) {
      await expect(true).toBe(true);
    }
  });

  it("check if invoice number is set correctly", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Token",
        "mProperties": {
          "key": "5105602883/2019",
          "text": "5105602883/2019"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "mProperties": {
          "text": "Contains 1 token"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://sys-cancel"
        }
      }
    };
    var Index = 0;
    var attribute = "text"; //eg: title, text, value etc.
    var compareValue = "5105602883/2019"; //expected value
    await common.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Clear Invoice Number", async function () {
    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/SupplierInvoiceWthnFiscalYear/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoice Number"
        }
      },
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.selectAll(ui5ControlProperties);
    await common.userInteraction.pressBackspace();

  });

  it("Enter Invoice Document No.", async function () {
    //----------------------- Block for sap.m.MultiInput - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/SupplierInvoice/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoice Document No."
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    var value = "5105602883"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
    await common.userInteraction.pressEnter();
  });

  it("Click on Go button", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go",
          "type": "Emphasized"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Clear Invoice Document No.", async function () {
    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/SupplierInvoice/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoice Document No."
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.selectAll(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
  });

  it("Enter Invoicing Party", async function () {

    //----------------------- Block for sap.m.MultiInput - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/InvoicingParty/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoicing Party"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    var value = "1000002"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
    await common.userInteraction.pressEnter();

  });

  it("Click on Go button", async function () {

    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Clear Invoicing Party", async function () {

    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/InvoicingParty/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoicing Party"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressBackspace();
  });

  it("Clear Company Code", async function () {

    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/CompanyCode/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Company Code"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressBackspace();
  });

  it("Select Status", async function () {

    //----------------------- Block for sap.ui.core.Icon - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://slim-arrow-down",
          "alt": "Select Options"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.MultiComboBox",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/InvoiceStatusAndOrigin/value"
          }],
          "items": [{
            "path": "/C_SupplierInvoiceStatusValHelp"
          }]
        }
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "mProperties": {
          "text": "Select Options"
        }
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Select Draft", async function () {

    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.CheckBox",
        "mProperties": {}
      },
      "parentProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "type": "Active",
          "title": "Draft"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Close Status", async function () {
    //----------------------- Block for sap.ui.core.Icon - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://slim-arrow-down",
          "alt": "Select Options"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.MultiComboBox",
        "mProperties": {
          "selectedKeys": ["Draft"],
          "value": [{
            "path": "fi1t3rM0d31>/InvoiceStatusAndOrigin/value"
          }],
          "items": [{
            "path": "/C_SupplierInvoiceStatusValHelp"
          }]
        }
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      },
      "childProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "mProperties": {
          "text": "Select Options"
        }
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Click Go Button", async function () {

    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "id": "*C_SupplierInvoiceList--listReportFilter-btnGo",
          "text": "Go"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*"
        }
      }
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Click Status", async function () {

    //----------------------- Block for sap.m.MultiComboBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiComboBox",
        "mProperties": {
          "items": [{
            "path": "/C_SupplierInvoiceStatusValHelp"
          }],
          "selectedKeys": ["Draft"],
          "value": [{
            "path": "fi1t3rM0d31>/InvoiceStatusAndOrigin/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Status"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressBackspace();
  });

  it("Enter Company Code", async function () {

    //----------------------- Block for sap.m.MultiInput - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/CompanyCode/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Company Code"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    var value = "1710"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
    await common.userInteraction.pressEnter();
  });

  it("Click Go Button", async function () {

    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go",
          "type": "Emphasized"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("´Clear Company Code", async function () {

    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/CompanyCode/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Company Code"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressBackspace();

  });

  it("Enter Posting Date", async function () {

    //----------------------- Block for sap.m.Input - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Input",
        "mProperties": {
          "value": [{
            "path": "$smartEntityFilter>formattedText"
          }],
          "valueState": [{
            "path": "$smartEntityFilter>inputstate"
          }],
          "suggestionItems": [{
            "path": "operations"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Posting Date"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://value-help"
        }
      }
    };
    var value = "Date (Sep 11, 2019)"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);

  });

  it("Enter Posting Date", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go",
          "type": "Emphasized"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Enter Invoice Date", async function () {
    //----------------------- Block for sap.m.Input - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Input",
        "mProperties": {
          "value": [{
            "path": "$smartEntityFilter>formattedText"
          }],
          "valueState": [{
            "path": "$smartEntityFilter>inputstate"
          }],
          "suggestionItems": [{
            "path": "operations"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Invoice Date"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://value-help"
        }
      }
    };
    var value = "Date (Sep 11, 2019)"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
  });

  it("Enter Reference", async function () {
    //----------------------- Block for sap.m.MultiInput - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/SupplierInvoiceIDByInvcgParty/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Reference"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    var value = "5105602884"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
    await common.userInteraction.pressEnter();
  });

  it("Click Go Button", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go",
          "type": "Emphasized"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Clear Reference", async function () {
    //----------------------- Block for sap.m.MultiInput - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiInput",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/SupplierInvoiceIDByInvcgParty/value"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {
          "text": "Reference"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {
        "metadata": "sap.m.Tokenizer",
        "mProperties": {}
      }
    };
    await common.userInteraction.click(ui5ControlProperties);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressBackspace();
  });

  it("Enter Searchfield", async function () {
    //----------------------- Block for sap.m.SearchField - Perform Set-Value -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.SearchField",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/_BASIC_SEARCH_FIELD"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {}
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "5105602883"; //value to be entered by user
    await common.userInteraction.clearAndFill(ui5ControlProperties, value);
    await common.userInteraction.pressEnter();
  });

  it("Check Searchfield with search result", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Text",
        "mProperties": {
          "text": "5105602883/2019",
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ObjectIdentifier",
        "mProperties": {
          "title": [{
            "path": "SupplierInvoiceWthnFiscalYear"
          }],
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "mProperties": {
          "text": "Object Identifier"
        }
      },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text"; //eg: title, text, value etc.
    var compareValue = "5105602883/2019"; //expected value
    await common.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Delete Searchfield", async function () {
    //----------------------- Block for sap.m.SearchField - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.SearchField",
        "mProperties": {
          "value": [{
            "path": "fi1t3rM0d31>/_BASIC_SEARCH_FIELD"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.VerticalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Label",
        "mProperties": {}
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.resetSearch(ui5ControlProperties);
  });

  it("Click Go Button", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Go",
          "type": "Emphasized"
        }
      },
      "parentProperties": {
        "metadata": "sap.ui.layout.HorizontalLayout",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Adapt Filter*",
          "type": "Transparent"
        }
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);

  });

  it("Select Posted Invoice", async function () {

    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.CheckBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ColumnListItem",
        "mProperties": {
          "type": "Navigation",
          "highlight": [{
            "path": "IsActiveEntity"
          }, {
            "path": "HasActiveEntity"
          }],
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {
        "metadata": "sap.m.VBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "childProperties": {}
    };

    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Click Delete", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "type": "Transparent",
          "text": [{
            "path": "@i18n>ActionC_SupplierInvoiceListDeleteButton"
          }],
          "enabled": [{
            "path": "_templPriv>/generic/listCommons/breakoutActionsEnabled/ActionC_SupplierInvoiceListDeleteButton/enabled"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.m.OverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {
        "metadata": "sap.m.OverflowToolbarButton",
        "mProperties": {
          "icon": "sap-icon://action-settings",
          "text": "Settings"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Confirm Delete", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Delete",
          "type": "Default"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.AssociativeOverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Cancel",
          "type": "Default"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Compare Deletion", async function () {
    //----------------------- Block for sap.ui.core.Icon - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://message-error"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.MessageListItem",
        "mProperties": {
          "title": "Document 5105603038 has been posted",
          "icon": "sap-icon://message-error",
          "infoState": "Error",
          "type": "Inactive",
          "messageType": "Error"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "src"; //eg: title, text, value etc.
    var compareValue = "sap-icon://message-error"; //expected value
    await common.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Select Close", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": [{
            "path": "i18n|sap.suite.ui.generic.template.ListReport|C_SupplierInvoiceList>button_close"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.m.AssociativeOverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Deselect Posted Invoice", async function () {
    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.CheckBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ColumnListItem",
        "mProperties": {
          "type": "Navigation",
          "highlight": [{
            "path": "IsActiveEntity"
          }, {
            "path": "HasActiveEntity"
          }],
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {
        "metadata": "sap.m.VBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='5105602883',FiscalYear='2019',SupplierInvoiceUUID=guid'3de340d6-7800-412b-9f0c-22f5003d8c86')"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Select Draft", async function () {
    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.CheckBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='',FiscalYear='',SupplierInvoiceUUID=guid'00a4c48c-0dfc-4507-abc6-9b54a431b788')"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ColumnListItem",
        "mProperties": {
          "type": "Navigation",
          "highlight": [{
            "path": "IsActiveEntity"
          }, {
            "path": "HasActiveEntity"
          }],
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='',FiscalYear='',SupplierInvoiceUUID=guid'00a4c48c-0dfc-4507-abc6-9b54a431b788')"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {
        "metadata": "sap.m.VBox",
        "mProperties": {
          "bindingContextPath": "/C_SupplierInvoiceList(SupplierInvoice='',FiscalYear='',SupplierInvoiceUUID=guid'00a4c48c-0dfc-4507-abc6-9b54a431b788')"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Click Delete", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "type": "Transparent",
          "text": [{
            "path": "@i18n>ActionC_SupplierInvoiceListDeleteButton"
          }],
          "enabled": [{
            "path": "_templPriv>/generic/listCommons/breakoutActionsEnabled/ActionC_SupplierInvoiceListDeleteButton/enabled"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.m.OverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {
        "metadata": "sap.m.OverflowToolbarButton",
        "mProperties": {
          "icon": "sap-icon://action-settings",
          "text": "Settings"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Confirm Delete", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Delete",
          "type": "Default"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.AssociativeOverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": "Cancel",
          "type": "Default"
        }
      },
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("Compare Deletion", async function () {
    //----------------------- Block for sap.ui.core.Icon - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "mProperties": {
          "src": "sap-icon://message-success"
        }
      },
      "parentProperties": {
        "metadata": "sap.m.MessageListItem",
        "mProperties": {
          "title": "Draft was deleted.",
          "icon": "sap-icon://message-success",
          "infoState": "Success",
          "type": "Inactive",
          "messageType": "Success"
        }
      },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "src"; //eg: title, text, value etc.
    var compareValue = "sap-icon://message-success"; //expected value
    await common.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Select Close", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "mProperties": {
          "text": [{
            "path": "i18n|sap.suite.ui.generic.template.ListReport|C_SupplierInvoiceList>button_close"
          }]
        }
      },
      "parentProperties": {
        "metadata": "sap.m.AssociativeOverflowToolbar",
        "mProperties": {}
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ToolbarSpacer",
        "mProperties": {}
      },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  //
  // 	});
  //
  // 	it("Select Time Period",async function(){
  //
  // 		//----------------------- Block for sap.m.Select - Perform Click -----------------------
  // 	var ui5ControlProperties = {
  // 		"elementProperties":{"metadata":"sap.m.Select","mProperties":{"selectedKey":[{"path":"$smartEntityFilter>condition/operation"}],"selectedItemId":"__item51-ui.s2p.mm.supplinvoice.list::sap.suite.ui.generic.template.ListReport.view.ListReport::C_SupplierInvoiceList--listReportFilter-filterItemControl_BASIC-PostingDateselect-3","items":[{"path":"operations"}]}},
  // 		"parentProperties":{"metadata":"sap.m.FlexItemData","mProperties":{}},
  // 		"prevSiblingProperties":{},
  // 		"nextSiblingProperties":{},
  // 		"childProperties":{}
  // 	};
  // 	await common.userInteraction.click(ui5ControlProperties);
  //
  //
  // 	});
  //
  // 	it("Select Time Period - Date",async function(){
  //
  // 		//----------------------- Block for sap.ui.core.ListItem - Perform Click -----------------------
  // 	var ui5ControlProperties = {
  // 		"elementProperties":{"metadata":"sap.ui.core.ListItem","mProperties":{"text":[{"path":"$smartEntityFilter>languageText"}],"key":[{"path":"$smartEntityFilter>key"}],"additionalText":[{"path":"$smartEntityFilter>textValue"}]}},
  // 		"parentProperties":{"metadata":"sap.m.SelectList","mProperties":{"keyboardNavigationMode":"None","selectedKey":"DATERANGE","selectedItemId":"__item51-ui.s2p.mm.supplinvoice.list::sap.suite.ui.generic.template.ListReport.view.ListReport::C_SupplierInvoiceList--listReportFilter-filterItemControl_BASIC-PostingDateselect-3"}},
  // 		"prevSiblingProperties":{},
  // 		"nextSiblingProperties":{"metadata":"sap.ui.core.ListItem","mProperties":{"text":[{"path":"$smartEntityFilter>languageText"}],"key":[{"path":"$smartEntityFilter>key"}],"additionalText":[{"path":"$smartEntityFilter>textValue"}]}},
  // 		"childProperties":{}
  // 	};
  // 	await common.userInteraction.click(ui5ControlProperties);
  // 	});
  //
  // 	it("Open Date picker",async function(){
  //
  // 		//----------------------- Block for sap.ui.core.Icon - Perform Click -----------------------
  // var ui5ControlProperties = {
  // 	"elementProperties":{"metadata":"sap.ui.core.Icon","mProperties":{"src":"sap-icon://appointment-2"}},
  // 	"parentProperties":{"metadata":"sap.m.DatePicker","mProperties":{"dateValue":[{"path":"$smartEntityFilter>value1"}]}},
  // 	"prevSiblingProperties":{},
  // 	"nextSiblingProperties":{},
  // 	"childProperties":{}
  // };
  // await common.userInteraction.click(ui5ControlProperties);
  //
  // 	});
  //
  // 	it("Select 11.Sept. ",async function(){
  //
  // 		//----------------------- Block for sap.ui.unified.calendar.Month - Perform Click -----------------------
  // 		var ui5ControlProperties = {
  // 			"elementProperties":{"metadata":"sap.ui.unified.calendar.Month","mProperties":{"primaryCalendarType":"Gregorian"}},
  // 			"parentProperties":{"metadata":"sap.ui.unified.Calendar","mProperties":{"primaryCalendarType":"Gregorian"}},
  // 			"prevSiblingProperties":{"metadata":"sap.ui.unified.calendar.Header","mProperties":{"textButton1":"September","ariaLabelButton1":"September. Press F4 to select a month","ariaLabelButton2":"2019. Press Shift + F4 to select a year"}},
  // 			"nextSiblingProperties":{"metadata":"sap.ui.unified.calendar.MonthPicker","mProperties":{"primaryCalendarType":"Gregorian"}},
  // 			"childProperties":{}
  // 		};
  // 		await common.userInteraction.click(ui5ControlProperties);
  //
  // 	});

  it("Dummy", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------

    await browser.sleep(5000);
  });
});