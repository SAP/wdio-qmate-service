"use strict";
const SupaInterface = require("supa-restapi");

/**
 * @class performance
 * @memberof util 
 */
const Performance = function () {

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
  this.configureSupa = async function (configuration) {
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
  this.startMeasurement = async function (stepName) {
    this._checkInitialization();
    await this.supa.startMeasurement(stepName);
  };

  /**
   * @function stopMeasurement
   * @memberOf util.performance
   * @description SUPA stops current measurement
   * @example await util.performance.stopMeasurement();
   */
  this.stopMeasurement = async function () {
    this._checkInitialization();
    await this.supa.stopMeasurement();
  };

  /**
   * @function finishMeasurement
   * @memberOf util.performance
   * @description When all measurements all done, it is necessary to call function finishMeasurement that stores SUPA results locally
   * @example await util.performance.finishMeasurement();
   */
  this.finishMeasurement = async function () {
    this._checkInitialization();
    await this.supa.finishMeasurement();
  };

  /**
   * @function generateResultsInExcel
   * @memberOf util.performance
   * @description SUPA generates an Excel file with measurement results
   * @example await util.performance.generateResultsInExcel();
   */
  this.generateResultsInExcel = async function () {
    this._checkInitialization();
    await this.supa.generateResultsInExcel();
  };

  /**
   * @function uploadToIpa
   * @memberOf util.performance
   * @description SUPA uploads stored results to IPA
   * @example await util.performance.uploadToIpa();
   */
  this.uploadToIpa = async function () {
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
  this.stopSupa = async function () {
    this._checkInitialization();
    await this.supa.stopSupa();
  };

  
  // =================================== HELPER ===================================
  this._checkInitialization = function () {
    if (!this.supa) {
      throw new Error("First you have to call the function 'configureSupa'");
    }
  };

};
module.exports = new Performance();