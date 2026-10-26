"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("getAggregationProperty - check tooltip property is 'Open category Accessories'", async () => {
  let val, valElem, valSelOptions;
  it("Preparation", async () => {
    const url = await util.browser.getBaseUrl();
    await common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const selector = {
      elementProperties: {
        metadata: "sap.m.StandardListItem",
        mProperties: {
          viewId: "container-cart---app",
          title: [
            {
              path: "CategoryName"
            }
          ],
          bindingContextPath: "/ProductCategories*"
        }
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "tooltip");
    const elem = await ui5.element.getDisplayed(selector);
    valElem = await ui5.control.getAggregationProperty(elem, "tooltip");
    valSelOptions = await ui5.control.getAggregationProperty({ selector: selector, index: 0, timeout: 30000 }, "tooltip");
  });

  it("Verification", async () => {
    await common.assertion.expectEqual(val, "Open category Accessories");
    await common.assertion.expectEqual(valElem, "Open category Accessories");
    await common.assertion.expectEqual(valSelOptions, "Open category Accessories");
  });
});

describe("getAggregationProperty - columns of table", async () => {
  let val;
  const expectedColumns = ["Product", "Supplier", "Dimensions", "Weight", "Price"];
  it("Preparation", async () => {
    const url = `${BASE_URL}/#/entity/sap.m.Table/sample/sap.m.sample.Table`;
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async () => {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.Table.Table",
        metadata: "sap.m.Table"
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "columns");
    val = val.map((item) => item.mAggregations.header.mProperties.text);
  });

  it("Verification", async () => {
    await common.assertion.expectEqual(val, expectedColumns);
  });
});

describe("getAggregationProperty - items in list", async () => {
  let val;
  const expectedItems = ["ITelO Vault", "Notebook Basic 15", "Notebook Basic 17", "Notebook Basic 18", "Notebook Basic 19"];
  it("Preparation", async () => {
    const url = `${BASE_URL}/#/entity/sap.m.Select/sample/sap.m.sample.Select`;
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async () => {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.Select.Page",
        metadata: "sap.m.Select",
        items: [
          {
            path: "/ProductCollection2"
          }
        ]
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "items");
    val = val.map((item) => item.mProperties.text);
  });

  it("Verification", async () => {
    await common.assertion.expectEqual(val, expectedItems);
  });
});

describe("getAggregationProperty - serialization", function () {
  afterEach(async function () {
    await util.browser.switchToDefaultContent();
  });

  it("preserves aggregation data and cycles containing a promise with an own then method", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.m.Select/sample/sap.m.sample.Select`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.Select.Page",
        metadata: "sap.m.Select",
        items: [{ path: "/ProductCollection2" }]
      }
    };
    const element = await ui5.element.getDisplayed(selector);
    await ui5.control.execute(function (control) {
      const promise = Promise.resolve("internal state");
      promise.then = Promise.prototype.then;
      const fixture = { label: "preserved data", promise };
      fixture.self = fixture;
      control.getAggregation("items")[0].qmateSerializationFixture = fixture;
    }, element);

    try {
      const items = await ui5.control.getAggregationProperty(element, "items");
      expect(items.map((item) => item.mProperties.text)).toEqual(["ITelO Vault", "Notebook Basic 15", "Notebook Basic 17", "Notebook Basic 18", "Notebook Basic 19"]);
      const fixture = items[0].qmateSerializationFixture;
      expect(fixture.label).toEqual("preserved data");
      expect(fixture.self).toBe(fixture);
      expect(fixture.promise).not.toHaveProperty("then");
    } finally {
      await ui5.control.execute(function (control) {
        delete control.getAggregation("items")[0].qmateSerializationFixture;
      }, element);
    }
  });
});
