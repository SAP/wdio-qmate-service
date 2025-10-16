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

  it("Execution & Verification", async function () {
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
      .expectBindingPathToBe(category, "tooltip", ["i18n>openCategoryProducts", "CategoryName"]); // compareValue as Array
  });
});

describe("assertion - expectBindingPathToBe with loadPropertyTimeout", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "/ProductCategories", 0, 40000, 1000);
  });
});

describe("assertion - expectBindingPathToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "wrongData": "123"
    };
    await expect(ui5.assertion.expectBindingPathToBe(selector, "items", "/ProductCategories", 0, 5000))
      .rejects.toThrow(`Function 'expectBindingPathToBe' failed with: No visible elements found with selector: {\"wrongData\":\"123\"}`);

    await expect(ui5.assertion.expectBindingPathToBe(123, "items", "/ProductCategories", 0, 5000))
      .rejects.toThrow("Function 'expectBindingPathToBe' failed with:");

    await expect(ui5.assertion.expectBindingPathToBe(false, "items", "/ProductCategories", 0, 5000))
      .rejects.toThrow("Function 'expectBindingPathToBe' failed with: Please provide a valid selector as argument.");

    await expect(ui5.assertion.expectBindingPathToBe(null, "items", "/ProductCategories", 0, 5000))
      .rejects.toThrow("Function 'expectBindingPathToBe' failed with: Please provide a valid selector as argument.");

    await expect(ui5.assertion.expectBindingPathToBe(undefined, "items", "/ProductCategories", 0, 5000))
      .rejects.toThrow("Function 'expectBindingPathToBe' failed with: Please provide a valid selector as argument.");
  });
});

describe("assertion - expectBindingPathToBe with wrong attribute (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    switch (browser.capabilities.browserName) {
      case "Safari":
        const safariErrorMessage = "A JavaScript exception occured: undefined is not an object";
        await expectBindingPathToBeUnhappyCaseTest(safariErrorMessage);
        break;
      case "firefox":
        const firefoxErrorMessage = "TypeError: oControl.getBindingInfo(...) is undefined";
        await expectBindingPathToBeUnhappyCaseTest(firefoxErrorMessage);
        break;
      default: //chrome and edge
        const defaultErrorMessage = "javascript error: Cannot read properties of undefined (reading 'parts')";
        await expectBindingPathToBeUnhappyCaseTest(defaultErrorMessage);
        break;
    }
    async function expectBindingPathToBeUnhappyCaseTest(errorMessage) {
      await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "itms", "/ProductCategories", 0, 5000))
        .rejects.toThrow(errorMessage);

      await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, 123, "/ProductCategories", 0, 5000))
        .rejects.toThrow(errorMessage);

      await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, false, "/ProductCategories", 0, 5000))
        .rejects.toThrow(errorMessage);

      await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, null, "/ProductCategories", 0, 5000))
        .rejects.toThrow(errorMessage);

      await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, undefined, "/ProductCategories", 0, 5000))
        .rejects.toThrow(errorMessage);
    }
  });
});

describe("assertion - expectBindingPathToBe with wrong compareValue (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // Typo in compareValue
    await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", "/ProductCategores", 0, 5000))
      .rejects.toThrow(/Expect\w+|\d+ProductCategores\w+|\d+Received\w+|\d+ProductCategories/);
    // Wrong compareValue
    // await expect(ui5.assertion.expectBindingPathToBe(categoryHeaderSelector, "items", 123))
    //   .rejects.toThrow("StringContaining \"/ProductCategories\"");
  });
});