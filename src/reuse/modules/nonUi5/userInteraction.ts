"use strict";

import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import elementHighlight from "../../helper/elementHighlight";
import { AlignmentOptions, AlignmentValues } from "../../helper/types";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class userInteraction
 * @memberof nonUi5
 */
export class UserInteraction {
  private vlf = new VerboseLoggerFactory("nonUi5", "userInteraction");
  private errorHandler = new ErrorHandler();

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
  async click(element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.click);
    const highlightConfig = await elementHighlight.getElementHighlightData("click");

    try {
      this._verifyElement(element);

      vl.log("Expecting element to be displayed and enabled");
      await Promise.all([
        expect(element).toBeDisplayed({
          //TODO: Reuse of internal functions?
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
        }),
        expect(element).toBeEnabled({
          //TODO: Reuse of internal functions?
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        })
      ]);

      vl.log("Clicking the element");
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.click();
    } catch (error) {
      this.errorHandler.logException(error)
      //this._throwErrorForFunction("click", error);
    }
  }

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
  async clickAndRetry(element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, retries = 3, interval = 5000) {
    const vl = this.vlf.initLog(this.click);

    try {
      this._verifyElement(element);

      vl.log("Clicking the element");
      return util.function.retry(this.click, [element, timeout], retries, interval, this);
    } catch (error) {
      this._throwErrorForFunction("clickAndRetry", error);
    }
  }

  /**
   * @function doubleClick
   * @memberOf nonUi5.userInteraction
   * @description Double Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.doubleClick(elem);
   */
  async doubleClick(element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.doubleClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("doubleClick");

    try {
      this._verifyElement(element);

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
      this._throwErrorForFunction("doubleClick", error);
    }
  }

  /**
   * @function rightClick
   * @memberOf nonUi5.userInteraction
   * @description Right Clicks on the passed element.
   * @param {Object} element - The element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.userInteraction.rightClick(elem);
   */
  async rightClick(element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.rightClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("rightClick");

    try {
      this._verifyElement(element);

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
      this._throwErrorForFunction("rightClick", error);
    }
  }

  // =================================== CHECK ===================================
  /**
   * @function check
   * @memberOf nonUi5.userInteraction
   * @description Checks the given checkbox.
   * @param {Object} element - The element.
   * @example await nonUi5.userInteraction.check(selector);
   */
  async check(element: Element) {
    const vl = this.vlf.initLog(this.check);

    try {
      this._verifyElement(element);

      const isSelected: boolean = await nonUi5.element.isSelected(element);
      if (!isSelected) {
        await this.click(element);
      } else {
        vl.log("Checkbox already selected.");
      }
    } catch (error) {
      this._throwErrorForFunction("check", error);
    }
  }

  /**
   * @function uncheck
   * @memberOf nonUi5.userInteraction
   * @description Unchecks the given checkbox.
   * @param {Object} element - The element.
   * @example await nonUi5.userInteraction.uncheck(selector);
   */
  async uncheck(element: Element) {
    const vl = this.vlf.initLog(this.check);

    try {
      this._verifyElement(element);

      const isSelected: boolean = await nonUi5.element.isSelected(element);
      if (isSelected) {
        await this.click(element);
      } else {
        vl.log("Checkbox already unchecked.");
      }
    } catch (error) {
      this._throwErrorForFunction("uncheck", error);
    }
  }

  // =================================== FILL ===================================
  /**
   * @function fill
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input.
   * @param {Object} element - The element.
   * @param {String |  Number} value - The value to enter.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.fill(elem, "Service 01");
   */
  async fill(element: Element, value: string | number) {
    const vl = this.vlf.initLog(this.fill);
    const highlightConfig = await elementHighlight.getElementHighlightData("fill");

    try {
      this._verifyElement(element);
      this._verifyValue(value);

      vl.log(`Setting the value of element to ${value}`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.setValue(value);
    } catch (error) {
      this._throwErrorForFunction("fill", error);
    }
  }

  /**
   * @function fillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Fills the given value into the passed input, retries in case of a failure.
   * @param {Object} element - The element.
   * @param {String | Number} value - The value to enter.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.fillAndRetry(elem, "Service 01");
   */
  async fillAndRetry(element: Element, value: string | number, retries: number = 3, interval: number = 5000) {
    const vl = this.vlf.initLog(this.fillAndRetry);

    try {
      this._verifyElement(element);
      this._verifyValue(value);

      vl.log(`Setting the value of element to ${value}`);
      return util.function.retry(this.fill, [element, value], retries, interval, this);
    } catch (error) {
      this._throwErrorForFunction("fillAndRetry", error);
    }
  }

  // =================================== CLEAR ===================================
  /**
   * @function clear
   * @memberOf nonUi5.userInteraction
   * @description Clears the passed input element.
   * @param {Object} element - The element.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clear(elem);
   */
  async clear(element: Element) {
    const vl = this.vlf.initLog(this.clear);
    const highlightConfig = await elementHighlight.getElementHighlightData("clear");

    try {
      this._verifyElement(element);

      vl.log(`Clearing the value of element`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      return element.clearValue();
    } catch (error) {
      this._throwErrorForFunction("clear", error);
    }
  }

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
  async clearAndRetry(element: Element, retries = 3, interval = 5000) {
    const vl = this.vlf.initLog(this.clearAndRetry);

    try {
      this._verifyElement(element);

      vl.log(`Clearing the value of element`);
      return util.function.retry(this.clear, [element], retries, interval, this);
    } catch (error) {
      this._throwErrorForFunction("clearAndRetry", error);
    }
  }

  /**
   * @function clearAndFill
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input element.
   * @param {Object} element - The element.
   * @param {String | Number} value - The value to enter in.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clearAndFill(elem, "Service 01");
   */
  async clearAndFill(element: Element, value: string | number) {
    const vl = this.vlf.initLog(this.clearAndFill);
    const highlightConfig = await elementHighlight.getElementHighlightData("clearAndFill");

    try {
      this._verifyElement(element);
      this._verifyValue(value);

      await this.clear(element);

      vl.log(`Setting the value of element to ${value}`);
      if (highlightConfig.enable) await nonUi5.element.highlight(element, highlightConfig.duration, highlightConfig.color);
      await element.setValue(value);
    } catch (error) {
      this._throwErrorForFunction("clearAndFill", error);
    }
  }

  /**
   * @function clearAndFillAndRetry
   * @memberOf nonUi5.userInteraction
   * @description Clears and fills the passed input, retries in case it fails.
   * @param {Object} element - The element.
   * @param {String | Number} value - The value to enter in.
   * @param {Number} [retries=3] - The number of retries, can be set in config for all functions under params stepsRetries.
   * @param {Number} [interval=5000] - The delay between the retries (ms). Can be set in config for all functions under params.stepRetriesIntervals.
   * @param {Boolean} [verify=true] - Specifies if the filled value should be verified.
   * @example const elem = await nonUi5.element.getById("input01");
   * await nonUi5.userInteraction.clearAndFillAndRetry(elem, "Service 01");
   */
  async clearAndFillAndRetry(element: Element, value: string | number, retries: number = 3, interval: number = 5000, verify: boolean = true) {
    const vl = this.vlf.initLog(this.clearAndFillAndRetry);

    try {
      this._verifyElement(element);
      this._verifyValue(value);

      return util.function.retry(
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
      this._throwErrorForFunction("clearAndFillAndRetry", error);
    }
  }

  // =================================== OTHERS ===================================
  /**
   * @function mouseOverElement
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor/focus to the passed element.
   * @param {Object} element - The element.
   * @param {Number} [xOffset] - X offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @param {Number} [yOffset] - Y offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   * @example const elem = await nonUi5.element.getById("dropdown42");
   * await nonUi5.userInteraction.mouseOverElement(elem);
   */
  async mouseOverElement(element: Element, xOffset: number, yOffset: number) {
    const vl = this.vlf.initLog(this.mouseOverElement);

    try {
      this._verifyElement(element);

      vl.log("Moving mouse to element");
      await element.moveTo({ xOffset, yOffset });
    } catch (error) {
      this._throwErrorForFunction("mouseOverElement", error);
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

  async scrollToElement(element: Element, alignment: AlignmentOptions | AlignmentValues = "center") {
    const vl = this.vlf.initLog(this.scrollToElement);
    let options = {};

    try {
      this._verifyElement(element);
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
      this._throwErrorForFunction("scrollToElement", error);
    }
  }

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
  async dragAndDrop(element: Element, targetElem: Element) {
    const vl = this.vlf.initLog(this.dragAndDrop);

    try {
      this._verifyElement(element);

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
      this._throwErrorForFunction("dragAndDrop", error);
    }
  }

  /**
   * @function moveCursorAndClick
   * @memberOf nonUi5.userInteraction
   * @description Moves the cursor to the target element and clicks on it. Can be used for charts.
   * @param {Object} element - The element to be clicked.
   * @example const elem = await nonUi5.element.getById("chartPartToClick");
   * await nonUi5.userInteraction.moveCursorAndClick(elem);
   */
  async moveCursorAndClick(element: Element) {
    const vl = this.vlf.initLog(this.moveCursorAndClick);
    const highlightConfig = await elementHighlight.getElementHighlightData("moveCursorAndClick");

    try {
      this._verifyElement(element);

      await element.moveTo();
      await element.click();
    } catch (error) {
      this._throwErrorForFunction("moveCursorAndClick", error);
    }
  }

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
  async clickElementInSvg(svgElem: Element, innerSelector: string) {
    const vl = this.vlf.initLog(this.clickElementInSvg);

    try {
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
      this._throwErrorForFunction("clickElementInSvg", error);
    }
  }

  // =================================== HELPERS ===================================
  // TODO: move to internal utility classes

  private _throwErrorForFunction(functionName: string, error: unknown | Error): never {
    if (error instanceof Error) {
      if (error.message) {
        throw new Error(`Function '${functionName}' failed with: ${error.message}`);
      } else {
        throw new Error(`Function '${functionName}' failed with ${error.message}`);
      }
    } else {
      throw new Error(`Function '${functionName}' failed with an unknown error.`);
    }
  }

  private _verifyElement(element: any) {
    if (!element) {
      throw new Error("Please provide an element as first argument.");
    }
  }

  private _verifyValue(value: any): void {
    if (typeof value !== "string" && typeof value !== "number") {
      throw new Error("value is invalid. It must be of type 'string' or 'number'");
    }
  }
}
export default new UserInteraction();
