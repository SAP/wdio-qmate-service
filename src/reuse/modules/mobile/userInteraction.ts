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
   * @param {Number} [timeout=30000] - The timeout to wait(ms) (default: 30000)
   * @example
   * const elem = await mobile.userInteraction.tap(elem);
   * const elem = await mobile.userInteraction.tap(elem, 20000);
   */
  async tap(element: Element, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.tap);

    try {
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
      vl.log("Tapping on the element");
      await element.click();
      vl.log("Given element is successfully taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During tap", true);
    }
  }

  /**
   * @function check
   * @memberof mobile.userInteraction
   * @description Checks the given checkbox.
   * @param {Element} element - The element or CSS selector describing the element.
   * @example await mobile.userInteraction.check(selector);
   */
  async check(element: Element) {
    const vl = this.vlf.initLog(this.check);

    try {
      const isSelected: boolean = await mobile.element.isSelected(element);
      if (!isSelected) {
        await this.tap(element);
      } else {
        vl.log("Checkbox already selected.");
      }
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During check", true);
    }
  }

  /**
   * @function doubleTap
   * @memberof mobile.userInteraction
   * @description Double Tap's on the mobile element.
   * @param {Element | string} element - The element or CSS selector describing the element (e.g., accessibility ID, XPath, CSS,).
   * @param {number} [timeout = 30000] - The timeout to wait(ms) (default: 30000).
   * @example
   * const elem = await mobile.userInteraction.doubleTap(elem);
   * const elem = await mobile.userInteraction.doubleTap(elem, 20000);
   */
  async doubleTap(element: Element, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.doubleTap);

    try {
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
      vl.log("Double taping on the element");
      await element.doubleClick();
      vl.log("Given element is successfully double taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During doubleTap", true);
    }
  }

  /**
   * @function setText
   * @memberof mobile.userInteraction
   * @description Enter a string value into a mobile input box.
   * @param {Element | string} element - The selector for the input element (e.g., accessibility ID, XPath, CSS,).
   * @param {string} value - The string value to be entered.
   * @param {boolean} clear - Whether to clear the input box before entering the value (default: true).
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * const elem = await mobile.userInteraction.setText(elem);
   * const elem = await mobile.userInteraction.setText(elem, 2000, false);
   */
  async setText(element: Element, value: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000, clear: boolean = true): Promise<void> {
    const vl = this.vlf.initLog(this.setText);

    try {
      const inputElement = await $(element);
      vl.log("Expecting element to be displayed and enabled");
      await Promise.all([
        expect(inputElement).toBeDisplayed({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
        }),
        expect(inputElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        })
      ]);

      if (clear) {
        // Clear the input box if required
        await inputElement.clearValue();
        vl.log("clear the existing text on the given element");
      }

      // Set the value
      vl.log("setText on the element");
      await inputElement.setValue(value);
      vl.log(`Entered value "${value}" into input box with selector "${element}`);
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During setText", true);
    }
  }

  /**
   * @function clearText
   * @memberof mobile.userInteraction
   * @description Clear a string value into a mobile input box.
   * @param {Element | string} element - The selector for the input element (e.g., accessibility ID, XPath, CSS,).
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {Promise<void>}
   * @example
   * const elem = await mobile.userInteraction.clearText(elem);
   * const elem = await mobile.userInteraction.clearText(elem, 2000);
   */
  async clearText(element: Element, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.clearText);

    try {
      const inputElement = await $(element);
      vl.log("Expecting element to be displayed and enabled");
      await Promise.all([
        expect(inputElement).toBeDisplayed({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
        }),
        expect(inputElement).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        })
      ]);

      await inputElement.clearValue();
      vl.log("clear the existing text on the given element");
    } catch (error) {
      this.ErrorHandler.logException(error, "Error: During clearText", true);
    }
  }
}
export default new UserInteraction();
