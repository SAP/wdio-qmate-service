const path = require("path");
import { sendUsageRequests } from "../stats/stats";
import dataExchangeCommands from "./utils/dataExchangeCommands";

/**
 * Gets executed once before all workers get launched.
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 */
export default async function (config: any, capabilities: Array<object>, callbackStatsUsageId: (statsUsageId: string) => void) {
  // Set the CONFIG_PATH environment variable to the directory of the config file
  if (!process.env.CONFIG_PATH) {
    process.env.CONFIG_PATH = path.dirname(config._[0]);
  }

  const specCounter = countNestedArrayElements(config.specs);

  // Send usage requests
  if (config.params && config.params.qmateStatsOptions) {
    if (!config.params.qmateStatsOptions.optOut) {
      try {
        sendUsageRequests(specCounter).then((res) => {
          if (res != null) {
            callbackStatsUsageId(res);
          }
        });
      } catch (error) {
        // Intentionally left empty -> call only succeeds when done SAP internally
      }
    }
  }

  // Set Qmate custom timeouts
  if (config.params && config.params.qmateCustomTimeout) {
    process.env.QMATE_CUSTOM_TIMEOUT = config.params.qmateCustomTimeout;
    process.env.LOAD_PROPERTY_TIMEOUT = config.params.loadPropertyTimeout;

  }

  // Create a temporary data folder
  await dataExchangeCommands.createTmpDataFolder();
};

function countNestedArrayElements(arr: any[]): number {
  let count = 0;

  for (const element of arr) {
    if (Array.isArray(element)) {
      count += countNestedArrayElements(element);
    } else {
      count++;
    }
  }

  return count;
}