/* eslint-disable no-console */
/**
 * @class userInteraction
 * @memberof non_ui5.common
 */
const UserInteraction = function () {

  //----------------------------------- MOUSE ----------------------------------
  /**
   * @function click
   * @memberOf non_ui5.common.userInteraction
   * @description Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Integer} timeout=30000 - The timeout to wait (default value: 30 sec).
   * @example let elem = await non_ui5.common.locator.getElementById("button01", 10000);
   * await non_ui5.common.userInteraction.click(elem);
   */
  this.click = async function (element, timeout = 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.click();
    } catch (error) {
      const errorMessage = await utilities.function.mapWdioErrorToQmateErrorMessage(error, "click");
      throw new Error(errorMessage);
    }
  };


  /**
   * @function clickAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Clicks on the passed element, retries in case it fails.
   * @param {Object} element - The element.
   * @param {Integer} timeout=30000 - The timeout to wait (default value: 30 sec).
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example let elem = await non_ui5.common.locator.getElementById("button01", 10000);
   * await non_ui5.common.userInteraction.clickAndRetry(elem);
   */
  this.clickAndRetry = async function (element, timeout = 30000, retries, interval) {
    return await utilities.function.retry(this.click, [element, timeout], retries, interval, this);
  };

  //---------------------------------- INPUTS ----------------------------------
  /**
   * @function fill
   * @memberOf non_ui5.common.userInteraction
   * @description Fills the passed input.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.fill(elem, "Service 01");
   */
  this.fill = async function (element, value) {
    if (value === null || value === undefined) {
      console.error("fill() - Please provide a value as second parameter");
    }
    try {
      await element.setValue(value);
    } catch (error) {
      if (error.message && error.message.match(new RegExp(/(invalid element state|element not interactable)/))) {
        const errorMessage = await utilities.function.mapWdioErrorToQmateErrorMessage(error, "fill");
        throw new Error(errorMessage);
      } else {
        if (value === undefined) {
          throw new Error("Function fill failed. Please provide a value as second parameter \n\n" + error);
        }
        throw error;
      }
    }
  };

  /**
   * @function fillAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Fills the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.fillAndRetry(elem, "Service 01");
   */
  this.fillAndRetry = async function (element, value, retries, interval) {
    if (value === null || value === undefined) {
      console.error("fillAndRetry() - Please provide a value as second parameter");
    }
    return utilities.function.retry(this.fill, [element, value], retries, interval, this);
  };

  /**
   * @function fillActive
   * @memberOf non_ui5.common.userInteraction
   * @description Fills the active input.
   * @param {String} value - The value with witch the input should be filled.
   * @example await non_ui5.common.userInteraction.fillActive("My Value");
   */
  this.fillActive = async function (value) {
    if (value !== null && value !== undefined) {
      const elem = await $(await browser.getActiveElement());
      return elem.setValue(value);
    }
  };

  /**
   * @function fillActiveAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Fills the active input, retries in case it fails.
   * @param {String} value - The value with witch the input should be filled.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example await non_ui5.common.userInteraction.fillActiveAndRetry("My Value");
   */
  this.fillActiveAndRetry = async function (value, retries, interval) {
    return utilities.function.retry(this.fillActive, [value], retries, interval, this);
  };

  /**
   * @function clear
   * @memberOf non_ui5.common.userInteraction
   * @description Clears the passed input.
   * @param {Object} element - The element.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.clear(elem);
   */
  this.clear = async function (element) {
    if (element === null || element === undefined) {
      throw new Error("Function 'clear' failed. Please provide an element as first parameter");
    }
    return element.clearValue();
  };

  /**
   * @function clearAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Clears the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.clearAndRetry(elem);
   */
  this.clearAndRetry = async function (element, retries, interval) {
    if (element === null || element === undefined) {
      throw new Error("Function 'clearAndRetry' failed. Please provide an element as first parameter");
    }
    return utilities.function.retry(this.clear, [element], retries, interval, this);
  };

  /**
   * @function clearAndFill
   * @memberOf non_ui5.common.userInteraction
   * @description Clears and fills the passed input.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled after clearing it.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.clearAndFill(elem, "Service 01");
   */
  this.clearAndFill = async function (element, value) {
    await this.clear(element);
    if (value !== null && value !== undefined) {
      await element.setValue(value);
    }
  };

  /**
   * @function clearAndFillAndRetry
   * @memberOf non_ui5.common.userInteraction
   * @description Clears and fills the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled after clearing it.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @param {Boolean} verify - Verifies if the value was entered correctly. Default is true.
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   * await non_ui5.common.userInteraction.clearAndFillAndRetry(elem, "Service 01");
   */
  this.clearAndFillAndRetry = async function (element, value, retries, interval, verify = true) {
    return await utilities.function.retry(async (elem, value) => {
      await this.clearAndFill(elem, value);
      if (verify) {
        //Verify that value was entered correctly
        const elemValue = await elem.getValue();
        if (elemValue !== value) throw new Error("Values not entered correctly");
      }
    }, [element, value], retries, interval, this);
  };

  /**
   * @function dragAndDrop
   * @memberOf non_ui5.common.userInteraction
   * @description Drags and drops an element at the target element.
   * @param {Object} element - The element to drag.
   * @param {Object} target - The target element to drop the element.
   * @example let elem = await non_ui5.common.locator.getElementById("drag01");
   * @example let target = await non_ui5.common.locator.getElementById("drop02");
   * await non_ui5.common.userInteraction.dragAndDrop(elem, target);
   */
  this.dragAndDrop = async function (element, target) {
    await element.dragAndDrop(target);
  };

  /**
   * @function clickChartPart
   * @memberOf non_ui5.common.userInteraction
   * @description Clicks on a target element inside a chart area.
   * @param {Object} elem - The element to click inside the chart.
   * @example let elem = await non_ui5.common.locator.getElementById("chartPartToCLick");
   * await non_ui5.common.userInteraction.clickChartPart(elem);
   */
  this.clickChartPart = async function (elem) {
    await elem.moveTo();
    return await elem.click();
  };

  //--------------------------------- KEYBOARD ---------------------------------


};
module.exports = new UserInteraction();