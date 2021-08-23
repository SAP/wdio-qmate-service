async function setRetryProperties(retries, interval) {
  var res = {
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

async function _retry(fct, args, retries, interval, scope = null) {
  try {
    return await fct.apply(scope, args);
  } catch (e) {
    retries = retries - 1;
    if (retries < 0) {
      throw new Error(`Retries done. Failed to execute the function. increase your retries. Last error: ${e}. \nCallstack: \n${e.stack}`);
    }
    await browser.pause(interval);
    console.log("Retrying function again " + retries);
    await _retry(fct, args, retries, interval, scope);
  }
}

/**
* @class function
* @memberof utilities
*/
var Function = function () {

  /**
   * @function retry
   * @memberOf utilities.function
   * @description Retries the passed function n times with an specific intervall until it executed successfully.
   * @param {Function} fct - The function to retry.
   * @param {Array} args - An array of the arguments passed to the function.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @param {Object} scope - The function scope to execute the function, defaults to null (global object)
   * @example async function sayHello(firstName, lastName) {
   * console.log("Hello " + firstName + " " + lastName + "!");
   * }
   * await utilities.function.retry(sayHello, ["John", "Doe"], 3, 5000);
   */
  this.retry = async function (fct, args, retries, interval, scope) {
    var res = await setRetryProperties(retries, interval);
    await _retry(fct, args, res.retries, res.interval, scope);
  };

  /**
   * @function executeOptional
   * @memberOf utilities.function
   * @description Executes the passed function optionally. If it fails, a promise will be returned anyway.
   * @param {Function} fct - The function to execute.
   * @param {Array} args - An array of the arguments passed to the function.
   * @example function sayHello(firstName, lastName) {
   * console.log("Hello " + firstName + " " + lastName + "!");
   * }
   * await utilities.function.executeOptional(sayHello, ["John", "Doe"]);
   */
  this.executeOptional = async function (fct, args) {
    try {
      await fct.apply(this, args);
    } catch (e) {
      console.info("Optional function not executed, continue..");
      return Promise.resolve();
    }
  };

  /**
   * @function mapWdioErrorToVyperErrorMessage
   * @memberOf utilities.function
   * @private
   * @description Maps Wdio Error to Vyper Error Message
   * @param {Error} wdioError - The wdio error
   * @param {string} action - An action performed upon the element ("click", "fill")
   * @example await utilities.function.mapWdioErrorToVyperErrorMessage(error, "click");
   */
  this.mapWdioErrorToVyperErrorMessage = async function (wdioError, action) {
    const errorMessage = wdioError.message;
    let vyperMessage = "";
    if (action === "fill") {
      if (errorMessage.match(new RegExp(/(invalid element state|element not interactable)/))) {
        vyperMessage = `Function fill failed. Element can not be filled - make sure that the selector matches input \n\n` + wdioError.stack;
      }
    } else if (action === "click") {
      if (errorMessage.match(new RegExp(/is not clickable at point/))) {
        const reg = new RegExp(/(?<=Element <.* )(.*)(?=>...<)/).exec(errorMessage);
        const foundAttributes = reg ? reg[0] : undefined;
        let elementAttributes = foundAttributes;
        if (reg && foundAttributes) {
          if (foundAttributes.includes("id=")) {
            elementAttributes = foundAttributes.match(new RegExp(/(?=id)(.*)(?<=")/));
          } else if (foundAttributes.includes("class=")) {
            elementAttributes = foundAttributes.match(new RegExp(/(?=class)(.*)(?<=")/));
          }
        }
        if (wdioError && wdioError.stack && elementAttributes) {
          vyperMessage = `Element with attribute(s) ${elementAttributes[0]} is hidden by another element \n\n` + wdioError.stack;
        } else {
          vyperMessage = "Error clicking element \n\n" + wdioError;
        }
      }
    }
    return vyperMessage;
  };
};
module.exports = new Function();
