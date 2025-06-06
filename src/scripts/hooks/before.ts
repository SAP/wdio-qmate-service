import locatorCommands from "./utils/addLocatorCommands";
import authenticatorHandler from "../../reuse/authenticator/authHandler";
import { Ui5ExtensionMocker } from "./utils/Ui5ExtensionMocker";
/**
 * Gets executed before test execution begins. At this point you can access to all global
 * variables like `browser`. It is the perfect place to define custom commands.
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs        List of spec file paths that are to be run
 * @param {Object}         browser      instance of created browser/device session
 */
export default async function (capabilities: object[], specs: string[], browser: any) {
  // Add ui control selector & properties
  await locatorCommands.addControlCommands();
  await locatorCommands.addGetControlProperties();
  await locatorCommands.addInBrowserHandling();

  // Add ui control binding information
  await locatorCommands.addGetBindingInfos();
  //Add authenticators
  await authenticatorHandler.attachAuthHandling();

  if (shouldMockUi5Extension(browser)) {
    await Ui5ExtensionMocker.mockRequests();
  }
};

function shouldMockUi5Extension(browser: any): boolean {
  return browser.config.qmate?.enableUi5ExtensionMocking !== false;
}
