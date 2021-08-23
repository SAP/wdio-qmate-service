/**
 * Handle no Url authentication
 * @constructor
 * @param {Config} config
 * @param {Object} instanceConfig
 * @param {Logger} logger
 */
async function PlainAuthenticator() {
  if (browser.config.baseUrl) {
    const url = browser.config.baseUrl;
    await browser.navigateTo(url);
  }
}

module.exports = PlainAuthenticator;
