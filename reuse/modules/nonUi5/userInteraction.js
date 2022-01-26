"use strict";
/**
 * @class userInteraction
 * @memberof nonUi5
 */
const UserInteraction = function () {

  // =================================== CLICK ===================================
  /**
   * @function click
   * @memberOf nonUi5.userInteraction
   * @description Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.click(elem);
   */
  this.click = async function (element, timeout = browser.config.params.qmateCustomTimeout | 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({ //TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({ //TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.click();
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "click");
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
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.clickAndRetry(elem);
   */
  this.clickAndRetry = async function (element, timeout = browser.config.params.qmateCustomTimeout | 30000, retries = 3, interval = 5000) {
    if (!element) {
      throw new Error("Function 'clearAndRetry' failed. Please provide an element as first argument.");
    }
    return util.function.retry(this.click, [element, timeout], retries, interval, this);
  };

  /**
   * @function doubleClick
   * @memberOf nonUi5.userInteraction
   * @description Double Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.doubleClick(elem);
   */
  this.doubleClick = async function (element, timeout = browser.config.params.qmateCustomTimeout | 30000) {
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
      await element.doubleClick();
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "doubleClick");
      throw new Error(errorMessage);
    }
  };

  /**
   * @function rightClick
   * @memberOf nonUi5.userInteraction
   * @description Right Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.rightClick(elem);
   */
  this.rightClick = async function (element, timeout = browser.config.params.qmateCustomTimeout | 30000) {
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
      await element.click({
        button: "right"
      });
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error, "rightClick");
      throw new Error(errorMessage);
    }
  };


  // =================================== FILL ===================================
  /**
   * @function fill
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input.
   * @param {Object} element - The element.
   * @param {String} value - The value to be filled.
   * @example const elem = await nonUi5.element.getById("input01");
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
   * @example const elem = await nonUi5.element.getById("input01");
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
   * @example const elem = await nonUi5.element.getById("input01");
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
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input element, retries in case of a failure.
   * @param {Object} element - The element.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const elem = await nonUi5.element.getById("input01", 10000);
   * await nonUi5.userInteraction.clearAndRetry(elem);
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
   * @example const elem = await nonUi5.element.getById("input01");
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
   * @example const elem = await nonUi5.element.getById("input01");
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
   * @function scrollToElement
   * @memberOf nonUi5.userInteraction
   * @description Scrolls to the passed element to get it into view.
   * @param {Object} elem - The element.
   * @param {String} alignment="center" - Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest".
   * Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up'
   * @example const elem = await nonUi5.userInteraction.getElementById("footer01");
   * await nonUi5.userInteraction.scrollToElement(elem);
   */
  this.scrollToElement = async function (elem, alignment = "center") {
    const options = {
      "block": alignment,
      "inline": alignment
    };
    await elem.scrollIntoView(options);
  };

  /**
   * @function dragAndDrop
   * @memberOf nonUi5.userInteraction
   * @description Drags and drops the given element to the given target element.
   * @param {Object} element - The element to drag.
   * @param {Object} targetElem - The target element to drop the element.
   * @example const elem = await nonUi5.element.getById("drag01");
   * @example const targetElem = await nonUi5.element.getById("drop02");
   * await nonUi5.userInteraction.dragAndDrop(elem, targetElem);
   */
  this.dragAndDrop = async function (element, targetElem) {
    // await element.dragAndDrop(targetElem);

    // https://stackoverflow.com/questions/60378820/drag-and-drop-with-webdriver-io
    const sourceSize = await element.getSize();
    const targetSize = await targetElem.getSize();
    const sourceLocation = await element.getLocation();
    const targetLocation = await targetElem.getLocation();

    // Get centers of elements to move from center to center (e.g. to avoid errors in rounded elements)
    const sourceCenterLocation = {
      x: +Number(sourceSize.width/2).toFixed(0) + +Number(sourceLocation.x).toFixed(0) + 1,
      y: +Number(sourceSize.height/2).toFixed(0) + +Number(sourceLocation.y).toFixed(0) + 1
    };

    const targetCenterLocation = {
      x: +Number(targetSize.width/2).toFixed(0) + +Number(targetLocation.x).toFixed(0) + 1,
      y: +Number(targetSize.height/2).toFixed(0) + +Number(targetLocation.y).toFixed(0) + 1
    };

    await browser.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "mouse" },
        actions: [
          { type: "pointerMove", duration: 0, x: sourceCenterLocation.x, y: sourceCenterLocation.y},
          { type: "pointerDown", button: 0 },
          { type: "pointerMove", duration: 0, x: targetCenterLocation.x, y: targetCenterLocation.y},
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  };

  /**
   * @function moveCursorAndClick
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor to the target element and clicks on it. Can be used for charts.
   * @param {Object} element - The element to be clicked.
   * @example const elem = await nonUi5.element.getById("chartPartToClick");
   * await nonUi5.userInteraction.moveCursorAndClick(elem);
   */
  this.moveCursorAndClick = async function (element) {
    await element.moveTo();
    await element.click();
  };

};
module.exports = new UserInteraction();