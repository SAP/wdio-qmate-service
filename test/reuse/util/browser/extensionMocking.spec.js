/* global before, after */
const http = require("node:http");

describe("explicit UI5 extension request mocking", () => {
  const enabled = process.env.QMATE_TEST_EXTENSION_MOCKING !== "false";
  let server;
  let url;
  let requests;
  before(async () => {
    requests = [];
    server = http.createServer((req, res) => {
      requests.push(req.url);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("local-neutral-content");
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    url = "http://127.0.0.1:" + server.address().port;
  });
  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  });

  for (const reload of [false, true]) {
    it("honors the interception policy for every target " + (reload ? "after reload" : "at startup"), async () => {
      if (reload) await util.browser.reloadSession();
      await common.navigation.navigateToUrl(url);
      requests.length = 0;
      const responses = await util.browser.executeScript(async () => {
        const paths = ["/xRayControls/fixture.js", "/joule-fixture", "/walkme-fixture", "/neutral"];
        return Promise.all(
          paths.map(async (path) => {
            const response = await fetch(path, { cache: "no-store" });
            return { status: response.status, text: await response.text() };
          })
        );
      });
      const mocked = { status: 404, text: "File intentionally mocked by Qmate to improve performance" };
      const neutral = { status: 200, text: "local-neutral-content" };
      expect(responses).toEqual(enabled ? [mocked, mocked, mocked, neutral] : [neutral, neutral, neutral, neutral]);
      expect(requests.filter((request) => request !== "/favicon.ico").sort()).toEqual(enabled ? ["/neutral"] : ["/joule-fixture", "/neutral", "/walkme-fixture", "/xRayControls/fixture.js"]);
    });
  }

  it("matches extension hostnames and query strings as well as paths", async () => {
    for (const target of [url.replace("127.0.0.1", "joule.localhost"), url.replace("127.0.0.1", "walkme.localhost"), url + "/neutral?module=joule", url + "/neutral?module=walkme", url + "/proxy?source=/xRayControls/fixture.js", url.replace("127.0.0.1", "joule.localhost") + "/joule?module=joule"]) {
      await common.navigation.navigateToUrl(target);
      await nonUi5.assertion.expectTextToBe("body", enabled ? "File intentionally mocked by Qmate to improve performance" : "local-neutral-content");
    }
  });
});
