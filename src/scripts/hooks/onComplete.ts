import dataExchangeCommands from "./utils/dataExchangeCommands";
import { updateUsageRequests } from "../stats/stats";

/**
 * Gets executed after all workers got shut down and the process is about to exit. An error
 * thrown in the onComplete hook will result in the test run failing.
 * @param {Object} exitCode 0 - success, 1 - fail
 * @param {Object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {<Object>} results object containing test results
 */

export default async function (exitCode: any, config: any, capabilities: any, results: any, statsUsageId: string | null) {
  await dataExchangeCommands.writeExportData();
  if (statsUsageId !== null) {
    if (config.params && config.params.qmateStatsOptions) {
      if (!config.params.qmateStatsOptions.optOut) {
        if (exitCode === 0) {
          updateUsageRequests(statsUsageId, 'success');
        } else if (exitCode === 1) {
          updateUsageRequests(statsUsageId, 'fail');
        }
      }
    }
  }
};