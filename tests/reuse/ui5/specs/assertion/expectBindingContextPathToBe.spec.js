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

  it("Execution and Verification", async function () {
    await ui5.common.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategories('AC')"); // Equal
  });
});

describe("assertion - expectBindingContextPathToBe with loadPropertyTimeout", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await ui5.common.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategories('AC')", 0, 30000, 1000);
  });
});

describe("assertion - expectBindingContextPathToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
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

    await expect(ui5.common.assertion.expectBindingContextPathToBe(wrongSelector, "/ProductCategories('AC')"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

<<<<<<< HEAD:tests/reuseApi/tests/reuse/ui5/specs/assertion/expectBindingContextPathToBe.spec.js
    await expect(ui5.common.assertion.expectBindingContextPathToBe(123, "/ProductCategories('AC')"))
      .rejects.toThrow("waitUntil condition failed with the following reason: javascript error: Cannot read properties of null (reading 'getMetadata')");

=======
>>>>>>> ad7e99dc15c8600092d2517a4c25011d893edbde:tests/reuse/ui5/specs/assertion/expectBindingContextPathToBe.spec.js
    await expect(ui5.common.assertion.expectBindingContextPathToBe(false, "/ProductCategories('AC')"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.assertion.expectBindingContextPathToBe(null, "/ProductCategories('AC')"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.assertion.expectBindingContextPathToBe(undefined, "/ProductCategories('AC')"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("assertion - expectBindingContextPathToBe wrong compareValue (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.assertion.expectBindingContextPathToBe(categorySelector, "/ProductCategores('AC')"))
      .rejects.toThrow(/Expect\w+|\d+ProductCategores\w+|\d+Received\w+|\d+ProductCategories/);
  });
});