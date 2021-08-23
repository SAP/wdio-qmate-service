const clientsidescripts = require("../../../clientsideUI5scripts");

/**
* @class qUnit  
* @memberof utilities
*/
const QUnit = function () {
  /**
 * @function executeTests
 * @memberOf utilities.qUnit
 * @description Executes QUnit & OPA5 tests [Vyper acts like a runner]
 * @param {String} relativePathToQUnitHTML - Relative path to the QUnit/OPA5 html file
 * @example await utilities.qUnit.executeTests("path/to/qunit.html");
 */
  this.executeTests = async function (relativePathToQUnitHTML) {
    const url = await browser.getUrl();
    if (url.indexOf("4431") !== -1) {
      await browser.navigateTo(`https://localhost:4431/${relativePathToQUnitHTML}`);
    } else {
      await browser.navigateTo(`http://localhost:34005/${relativePathToQUnitHTML}`);
    }
    // Note: cannot use null as a first argument for clientsidescripts.waitForAngular due to browser.executeAsync error:
    // "Error: Malformed type for "args" parameter of command executeAsyncScript
    // Expected: (string|object|number|boolean|undefined)[]
    // Actual: (null,number)[]"
    await browser.executeAsync(clientsidescripts.waitForAngular, undefined, 10);
    var execRes = await browser.executeAsync(clientsidescripts.execQUnits, {});
    if (!execRes) throw new Error("Qunit tests failed, see log message for more details");
  };
};
module.exports = new QUnit();