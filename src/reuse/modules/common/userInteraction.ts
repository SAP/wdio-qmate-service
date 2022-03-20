"use strict";

import { KeyCodes } from "./constants/userInteraction.constants";

/**
 * @class userInteraction
 * @memberof common 
 */
export class UserInteraction {

  // =================================== FILL ===================================
  /**
   * @function fillActive
   * @memberOf common.userInteraction
   * @description Fills the active input with the given value.
   * @param {String} value - The value with witch the input should be filled.
   * @example await common.userInteraction.fillActive("My Value");
   */
  async fillActive (value: string) {
    try {
      if (value !== null) {
        const elem = await $(await browser.getActiveElement());
        await elem.addValue(value); //TODO: open issue on wdio github for different behavior in terms of the active element of addValue() and setValue()
      } else {
        throw new Error("Function 'fillActive' failed: Please provide a value as argument.");
      }
    } catch (error) {
      // @ts-ignore
      throw new Error("Function 'fillActive' failed: ", error);
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
  async fillActiveAndRetry (value: string, retries: number = 3, interval: number = 5000) {
    await util.function.retry(this.fillActive, [value], retries, interval, this);
  };


  /**
   * @function clearAndFillActive
   * @memberOf common.userInteraction
   * @description Clears and fills the active input.
   * @param {String} value - The value to fill.
   * @example await common.userInteraction.clearAndFillActive("My Value");
   */
  async clearAndFillActive (value: string) {
    if (value !== null) {
      const elem = await $(await browser.getActiveElement());
      await elem.setValue(value);
    } else {
      throw new Error("Function 'clearAndFillActive' failed. Please provide a value as argument.");
    }
  };

  /**
   * @function clearAndFillActiveAndRetry
   * @memberOf common.userInteraction
   * @description CClears and fills the active input. Retries the action in case of a failure.
   * @param {String} value - The value to fill.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example await common.userInteraction.clearAndFillActiveAndRetry("My Value");
   */
  async clearAndFillActiveAndRetry (value: string, retries: number = 3, interval: number = 5000) {
    await util.function.retry(this.clearAndFillActive, [value], retries, interval, this);
  };


  // =================================== KEYS ===================================
  /**
   * @function pressKey
   * @memberOf common.userInteraction
   * @description Performs the specified keypress. Possible values: https://w3c.github.io/webdriver/#keyboard-actions
   * @param {String | String[]} keys - The key or combination of keys to execute.
   * @example await common.userInteraction.pressKey("Enter");
   * @example await common.userInteraction.pressKey("\uE004");
   * @example await common.userInteraction.pressKey(["\uE009", "Alt"]);
   */
  async pressKey (keys: string | string[]) {
    await browser.keys(keys);
  };

  /**
   * @function pressEnter
   * @memberOf common.userInteraction
   * @description Performs the Enter keypress.
   * @example await common.userInteraction.pressEnter();
   */
  async pressEnter () {
    await browser.keys(KeyCodes.ENTER);
  };

  /**
   * @function pressTab
   * @memberOf common.userInteraction
   * @description Performs the Tab keypress.
   * @example await common.userInteraction.pressTab();
   */
  async pressTab () {
    await browser.keys(KeyCodes.TAB);
  };

  /**
   * @function pressF4
   * @memberOf common.userInteraction
   * @description Performs the F4 keypress.
   * @example await common.userInteraction.pressF4();
   */
  async pressF4 () {
    await browser.keys(KeyCodes.F4);
  };

  /**
   * @function pressBackspace
   * @memberOf common.userInteraction
   * @description Performs the Backspace keypress.
   * @example await common.userInteraction.pressBackspace();
   */
  async pressBackspace () {
    await browser.keys(KeyCodes.BACKSPACE);
  };

  /**
   * @function pressEscape
   * @memberOf common.userInteraction
   
   * @description Performs the Escape keypress.
   * @example await common.userInteraction.pressEscape();
   */
  async pressEscape () {
    await browser.keys(KeyCodes.ESCAPE);
  };

  /**
   * @function pressArrowLeft
   * @memberOf common.userInteraction
   * @description Performs the Arrow Left keypress.
   * @example await common.userInteraction.pressArrowLeft();
   */
  async pressArrowLeft () {
    await browser.keys(KeyCodes.ARROW_LEFT);
  };

  /**
   * @function pressArrowRight
   * @memberOf common.userInteraction
   * @description Performs the Arrow Right keypress.
   * @example await common.userInteraction.pressArrowRight();
   */
  async pressArrowRight () {
    await browser.keys(KeyCodes.ARROW_RIGHT);
  };

};
export default new UserInteraction();