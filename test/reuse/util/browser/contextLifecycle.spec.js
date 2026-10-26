// Native calls are limited to v10 BiDi boundary probes: held-context tab creation,
// independent top-level observations, and navigation after reload/close. Using
// qmate navigation there would reset frame state and mask the lifecycle defect.
describe("browser context lifecycle", () => {
  for (const direction of ["back", "forward"]) {
    it("returns to top-level content after navigating " + direction, async () => {
      const page = (title) => "data:text/html," + encodeURIComponent("<title>" + title + '</title><iframe id="frame" srcdoc="<p>history frame</p>"></iframe>');
      await common.navigation.navigateToUrl(page("history first"));
      await common.navigation.navigateToUrl(page("history second"));
      if (direction === "forward") await util.browser.back();
      try {
        await util.browser.switchToIframe("#frame");
        await util.browser.executeScript("document.title = 'selected history frame';");
        expect(await util.browser.executeScript("return document.title;")).toEqual("selected history frame");
        await util.browser[direction]();
        expect(await util.browser.executeScript("return document.title;")).toEqual(direction === "back" ? "history first" : "history second");
      } finally {
        await util.browser.switchToDefaultContent();
      }
    });
  }

  it("discards the selected frame when its tab closes", async () => {
    await common.navigation.navigateToUrl("data:text/html,<title>remaining tab</title>");
    const original = await util.browser.getCurrentWindow();
    const closing = await browser.newWindow("data:text/html," + encodeURIComponent('<title>closing tab</title><iframe id="frame" srcdoc="<title>closing frame</title>"></iframe>'), { type: "tab" });
    await util.browser.switchToWindow(closing.contextId || closing.handle);
    try {
      await util.browser.switchToIframe("#frame");
      expect(await util.browser.executeScript("return document.title;")).toEqual("closing frame");
      await util.browser.closeWindow();
      await browser.switchToWindow(original);
      expect(await util.browser.executeScript("return document.title;")).toEqual("remaining tab");
    } finally {
      await util.browser.switchToDefaultContent();
      await util.browser.switchToWindow(original);
    }
  });

  it("discards the previous frame when creating a new session", async () => {
    await common.navigation.navigateToUrl("data:text/html," + encodeURIComponent('<iframe id="frame" srcdoc="<title>old session frame</title>"></iframe>'));
    try {
      await util.browser.switchToIframe("#frame");
      expect(await util.browser.executeScript("return document.title;")).toEqual("old session frame");
      await util.browser.reloadSession();
      await browser.url("data:text/html,<title>new session</title>");
      expect(await util.browser.executeScript("return document.title;")).toEqual("new session");
    } finally {
      await util.browser.switchToDefaultContent();
    }
  });

  it("returns to top-level content after refreshing an iframe page", async () => {
    await common.navigation.navigateToUrl("data:text/html," + encodeURIComponent('<title>refreshed parent</title><iframe id="frame" srcdoc="<title>old frame</title>"></iframe>'));
    try {
      await util.browser.switchToIframe("#frame");
      expect(await util.browser.executeScript("return document.title;")).toEqual("old frame");
      await util.browser.refresh();
      expect(await browser.getTitle()).toEqual("refreshed parent");
      expect(await util.browser.executeScript("return document.title;")).toEqual("refreshed parent");
    } finally {
      await util.browser.switchToDefaultContent();
    }
  });

  for (const byTitle of [false, true]) {
    it("returns to top-level content when switching tabs by " + (byTitle ? "title" : "handle"), async () => {
      await common.navigation.navigateToUrl("data:text/html," + encodeURIComponent('<title>original tab</title><iframe id="frame" srcdoc="<title>original frame</title>"></iframe>'));
      const original = await util.browser.getCurrentWindow();
      const target = await browser.newWindow("data:text/html,<title>other tab</title>", { type: "tab" });
      const targetHandle = target.contextId || target.handle;
      try {
        await util.browser.switchToWindow(original);
        await util.browser.switchToIframe("#frame");
        expect(await util.browser.executeScript("return document.title;")).toEqual("original frame");
        if (byTitle) await util.browser.switchToNewWindow("other tab");
        else await util.browser.switchToWindow(targetHandle);
        expect(await browser.getTitle()).toEqual("other tab");
        expect(await util.browser.executeScript("return document.title;")).toEqual("other tab");
      } finally {
        await util.browser.switchToDefaultContent();
        await util.browser.switchToWindow(targetHandle);
        await util.browser.closeWindow();
        await util.browser.switchToWindow(original);
      }
    });
  }
});
