const path = require("path");
const dataExchangeCommands = require("./utils/dataExchangeCommands");

/**
 * Gets executed once before all workers get launched.
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 */
module.exports = async function (config, capabilities) {
  if (!process.env.CONFIG_PATH) {
    process.env.CONFIG_PATH = path.dirname(config._[0]);
  }
  if (config.params && config.params.qmateCustomTimeout) {
    process.env.QMATE_CUSTOM_TIMEOUT = config.params.qmateCustomTimeout;
  }
  await dataExchangeCommands.createTmpDataFolder();
};