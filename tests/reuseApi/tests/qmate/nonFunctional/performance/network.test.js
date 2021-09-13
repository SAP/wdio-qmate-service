describe("webdriver.io page", function () {
  this.beforeAll(async () => {
    await browser.cdp("Network", "enable");
    browser.on("Network.responseReceived", (params) => {
      console.log("Url:" + params.response.url + " Response type:" + params.type + " Response latency:" + (params.response.timing.receiveHeadersEnd / 1000) + "s");
      console.log(`Loaded ${params.response.url}`);
    });

    browser.on("Network.dataReceived", (params) => {
      console.log("received " + JSON.stringify(params));
    });

    // To be investigated: javascript error: circular reference
    // without -> window is not defined
    // browser.execute(function () {
    //   return window;
    // }).then((window) => {
    //   const resourceList = window.performance.getEntriesByType("resource");
    //   const time = resourceList[1].responseEnd - resourceList[1].startTime;
    //   console.log('Response duration time = ' + time);
    // })
  });

  it("step0as:click on the first standard item check id with wildcard", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");

    const ui5ControlForAccessories = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "id": "*categoryList-0",
          "bindingContextPath": "/ProductCategories('AC')"
        }
      }
    };
    const elem = await browser.uiControl(ui5ControlForAccessories, 0);
    await elem.click();
  });

  it("step0as:navigate back to main page", async function () {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "type": "Back" } },
      "parentProperties": { "metadata": "sap.m.Bar", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": { "metadata": "sap.m.Title", "mProperties": {} },
      "childProperties": { "metadata": "sap.ui.core.Icon", "mProperties": { "src": "sap-icon://nav-back" } }
    };
    const elem = await browser.uiControl(ui5ControlProperties, 0);
    await elem.click();
  });
});