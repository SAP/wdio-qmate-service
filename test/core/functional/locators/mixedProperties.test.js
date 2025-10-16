describe("Test for mixed properties (elementProperties, ancestorProperties, siblingProperties and descendantProperties)", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("'happy case': should access element by nested elementProperties, ancestorProperties, siblingProperties, descendantProperties and domProperties", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Toolbar",
          "id": "*searchBar*",
          "domProperties": {
            "nodeName": "div",
            "class": "*sapMTB*"
          }
        },
        "ancestorProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Page",
          "id": "*page",
          "ancestorProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.ui.core.mvc.XMLView",
            "descendantProperties": {
              "viewName": "sap.ui.demo.cart.view.Home",
              "metadata": "sap.m.Page",
              "id": "*page"
            }
          }
        }
      }
    };

    await expect(browser.uiControl(selector)).toBeClickable();
  });

  it("'unhappy case': should access element by nested elementProperties, ancestorProperties, siblingProperties, domProperties and wrong descendantProperties", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Toolbar",
          "id": "*searchBar33343",
          "domProperties": {
            "nodeName": "div",
            "class": "sapMIBar sapMTB sapMTBNewFlex sapMTBInactive sapMTBStandard sapMTB-Auto-CTX sapMIBar-CTX sapMSubHeader-CTX sapContrastPlus",
            "id": "container-cart---homeView--searchBar33343"
          }
        },
        "ancestorProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Page",
          "id": "*page",
          "ancestorProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.Page", // "sap.m.Page" instead of  "sap.ui.core.mvc.XMLView"
            "descendantProperties": {
              "viewName": "sap.ui.demo.cart.view.Home",
              "metadata": "sap.m.Page",
              "id": "*page"
            }
          }
        }
      }
    };

    await expect(browser.uiControl(selector))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("'happy case': should access element by nested elementProperties, ancestorProperties, empty siblingProperties and descendantProperties", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": "", // empty siblingProperties
        "ancestorProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Page",
          "id": "*page",
          "ancestorProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.ui.core.mvc.XMLView",
            "descendantProperties": {
              "viewName": "sap.ui.demo.cart.view.Home",
              "metadata": "sap.m.Page",
              "id": "*page"
            }
          }
        }
      }
    };
    await expect(browser.uiControl(selector)).toBeTruthy();
  });

  it("'happy case': should access element by nested elementProperties, ancestorProperties, domProperties, siblingProperties and empty descendantProperties", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Toolbar",
          "id": "*searchBar33343",
          "domProperties": {
            "nodeName": "div",
            "class": "sapMIBar sapMTB sapMTBNewFlex sapMTBInactive sapMTBStandard sapMTB-Auto-CTX sapMIBar-CTX sapMSubHeader-CTX sapContrastPlus",
            "id": "container-cart---homeView--searchBar33343"
          }
        },
        "ancestorProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Page",
          "id": "*page",
          "ancestorProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.ui.core.mvc.XMLView",
            "descendantProperties": ""
          }
        }
      }
    };
    await expect(browser.uiControl(selector)).toBeTruthy();
  });

  it("'unhappy case': should access element by nested elementProperties, ancestorProperties, siblingProperties, descendantProperties and wrong domProperties", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Bar",
        "id": "*page-intHeader",
        "siblingProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Toolbar",
          "id": "*searchBar33343",
          "domProperties": {
            "nodeName": "li", // nodeName "li" instead of "div"
            "id": "container-cart---homeView--searchBar33343"
          }
        },
        "ancestorProperties": {
          "viewName": "sap.ui.demo.cart.view.Home",
          "metadata": "sap.m.Page",
          "id": "*page",
          "ancestorProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.ui.core.mvc.XMLView",
            "descendantProperties": {
              "viewName": "sap.ui.demo.cart.view.Home",
              "metadata": "sap.m.Page",
              "id": "*page"
            }
          }
        }
      }
    };
    await expect(browser.uiControl(selector))
      .rejects.toThrowError(/No visible elements found/);
  });
});