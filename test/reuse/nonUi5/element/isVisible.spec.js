describe("nonUi5.element.isVisible viewport semantics", () => {
  beforeEach(async () => {
    await common.navigation.navigateToUrl("data:text/html," + encodeURIComponent('<!doctype html><button id="visible">Visible</button><button id="offscreen" style="position:absolute;top:5000px">Offscreen</button><button id="hidden" style="display:none">Hidden</button>'));
  });

  it("only considers an offscreen element visible when strict mode is disabled", async () => {
    const element = await nonUi5.element.getById("offscreen", 1000, true);
    expect(await nonUi5.element.isVisible(element, false)).toBe(true);
    expect(await nonUi5.element.isVisible(element)).toBe(false);
  });

  it("recognizes visible elements in both modes", async () => {
    const element = await nonUi5.element.getById("visible", 1000, true);
    expect(await nonUi5.element.isVisible(element)).toBe(true);
    expect(await nonUi5.element.isVisible(element, false)).toBe(true);
  });

  it("rejects hidden elements in both modes", async () => {
    const element = await nonUi5.element.getById("hidden", 1000, true);
    expect(await nonUi5.element.isVisible(element)).toBe(false);
    expect(await nonUi5.element.isVisible(element, false)).toBe(false);
  });
});
