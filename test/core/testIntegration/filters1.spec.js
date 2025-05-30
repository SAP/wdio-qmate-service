/* eslint-disable no-undef */
/*
1) Test standard properties
2) Test new properties adding from ui5 api
3) Test with removing empty properties
4) Testing with binding path/bindingContextPath
4a) Testing with binding path/context on prec,next, parent element
5) Testing with i18nText
5a) Testing with i18nText on prec,next, parent element
6) Testing with boolean, number properties
7) Test with empty values, wrong property names, wrong metadata
8) Test with index
9) Test with aggregation bindings
10) Test with ancestors
11) Test with bindingpath aggregations
12) Test with chaining of elements
13) Test view Id & Name
14) Test read UI Control and all properties immidietaly
15) Test dom properties
16) Test descentor/child properties
17) Test assertions
18) Test deep selectors
19) Test executeInBrowser
 */

describe("filters1", function () {

  it("Step 01: click on the first standard item - evaluate browser", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    var newText = "whatsUp";
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var title = await browser.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, elem, newText);

    await expect(title).toBe(newText);
  });

  it("Step 02: click on the first standard item - evaluate browser", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    var newText = "test";
    var selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 30000 };
    //await ui5.element.getDisplayed(ui5ControlProperties);
    var title = await browser.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, selectorParams, newText);

    await expect(title).toBe(newText);
  });

  it("Step 03: click on the first standard item - evaluate browser wrong element", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-79",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    var newText = "master";
    var selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 3000 };

    await expect(browser.controlActionInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, selectorParams, newText))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 04: click on the first standard item - evaluate browser and fire press", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    //await ui5.element.getDisplayed(ui5ControlProperties);
    var title = await browser.controlActionInBrowser(function (control, done) {
      var data = { title: control.getTitle() };
      control.attachPress(data, function () {
        done(data.title);
      });
      control.firePress();
    }, ui5ControlProperties);

    await expect(title).toBe("test");
  });

  it("Step 05: click back - evaluate browser", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    var selectorParams = { selector: ui5ControlProperties, index: 0, timeout: 3000 };
    //await ui5.element.getDisplayed(ui5ControlProperties);
    await browser.controlActionInBrowser(function (control, done) {
      control.attachPress(undefined, function () {
        done();
      });
      control.firePress();
    }, selectorParams);
  });

  it("Step 06: check Page has descendant text - use deep selector structure", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "i18n>welcomeCarouselShipping" }],
          "ancestorProperties": {
            "viewName": "*view.Welcome",
            "tooltip": [{ "path": "i18n>welcomeDescription" }]
          }
        }
      }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 30000);
  });

  it("Step 07: check Page has descendant text - use deep selector structure sibling", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page",
        "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "*CarouselShipping" }],
          "ancestorProperties": {
            "viewName": "*view.Welcome",
            "tooltip": [{ "path": "i18n>welcomeDescription" }],
            "siblinkProperties": {
              "viewName": "*view.Welcome",
              "tooltip": [{ "path": "i18n>welcomeDescription" }]
            }
          }
        }
      }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 30000);
  });

  it("Step 08: check Page has descendant text - use deep selector structure sibling wrong", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "i18n>welcomeCarouselShipping" }],
          "ancestorProperties": {
            "viewName": "*view.Welcome",
            "tooltip": [{ "path": "i18n>welcomeDescription" }],
            "descendantProperties": {
              "metadata": "sap.m.ScrollContainer",
              "domProperties": {
                "class": "*sapMScrollCont"
              },
              "siblingProperties": {
                "metadata": "sap.m.ScrollContainer",
                "domProperties": {
                  "class": "*sapMScrollCont"
                },
                "descendantProperties": {
                  "metadata": "sap.m.Text", "mProperties": {
                    "text": [{ "path": "welcomeCarouselCreditCard1" }],
                  }
                }
              }
            }
          }
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 5000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  // can not work there is no ScrollContainer on the whole page
  // it("Step 09: check Page has descendant text - use deep selector structure in elementProperties", async function () {
  //   var ui5ControlProperties = {
  //     "elementProperties": {
  //       "metadata": "sap.m.Page", "mProperties": {
  //         "id": "container-cart---welcomeView--page"
  //       },
  //       "descendantProperties": {
  //         "metadata": "sap.m.Text", "mProperties": {
  //           "text": [{ "path": "i18n>welcomeCarouselShipping" }],
  //           "ancestorProperties": {
  //             "viewName": "*view.Welcome",
  //             "tooltip": [{ "path": "i18n>welcomeDescription" }],
  //             "descendantProperties": {
  //               "metadata": "sap.m.ScrollContainer",
  //               "domProperties": {
  //                 "class": "*sapMScrollCont"
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //   };
  //   await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 30000);
  // });

  it("Step 10: check Page has descendant text - use deep selector structure wrong", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{"path": "i18n>welcomeCarouselShipping"}],
          "ancestorProperties": {
            "viewName": "*view.Welcome",
            "tooltip": [{"path": "i18n>welcomeDescription"}],
            "descendantProperties": {
              "metadata": "sap.m.ScrollContainer",
              "domProperties": {
                "class": "*sapMScrollContas"
              }
            }
          }
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 5000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 11: check Page has descendant text - wait for property only not element", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "i18n>welcomeCarouselShipping" }]
        }
      }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 1, 30000);
  });

  it("Step 12: check Page has descendant text - wait for property without mProperties", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Page", "id": "container-cart---welcomeView--page" },
      "descendantProperties": { "metadata": "sap.m.Text", "text": [{ "path": "i18n>welcomeCarouselShipping" }] }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 1, 30000);
  });

  it("Step 13: check name is Accessories - check with dom properties and not mProperties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "viewId": "cont*cart*",
        "title": [{ "path": "CategoryName" }],
        "bindingContextPath": "/ProductCategories*",
        "domProperties": {
          "nodeName": "li",
          "role": "listitem",
          "class": "*sapMLIB*sapMSLI"
        }
      }
    };
    const nameField = await browser.uiControl(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });

  it("Step 14: check name is Accessories - check with wrong properties and not mProperties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "viewId": "cont*cart*",
        "title": [{ "path": "CategoryNam" }],
        "bindingContextPath": "/ProductCategories*",
        "domProperties": {
          "nodeName": "li",
          "data-sap-ui": "*categoryList-0",
          "role": "listitem",
          "class": "*sapMLIB*sapMSLI",
          "id": "__item1-container-cart---homeView--categoryList-0"
        }
      }
    };

    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 15: check name is Accessories - check with wrong dom properties and not mProperties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "viewId": "cont*cart*",
        "title": [{"path": "CategoryName"}],
        "bindingContextPath": "/ProductCategories*",
        "domProperties": {
          "nodeName": "li",
          "data-sap-ui": "*categoryList-0",
          "role": "listitem1",
          "class": "*sapMLIB*sapMSLI",
          "id": "__item1-container-cart---homeView--categoryList-0"
        }
      }
    };

    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 16: check Page has empty descendant button", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "*welcomeView--page"
        }
      },
      "descendantProperties": {}
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 10000);
  });

  it("Step 17: check Page has descendant text", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "i18n>welcomeCarouselShipping" }]
        }
      }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 10000);
  });

  it("Step 18: check Page has descendant button", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "*welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Button", "mProperties": {
          "tooltip": [{ "path": "i18n>avatarButtonTooltip" }]
        }
      }
    };
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, "showHeader", "true", 0, 30000, 10000);
  });

  it("Step 19: check Page has wrong descendant text", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "descendantProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "welcomeCarouselShippings1" }]
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 20: check Page has not direct childern text control", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "childProperties": {
        "metadata": "sap.m.Text", "mProperties": {
          "text": [{ "path": "i18n>welcomeCarouselShipping" }]
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 21: check Page has not direct children button control", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "id": "container-cart---welcomeView--page"
        }
      },
      "childProperties": {
        "metadata": "sap.m.Button", "mProperties": {
          "tooltip": [{ "path": "i18n>avatarButtonTooltip" }]
        }
      }
    };

    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 22: check name is Accessories - check with dom properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "cont*cart*",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        },
        "domProperties": {
          "nodeName": "li",
          "data-sap-ui": "*categoryList*",
          "role": "listitem",
          "class": "*sapMLIB*sapMSLI"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });

  it("Step 23: check name is Accessories - check with dom properties nodename and id", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "domProperties": {
          "nodeName": "li",
          "id": "*categoryList-0"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });

  it("Step 24: check name is Accessories - check with wrong dom properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "cont*cart*",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        },
        "domProperties": {
          "nodeName": "li",
          "data-sap-ui": "*categoryList-0",
          "role": "listitem1",
          "class": "*sapMLIB*sapMSLI",
          "id": "__item1-container-cart---homeView--categoryList-0"
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 25: check name is Accessories - check with wrong dom properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "cont*cart*",
          "title": [{"path": "CategoryName"}],
          "bindingContextPath": "/ProductCategories*"
        },
        "domProperties": {
          "nodeName": "li",
          "data-sap-ui": "*categoryList-0",
          "role": "listitem",
          "class": "*sapMLIB1*sapMSLI",
          "id": "__item1-container-cart---homeView--categoryList-0"
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 26: check name is Accessories - use UI5 Control properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";
    var compareValue = "Accessories";
    var val = await browser.getUI5Property(attribute, elem);
    await expect(val).toBe(compareValue);
  });

  it("Step 27: check name is Accessories - use UI5 Aggregation Control properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "tooltip";
    var compareValue = "Open category Accessories";
    var val = await browser.getUI5Aggregation(attribute, elem);
    await expect(val).toBe(compareValue);
  });

  it("Step 28: check name is Accessories - use UI5 Control binding property path", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";
    var aBindings = await browser.getBindingProperty(attribute, elem);
    await expect(aBindings[0].path).toBe("CategoryName");

  });


  it("Step 29: check name is Accessories - use UI5 Control binding context path", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var sContext = await browser.getBindingContextPath(elem);
    await expect(sContext).toBe("/ProductCategories('AC')");
  });

  it("Step 30: check name is Accessories - view Id check", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    var nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";
    var compareValue = "Accessories";
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);

  });

  it("Step 31: check name is Accessories - view Id wildcard check", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "cont*cart*",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });


  it("Step 32: check name is Accessories - view Id for ancestor check", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "items": [{ "path": "/ProductCategories" }],
          "viewId": "cont*cart*"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });

  it("Step 33: check name is Accessories - view Id for ancestor check wrong", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "items": [{ "path": "/ProductCategories" }],
          "viewId": "cont*cartes*"
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 34: check name is Accessories - view Name check", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewName": "sap.ui.demo.cart.view.App",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);

  });

  it("Step 35: check name is Accessories - view name wildcard check", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewName": "*cart.view*",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);

  });


  it("Step 36: check name is Accessories - view name for ancestor check", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "items": [{ "path": "/ProductCategories" }],
          "viewName": "*cart.view*"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });

  it("Step 37: check name is Accessories - view name for ancestor check wrong", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "items": [{ "path": "/ProductCategories" }],
          "viewName": "*cart.views*asra"
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 38: check name is Accessories - chaining assert with no index", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "mProperties": { "items": [{ "path": "/ProductCategories" }] } },
      "parentProperties": { "metadata": "sap.m.Page", "mProperties": { "title": [{ "path": "i18n>homeTitle" }] } }
    };
    var list = await ui5.element.getDisplayed(ui5ControlProperties, 0);

    var ui5ControlProperties2 = {
      "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": [{ "path": "CategoryName" }], "bindingContextPath": "/ProductCategories*" } },
    };

    const nameField = await list.uiControl(ui5ControlProperties2);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);

  });

  it("Step 39: check name is Accessories - chaining assert with index", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "mProperties": { "items": [{ "path": "/ProductCategories" }] } },
      "parentProperties": { "metadata": "sap.m.Page", "mProperties": { "title": [{ "path": "i18n>homeTitle" }] } }
    };
    var list = await ui5.element.getDisplayed(ui5ControlProperties, 0);

    var ui5ControlProperties2 = {
      "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": [{ "path": "CategoryName" }], "bindingContextPath": "/ProductCategories*" } },
    };

  });

  it("Step 40: check name is Accessories - chaining assert with wrong index", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "mProperties": { "items": [{ "path": "/ProductCategories" }] } },
      "parentProperties": { "metadata": "sap.m.Page", "mProperties": { "title": [{ "path": "i18n>homeTitle" }] } }
    };
    var list = await ui5.element.getDisplayed(ui5ControlProperties, 0);

    var ui5ControlProperties2 = {
      "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": [{ "path": "CategoryName" }], "bindingContextPath": "/ProductCategories*" } },
    };
    const nameField = await list.uiControl(ui5ControlProperties2);
    var attribute = "title";
    var compareValue = "Computer System Accessories";
    await expect(await nameField.getAttribute("data-" + attribute)).not.toBe(compareValue);
  });

  it("Step 41: check name is Computer System Accessories - chaining assert", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "mProperties": { "items": [{ "path": "/ProductCategories" }] } },
      "parentProperties": { "metadata": "sap.m.Page", "mProperties": { "title": [{ "path": "i18n>homeTitle" }] } }
    };
    var list = await ui5.element.getDisplayed(ui5ControlProperties, 0);

    var ui5ControlProperties2 = {
      "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": [{ "path": "CategoryName" }] } },
    };

    const nameField = await list.uiControl(ui5ControlProperties2, 1);
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Computer System Accessories";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);

  });

  it("Step 42: click on the first standard item check id with wildcard", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "id": "*categoryList-0",
          "bindingContextPath": "/ProductCategories('AC')"
        }
      }
    };
    const nameField = await browser.uiControl(ui5ControlProperties);
    await nameField.click();
  });

  it("Step 43: check chaining in a objectlist item", async function () {
    //----------------------- Block for sap.m.ObjectListItem - Get Element Reference
    var objectListProp = {
      "elementProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "title": [{ "path": "Name" }], "number": [{ "path": "Price" }], "bindingContextPath": "/Products('HT-2001')" } },
    };
    var elem = await browser.uiControl(objectListProp);
    var objectNumber = {
      "elementProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": {} },
    };
    var attribute = "number";   //eg: title, text, value etc.
    var compareValue = "449,99";   //expected value
    const innerElement =  await elem.uiControl(objectNumber);
    var expVal = await innerElement.getAttribute("data-" + attribute);
    await expect(expVal).toBe(compareValue); // === expVal[0] in vyperForAll
  });

  it("Step 44: check chaining in a objectlist item with index", async function () {
    //----------------------- Block for sap.m.ObjectListItem - Get Element Reference
    var objectListProp = {
      "elementProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "title": [{ "path": "Name" }], "number": [{ "path": "Price" }], "bindingContextPath": "/Products('HT-2001')" } },
    };
    var elem = await browser.uiControl(objectListProp);
    var objectNumber = {
      "elementProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": {} },
    };
    var attribute = "number";   //eg: title, text, value etc.
    var compareValue = "449,99";   //expected value
    const innerElement = await elem.uiControl(objectNumber, 0);
    var expVal = await innerElement.getAttribute("data-" + attribute);
    await expect(expVal).toBe(compareValue); // === expVal[0] in vyperForAll
  });

  it("Step 45: navigate back to main page", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.Title", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 46: click on the first standard item check id only with wildcard", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "id": "*categoryList-0"
        }
      }
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 47: navigate back to main page", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.Title", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 48: click on the first standard item check id with wildcard", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "id": "*categoryList-1",
          "bindingContextPath": "/ProductCategories('AC')"
        }
      }
    };
    await expect(ui5.element.getDisplayed(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 49: check first item with aggregation property", async function () {
    //----------------------- Block for sap.m.StandardListItem - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": "Accessories", "tooltip": "Open category Accessories"
        }
      },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "headerText": "Categories" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "type": "Active", "title": "Computer System Accessories" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 50: check first item with aggregation property wildcard", async function () {
    //----------------------- Block for sap.m.StandardListItem - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": "Accessories", "tooltip": "*category Acc*"
        }
      },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "headerText": "Categories" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "type": "Active", "title": "Computer System Accessories" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 51: check first item with aggregation property wildcard", async function () {
    //----------------------- Block for sap.m.StandardListItem - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": "Accessories"
        }
      },
      "parentProperties": {"metadata": "sap.m.List", "mProperties": {"headerText": "Categories"}},
      "nextSiblingProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {"type": "Active", "title": "Computer System Accessories"}
      },
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 52: check first item with association property wrong", async function () {
    //----------------------- Block for sap.m.StandardListItem - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "title": "Accessories", "ariaLabelledBy": "test,test2"
        }
      },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "headerText": "Categories" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "type": "Active", "title": "Computer System Accessories" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Accessories";   //expected value
    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 53: check if product list aggregation bindingpath is correct", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "headerText": { "path": "homeCategoryListHeader" },
          "items": { "path": "/ProductCategories" }
        }
      },
      "parentProperties": {
        "metadata": "sap.m.Page", "mProperties": {
          "title": { "path": "homeTitle" }
        }
      },
      "childProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "counter": { "path": "NumberOfProducts" },
          "title": { "path": "CategoryName" },
          "tooltip": [{ "path": "i18n>openCategoryProducts" }, { "path": "CategoryName" }]
        }
      }
    };
    var Index = 0;
    var attribute1 = "items";   //eg: title, text, value etc.
    var comparePath1 = "/ProductCategories";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index, 100, 30000);
  });

  it("Step 54: click on the first standard item", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')"
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    await nameField.click();
  });

  it("Step 55: check text for specific list item ancestor with * wildcard", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": {} },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "*",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29*", "unit": "EUR", "state": "None" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 56: check text for specific list item ancestor", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video*" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "bindingContextPath": "/Products('HT-2026')" } },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 57: check text for specific list item ancestor with wild card", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "bindingContextPath": "/Products('HT-2026')" } },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "*ProductCategories*('AC')",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 58: check text for specific list item ancestor with wild card 2", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "bindingContextPath": "/Products('HT-2026')" } },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')*",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 59: check text for specific list item ancestor with wild card 2", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "bindingContextPath": "/Products('HT-2026')" } },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "*('AC')**",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 60: check text for specific list item ancestor", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": {} },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 61: check text for specific list item ancestor with wrong wildcard", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": {} },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "*ProductCategories1*('AC')*",
          "items": { "path": "Products" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 62: check text for specific list item sibling", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectListItem", "mProperties": {
          "title": "Audio/Video Cable Kit - 4m", "number": "29,99", "numberUnit": "EUR"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "items": { "path": "Products" }
        }
      },
      "siblingProperties": {
        "metadata": "sap.m.ObjectListItem", "mProperties": {
          "title": "Beam Breaker B-1", "number": "469,00", "numberUnit": "EUR"
        }
      }
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 63: check text for specific list item sibling wrong property", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectListItem", "mProperties": {
          "title": "Audio/Video Cable Kit - 4m", "number": "29,99", "numberUnit": "EUR"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "items": { "path": "Products" }
        }
      },
      "siblingProperties": {
        "metadata": "sap.m.ObjectListItem", "mProperties": {
          "title": "Beam Breaker B-2", "number": "469,00", "numberUnit": "EUR"
        }
      }
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 64: check text for specific list item ancestor wrong path", async function () {
    //----------------------- Block for sap.m.Text - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": { "text": "Audio/Video Cable Kit - 4m" } },
      "parentProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "bindingContextPath": "/Products('HT-2026')" } },
      "ancestorProperties": {
        "metadata": "sap.m.List", "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "items": { "path": "Products1" }
        }
      },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "number": "29,99", "unit": "EUR", "state": "None", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "text": "Titanium" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Audio/Video Cable Kit - 4m";   //expected value
    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 65: navigate back to main page", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.Title", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 66: click on the second standard item", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
        }
      }
    };
    const nameField = await ui5.element.getDisplayed(ui5ControlProperties);
    await nameField.click();
  });

  it("Step 67: navigate back to main page", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.Title", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 68: expect main page visible", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholder": "Search" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await ui5.assertion.expectToBeVisible(ui5ControlProperties, 0, 10, 30000);
  });

  it("Step 69: enter on Accessories and search", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholder": "Search" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "Flat Basic";   //value to be entered by user
    await ui5.userInteraction.searchFor(ui5ControlProperties, value, 0, 30000, false);
  });

  it("Step 70: enter on Accessories and search wrong element value", async function () {
    // "placeholders": "Search1"  - wring value for test
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholders": "Search1" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "Flat Basic";   //value to be entered by user
    await expect(ui5.userInteraction.searchFor(ui5ControlProperties, value, 0, 1000, false))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 71: enter on Accessories and search with additional property", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholder": "Search", "enableSuggestions": "false", "maxLength": "0" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "Flat Basic";   //value to be entered by user
    await ui5.userInteraction.searchFor(ui5ControlProperties, value, 0, 30000, false);
  });

  it("Step 72: enter on Accessories and search with wrong boolean additional property", async function () {
    // "enableSuggestions": "true" - wrong property for test
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholder": "Search", "enableSuggestions": "true", "maxLength": "0" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "Flat Basic";   //value to be entered by user
    await expect(ui5.userInteraction.searchFor(ui5ControlProperties, value, 0, 1000, false))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 73: enter on Accessories and search with wrong number additional property", async function () {
    // "maxLength": "1" - wrong value for test
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.SearchField", "mProperties": { "placeholder": "Search", "enableSuggestions": "false", "maxLength": "1" } },
      "parentProperties": { "metadata": "sap.m.Toolbar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    var value = "Flat Basic";   //value to be entered by user
    await expect(ui5.userInteraction.searchFor(ui5ControlProperties, value, 0, 1000, false))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 74: click  on Object item", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "numberUnit": "EUR", "type": "Inactive", "title": "Flat Basic", "number": "399,00" } },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "mode": "SingleSelectMaster", "noDataText": "No products found" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {}
    };
    await ui5.userInteraction.click(ui5ControlProperties);
  });

  it("Step 75: click  on Object item wrong child property", async function () {
    // "src": "./../../../../../../test-resources/sap/ui/documentation/sdk/images/HT-1036.jpg" - wrong value for test
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "numberUnit": "EUR", "type": "Inactive", "title": "Flat Basic", "number": "399,00" } },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "mode": "SingleSelectMaster", "noDataText": "No products found" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Image", "mProperties": { "src": "./../../../../../../test-resources/sap/ui/documentation/sdk/images/HT-1036.jpg" } }
    };
    await expect(ui5.userInteraction.click(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 76: click  on Object item wrong element property", async function () {
    // "numberUnit": "EUV" - wrong value for test
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectListItem", "mProperties": { "numberUnit": "EUV", "type": "Inactive", "title": "Flat Basic", "number": "399,00" } },
      "parentProperties": { "metadata": "sap.m.List", "mProperties": { "mode": "SingleSelectMaster", "noDataText": "No products found" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {}
    };
    await expect(ui5.userInteraction.click(ui5ControlProperties, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 77: check if Supplier text exists", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "title": "Supplier", "text": "Very Best Screens" } },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Supplier";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);

  });

  it("Step 78: check if Supplier text exists wrong parent property", async function () {
    // "title": "Flat Basics" - wrong value for test, should be 'Flat Basic'
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "title": "Supplier", "text": "Very Best Screens" } },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basics", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Supplier";   //expected value

    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 79: check if Supplier text exists wrong prevSibiling property", async function () {
    // "number": "399" - wring value for test purposes, should be "number": "399,00",
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "title": "Supplier", "text": "Very Best Screens" } },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Supplier";   //expected value

    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 80: check if Supplier text exists wrong nextSibiling property", async function () {
    // "state": "Suckscess"  - wrong value for test purposes
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "title": "Supplier", "text": "Very Best Screens" } },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Suckscess" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Supplier";   //expected value

    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 81: check if Supplier text exists remove childproperties", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ObjectAttribute", "mProperties": { "title": "Supplier", "text": "Very Best Screens" } },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } }
    };
    var Index = 0;
    var attribute = "title";   //eg: title, text, value etc.
    var compareValue = "Supplier";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);

  });

  it("Step 82: check if Supplier i18n path is correct", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "i18n>productSupplierAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 83: check if Supplier context path is correct", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index, 0, 30000);
  });

  it("Step 84: check if Supplier i18n path is correct remove model name", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "productSupplierAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 85: check if Supplier i18n path is correct wrong binding context", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1025')", // wrong value for test purposes
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    await expect(ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 86: check if Supplier i18n path is correct wrong binding path name", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierNames" }] // wrong value for tests purposes
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value

    await expect(ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 87: check if Supplier i18n path is correct no model defined", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "productSupplierAttributeText";   //expected value


    await expect(ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, 0, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 88: check if Supplier i18n path is correct not array", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "i18n>productSupplierAttributeText" },
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "i18n>productSupplierAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 89: check if Supplier i18n path is correct only binding path", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "text": [{ "path": "SupplierName" }]
        }
      }
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "i18n>productSupplierAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 90: check if Supplier i18n path is correct only i18n text key", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "title": { "path": "i18n>productSupplierAttributeText" }
        }
      }
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "i18n>productSupplierAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = "SupplierName";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 91: check if Supplier i18n path is correct bindings as array", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = ["i18n>productSupplierAttributeText"];   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    var comparePath2 = ["SupplierName"];   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute2, comparePath2, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 92: check if Supplier i18n path is wrong bindings as array", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productSupplierAttributeText" }],
          "text": [{ "path": "SupplierName" }]
        }
      },
      "parentProperties": { "metadata": "sap.m.ObjectHeader", "mProperties": { "titleLevel": "H3", "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00" } },
      "prevSiblingProperties": { "metadata": "sap.m.ObjectNumber", "mProperties": { "unit": "EUR", "number": "399,00", "textDirection": "Inherit", "textAlign": "Right" } },
      "nextSiblingProperties": { "metadata": "sap.m.ObjectStatus", "mProperties": { "text": "Available", "state": "Success" } },
      "childProperties": {}
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = ["i18n>productSupplierAttributeText"];   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    var attribute2 = "text";   //eg: title, text, value etc.
    //var comparePath2 = ["SupplierName", "SupplierNames"];
    //
    var elem = await ui5.element.getDisplayed(ui5ControlProperties);
    var value = await elem.getAttribute("data-" + attribute2 + "-path");
    await expect(value).not.toContain("SupplierNames");
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 93: check if Weight i18n path is correct and previous or next is correct", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": [{ "path": "i18n>productWeightAttributeText" }],
          "text": [
            { "path": "Weight" },
            { "path": "WeightUnit" },
          ]
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ObjectHeader", "mProperties": {
          "title": { "path": "Name" },
          "number": { "path": "Price" }
        }
      },
      "prevSiblingProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "title": { "path": "productDescriptionAttributeText" },
          "text": { "path": "ShortDescription" }
        }
      },
      "nextSiblingProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "productMeasuresAttributeText" },
          "text": [
            { "path": "DimensionWidth" },
            { "path": "Unit" },
            { "path": "DimensionDepth" },
            { "path": "DimensionHeight" }
          ]
        }
      }
    };
    var Index = 0;
    var attribute1 = "title";   //eg: title, text, value etc.
    var comparePath1 = "productWeightAttributeText";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 94: check if product measure is correct", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "productMeasuresAttributeText" },
          "text": [
            { "path": "DimensionWidth" },
            { "path": "Unit" },
            { "path": "DimensionDepth" },
            { "path": "DimensionHeight" }
          ]
        }
      }
    };
    var Index = 0;
    var attribute1 = "text";   //eg: title, text, value etc.
    var comparePath1 = ["DimensionHeight", "Unit"];   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });

  it("Step 95: check if product measure is correct with bindingpath on children element", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectHeader", "mProperties": {
          "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00"
        }
      },
      "childProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "productMeasuresAttributeText" },
          "text": [
            { "path": "DimensionWidth" },
            { "path": "Unit" },
            { "path": "DimensionDepth" },
            { "path": "DimensionHeight" }
          ]
        }
      }
    };
    var Index = 0;
    var attribute = "number";   //eg: title, text, value etc.
    var compareValue = "399,00";   //expected value
    await ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("Step 96: check if product measure is correct with wrong bindingpath on children element", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectHeader", "mProperties": {
          "numberUnit": "EUR", "title": "Flat Basic", "number": "399,00"
        }
      },
      "childProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "productMeasuresAttributeText" },
          "text": [
            { "path": "DimensionWidths" },
            { "path": "Unit" },
            { "path": "DimensionDepth" },
            { "path": "DimensionHeight" }
          ]
        }
      }
    };
    var Index = 0;
    var attribute = "number";   //eg: title, text, value etc.
    var compareValue = "399,00";   //expected value

    await expect(ui5.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index, 1000))
      .rejects.toThrow(/No visible elements found with selector/);
  });

  it("Step 97: check if product measure is correct with number bindingpath", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.ObjectHeader", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "Name" },
          "number": { "path": "Price" },
        }
      },
      "childProperties": {
        "metadata": "sap.m.ObjectAttribute", "mProperties": {
          "bindingContextPath": "/Products('HT-1035')",
          "title": { "path": "productMeasuresAttributeText" },
          "text": [
            { "path": "DimensionWidth" },
            { "path": "Unit" },
            { "path": "DimensionDepth" },
            { "path": "DimensionHeight" }
          ]
        }
      }
    };
    var Index = 0;
    var attribute1 = "number";   //eg: title, text, value etc.
    var comparePath1 = "Price";   //expected value
    await ui5.assertion.expectBindingPathToBe(ui5ControlProperties, attribute1, comparePath1, Index);
    await ui5.assertion.expectBindingContextPathToBe(ui5ControlProperties, "/Products('HT-1035')", Index);
  });
});
