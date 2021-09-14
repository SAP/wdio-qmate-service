/**
 * @class userInteraction
 * @memberof common 
 */
const UserInteraction = function () {

  // =================================== FILL ===================================
  /**
   * @function fillActive
   * @memberOf common.userInteraction
   * @description Fills the active input with the given value.
   * @param {String} value - The value with witch the input should be filled.
   * @example await common.userInteraction.fillActive("My Value");
   */
  this.fillActive = async function (value) {
    if (value !== null) {
      const elem = await $(await browser.getActiveElement());
      return elem.setValue(value);
      // await elem.addValue(value); // @TODO: which is right
    } else {
      throw new Error("Function 'fillActive' failed: Please provide a value as argument.");
    }
  };

  /**
   * @function fillActiveAndRetry
   * @memberOf common.userInteraction
   * @description Enters the given value to the active input field and retries the action in case it fails.
   * @param {String} value - The value with witch the input should be filled.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals. 
   * @example await common.userInteraction.fillActiveAndRetry("My Value");
   */
  this.fillActiveAndRetry = async function (value, retries = 3, interval = 5000) {
    await util.function.retry(this.fillActive, [value], retries, interval, this);
  };


  /**
   * @function clearAndFillActive
   * @memberOf common.userInteraction
   * @description Clears and fills the active input.
   * @param {String} value - The value to enter.
   * @example await common.userInteraction.clearAndFillActive("My Value");
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
   * @memberOf common.userInteraction
   * @description CClears and fills the active input. Retries the action in case of a failure.
   * @param {String} value - The value to enter.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await common.userInteraction.clearFillActiveAndRetry("My Value");
   */
  this.clearFillActiveAndRetry = async function (value, retries = 3, interval = 5000) {
    await util.function.retry(this.clearAndFillActive, [value], retries, interval, this);
  };


  // =================================== KEYS ===================================
  /**
   * @function pressEnter
   * @memberOf common.userInteraction
   * @description Performs the Enter keypress.
   * @example await common.userInteraction.pressEnter();
   */
  this.pressEnter = async function () {
    await browser.keys("\uE007");
  };

  /**
   * @function pressTab
   * @memberOf common.userInteraction
   * @description Performs the Tab keypress.
   * @example await common.userInteraction.pressTab();
   */
  this.pressTab = async function () {
    await browser.keys("\uE004");
  };

  /**
   * @function pressF4
   * @memberOf common.userInteraction
   * @description Performs the F4 keypress.
   * @example await common.userInteraction.pressF4();
   */
  this.pressF4 = async function () {
    await browser.keys("\uE034");
  };

  /**
   * @function pressBackspace
   * @memberOf common.userInteraction
   * @description Performs the Backspace keypress.
   * @example await common.userInteraction.pressBackspace();
   */
  this.pressBackspace = async function () {
    await browser.keys("\uE003");
  };

  /**
   * @function pressEscape
   * @memberOf common.userInteraction
   
   * @description Performs the Escape keypress.
   * @example await common.userInteraction.pressEscape();
   */
  this.pressEscape = async function () {
    await browser.keys("\uE00C");
  };

  /**
   * @function pressArrowLeft
   * @memberOf common.userInteraction
   * @description Performs the Arrow Left keypress.
   * @example await common.userInteraction.pressArrowLeft();
   */
  this.pressArrowLeft = async function () {
    await browser.keys("\uE012");
  };

  /**
   * @function pressArrowRight
   * @memberOf common.userInteraction
   * @description Performs the Arrow Right keypress.
   * @example await common.userInteraction.pressArrowRight();
   */
  this.pressArrowRight = async function () {
    await browser.keys("\uE014");
  };

};
module.exports = new UserInteraction();