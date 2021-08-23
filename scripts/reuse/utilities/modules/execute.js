/**
 * @class execute
 * @memberof utilities
 */
var Execute = function () {
  /**
   * @function executeJavaScript
   * @memberOf utilities.Execute
   * @description Execute the specified JS command
   * @param {String} command -The command to run.
   * @example await utilities.execute.executeJavaScript(command);
   */

  this.executeJavaScript = async function (command) {
    var result = await browser.executeScript(command);
    return result;
  };

  /**
   * @function executeKeys
   * @memberOf utilities.Execute
   * @description Executes the set of keystrokes as described https://w3c.github.io/webdriver/#keyboard-actions
   * @param {String} command - The combination of keys to execute
   * @example await utilities.execute.executeKeys("\uE009", "\uE00A", "KeyD");
   */

  this.executeKeys = async function (...keys) {
    await browser.keys(keys);
  };

};
module.exports = new Execute();