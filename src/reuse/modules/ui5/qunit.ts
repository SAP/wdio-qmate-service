"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class qunit
 * @memberof ui5
 */
export class QUnit {
  private vlf = new VerboseLoggerFactory("ui5", "qunit");

  private clientsidescripts = require("../../helper/clientsideUI5scripts");

  /**
   * @function executeTests
   * @memberOf ui5.qunit
   * @description Executes QUnit & OPA5 tests. Qmate acts like a runner.
   * @param {String} path - Relative path to the QUnit/OPA5 html file.
   * @param {number} timeout - timeout, defaults to 60 secs
   * @example await ui5.qunit.executeTests("path/to/qunit.html");
   */
  async executeTests(path: string, timeout: number = 30000) {
    const vl = this.vlf.initLog(this.executeTests);
    const url = await browser.getUrl();
    if (url.indexOf("4431") !== -1) {
      await browser.navigateTo(`http://localhost:4431/${path}`);
    } else {
      await browser.navigateTo(`http://localhost:34005/${path}`);
    }
    // Note: cannot use "null" as a first argument for "clientsidescripts.waitForAngular" due to browser.executeAsync error:
    // "Error: Malformed type for "args" parameter of command executeAsyncScript
    // Expected: (string|object|number|boolean|undefined)[]
    // Actual: (null,number)[]"
    await browser.executeAsync(this.clientsidescripts.waitForAngular, undefined, 10);
    await browser.executeAsync(this.clientsidescripts.startQunit, {});
    await browser.waitUntil(async() => await browser.execute(this.clientsidescripts.getQunitMessage, {}) !== false,
      {
        timeout: timeout,
        timeoutMsg: `QUnit tests didn't complete within specified timeout of ${timeout/1000} secs.`
    });
    const execRes = await browser.execute(this.clientsidescripts.getQunitMessage, {});
    if (!execRes) throw new Error("QUnit tests failed, see log message for more details.");
  }
}
export default new QUnit();
