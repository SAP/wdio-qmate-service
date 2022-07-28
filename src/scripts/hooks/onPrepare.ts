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
  await dataExchangeCommands.createTmpDataFolder();
};