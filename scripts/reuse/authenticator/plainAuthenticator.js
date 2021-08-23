/**
 * Handle no Url authentication
 * @constructor
 * @param {Config} config
 * @param {Object} instanceConfig
 * @param {Logger} logger
 */
async function PlainAuthenticator() {
  // TODO: need to clarify
  // Dont need this, because wdio is implicitely makes sure to navigate
  // In the ForAll repo the browser.get was overriden by vyper team (add small pause before navigating)
  // return;
  if (browser.config.baseUrl) {
    const url = browser.config.baseUrl;
    await browser.navigateTo(url);
  }
}

module.exports = PlainAuthenticator;
