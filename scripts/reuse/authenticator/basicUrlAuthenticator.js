async function BasicUrlAuthenticator() {

  const username = browser.config.params ? browser.config.params.auth.username : undefined;
  if (!username) { throw new Error("Please provide a 'username'."); }
  const password = browser.config.params ? browser.config.params.auth.password : undefined;
  if (!password) { throw new Error("Please provide a 'password'."); }

  const url = browser.config.baseUrl;
  if (!url) { throw new Error("Please provide a 'baseUrl'."); }

  // prepare basic auth url
  // eslint-disable-next-line no-useless-escape
  const urlMatches = url.match(/(\w*\:?\/\/)(.+)/);
  if (urlMatches === null) {
    throw new Error(`Could not parse url: ${url}.`);
  }
  const urlWithAuth = urlMatches[1] + username + ":" + password + "@" + urlMatches[2];

  // get the url
  await browser.url(urlWithAuth);
}
module.exports = BasicUrlAuthenticator;
