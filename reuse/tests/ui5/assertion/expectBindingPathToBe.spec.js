"use strict";

const categoryHeaderSelector = {
  "elementProperties": {
    "metadata": "sap.m.List",
    "mProperties": {
      "headerText": {
        "path": "homeCategoryListHeader"
      },
      "items": {
        "path": "/ProductCategories"
      }
    }
  },
  "parentProperties": {
    "metadata": "sap.m.Page",
    "mProperties": {
      "title": {
        "path": "homeTitle"
      }
    }
  },
  "childProperties": {
    "metadata": "sap.m.StandardListItem",
    "mProperties": {
      "bindingContextPath": "/ProductCategories('AC')",
      "counter": {
        "path": "NumberOfProducts"
      },
      "title": {
        "path": "CategoryName"
      },
      // model = "i18n"
      // path = "openCategoryProducts"
      "tooltip": [{
        "path": "i18n>openCategoryProducts"
      }, {
        "path": "CategoryName"
      }]
    }
  }
};

describe("assertion - expectBindingPathToBe", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const category = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "counter": {
            "path": "NumberOfProducts"
          },
          "title": {
            "path": "CategoryName"
          },
          // model = "i18n"
          // path = "openCategoryProducts"
          "tooltip": [{
            "path": "i18n>openCategoryProducts"
          }, {
            "path": "CategoryName"
          }]
        }
      }
    };
    await ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "/ProductCategories"); // Equal
    await ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "Product"); // Contain
    await ui5.assertion
      .expectBindingPathToBe(category, "tooltip", ["openCategoryProducts", "CategoryName"]); // compareValue as Array
  });
});

describe("assertion - expectBindingPathToBe with loadPropertyTimeout", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "/ProductCategories", 0, 40000, 1000);
  });
});

describe("assertion - expectBindingPathToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "wrongData": "123"
    };
    await expect(ui5.assertion.expectBindingPathToBe(selector, "items", "/ProductCategories"))
      .rejects.toThrow("waitUntil condition failed with the following reason: javascript error: Matcher is not supported! Matcher name: 'wrongData', arguments: '\"123\"'");

    await expect(ui5.assertion.expectBindingPathToBe(123, "items", "/ProductCategories"))
      .rejects.toThrow("waitUntil condition failed with the following reason: javascript error: Cannot read properties of null (reading 'getMetadata')");

    await expect(ui5.assertion.expectBindingPathToBe(false, "items", "/ProductCategories"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.assertion.expectBindingPathToBe(null, "items", "/ProductCategories"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.assertion.expectBindingPathToBe(undefined, "items", "/ProductCategories"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("assertion - expectBindingPathToBe with wrong attribute (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "itms", "/ProductCategories"))
      .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");

    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, 123, "/ProductCategories"))
      .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");

    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, false, "/ProductCategories"))
      .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");

    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, null, "/ProductCategories"))
      .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");

    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, undefined, "/ProductCategories"))
      .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'parts')");
  });
});

describe("assertion - expectBindingPathToBe with wrong compareValue (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    // Typo in compareValue
    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "/ProductCategores"))
      .rejects.toThrow(/Expect\w+|\d+ProductCategores\w+|\d+Received\w+|\d+ProductCategories/);
    // Wrong compareValue
    // await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", 123))
    //   .rejects.toThrow("StringContaining \"/ProductCategories\"");
  });
});