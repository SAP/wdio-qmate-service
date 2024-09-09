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
   * @function click
   * @memberOf mobile.userInteraction
   * @description Tap's on the passed element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const elem = await mobile.userInteraction.tap(elem);
   */
   async tap(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.tap);

    try {
      vl.log("Expecting element to be displayed and enabled");
      await Promise.all([
        expect(elementOrSelector).toBeDisplayed({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
        }),
        expect(elementOrSelector).toBeEnabled({
          wait: timeout,
          interval: 100,
          message: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
        })
      ]);

      vl.log("Clicking the element");
      await elementOrSelector.click();
      vl.log("given element is successfully taped");
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

}
export default new UserInteraction();
