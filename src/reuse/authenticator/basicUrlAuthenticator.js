async function BasicUrlAuthenticator() {

  const username = browser.config.params ? browser.config.params.auth.username : undefined;
  if (!username) {
    throw new Error("Please provide a 'username' in the config.");
  }
  const password = browser.config.params ? browser.config.params.auth.password : undefined;
  if (!password) {
    throw new Error("Please provide a 'password' in the config.");
  }
  const url = browser.config.baseUrl;
  if (!url) {
    throw new Error("Please provide a 'baseUrl' in the config.");
  }

  // prepare basic auth url
  const urlMatches = url.match(/(\w*\:?\/\/)(.+)/);
  if (urlMatches === null) {
    throw new Error(`Could not parse url: ${url}.`);
  }
  const urlWithAuth = urlMatches[1] + username + ":" + password + "@" + urlMatches[2];

  // get the url
  await browser.url(urlWithAuth);
}
module.exports = BasicUrlAuthenticator;