async function CustomAuthenticator() {

  const username = browser.config.params.auth.username;
  if (!username) {
    throw new Error("Please provide a 'username' in the config.");
  }
  const password = browser.config.params.auth.password;
  if (!password) {
    throw new Error("Please provide a 'password' in the config.");
  }
  const usernameFieldSelector = browser.config.params.auth.usernameFieldSelector;
  if (!usernameFieldSelector) {
    throw new Error("Please provide a 'usernameFieldSelector' in the config.");
  }
  const passwordFieldSelector = browser.config.params.auth.passwordFieldSelector;
  if (!passwordFieldSelector) {
    throw new Error("Please provide a 'passwordFieldSelector' in the config.");
  }
  const logonButtonSelector = browser.config.params.auth.logonButtonSelector;
  if (!logonButtonSelector) {
    throw new Error("Please provide a 'logonButtonSelector' in the config.");
  }

  const url = browser.config.baseUrl;
  if (!url) {
    throw new Error("Please provide a 'baseUrl'.");
  }

  let usernameField = null;
  let passwordField = null;
  let logonField = null;

  await browser.url(url);
  await browser.waitUntil(async function () {
    usernameField = await $(usernameFieldSelector);
    passwordField = await $(passwordFieldSelector);
    logonField = await $(logonButtonSelector);
    return usernameField.isDisplayedInViewport() &&
      passwordField.isDisplayedInViewport() &&
      logonField.isDisplayedInViewport();
  }, {
    timeout: 60000,
    timeoutMsg: "Expected user name field to be present after 60s"
  });

  await usernameField.setValue(username);
  await passwordField.setValue(password);
  await logonField.click();
}

module.exports = CustomAuthenticator;