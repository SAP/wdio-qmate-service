"use strict";

const selector = {
  elementProperties: {
    viewName: "sap.ui.demo.cart.view.Welcome",
    metadata: "sap.m.Title",
    text: [
      {
        path: "i18n>welcomeHeadline"
      }
    ]
  }
};

describe("assertion - expectAttributeToContain", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await ui5.assertion.expectAttributeToContain(selector, "text", "to the Shopping Cart");
  });
});

describe("assertion - expectAttributeToContain with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // Selector for a list of elements?
    const selectorWithATypo = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Welcome",
        metadata: "sap.m.Title",
        text: [
          {
            path: "i18n>welcomeHeadlineWithError" // "i18n>welcomeHeadlineWithError" instead of "i18n>welcomeHeadline"
          }
        ]
      }
    };
    await expect(ui5.assertion.expectAttributeToContain(selectorWithATypo, "text", "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      /No visible elements found/
    );

    // skip selector
    await expect(ui5.assertion.expectAttributeToContain("text", "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      "Function 'expectAttributeToContain' failed with: Please provide a valid selector as argument."
    );
  });
});

describe("assertion - expectAttributeToContain with wrong attribute (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // Error
    // In Chrome: javascript error: done is not a function
    // In Firefox: TypeError: done is not a function
    // In Safari:  JavaScript exception occured: done is not a function. (In 'done(val)', 'done' is undefined)
    await expect(ui5.assertion.expectAttributeToContain(selector, 123, "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      "Function 'expectAttributeToContain' failed with: Please check your attribute argument."
    );
    await expect(ui5.assertion.expectAttributeToContain(selector, false, "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      "Function 'expectAttributeToContain' failed with: Please check your attribute argument."
    );
    await expect(ui5.assertion.expectAttributeToContain(selector, null, "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      "Function 'expectAttributeToContain' failed with: Please check your attribute argument."
    );
    await expect(ui5.assertion.expectAttributeToContain(selector, undefined, "to the Shopping Cart", 0, 5000)).rejects.toThrow(
      "Function 'expectAttributeToContain' failed with: Please check your attribute argument."
    );
  });
});

describe("assertion - expectAttributeToContain with wrong compareValue (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.assertion.expectAttributeToContain(selector, "text", 123)).rejects.toThrow("Welcome to the Shopping Cart");
  });
});
