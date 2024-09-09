//var assert = require("assert");
//var mobile = require("mobile");

describe("SAS app automation tests", () => {

  it("Tapping on the actionable method", async () => {
    //allureReporter.addFeature('Feature')
    const launch_screen_button_demo = await $('//android.widget.Button[@resource-id="com.sap.ariba.ibx.debug:id/launchscreen_button_demo"]')
    console.log(`The current context is:${driver.getContexts()} `)
    if (await mobile.element.isVisible(launch_screen_button_demo, false)) {
      console.log("Launch screen button demo Button is displayed")
      await mobile.userInteraction.tap(launch_screen_button_demo, 40);
    } else {
      console.log("Launch screen button demo Button is not displayed")
    }
    console.log(driver.getContexts())
    //await $('//android.widget.Button[@resource-id="com.sap.ariba.ibx.debug:id/launchscreen_button_demo"]').click();
  });

});
