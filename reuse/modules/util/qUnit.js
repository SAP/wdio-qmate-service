const clientsidescripts = require("../../../clientsideUI5scripts"); // TODO

/**
 * @class qUnit  
 * @memberof util
 */
const QUnit = function () {

  /**
   * @function executeTests
   * @memberOf util.qUnit
   * @description Executes QUnit & OPA5 tests. Qmate acts like a runner.
   * @param {String} path - Relative path to the QUnit/OPA5 html file.
   * @example await util.qUnit.executeTests("path/to/qunit.html");
   */
  this.executeTests = async function (path) {
    const url = await browser.getUrl();
    if (url.indexOf("4431") !== -1) {
      await browser.navigateTo(`https://localhost:4431/${path}`);
    } else {
      await browser.navigateTo(`http://localhost:34005/${path}`);
    }
    // Note: cannot use "null" as a first argument for "clientsidescripts.waitForAngular" due to browser.executeAsync error:
    // "Error: Malformed type for "args" parameter of command executeAsyncScript
    // Expected: (string|object|number|boolean|undefined)[]
    // Actual: (null,number)[]"
    await browser.executeAsync(clientsidescripts.waitForAngular, undefined, 10);
    const execRes = await browser.executeAsync(clientsidescripts.execQUnits, {});
    if (!execRes) throw new Error("QUnit tests failed, see log message for more details.");
  };

};
module.exports = new QUnit();