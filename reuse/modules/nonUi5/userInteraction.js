/**
 * @class userInteraction
 * @memberof nonUi5 
 */
const UserInteraction = function () {

  // =================================== CLICK ===================================
  /**
   * @function click
   * @memberOf non_ui5.nonUi5.userInteraction
   * @description Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.userInteraction.click(elem);
   */
  this.click = async function (element, timeout = 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({ //@TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({ //@TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.click();
    } catch (error) {
      const errorMessage = await common.function.mapWdioErrorToQmateErrorMessage(error, "click"); //@TODO: Rename function since it is confusing.
      throw new Error(errorMessage);
    }
  };

  /**
   * @function clickAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clicks on the passed element, retries in case it fails.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.userInteraction.clickAndRetry(elem);
   */
  this.clickAndRetry = async function (element, timeout = 30000, retries = 3, interval = 5000) {
    return await common.function.retry(this.click, [element, timeout], retries, interval, this);
  };


  // =================================== FILL ===================================
  /**
   * @function fill
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input.
   * @param {Object} element - The element.
   * @param {String} value - The value to be filled.
   * @example const elem = await nonUi5.element.getElementById("input01");
   * await nonUi5.userInteraction.fill(elem, "Service 01");
   */
  this.fill = async function (element, value) {
    try {
      await element.setValue(value);
    } catch (error) {
      if (error.message && error.message.match(new RegExp(/(invalid element state|element not interactable)/))) {
        const errorMessage = await common.function.mapWdioErrorToQmateErrorMessage(error, "fill");
        throw new Error(errorMessage);
      } else {
        if (!value) {
          throw new Error("Function 'fill' failed: Please provide a value as second argument: " + error);
        } else {
          throw error;
        }
      }
    }
  };

  /**
   * @function fillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input, retries in case of a failure.
   * @param {Object} element - The element.
   * @param {String} value - The value to be filled.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example const elem = await nonUi5.element.getElementById("input01");
   * await nonUi5.userInteraction.fillAndRetry(elem, "Service 01");
   */
  this.fillAndRetry = async function (element, value, retries, interval) {
    if (!value) {
      common.console.error("Function 'fillAndRetry' failed: Please provide a value as second argument.");
    }
    return common.function.retry(this.fill, [element, value], retries, interval, this);
  };

};
module.exports = new UserInteraction();