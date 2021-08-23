describe("webdriver.io page", function () {

  this.beforeAll(async () => {
    await browser.url("#/categories");
  });

  it("step1: check name is Accessories - use $ and UI5 Control properties", async function () {
    const elem = await $('li[id*="homeView--categoryList-0"]');
    const allPropertiesNames = await elem.getAllUI5Properties();
    expect(allPropertiesNames).toContain("title");
    const val = await elem.getUI5Property("title");
    expect(val).toEqual("Accessories");
  });

  it("step2: check name is Accessories - use $ and Aggregation Control properties", async function () {

    const elem = await $('li[id*="homeView--categoryList-0"]');
    const allAggregationsNames = await elem.getAllUI5Aggregations();
    expect(allAggregationsNames).toContain("tooltip");
    const val = await elem.getUI5Aggregation("tooltip");
    expect(val).toEqual("Open category Accessories");
  });

  it("step3: check element's Binding context path using $ ", async function () {
    const elem = await $('li[id*="homeView--categoryList-0"]');
    const bindingPath = await elem.getBindingContextPath();
    expect(bindingPath).toContain("/ProductCategories('AC')");
    const val = await elem.getUI5Property("title");
    expect(val).toEqual("Accessories");
  });

  it("step4: check Associations in categories - use $ and UI5 Association Control properties", async function () {
    const elem = await $('li[id*="homeView--categoryList-0"]');
    const associations = await elem.getAllUI5Associations();
    expect(associations).toContain("ariaLabelledBy");
  });

  it("step5: get wrong Aggregation Control property and throw error", async function () {
    const elem = await $('li[id*="homeView--categoryList-0"]');
    const allAggregationsNames = await elem.getAllUI5Aggregations();
    expect(allAggregationsNames).toContain("tooltip");
    await expect(elem.getUI5Aggregation("")).rejects.toThrow("javascript error: done is not a function");
  });

  it("step6: check element's Binding context path using $ and get wrong element property", async function () {
    const elem = await $('li[id*="homeView--categoryList-0"]');
    const bindingPath = await elem.getBindingContextPath();
    expect(bindingPath).toContain("/ProductCategories('AC')");
    await expect(elem.getUI5Property("")).rejects.toThrow("javascript error: done is not a function");
  });
});
