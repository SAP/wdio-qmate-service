/**
* Handle page authentication
* @constructor
* @param {Config} config
* @param {Object} instanceConfig
* @param {Logger} logger
*/
async function CustomAuthenticator() {

  const username = browser.config.params.auth.username;
  if (!username) { throw new Error("Please provide a 'username'."); }
  const password = browser.config.params.auth.password;
  if (!password) { throw new Error("Please provide a 'password'."); }

  const usernameFieldSelector = browser.config.params.auth.usernameFieldSelector;
  if (!usernameFieldSelector) { throw new Error("Please provide a 'usernameFieldSelector'."); }
  const passwordFieldSelector = browser.config.params.auth.passwordFieldSelector;
  if (!passwordFieldSelector) { throw new Error("Please provide a 'passwordFieldSelector'."); }
  const logonButtonSelector = browser.config.params.auth.logonButtonSelector;
  if (!logonButtonSelector) { throw new Error("Please provide a 'logonButtonSelector'."); }

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
    return userNameField.isDisplayedInViewport() &&
      passwordField.isDisplayedInViewport() &&
      logonField.isDisplayedInViewport();
  }, { timeout: 60000, timeoutMsg: "expected user name field to be present after 60s" });

  await userNameField.setValue(username);
  await passwordField.setValue(password);
  await logonField.click();
}

module.exports = CustomAuthenticator;
