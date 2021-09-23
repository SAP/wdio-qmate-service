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
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "click"); //@TODO: Rename function since it is confusing.
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
    if (!element) {
      throw new Error("Function 'clearAndRetry' failed. Please provide an element as first argument.");
    }
    return util.function.retry(this.click, [element, timeout], retries, interval, this);
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
        const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "fill");
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
    if (!element || (value === null || value === undefined || value === "")) {
      throw new Error("Function 'fillAndRetry' failed: Please provide an element and value as arguments.");
    } else {
      return util.function.retry(this.fill, [element, value], retries, interval, this);
    }
  };


  // =================================== CLEAR ===================================
  /**
   * @function clear
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input element.
   * @param {Object} element - The element.
   * @example const elem = await non_ui5.common.locator.getElementById("input01");
   * await nonUi5.userInteraction.clear(elem);
   */
  this.clear = async function (element) {
    if (!element) {
      throw new Error("Function 'clear' failed: Please provide an element as first argument.");
    }
    return element.clearValue();
  };

  /**
   * @function clearAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Clears the passed input element, retries in case of a failure.
   * @param {Object} element - The element.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example const elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.clearAndRetry(elem);
   */
  this.clearAndRetry = async function (element, retries = 3, interval = 5000) {
    if (!element) {
      throw new Error("Function 'clearAndRetry' failed: Please provide an element as first argument.");
    }
    return util.function.retry(this.clear, [element], retries, interval, this);
  };

  /**
   * @function clearAndFill
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input element.
   * @param {Object} element - The element.
   * @param {String} value - The value to be filled in.
   * @example const elem = await nonUi5.element.getElementById("input01");
   * await nonUi5.userInteraction.clearAndFill(elem, "Service 01");
   */
  this.clearAndFill = async function (element, value) {
    //arg. 'value' needs to be checked in case of numeric values. E.g.: 0 or 1 will be handled as boolean value in if.
    if (!element || (value === null || value === undefined || value === "")) {
      throw new Error("Function 'clearAndFill' failed: Please provide an element and value as arguments.");
    } else {
      try {
        await this.clear(element);
        await element.setValue(value);
      } catch (error) {
        throw new Error(`Function 'clearAndFill' failed: ${error}`);
      }

    }

  };

  /**
   * @function clearAndFillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {String} value - The value to be filled in.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @param {Boolean} [verify=true] - Specifies if the filled value should be verified.
   * @example const elem = await nonUi5.element.getElementById("input01");
   * await nonUi5.userInteraction.clearAndFillAndRetry(elem, "Service 01");
   */
  this.clearAndFillAndRetry = async function (element, value, retries = 3, interval = 5000, verify = true) {
    return util.function.retry(async (elem, value) => {
      await this.clearAndFill(elem, value);
      if (verify) {
        const elemValue = await elem.getValue();
        if (elemValue != value) throw new Error("Function 'clearAndFillAndRetry' failed. Verification of value failed.");
      }
    }, [element, value], retries, interval, this);
  };


  // =================================== OTHERS ===================================
  /**
   * @function dragAndDrop
   * @memberOf nonUi5.userInteraction
   * @description Drags and drops the given element to the given target element.
   * @param {Object} element - The element to drag.
   * @param {Object} targetElem - The target element to drop the element.
   * @example const elem = await nonUi5.element.getElementById("drag01");
   * @example const targetElem = await nonUi5.element.getElementById("drop02");
   * await nonUi5.userInteraction.dragAndDrop(elem, targetElem);
   */
  this.dragAndDrop = async function (element, targetElem) {
    await element.dragAndDrop(targetElem);
  };

  // TODO: is this common or bo reuse?
  /**
   * @function clickChartPart
   * @memberOf nonUi5.userInteraction
   * @description Clicks on a target element inside a chart area.
   * @param {Object} element - The element to click inside the chart.
   * @example const elem = await nonUi5.element.getElementById("chartPartToCLick");
   * await nonUi5.userInteraction.clickChartPart(elem);
   */
  this.clickChartPart = async function (element) {
    await element.moveTo();
    await element.click();
  };

};
module.exports = new UserInteraction();