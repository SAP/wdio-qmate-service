describe("webdriver.io page", function () {

  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("step1: check name is Accessories - use UI5 Control properties", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elem = (await parent.$$('li[id*="homeView--categoryList"]'))[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getAllUI5Properties();
        } catch (error) {
          // console.log(error.message);
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    const allPropertiesNames = await elem.getAllUI5Properties();
    expect(allPropertiesNames).toContain("title", "description");
    await expect(elem.getUI5Property("title")).resolves.toBe("Accessories");
  });

  it("step2: check name Accessories - use UI5 Aggregation Control properties", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elem = (await parent.$$('li[id*="homeView--categoryList"]'))[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getAllUI5Aggregations();
        } catch (error) {
          // console.log(error.message);
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    const allAggregationsNames = await elem.getAllUI5Aggregations();
    expect(allAggregationsNames).toContain("tooltip");
    await expect(elem.getUI5Aggregation("tooltip")).resolves.toBe("Open category Accessories");
  });

  it("step3: check element's Binding context path using chain $.$$ ", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elems = (await parent.$$('li[id*="homeView--categoryList"]'));
    const elem = elems[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getBindingContextPath();
        } catch (error) {
          // console.log(error.message);
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    await expect(elem.getBindingContextPath()).resolves.toContain("/ProductCategories('AC')");
    await expect(elem.getUI5Property("title")).resolves.toEqual("Accessories");
  });

  it("step4: step4: check Associations in categories - use chain $.$$ and UI5 Association Control properties ", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elem = (await parent.$$('li[id*="homeView--categoryList"]'))[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getAllUI5Associations();
        } catch (error) {
          // console.log(error.message);
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    await expect(elem.getAllUI5Associations()).resolves.toContain("ariaLabelledBy");
  });

  it("step5: get wrong Aggregation Control properties and throw error", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elem = (await parent.$$('li[id*="homeView--categoryList"]'))[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getAllUI5Aggregations();
        } catch (error) {
          // console.log(error.message);
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    await expect(elem.getAllUI5Aggregations()).resolves.toContain("tooltip");
    await expect(elem.getUI5Aggregation("")).rejects.toThrow("javascript error: done is not a function");
  });

  it("step6: check element's Binding context path using chain $.$$ and get wrong element property", async function () {
    const parent = await $("#container-cart---homeView--categoryList-listUl");
    const elems = (await parent.$$('li[id*="homeView--categoryList"]'));
    const elem = elems[0];
    await browser.waitUntil(
      async () => {
        try {
          return await elem.getBindingContextPath();
        } catch (error) {
          return false;
        }
      },
      {
        timeout: 50000,
        timeoutMsg: "element is not visible"
      }
    );
    await expect(elem.getBindingContextPath()).resolves.toContain("/ProductCategories('AC')");
    await expect(elem.getUI5Property("")).rejects.toThrow("javascript error: done is not a function");
  });

  it("step7: get wrong element by wrong selector and throw error", async function () {
    const parent = await $('li[id*="homeView--categoryList-0"]');
    await expect(parent).toBeDisplayedInViewport();
    const elem = await parent.$$('li[id*="__item1-container-cart---homeView--categoryList-0-wrong"]');
    await expect(elem.length).toBe(0);
  });
});
