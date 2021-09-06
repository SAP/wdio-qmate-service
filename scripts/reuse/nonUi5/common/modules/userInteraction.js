/* eslint-disable no-console */
/**
 * @class userInteraction
 * @memberof non_ui5.common
 */
const UserInteraction = function () {

  



  //---------------------------------- INPUTS ----------------------------------
 

 

  



  /**
   * @function clearAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example let elem = await nonUi5.element.getElementById("input01", 10000);
   * await nonUi5.userInteraction.clearAndRetry(elem);
   */
  this.clearAndRetry = async function (element, retries, interval) {
    if (element === null || element === undefined) {
      throw new Error("Function 'clearAndRetry' failed. Please provide an element as first parameter");
    }
    return utilities.function.retry(this.clear, [element], retries, interval, this);
  };

  /**
   * @function clearAndFill
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled after clearing it.
   * @example let elem = await nonUi5.element.getElementById("input01", 10000);
   * await nonUi5.userInteraction.clearAndFill(elem, "Service 01");
   */
  this.clearAndFill = async function (element, value) {
    await this.clear(element);
    if (value !== null && value !== undefined) {
      await element.setValue(value);
    }
  };

  /**
   * @function clearAndFillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {String} value - The value with witch the input should be filled after clearing it.
   * @param {Integer} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Integer} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @param {Boolean} verify - Verifies if the value was entered correctly. Default is true.
   * @example let elem = await nonUi5.element.getElementById("input01", 10000);
   * await nonUi5.userInteraction.clearAndFillAndRetry(elem, "Service 01");
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
   * @memberOf nonUi5.userInteraction
   * @description Drags and drops an element at the target element.
   * @param {Object} element - The element to drag.
   * @param {Object} target - The target element to drop the element.
   * @example let elem = await nonUi5.element.getElementById("drag01");
   * @example let target = await nonUi5.element.getElementById("drop02");
   * await nonUi5.userInteraction.dragAndDrop(elem, target);
   */
  this.dragAndDrop = async function (element, target) {
    await element.dragAndDrop(target);
  };

  /**
   * @function clickChartPart
   * @memberOf nonUi5.userInteraction
   * @description Clicks on a target element inside a chart area.
   * @param {Object} elem - The element to click inside the chart.
   * @example let elem = await nonUi5.element.getElementById("chartPartToCLick");
   * await nonUi5.userInteraction.clickChartPart(elem);
   */
  this.clickChartPart = async function (elem) {
    await elem.moveTo();
    return await elem.click();
  };

  //--------------------------------- KEYBOARD ---------------------------------


};
module.exports = new UserInteraction();