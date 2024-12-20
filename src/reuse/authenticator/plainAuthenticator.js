async function PlainAuthenticator() {
  if (browser.config.baseUrl) {
    const url = browser.config.baseUrl;
    await browser.url(url, { wait: "none" });
  }
}
module.exports = PlainAuthenticator;