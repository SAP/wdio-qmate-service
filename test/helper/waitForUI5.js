const clientsidescripts = require("../../lib/scripts/clientsideUI5scripts");

// BiDi does not globally switch browser.execute into qmate's selected frame.
// Keep readiness checks on the same qmate context as the following test action.
module.exports = async function waitForUI5({ optional = false, timeout = 60000 } = {}) {
  if (optional) {
    await util.browser.waitUntil(() => util.browser.executeScript(() => document.readyState === "complete"), { timeout, interval: 200 });
    const hasUI5 = await util.browser.executeScript(() => !!(window.sap && window.sap.ui));
    if (!hasUI5) return;
  }

  await util.browser.waitUntil(async () => (await util.browser.executeScript(clientsidescripts.loadUI5CoreAndAutowaiter)) === true, { timeout, interval: 500 });
  await util.browser.executeScript(clientsidescripts.loadUI5Page, {
    waitForUI5Timeout: browser.config.waitForUI5Timeout || 90000,
    waitForUI5PollingInterval: browser.config.waitForUI5PollingInterval || 10
  });
  await util.browser.waitUntil(() => util.browser.executeScript(() => !!(window.loadUI5PagePromise && window.loadUI5PagePromise.done)), { timeout, interval: 200 });
};
