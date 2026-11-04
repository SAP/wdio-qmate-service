/* global before, after */
const http = require("node:http");

describe("reloadSession request-mocking policy", () => {
  let server;
  let url;
  before(async () => {
    server = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("local-joule-content");
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    url = "http://127.0.0.1:" + server.address().port;
  });
  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it("does not enable UI5 extension interception unless explicitly opted in", async () => {
    await common.navigation.navigateToUrl(url);
    expect(browser.isBidi).toBe(true);
    const fetchFixture = () => fetch("/walkme-fixture", { cache: "no-store" }).then(async (response) => ({ status: response.status, text: await response.text() }));
    expect(await util.browser.executeScript(fetchFixture)).toEqual({ status: 200, text: "local-joule-content" });
    await util.browser.reloadSession();
    expect(browser.isBidi).toBe(true);
    await common.navigation.navigateToUrl(url);
    expect(await util.browser.executeScript(fetchFixture)).toEqual({ status: 200, text: "local-joule-content" });
  });
});
