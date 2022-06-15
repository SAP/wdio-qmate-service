import reuseLibrary from '../../reuse/index';
import dataExchangeCommands from "./utils/dataExchangeCommands";
import decryption from './utils/decryption';
/**
 * Gets executed just before initializing the webdriver session and test framework. It allows you
 * to manipulate configurations depending on the capability or spec.
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that are to be run
 */
export default async function (config: Record<string, any>, capabilities: object[], specs: string[]) {
  reuseLibrary.load();
  decryption.initDecryptFunction();
  if (config.user || config.key) {
    decryption.decryptSauceConfig(config);
  }
  await dataExchangeCommands.readParams();
};