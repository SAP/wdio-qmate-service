const UserInteraction = function () {

  // =================================== KEYS ===================================
  /**
   * @function pressEnter
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Enter keypress.
   * @example await ui5.userInteraction.pressEnter();
   */
  this.pressEnter = async function () {
    await browser.keys("\uE007");
  };

  /**
   * @function pressTab
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Tab keypress.
   * @example await ui5.userInteraction.pressTab();
   */
  this.pressTab = async function () {
    await browser.keys("\uE004");
  };

  /**
   * @function pressF4
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the F4 keypress.
   * @example await ui5.userInteraction.pressF4();
   */
  this.pressF4 = async function () {
    await browser.keys("\uE034");
  };

  /**
   * @function pressBackspace
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Backspace keypress.
   * @example await ui5.userInteraction.pressBackspace();
   */
  this.pressBackspace = async function () {
    await browser.keys("\uE003");
  };

  /**
   * @function pressEscape
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Escape keypress.
   * @example await ui5.userInteraction.pressEscape();
   */
  this.pressEscape = async function () {
    await browser.keys("\uE00C");
  };

  /**
   * @function pressArrowLeft
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Arrow Left keypress.
   * @example await ui5.userInteraction.pressArrowLeft();
   */
  this.pressArrowLeft = async function () {
    await browser.keys("\uE012");
  };

  /**
   * @function pressArrowRight
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs the Arrow Right keypress.
   * @example await ui5.userInteraction.pressArrowRight();
   */
  this.pressArrowRight = async function () {
    await browser.keys("\uE014");
  };

  /**
   * @function selectAll
   * @memberOf ui5.common.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Performs "select all" (ctrl + a) at the element with the given selector.
   * @param {Object} [selector] - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector, in case there are more than
   * one elements visible at the same time. 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.userInteraction.selectAll(selector);
   */
  this.selectAll = async function (selector, index = 0, timeout = 30000) {
    if (selector !== undefined) {
      await this.click(selector, index, timeout);
    } else {
      utilities.console.info("Selector properties are undefined. Action will be performed on current element.");
    }
    await browser.keys(["\uE051", "a"]);
  };


  // =================================== FILL ===================================
  /**
   * @function fillActive
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Enters the given value to the active input field.
   * @param {String} value - The value to enter.
   * @example await ui5.userInteraction.fillActive("My Value");
   */
  this.fillActive = async function (value) {
    if (value) {
      const elem = await $(await browser.getActiveElement());
      await elem.addValue(value);
      return elem; //TODO is this needed?
    } else {
      throw new Error("Function 'fillActive' failed. Please provide a value as argument.");
    }
  };

  /**
   * @function fillActiveAndRetry
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Enters the given value to the active input field and retries the action in case it fails.
   * @param {String} value - The value with witch the input should be filled.
   * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
   * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
   * @example await ui5.userInteraction.fillActiveAndRetry("My Value");
   */
  this.fillActiveAndRetry = async function (value, retries, interval) {
    await utilities.function.retry(this.fillActive, [value], retries, interval, this);
  };

  /**
   * @function clearAndFillActive
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the active input.
   * @param {String} value - The value to enter.
   * @example await ui5.userInteraction.clearAndFillActive("My Value");
   */
  this.clearAndFillActive = async function (value) {
    if (value !== null) {
      const elem = await $(await browser.getActiveElement());
      await elem.clearValue();
      await elem.setValue(value);
    } else {
      throw new Error("Function 'clearAndFillActive' failed. Please provide a value as argument.");
    }
  };

  /**
   * @function clearFillActiveAndRetry
   * @memberOf ui5.userInteraction
   * @memberOf nonUi5.userInteraction
   * @description CClears and fills the active input. Retries the action in case of a failure.
   * @param {String} value - The value to enter.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await ui5.userInteraction.clearFillActiveAndRetry("My Value");
   */
  this.clearFillActiveAndRetry = async function (value, retries = 3, interval = 5000) {
    await utilities.function.retry(this.clearAndFillActive, [value], retries, interval, this);
  };


};
module.exports = new UserInteraction();