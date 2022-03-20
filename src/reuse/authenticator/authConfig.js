module.exports = {
  "plain": {
    name: "./plainAuthenticator"
  },
  "basic": {
    name: "./basicUrlAuthenticator"
  },
  "custom": {
    name: "./customAuthenticator"
  },
  "fiori-form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#USERNAME_BLOCK input",
    passwordFieldSelector: "#PASSWORD_BLOCK input",
    logonButtonSelector: "#LOGIN_LINK"
  },
  "fiori-form-new": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#USERNAME_BLOCK input",
    passwordFieldSelector: "#PASSWORD_BLOCK input",
    logonButtonSelector: "#LOGIN_LINK"
  },
  "sapcloud-form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#j_username",
    passwordFieldSelector: "#j_password",
    logonButtonSelector: "#logOnFormSubmit"
  },
  "XSA-form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#xs_username-inner",
    passwordFieldSelector: "#xs_password-inner",
    logonButtonSelector: "#logon_button"
  },
  "POT-form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#__screen0-user",
    passwordFieldSelector: "#__screen0-pass",
    logonButtonSelector: "#__screen0-loginBtn"
  },
  "MIA-form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#logonuidfield",
    passwordFieldSelector: "#logonpassfield",
    logonButtonSelector: ".urBtnStdNew"
  },
  "UI5-Form": {
    name: "./formAuthenticator",
    usernameFieldSelector: "#__control0-user-inner",
    passwordFieldSelector: "#__control0-pass-inner",
    logonButtonSelector: "#__control0-logonBtn"
  }
};










