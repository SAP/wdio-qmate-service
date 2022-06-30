"use strict";
//@TODO: decouple in standalone service since internal only
// const SupaInterface = require("supa-restapi");

/**
 * @class performance
 * @memberof util 
 */
// @ts-ignore
export class Performance {
  
  supa: any


  /**
   * @function configureSupa
   * @memberOf util.performance
   * @description Sends new configuration to an existing instance of SUPA with published REST API 
   * @param {Object} configuration - object with configuration. Mandatory is property config with path to supa properties file
   * @example 
   * ```js
   * const configuration = {
   *    config: "./test/supa-config/F5549RepostLineItems.properties",
   *    ipaConfig: {
   *      project: "FXUBRQ24",
   *      scenario: "F5549 - Repost Line Items",
   *      variant: "Performance",
   *      release: "CE2202",
   *      comment: "Test automation",
   *      username: "fxubrq24",
   *      password: "Oqk2"
   * };
   * await util.performance.configureSupa(configuration);
   * ```
   */
  async configureSupa (configuration: object) {
    if (configuration) {
      this.supa = new SupaInterface(configuration).getSupa();
      await this.supa.reconfigureSupa();
    } else {
      throw new Error("Path to SUPA configuration is missing");
    }
  };

  /**
   * @function startMeasurement
   * @memberOf util.performance
   * @description SUPA starts the measurement of given step
   * @param {String} stepName - Name of the step as specified in properties file
   * @example await util.performance.startMeasurement("Step 1");
   */
  async startMeasurement (stepName: string) {
    this._checkInitialization();
    await this.supa.startMeasurement(stepName);
  };

  /**
   * @function stopMeasurement
   * @memberOf util.performance
   * @description SUPA stops current measurement
   * @example await util.performance.stopMeasurement();
   */
  async stopMeasurement() {
    this._checkInitialization();
    await this.supa.stopMeasurement();
  };

  /**
   * @function finishMeasurement
   * @memberOf util.performance
   * @description When all measurements all done, it is necessary to call function finishMeasurement that stores SUPA results locally
   * @example await util.performance.finishMeasurement();
   */
  async finishMeasurement() {
    this._checkInitialization();
    await this.supa.finishMeasurement();
  };

  /**
   * @function generateResultsInExcel
   * @memberOf util.performance
   * @description SUPA generates an Excel file with measurement results
   * @example await util.performance.generateResultsInExcel();
   */
  async generateResultsInExcel(){
    this._checkInitialization();
    await this.supa.generateResultsInExcel();
  };

  /**
   * @function uploadToIpa
   * @memberOf util.performance
   * @description SUPA uploads stored results to IPA
   * @example await util.performance.uploadToIpa();
   */
  async uploadToIpa () {
    this._checkInitialization();
    try {
      await this.supa.uploadToIpa();
    } catch (err) {
      throw new Error("Upload to IPA failed. Reason: " + err);
    }
  };

  /**
   * @function stopSupa
   * @memberOf util.performance
   * @description Kills running SUPA instance
   * @example await util.performance.stopSupa();
   */
  async stopSupa() {
    this._checkInitialization();
    await this.supa.stopSupa();
  };

  
  // =================================== HELPER ===================================
  private _checkInitialization() {
    if (!this.supa) {
      throw new Error("First you have to call the function 'configureSupa'");
    }
  };

};
export default new Performance();