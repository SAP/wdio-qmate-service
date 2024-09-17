import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class userInteraction
 * @memberof Mobile
 */
export class UserInteraction {
  private vlf = new VerboseLoggerFactory("mobile", "gestures");
  private ErrorHandler = new ErrorHandler();

   /**
   * @function tap
   * @memberOf mobile.userInteraction
   * @description Tap's on the mobile element.
   * @param {Element | string} element - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await mobile.userInteraction.tap(elem);
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
      vl.log("Clicking the element");
      await element.click();
      vl.log("Given element is successfully taped on the mobile Ui");
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function check
   * @memberOf mobile.userInteraction
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
      this.ErrorHandler.logException(error);
    }
  }
  
}
export default new UserInteraction();
