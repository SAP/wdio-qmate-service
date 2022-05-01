const path = require("path");
import dataExchangeCommands from "./utils/dataExchangeCommands";

/**
 * Gets executed once before all workers get launched.
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 */
export default async function (config: any, capabilities: Array<object>) {
  if (!process.env.CONFIG_PATH) {
    process.env.CONFIG_PATH = path.dirname(config._[0]);
  }
  if (config.params && config.params.qmateCustomTimeout) {
    process.env.QMATE_CUSTOM_TIMEOUT = config.params.qmateCustomTimeout;
    process.env.LOAD_PROPERTY_TIMEOUT = config.params.loadPropertyTimeout;
    
  }
  await dataExchangeCommands.createTmpDataFolder();
};