"use strict";

import { Element } from "../../../../@types/wdio";
import { AlignmentValues } from "./constants/userInteraction.constants";

/**
 * @class userInteraction
 * @memberof nonUi5
 */
export class UserInteraction {

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
  async click (element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({ //TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({ //TODO: Reuse of internal functions?
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.click();
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error as Error, "click");
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
  async clickAndRetry (element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, retries = 3, interval = 5000) {
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
  async doubleClick (element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.doubleClick();
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error as Error, "doubleClick");
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
  async rightClick (element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    await Promise.all([
      expect(element).toBeDisplayed({
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
      }),
      expect(element).toBeEnabled({
        wait: timeout,
        interval: 100,
        message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
      })
    ]);
    try {
      await element.click({
        button: "right"
      });
    } catch (error) {
      const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error as Error, "rightClick");
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
  async fill (element: Element, value: string) {
    try {
      await element.setValue(value);
    } catch (error) {
      // @ts-ignore
      if (error.message && error.message.match(new RegExp(/(invalid element state|element not interactable)/))) {
        const errorMessage = await util.function.mapWdioErrorToQmateErrorMessage(error as Error, "fill");
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
  async fillAndRetry (element: Element, value: string, retries: number = 3, interval: number = 5000) {
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
  async clear (element: Element) {
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
  async clearAndRetry (element: Element, retries = 3, interval = 5000) {
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
  async clearAndFill (element: Element, value: string) {
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
  async clearAndFillAndRetry (element: Element, value: string, retries: number = 3, interval: number = 5000, verify: boolean = true) {
    return util.function.retry(async (elem: Element, value: string) => {
      await this.clearAndFill(elem, value);
      if (verify) {
        const elemValue = await elem.getValue();
        if (elemValue != value) throw new Error("Function 'clearAndFillAndRetry' failed. Verification of value failed.");
      }
    }, [element, value], retries, interval, this);
  };


  // =================================== OTHERS ===================================
  /**
   * @function mouseOverElement
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor/focus to the passed element.
   * @param {Object} element - The selector describing the element.
   * @param {Number} [xOffset] - X offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @param {Number} [yOffset] - Y offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @example const elem = await nonUi5.element.getById("dropdown42");
   * await nonUi5.userInteraction.mouseOverElement(elem);
   */
   async mouseOverElement (elem: Element, xOffset: number, yOffset: number) {
    try {
      await elem.moveTo({ xOffset, yOffset });
    } catch (error) {
      // @ts-ignore
      throw new Error("Function: 'mouseOverElement' failed: ", error);
    }
  };

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
  async scrollToElement (elem: Element, alignment: AlignmentValues = AlignmentValues.CENTER) {
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
  async dragAndDrop (element: Element, targetElem: Element) {
    // await element.dragAndDrop(targetElem);

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
  async moveCursorAndClick (element: Element) {
    await element.moveTo();
    await element.click();
  };

  /**
   * @function clickElementInSvg
   * @memberOf nonUi5.userInteraction
   * @description Clicks on an inner element within a SVG element.
   * @param {Object} svgElem - The SVG element.
   * @param {String} innerSelector - The CSS selector describing the inner element to be clicked.
   * @example const svgElem = await nonUi5.element.getByCss("svg");
   * const innerSelector = "circle:nth-child(6)";
   * await nonUi5.userInteraction.clickElementInSvg(svgElem, innerSelector);
   */
   async clickElementInSvg (svgElem: Element, innerSelector: string) {
    const innerElem = await $(innerSelector);

    const svgPos = await svgElem.getLocation();
    const innerPos = await innerElem.getLocation();

    const svgSize = await svgElem.getSize();
    const innerSize = await innerElem.getSize();

    const diffX = innerPos.x - svgPos.x;
    const diffY = innerPos.y - svgPos.y;

    const centerOffsetX = -(svgSize.width / 2) + diffX + (innerSize.width / 2);
    const centerOffsetY = -(svgSize.height / 2) + diffY + (innerSize.height / 2);

    // @ts-ignore
    await svgElem.click({ x: parseInt(centerOffsetX), y: parseInt(centerOffsetY) });
  };

};
export default new UserInteraction();