import dataExchangeCommands from "./utils/dataExchangeCommands";

/**
 * Gets executed after all tests are done. You still have access to all global variables from
 * the test.
 * @param {Number} result 0 - test pass, 1 - test fail
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that ran
 */
export default async function (result: number, capabilities: any, specs: any) {
  // write export data in tmp files
  await dataExchangeCommands.writeExportDataInTmpFile();
}
