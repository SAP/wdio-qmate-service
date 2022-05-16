class AuthHandler {

  private path = require("path");

  async attachAuthHandling () {
    const authConfig = require("./authConfig.js");

    if (browser.config.params && browser.config.params.auth) {
      const formType = browser.config.params.auth.formType;
      if (formType && formType !== "skip") {
        if (!authConfig[formType] || !authConfig[formType].name || !this.path.resolve(authConfig[formType].name)) {
          throw new Error(`Please provide a valid 'formType' instead of '${formType}'.`);
        }
        // eslint-disable-next-line no-console
        console.log(this.path.resolve(authConfig[formType].name));
        const execAuthenticator = require(authConfig[formType].name);
        await execAuthenticator();
      }
    }
  };

};
export default new AuthHandler();