describe("Test 'getAllUI5Associations()' and 'getUI5Association()' on both element and browser levels", function () {
  it("should access all Associations and single association via 'ariaLabelledBy' and wrong/empty name", async function () {
    await browser.url("#/categories");

    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.List", "items": [{ "path": "/ProductCategories" }] },
      "parentProperties": { "metadata": "sap.m.Page", "title": [{ "path": "i18n>homeTitle" }] }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    const associations = await elem.getAllUI5Associations();
    expect(associations).toStrictEqual(["fieldHelpDisplay", "ariaLabelledBy"]);
    await expect(browser.getAllUI5Associations(elem)).resolves.toStrictEqual(associations);

    const association = await elem.getUI5Association(associations[0]);

    await expect(browser.getUI5Association(associations[0], elem)).resolves.toStrictEqual(association);

    await expect(elem.getUI5Association("wrong_name")).resolves.toBeNull();
    await expect(browser.getUI5Association("wrong_name", elem)).resolves.toBeNull();

    await expect(elem.getUI5Association("")).rejects.toThrow("javascript error: done is not a function");
    await expect(browser.getUI5Association("", elem)).rejects.toThrow("javascript error: done is not a function");
  });
});