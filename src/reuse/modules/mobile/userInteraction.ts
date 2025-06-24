import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { resolveMobileSelectorOrElement } from "../../helper/elementResolving";
import { GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../constants";

/**
 * @class userInteraction
 * @memberof mobile
 */
export class UserInteraction {
  private vlf = new VerboseLoggerFactory("mobile", "UserInteraction");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function tap
   * @memberof mobile.userInteraction
   * @description Tap's on the mobile element.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {Number} [timeout = 30000] - The timeout to wait(ms)
   * @example
   * await mobile.userInteraction.tap(elem);
   * await mobile.userInteraction.tap(elem, 20000);
   */
  async tap(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.tap);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);
      vl.log("Tapping on the element");
      await element.click();
      vl.log("Given element is successfully taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not tapable after ${timeout} ms`, true);
    }
  }

  /**
   * @function check
   * @memberof mobile.userInteraction
   * @description Checks the given checkbox.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @example
   * await mobile.userInteraction.check(element);
   * await mobile.userInteraction.check(element, 20000);
   */
  async check(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.check);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);
      const isSelected: boolean = await mobile.element.isSelected(element);
      if (!isSelected) {
        await this.tap(element);
        vl.log("Given element is successfully checked on the mobile Ui");
      } else {
        vl.log("Checkbox already selected.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to check after ${timeout} ms`, true);
    }
  }

  /**
   * @function uncheck
   * @memberOf mobile.userInteraction
   * @description Unchecks the given checkbox.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @example
   * await mobile.userInteraction.uncheck(elementOrSelector);
   * await mobile.userInteraction.uncheck(elementOrSelector, 20000);
   */
  async uncheck(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.uncheck);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);
      const isSelected: boolean = await mobile.element.isSelected(element);
      if (isSelected) {
        await this.tap(element);
        vl.log("Given element is successfully uncheck on the mobile Ui");
      } else {
        vl.log("Checkbox already unchecked.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to uncheck after ${timeout} ms`, true);
    }
  }

  /**
   * @function doubleTap
   * @memberof mobile.userInteraction
   * @description Double Tap's on the mobile element.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.doubleTap(elem);
   * await mobile.userInteraction.doubleTap(elem, 2000);
   */
  async doubleTap(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.doubleTap);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);
      vl.log("Double taping on the element");
      await element.doubleClick();
      vl.log("Given element is successfully double taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to double tap after ${timeout} ms`, true);
    }
  }

  /**
   * @function fill
   * @memberof mobile.userInteraction
   * @description Enter a string value into a mobile input field.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {string} value - The string value to be entered.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.fill(element);
   * await mobile.userInteraction.fill(element, 2000);
   */
  async fill(elementOrSelector: Element | string, value: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.fill);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);

      // Set the value
      vl.log("set text on the element");
      await element.setValue(value);
      vl.log(`Entered value "${value}" into input box by selector "${element}`);
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to fill the value after ${timeout} ms`, true);
    }
  }

  /**
   * @function clearAndFill
   * @memberof mobile.userInteraction
   * @description Enter a string into the mobile input field; it will clear the box before submission.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {string} value - The string value to be entered.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.clearAndFill(element);
   * await mobile.userInteraction.clearAndFill(element, 2000);
   */
  async clearAndFill(elementOrSelector: Element | string, value: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.clearAndFill);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);

      // Clear the input box.
      await element.clearValue();
      vl.log("Clear the existing text on the given element");

      // Set the value
      vl.log("set value on the input element");
      await element.setValue(value);
      vl.log(`Entered value "${value}" into input box by selector "${element}`);
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to fill the value after ${timeout} ms`, true);
    }
  }

  /**
   * @function clear
   * @memberof mobile.userInteraction
   * @description Clear a string value into a mobile input field.
   * @param {Element | string} elementOrSelector - The element (e.g., accessibility ID, XPath) selectors describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.clear(element);
   * await mobile.userInteraction.clear(element, 2000);
   */
  async clear(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.clear);

    try {
      const element = await resolveMobileSelectorOrElement(elementOrSelector);

      vl.log("Waiting for the element to become enabled and visible within the specified timeout");
      await Promise.all([mobile.element.waitToBeVisible(element, timeout), mobile.element.waitToBeEnabled(element, timeout)]);

      vl.log("Clearing the existing text on the given element");
      await element.clearValue();
      vl.log("Cleared the existing text on the given element");
    } catch (error) {
      this.ErrorHandler.logException(error, `Error: element still not able to clear the value after ${timeout} ms`, true);
    }
  }
}
export default new UserInteraction();
