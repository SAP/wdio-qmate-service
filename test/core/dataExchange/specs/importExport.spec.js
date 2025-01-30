/**
 * Regression testing 
 * Use imported data to fill forms, and export test data
 */
const formUtils = {
  textSelector: {
    "elementProperties": {
      "viewName": "sap.m.sample.InputTypes.V",
      "metadata": "sap.m.Input",
      "type": "Text"
    }
  },
  emailSelector: {
    "elementProperties": {
      "viewName": "sap.m.sample.InputTypes.V",
      "metadata": "sap.m.Input",
      "type": "Email"
    }
  },
  telephoneSelector: {
    "elementProperties": {
      "viewName": "sap.m.sample.InputTypes.V",
      "metadata": "sap.m.Input",
      "type": "Tel"
    }
  },
  numberSelector: {
    "elementProperties": {
      "viewName": "sap.m.sample.InputTypes.V",
      "metadata": "sap.m.Input",
      "type": "Number"
    }
  },
  urlSelector: {
    "elementProperties": {
      "viewName": "sap.m.sample.InputTypes.V",
      "metadata": "sap.m.Input",
      "type": "Url"
    }
  },
  fillForm: async function (description, userData) {
    await closeTrustArcCookiePopup();
    await ui5.element.waitForAll(this.textSelector);
    await ui5.userInteraction.fill(this.textSelector, description);
    await ui5.userInteraction.fill(this.emailSelector, userData.email);
    await ui5.userInteraction.fill(this.telephoneSelector, userData.telephone);
    await ui5.userInteraction.fill(this.numberSelector, userData.amount);
    await ui5.userInteraction.fill(this.urlSelector, userData.website);
  },
  clearForm: async function () {
    await closeTrustArcCookiePopup();
    await ui5.userInteraction.clear(this.textSelector);
    await ui5.userInteraction.clear(this.emailSelector);
    await ui5.userInteraction.clear(this.telephoneSelector);
    await ui5.userInteraction.clear(this.numberSelector);
    await ui5.userInteraction.clear(this.urlSelector);
  }
};

async function closeTrustArcCookiePopup() {
  const trustArcCookieButton="//button[text()='Accept All']";
  try {
    await nonUi5.userInteraction.click(trustArcCookieButton, 30000);
  } catch (e) {
    // ignore, no cookie dialog
  }
}

describe("Import and Export using UI", function () {


  // config params
  // import: {           //import data            
  //   myUserPrefix: "./data/ui/user.json",
  //   userDataFolder: "./data/ui",
  //   uiUser: "./data/ui/webUser.json",
  // },
  // export: {             //Export             
  //   exportData: "./data/ui/export/exportedUser.json",
  //   webUser : "./data/ui/export/exportedWebUser.json"
  // }, 

  it("step 1: navigate to app", async function () {

    await ui5.navigation.navigateToApplication("", false);
    const acceptCookiesButton = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };

    await closeTrustArcCookiePopup();
    try {
      await ui5.userInteraction.click(acceptCookiesButton);
    } catch (e) {
      // ignore, no cookie dialog
    }
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });

  it("step 2: use data loaded into myUserPrefix", async function () {

    // uses data from file pointed to by myUserPrefix
    //   myUserPrefix: "./data/ui/user.json",

    const userData = browser.params.import.myUserPrefix;
    await common.assertion.expectDefined(userData);

    await common.assertion.expectDefined(userData.email);
    await common.assertion.expectDefined(userData.telephone);
    await common.assertion.expectDefined(userData.amount);
    await common.assertion.expectDefined(userData.website);

    await formUtils.fillForm("Data from myUserPrefix", userData);

    await formUtils.clearForm();

  });

  it("step 3: use data loaded from file in subfolder moreDataFolder - anotherUser.json", async function () {

    // file anotherUser.json is in subfolder "moreDataFolder" within directory pointed to by userDataFolder
    //   userDataFolder: "./data/ui",
    const userDataFolder = browser.params.import.userDataFolder;
    await common.assertion.expectDefined(userDataFolder);
    const moreDataFolder = browser.params.import.userDataFolder.moreDataFolder;
    await common.assertion.expectDefined(moreDataFolder);
    const anotherUser = browser.params.import.userDataFolder.moreDataFolder.anotherUser;
    await common.assertion.expectDefined(anotherUser);

    await common.assertion.expectDefined(anotherUser.email);
    await common.assertion.expectDefined(anotherUser.telephone);
    await common.assertion.expectDefined(anotherUser.amount);
    await common.assertion.expectDefined(anotherUser.website);

    await formUtils.fillForm("Data from anotherUser.json in moreDataFolder", anotherUser);

    await formUtils.clearForm();

  });
  it("step 4: use data loaded into uiUser", async function () {

    // uses data from file pointed to by reference
    //   uiUser: "./data/ui/webUser.json"
    const userData = browser.params.import.uiUser;
    await common.assertion.expectDefined(userData);

    await common.assertion.expectDefined(userData.email);
    await common.assertion.expectDefined(userData.telephone);
    await common.assertion.expectDefined(userData.amount);
    await common.assertion.expectDefined(userData.website);

    await formUtils.fillForm("Data from uiUser", userData);

    await formUtils.clearForm();

  });

  it("step 5: export data into file pointed to by exportData param", async function () {

    const dateAdded = (new Date()).toISOString();
    const userData = {
      "exportedOn": dateAdded,
      "description": "Should be in file export/exportedUser.json",
      "email": "joe.exported@example.com",
      "telephone": "11-2233445566",
      "amount": 458,
      "website": "http://www.exportedUser.test"

    };

    // assign the data to export param so that it gets written to file pointed to by "exportData"
    //   exportData: "./data/ui/export/exportedUser.json",
    browser.params.export.exportData = userData;

    await common.assertion.expectDefined(browser.params.export.exportData.description);
    await common.assertion.expectDefined(browser.params.export.exportData.email);
    await common.assertion.expectDefined(browser.params.export.exportData.telephone);
    await common.assertion.expectDefined(browser.params.export.exportData.amount);
    await common.assertion.expectDefined(browser.params.export.exportData.website);

  });

  it("step 6: export data into file pointed to by webUser param", async function () {


    const dateAdded = (new Date()).toISOString();
    const userData = {
      "exportedOn": dateAdded,
      "description": "Should be in file export/exportedWebUser.json",
      "email": "joe.webuser@example.com",
      "telephone": "333-000-111-222",
      "amount": 4.79,
      "website": "http://www.webuser.test"

    };
    // assign the data to export param so that it gets written to file pointed to by "refUser"
    //   webUser : "./data/ui/export/exportedWebUser.json"
    browser.params.export.webUser = userData;

    await common.assertion.expectDefined(browser.params.export.webUser.description);
    await common.assertion.expectDefined(browser.params.export.webUser.email);
    await common.assertion.expectDefined(browser.params.export.webUser.telephone);
    await common.assertion.expectDefined(browser.params.export.webUser.amount);
    await common.assertion.expectDefined(browser.params.export.webUser.website);

  });

});
