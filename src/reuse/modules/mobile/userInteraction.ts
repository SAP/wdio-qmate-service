import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

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
   * @param {Element | string} element - The element (e.g., accessibility ID, XPath, CSS,) selectors describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait(ms)
   * @example
   * const elem = await mobile.userInteraction.tap(elem);
   * const elem = await mobile.userInteraction.tap(elem, 20000);
   */
  async tap(element: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.tap);

    try {
      const tapElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(tapElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(tapElement, timeout)
      ]);

      vl.log("Tapping on the element");
      await tapElement.click();
      vl.log("Given element is successfully taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During tap", true);
    }
  }

  /**
   * @function check
   * @memberof mobile.userInteraction
   * @description Checks the given checkbox.
   * @param {Element | string} element - The element or CSS selector describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @example await mobile.userInteraction.check(element);
   */
  async check(element: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.check);

    try {
      const checkElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(checkElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(checkElement, timeout)
      ]);

      const isSelected: boolean = await mobile.element.isSelected(checkElement);
      if (!isSelected) {
        await this.tap(checkElement);
      } else {
        vl.log("Checkbox already selected.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During check", true);
    }
  }

  /**
   * @function uncheck
   * @memberOf mobile.userInteraction
   * @description Unchecks the given checkbox.
   * @param {Element} element - The element or CSS selector describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @example await nonUi5.userInteraction.uncheck(elementOrSelector);
   */
  async uncheck(element: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.uncheck);

    try {
      const uncheckElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(uncheckElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(uncheckElement, timeout)
      ]);

      const isSelected: boolean = await mobile.element.isSelected(uncheckElement);
      if (isSelected) {
        await this.tap(uncheckElement);
      } else {
        vl.log("Checkbox already unchecked.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function doubleTap
   * @memberof mobile.userInteraction
   * @description Double Tap's on the mobile element.
   * @param {Element | string} element - The element or CSS selector describing the element (e.g., accessibility ID, XPath, CSS,).
   * @param {number} [timeout = 30000] - The timeout to wait(ms)
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.doubleTap(elem);
   * await mobile.userInteraction.doubleTap(elem, 2000);
   */
  async doubleTap(element: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.doubleTap);

    try {
      const tapElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(tapElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(tapElement, timeout)
      ]);

      vl.log("Double taping on the element");
      await tapElement.doubleClick();
      vl.log("Given element is successfully double taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During doubleTap", true);
    }
  }

  /**
   * @function fill
   * @memberof mobile.userInteraction
   * @description Enter a string value into a mobile input field.
   * @param {Element | string} element - The selector for the input element (e.g., accessibility ID, XPath, CSS,).
   * @param {string} value - The string value to be entered.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.fill(element);
   * await mobile.userInteraction.fill(element, 2000);
   */
  async fill(element: Element | string, value: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.fill);

    try {
      const inputElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(inputElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(inputElement, timeout)
      ]);

      // Set the value
      vl.log("set text on the element");
      await inputElement.setValue(value);
      vl.log(`Entered value "${value}" into input box by selector "${element}`);
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During fill", true);
    }
  }

  /**
   * @function clearAndFill
   * @memberof mobile.userInteraction
   * @description Enter a string into the mobile input field; it will clear the box before submission.
   * @param {Element | string} element - The selector for the input element (e.g., accessibility ID, XPath, CSS,).
   * @param {string} value - The string value to be entered.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.clearAndFill(element);
   * await mobile.userInteraction.clearAndFill(element, 2000);
   */
  async clearAndFill(element: Element | string, value: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.clearAndFill);

    try {
      const inputElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(inputElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(inputElement, timeout)
      ]);

      // Clear the input box.
      await inputElement.clearValue();
      vl.log("Clear the existing text on the given element");

      // Set the value
      vl.log("set value on the input element");
      await inputElement.setValue(value);
      vl.log(`Entered value "${value}" into input box by selector "${element}`);
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During clearAndFill", true);
    }
  }

  /**
   * @function clear
   * @memberof mobile.userInteraction
   * @description Clear a string value into a mobile input field.
   * @param {Element | string} element - The selector for the input element (e.g., accessibility ID, XPath, CSS,).
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * await mobile.userInteraction.clear(element);
   * await mobile.userInteraction.clear(element, 2000);
   */
  async clear(element: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.clear);

    try {
      const inputElement = await $(element);
      vl.log("Expecting element to be enabled & wait to be visible");
      await Promise.all([
        expect(inputElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        }),
        await mobile.element.waitToBeVisible(inputElement, timeout)
      ]);

      vl.log("Clearing the existing text on the given element");
      await inputElement.clearValue();
      vl.log("Cleared the existing text on the given element");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During clear", true);
    }
  }
}
export default new UserInteraction();
