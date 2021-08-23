var authConfig = require("./authConfig");
/**
* Handle page authentication
* @constructor
* @param {Config} config
* @param {Object} instanceConfig
* @param {Logger} logger
*/
async function FormAuthenticator() {

  const username = browser.config.params.auth.username;
  if (!username) { throw new Error("Please provide a 'username'."); }
  const password = browser.config.params.auth.password;
  if (!password) { throw new Error("Please provide a 'password'."); }
  const formType = browser.config.params.auth.formType;
  if (!authConfig[formType]) { throw new Error("Please provide a valid 'formType'."); }

  const usernameFieldSelector = authConfig[browser.config.params.auth.formType].usernameFieldSelector;
  const passwordFieldSelector = authConfig[browser.config.params.auth.formType].passwordFieldSelector;
  const logonButtonSelector = authConfig[browser.config.params.auth.formType].logonButtonSelector;
  const url = browser.config.baseUrl;
  if (!url) { throw new Error("Please provide a 'baseUrl'."); }

  let userNameField = null;
  let passwordField = null;
  let logonField = null;

  await browser.url(url);
  await browser.waitUntil(async function () {
    userNameField = await $(usernameFieldSelector);
    passwordField = await $(passwordFieldSelector);
    logonField = await $(logonButtonSelector);
    return await userNameField.isDisplayedInViewport() &&
      await passwordField.isDisplayedInViewport() &&
      await logonField.isDisplayedInViewport();
  }, { timeout: 60000, timeoutMsg: "expected user name field to be present after 60s" });

  await userNameField.setValue(username);
  await passwordField.setValue(password);
  await logonField.click();
}
module.exports = FormAuthenticator;
