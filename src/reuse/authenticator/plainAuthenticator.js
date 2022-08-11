async function PlainAuthenticator() {
  if (browser.config.baseUrl) {
    const url = browser.config.baseUrl;
    await browser.navigateTo(url);
  }
}
module.exports = PlainAuthenticator;
// © 2022 SAP SE or an SAP affiliate company. All rights reserved.


