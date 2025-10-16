"use strict";

const categorySelector = {
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
      "tooltip": [{
        "path": "i18n>openCategoryProducts"
      }, {
        "path": "CategoryName"
      }]
    }
  }
};

describe("assertion - expectBindingContextPathToBe", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await ui5.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategories('AC')"); // Equal
  });
});

describe("assertion - expectBindingContextPathToBe with loadPropertyTimeout", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await ui5.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategories('AC')", 0, 30000, 1000);
  });
});

describe("assertion - expectBindingContextPathToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const totallyWrongSelector = {
      "wrongData": "123"
    };

    const wrongSelector = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "bindingContextPath": "/ProductCategories('AC')",
          "counter": {
            "path": "NumberOfProducts"
          },
          "title": {
            "path": "CategoryWrongName"
          }, // "{"path": "CategoryWrongName"}" instead of {"path": "CategoryWrongName"}
          "tooltip": [{
            "path": "i18n>openCategoryProducts"
          }, {
            "path": "CategoryName"
          }]
        }
      }
    };

    await expect(ui5.assertion.expectBindingContextPathToBe(totallyWrongSelector, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: No visible elements found with selector: {\"wrongData\":\"123\"}");

    await expect(ui5.assertion.expectBindingContextPathToBe(wrongSelector, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: No visible elements found with selector:");

    await expect(ui5.assertion.expectBindingContextPathToBe(123, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: Please provide a valid selector as argument.");

    await expect(ui5.assertion.expectBindingContextPathToBe(false, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: Please provide a valid selector as argument.");

    await expect(ui5.assertion.expectBindingContextPathToBe(null, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: Please provide a valid selector as argument.");

    await expect(ui5.assertion.expectBindingContextPathToBe(undefined, "/ProductCategories('AC')", 0, 2500))
      .rejects.toThrow("Function 'expectBindingContextPathToBe' failed with: Please provide a valid selector as argument.");
  });
});

describe("assertion - expectBindingContextPathToBe wrong compareValue (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategores('AC')"))
      .rejects.toThrow(/Expect\w+|\d+ProductCategores\w+|\d+Received\w+|\d+ProductCategories/);
  });
});