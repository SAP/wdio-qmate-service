"use strict";

import { Element } from "../../../../@types/wdio";
import { AlignmentOptions, AlignmentValues } from "../types";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import elementHighlight from "../../helper/elementHighlight";
import { resolveCssSelectorOrElement } from "../../helper/elementResolving";
import { validateValue } from "../../helper/inputValidation";

/**
 * @class userInteraction
 * @memberof nonUi5
 */
export class UserInteraction {
  private vlf = new VerboseLoggerFactory("nonUi5", "userInteraction");
  private ErrorHandler = new ErrorHandler();

  // =================================== CLICK ===================================
  /**
   * @function click
   * @memberOf nonUi5.userInteraction
   * @description Clicks on the passed element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.click(elem);
   */
  async click(elementOrSelector: Element | string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.click);
    const highlightConfig = await elementHighlight.getElementHighlightData("click");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log("Expecting element to be displayed and enabled");
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

      vl.log("Clicking the element");
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.click();
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clicks on the passed element, retries in case it fails.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.clickAndRetry(elem);
   */
  async clickAndRetry(elementOrSelector: Element | string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, retries = 3, interval = 5000) {
    const vl = this.vlf.initLog(this.click);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log("Clicking the element");
      return await util.function.retry(this.click, [element, timeout], retries, interval, this);
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function doubleClick
   * @memberOf nonUi5.userInteraction
   * @description Double Clicks on the passed element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.doubleClick(elem);
   */
  async doubleClick(elementOrSelector: Element | string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.doubleClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("doubleClick");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log("Expecting element to be displayed and enabled");
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

      vl.log("Clicking the element");
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.doubleClick();
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function rightClick
   * @memberOf nonUi5.userInteraction
   * @description Right Clicks on the passed element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.rightClick(elem);
   */
  async rightClick(elementOrSelector: Element | string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.rightClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("rightClick");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log("Expecting element to be displayed and enabled");
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

      vl.log("Clicking the element");
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.click({
        button: "right"
      });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  // =================================== CHECK ===================================
  /**
   * @function check
   * @memberOf nonUi5.userInteraction
   * @description Checks the given checkbox.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @example await nonUi5.userInteraction.check(selector);
   */
  async check(elementOrSelector: Element | string) {
    const vl = this.vlf.initLog(this.check);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      const isSelected: boolean = await nonUi5.element.isSelected(element);
      if (!isSelected) {
        await this.click(element);
      } else {
        vl.log("Checkbox already selected.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function uncheck
   * @memberOf nonUi5.userInteraction
   * @description Unchecks the given checkbox.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @example await nonUi5.userInteraction.uncheck(selector);
   */
  async uncheck(elementOrSelector: Element | string) {
    const vl = this.vlf.initLog(this.check);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      const isSelected: boolean = await nonUi5.element.isSelected(element);
      if (isSelected) {
        await this.click(element);
      } else {
        vl.log("Checkbox already unchecked.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  // =================================== FILL ===================================
  /**
   * @function fill
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String |  Number} value - The value to enter.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.fill(elem, "Service 01");
   */
  async fill(elementOrSelector: Element | string, value: string | number) {
    const vl = this.vlf.initLog(this.fill);
    const highlightConfig = await elementHighlight.getElementHighlightData("fill");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      validateValue(value);

      vl.log(`Setting the value of element to ${value}`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.setValue(value);
    } catch (error) {
      this.ErrorHandler.logException(new Error(), (error as Error).message);
    }
  }

  /**
   * @function fillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input, retries in case of a failure.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String | Number} value - The value to enter.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.fillAndRetry(elem, "Service 01");
   */
  async fillAndRetry(elementOrSelector: Element | string, value: string | number, retries: number = 3, interval: number = 5000) {
    const vl = this.vlf.initLog(this.fillAndRetry);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      validateValue(value);

      vl.log(`Setting the value of element to ${value}`);
      return util.function.retry(this.fill, [element, value], retries, interval, this);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  // =================================== CLEAR ===================================
  /**
   * @function clear
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clear(elem);
   */
  async clear(elementOrSelector: Element | string) {
    const vl = this.vlf.initLog(this.clear);
    const highlightConfig = await elementHighlight.getElementHighlightData("clear");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log(`Clearing the value of element`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      return element.clearValue();
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clearAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input element, retries in case of a failure.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const elem = await nonUi5.element.getById("input01", 10000);
   * await nonUi5.userInteraction.clearAndRetry(elem);
   */
  async clearAndRetry(elementOrSelector: Element | string, retries = 3, interval = 5000) {
    const vl = this.vlf.initLog(this.clearAndRetry);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log(`Clearing the value of element`);
      return await util.function.retry(this.clear, [element], retries, interval, this);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clearAndFill
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String | Number} value - The value to enter in.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clearAndFill(elem, "Service 01");
   */
  async clearAndFill(elementOrSelector: Element | string, value: string | number) {
    const vl = this.vlf.initLog(this.clearAndFill);
    const highlightConfig = await elementHighlight.getElementHighlightData("clearAndFill");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      validateValue(value);

      await this.clear(element);

      vl.log(`Setting the value of element to ${value}`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.setValue(value);
    } catch (error) {
      this.ErrorHandler.logException(new Error(), (error as Error).message);
    }
  }

  /**
   * @function clearAndFillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input, retries in case it fails.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String | Number} value - The value to enter in.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @param {Boolean} [verify=true] - Specifies if the filled value should be verified.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clearAndFillAndRetry(elem, "Service 01");
   */
  async clearAndFillAndRetry(elementOrSelector: Element | string, value: string | number, retries: number = 3, interval: number = 5000, verify: boolean = true) {
    const vl = this.vlf.initLog(this.clearAndFillAndRetry);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      validateValue(value);

      return await util.function.retry(
        async (elem: Element, value: string) => {
          await this.clearAndFill(elem, value);

          if (verify) {
            const elemValue = await elem.getValue();
            if (elemValue != value) throw new Error("Verification of value failed.");
          }
        },
        [element, value],
        retries,
        interval,
        this
      );
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  // =================================== OTHERS ===================================
  /**
   * @function mouseOverElement
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor/focus to the passed element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [xOffset] - X offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @param {Number} [yOffset] - Y offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @example const elem = await nonUi5.element.getById("dropdown42");
   * await nonUi5.userInteraction.mouseOverElement(elem);
   */
  async mouseOverElement(elementOrSelector: Element | string, xOffset: number, yOffset: number) {
    const vl = this.vlf.initLog(this.mouseOverElement);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      vl.log("Moving mouse to element");
      await element.moveTo({ xOffset, yOffset });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function scrollToElement
   * @memberOf nonUi5.userInteraction
   * @description Scrolls an element into view.
   * @param {Element} elem - The target element to scroll to.
   * @param {String | Object} [alignment="center"] - The alignment option for scrolling.
   *   Can be one of: "start", "center", "end", "nearest", or an object with properties:
   *   - block: Vertical alignment ("start", "center", "end", "nearest").
   *   - inline: Horizontal alignment ("start", "center", "end", "nearest").
   *
   * @example
   * // Scroll to element with center alignment.
   * const elem = await nonUi5.userInteraction.getElementById("footer01");
   * await nonUi5.userInteraction.scrollToElement(elem, "center");
   *
   * @example
   * // Scroll to element with custom alignment.
   * const elem = await nonUi5.userInteraction.getElementById("footer01");
   * const alignment = {
   *   block: "start",
   *   inline: "center"
   * };
   * await nonUi5.userInteraction.scrollToElement(elem, alignment);
   */

  async scrollToElement(elementOrSelector: Element | string, alignment: AlignmentOptions | AlignmentValues = "center") {
    const vl = this.vlf.initLog(this.scrollToElement);
    let options = {};

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      if (typeof alignment === "string") {
        options = {
          block: alignment,
          inline: alignment
        };
      } else if (typeof alignment === "object") {
        options = alignment;
      }
      vl.log("Scrolling to element");
      await element.scrollIntoView(options);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function dragAndDrop
   * @memberOf nonUi5.userInteraction
   * @description Drags and drops the given element to the given target element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Object} targetElem - The target element to drop the element.
   * @example const elem = await nonUi5.element.getById("drag01");
   * @example const targetElem = await nonUi5.element.getById("drop02");
   * await nonUi5.userInteraction.dragAndDrop(elem, targetElem);
   */
  async dragAndDrop(elementOrSelector: Element | string, targetElem: Element) {
    const vl = this.vlf.initLog(this.dragAndDrop);

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      const sourceSize = await element.getSize();
      const targetSize = await targetElem.getSize();
      const sourceLocation = await element.getLocation();
      const targetLocation = await targetElem.getLocation();

      // Get centers of elements to move from center to center (e.g. to avoid errors in rounded elements)
      const sourceCenterLocation = {
        x: +Number(sourceSize.width / 2).toFixed(0) + +Number(sourceLocation.x).toFixed(0) + 1,
        y: +Number(sourceSize.height / 2).toFixed(0) + +Number(sourceLocation.y).toFixed(0) + 1
      };

      const targetCenterLocation = {
        x: +Number(targetSize.width / 2).toFixed(0) + +Number(targetLocation.x).toFixed(0) + 1,
        y: +Number(targetSize.height / 2).toFixed(0) + +Number(targetLocation.y).toFixed(0) + 1
      };

      await browser
        .action("pointer")
        .move({ duration: 0, x: sourceCenterLocation.x, y: sourceCenterLocation.y })
        .down({ button: 0 }) //left button
        .move({ duration: 0, x: targetCenterLocation.x, y: targetCenterLocation.y })
        .down({ button: 0 }) //left button
        .perform();
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function moveCursorAndClick
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor to the target element and clicks on it. Can be used for charts.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @example const elem = await nonUi5.element.getById("chartPartToClick");
   * await nonUi5.userInteraction.moveCursorAndClick(elem);
   */
  async moveCursorAndClick(elementOrSelector: Element | string) {
    const vl = this.vlf.initLog(this.moveCursorAndClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("moveCursorAndClick");

    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      await element.moveTo();
      await element.click();
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickElementInSvg
   * @memberOf nonUi5.userInteraction
   * @description Clicks on an inner element within a SVG element.
   * @param {Object | string} elementOrSelector - The SVG element or CSS selector describing the element.
   * @param {String} innerSelector - The CSS selector describing the inner element to be clicked.
   * @example const svgElem = await nonUi5.element.getByCss("svg");
   * const innerSelector = "circle:nth-child(6)";
   * await nonUi5.userInteraction.clickElementInSvg(svgElem, innerSelector);
   */
  async clickElementInSvg(elementOrSelector: Element | string, innerSelector: string) {
    const vl = this.vlf.initLog(this.clickElementInSvg);

    try {
      const svgElem = await resolveCssSelectorOrElement(elementOrSelector);

      const innerElem = await $(innerSelector);

      const svgPos = await svgElem.getLocation();
      const innerPos = await innerElem.getLocation();

      const svgSize = await svgElem.getSize();
      const innerSize = await innerElem.getSize();

      const diffX = innerPos.x - svgPos.x;
      const diffY = innerPos.y - svgPos.y;

      const centerOffsetX = -(svgSize.width / 2) + diffX + innerSize.width / 2;
      const centerOffsetY = -(svgSize.height / 2) + diffY + innerSize.height / 2;

      // @ts-ignore
      await svgElem.click({ x: parseInt(centerOffsetX), y: parseInt(centerOffsetY) });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new UserInteraction();
