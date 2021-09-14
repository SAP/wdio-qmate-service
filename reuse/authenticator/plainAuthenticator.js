async function PlainAuthenticator() {
  if (browser.config.baseUrl) {
    const url = browser.config.baseUrl;
    await browser.navigateTo(url);
  }
}
module.exports = PlainAuthenticator;