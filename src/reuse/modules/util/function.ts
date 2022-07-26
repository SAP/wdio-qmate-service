"use strict";
/**
 * @class function
 * @memberof util
 */
export class FunctionModule {
  overallRetries: number = 3;

  // =================================== MAIN ===================================
  /**
   * @function retry
   * @memberOf util.function
   * @description Retries the passed function n times with a specific interval until it executed successfully.
   * @param {Function} fct - The function to retry.
   * @param {Array} args - An array of the arguments passed to the function.
   * @param {Integer} [retries=3] - The number of retries. Can be set in config for all functions under "params" - "stepsRetries".
   * @param {Integer} [interval=5000] - The interval of the retries (ms). Can be set in config for all functions under "params" - "stepRetriesIntervals".
   * @param {Object} [scope=null] - The function scope. Defaults is the global object.
   * @example await util.function.retry(ui5.userInteraction.fill, [selector, value], 4, 10000);
   * @example await util.function.retry(async () => {
   *  await ui5.userInteraction.fill(selector, "ABC");
   * }, [], 2, 30000);
   */
  // NOTE: Don't set default values since they will be calculated with "_getRetryProperties".
  async retry (fct: Function, args: Array<any>, retries: number, interval: number, scope: any = null) {
    this.overallRetries = retries;
    const res = await this._getRetryProperties(retries, interval);
    await this._retry(fct, args, res.retries, res.interval, scope);
  };

  /**
   * @function executeOptional
   * @memberOf util.function
   * @description Executes the given function optionally. If it fails, a promise will be returned anyway.
   * @param {Function} fct - The function to execute.
   * @param {Array} args - An array of the arguments passed to the function.
   * @example await util.function.executeOptional(ui5.userInteraction.fill, [selector, value]);
   * @example await util.function.executeOptional(async () => {
   *  await ui5.userInteraction.fill(selector, "ABC");
   * }, []);
   */
  async executeOptional (fct: any, args: Array<any> = []) {
    try {
      await fct.apply(this, args);
    } catch (e) {
      if (fct.name) {
        util.console.info(`Optional function '${fct.name}' not executed, continue ...`);
      } else {
        util.console.info(`Optional anonymous function not executed, continue ...`);
      }
      return Promise.resolve();
    }
  };

  // =================================== HELPER ===================================
  /**
   * @function mapWdioErrorToQmateErrorMessage
   * @memberOf util.function
   * @private
   * @description Maps Wdio Error to Qmate Error Message
   * @param {Error} wdioError - The wdio error
   * @param {string} action - An action performed upon the element ("click", "fill")
   * @example await util.function.mapWdioErrorToQmateErrorMessage(error, "click");
   */
  async mapWdioErrorToQmateErrorMessage (wdioError: Error, action: string) {
    const errorMessage = wdioError.message;
    let qmateMessage = "";
    if (action === "fill") {
      if (errorMessage.match(new RegExp(/(invalid element state|element not interactable)/))) {
        qmateMessage = `Function fill failed. Element can not be filled - make sure that the selector matches input \n\n` + wdioError.stack;
      }
    } else if (action === "click") {
      if (errorMessage.match(new RegExp(/is not clickable at point/))) {
        const reg = new RegExp(/(?<=Element <.* )(.*)(?=>...<)/).exec(errorMessage);
        const foundAttributes = reg ? reg[0] : undefined;
        let elementAttributes = foundAttributes;
        if (reg && foundAttributes) {
          if (foundAttributes.includes("id=")) {
            // @ts-ignore
            elementAttributes = foundAttributes.match(new RegExp(/(?=id)(.*)(?<=")/));
          } else if (foundAttributes.includes("class=")) {
            // @ts-ignore
            elementAttributes = foundAttributes.match(new RegExp(/(?=class)(.*)(?<=")/));
          }
        }
        if (wdioError && wdioError.stack && elementAttributes) {
          qmateMessage = `Element with attribute(s) ${elementAttributes[0]} is hidden by another element \n\n` + wdioError.stack;
        } else {
          qmateMessage = "Error clicking element \n\n" + wdioError;
        }
      }
    }
    return qmateMessage;
  };


  // =================================== HELPER ===================================
  private async _getRetryProperties(retries: number, interval: number) {
    const res = {
      retries: retries,
      interval: interval
    };
    if (res.retries === undefined) {
      res.retries = browser.config.stepsRetries;
      if (res.retries === undefined) {
        res.retries = 3;
      }
    }
    if (res.interval === undefined) {
      res.interval = browser.config.stepRetriesIntervals;
      if (res.interval === undefined) {
        res.interval = 5000;
      }
    }
    return res;
  }

  private async _retry(fct: any, args: Array<any>, retries: number, interval: number, scope = null) {
    try {
      return await fct.apply(scope, args);
    } catch (e) {
      retries = retries - 1;
      if (retries < 0) {
        throw new Error(`Retries done. Failed to execute the function: ${e}`);
      }
      await browser.pause(interval);
      util.console.log(`Retrying function again (${this.overallRetries - retries}/${this.overallRetries})`);
      await this._retry(fct, args, retries, interval, scope);
    }
  }
};

export default new FunctionModule();