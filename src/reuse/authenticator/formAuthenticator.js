/* eslint-disable no-return-await */
const authConfig = require("./authConfig");

async function FormAuthenticator() {
  const username = browser.config.params.auth.username;
  if (!username) {
    throw new Error("Please provide a 'username' in the config.");
  }
  const password = browser.config.params.auth.password;
  if (!password) {
    throw new Error("Please provide a 'password' in the config.");
  }
  const formType = browser.config.params.auth.formType;
  if (!authConfig[formType]) {
    throw new Error("Please provide a valid 'formType' in the config.");
  }

  const usernameFieldSelector = authConfig[browser.config.params.auth.formType].usernameFieldSelector;
  const passwordFieldSelector = authConfig[browser.config.params.auth.formType].passwordFieldSelector;
  const logonButtonSelector = authConfig[browser.config.params.auth.formType].logonButtonSelector;

  const url = browser.config.baseUrl;
  if (!url) {
    throw new Error("Please provide a 'baseUrl' in the config.");
  }

  let usernameField = null;
  let passwordField = null;
  let logonField = null;

  await browser.url(url);
  await browser.waitUntil(
    async function () {
      usernameField = await $(usernameFieldSelector);
      passwordField = await $(passwordFieldSelector);
      logonField = await $(logonButtonSelector);
      const usernameVisible = await usernameField.isDisplayed();
      const passwordVisible = await passwordField.isDisplayed();
      const logonVisible = await logonField.isDisplayed();
      return usernameVisible && passwordVisible && logonVisible;
    },
    {
      timeout: 60000,
      timeoutMsg: "Expected user name field to be present after 60s"
    }
  );

  await usernameField.setValue(username);
  await passwordField.setValue(password);
  await require("./submitLoginForm")(logonField);
}
module.exports = FormAuthenticator;
