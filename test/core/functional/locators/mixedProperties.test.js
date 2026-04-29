// ===================== CONSTANTS ==========================
const NEGATIVE_TEST_TIMEOUT = 10_000;

// ======================= TESTS ============================
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

    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
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
    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
      .rejects.toThrowError(/No visible elements found/);
  });
});

describe("Test for mixed properties (childProperties, parentProperties, prevSiblingProperties, nextSiblingProperties)", function () {
  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("'happy case': should access multiple elements by nested, childProperties, parentProperties, prevSiblingProperties, nextSiblingProperties", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "parentProperties": {
          "metadata": "sap.m.Button",
          "nextSiblingProperties": {
            "metadata": "sap.m.ObjectListItem",
            "childProperties": {
              "metadata": "sap.m.Text"
            }
          },
          "prevSiblingProperties": {
            "metadata": "sap.m.FlexBox",
            "childProperties": {
              "metadata": "sap.m.Image"
            }
          }
        }
      }
    };
    const elements = await browser.uiControls(selector);
    expect(elements.length).toBeGreaterThan(1);
  });

  it("'unhappy case': should access element by nested, wrong childProperties, parentProperties, prevSiblingProperties, nextSiblingProperties", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "parentProperties": {
          "metadata": "sap.m.Button",
          "nextSiblingProperties": {
            "metadata": "sap.m.ToggleButton",
            "childProperties": {
              "metadata": "sap.m.Text" // <- wrong: real is "sap.ui.core.Icon"
            }
          },
          "prevSiblingProperties": {
            "metadata": "sap.m.Title"
          },
          "parentProperties": {
            "metadata": "sap.m.Bar"
          },
          "childProperties": {
            "metadata": "sap.ui.core.Icon"
          }
        }
      }
    };

    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("'unhappy case': should access element by nested, childProperties, wrong parentProperties, prevSiblingProperties, nextSiblingProperties", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "parentProperties": {
          "metadata": "sap.m.Button",
          "nextSiblingProperties": {
            "metadata": "sap.m.ToggleButton",
            "childProperties": {
              "metadata": "sap.ui.core.Icon"
            }
          },
          "prevSiblingProperties": {
            "metadata": "sap.m.Title"
          },
          "parentProperties": {
            "metadata": "sap.m.Text" // <- wrong: real is "sap.m.Bar"
          },
          "childProperties": {
            "metadata": "sap.ui.core.Icon"
          }
        }
      }
    };

    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("'unhappy case': should access element by nested, childProperties, parentProperties, wrong prevSiblingProperties, nextSiblingProperties", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "parentProperties": {
          "metadata": "sap.m.Button",
          "nextSiblingProperties": {
            "metadata": "sap.m.ToggleButton",
            "childProperties": {
              "metadata": "sap.ui.core.Icon"
            }
          },
          "prevSiblingProperties": {
            "metadata": "sap.m.Text" // <- wrong: real is "sap.m.Title"
          },
          "parentProperties": {
            "metadata": "sap.m.Bar"
          },
          "childProperties": {
            "metadata": "sap.ui.core.Icon"
          }
        }
      }
    };

    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("'unhappy case': should access element by nested, childProperties, parentProperties, prevSiblingProperties, wrong nextSiblingProperties", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "parentProperties": {
          "metadata": "sap.m.Button",
          "nextSiblingProperties": {
            "metadata": "sap.m.Button", // <- wrong: real is "sap.m.ToggleButton"
            "childProperties": {
              "metadata": "sap.ui.core.Icon"
            }
          },
          "prevSiblingProperties": {
            "metadata": "sap.m.Title"
          },
          "parentProperties": {
            "metadata": "sap.m.Bar"
          },
          "childProperties": {
            "metadata": "sap.ui.core.Icon"
          }
        }
      }
    };

    await expect(browser.uiControl(selector, undefined, NEGATIVE_TEST_TIMEOUT))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("'happy case': should access element by empty nested elementProperties, ancestorProperties, empty siblingProperties and descendantProperties", async () => {
    const selector = {
      "elementProperties": {
        "src": "sap-icon://customer",
        "parentProperties": {
          "nextSiblingProperties": {},
          "prevSiblingProperties": "",
          "parentProperties": "",
          "childProperties": {}
        }
      }
    };
    await expect(browser.uiControl(selector)).toBeTruthy();
  });
});