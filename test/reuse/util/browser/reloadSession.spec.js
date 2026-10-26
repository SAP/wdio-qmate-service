"use strict";

describe("browser - reloadSession", function () {
  const cookieName = "qmate_reload_session";
  let previousSessionId;

  it("Preparation", async function () {
    await browser.url(browser.config.baseUrl);
    previousSessionId = browser.sessionId;
    await browser.setCookies({ name: cookieName, value: "before-reload" });
    await browser.execute((key) => window.localStorage.setItem(key, "before-reload"), cookieName);
    expect(await browser.getCookies({ name: cookieName })).toHaveLength(1);
    expect(await browser.execute((key) => window.localStorage.getItem(key), cookieName)).toBe("before-reload");
  });

  it("Execution", async function () {
    await util.browser.reloadSession();
  });

  it("Verification", async function () {
    expect(browser.sessionId).not.toBe(previousSessionId);
    await browser.url(browser.config.baseUrl);
    expect(await browser.getCookies({ name: cookieName })).toEqual([]);
    expect(await browser.execute((key) => window.localStorage.getItem(key), cookieName)).toBeNull();
  });
});
