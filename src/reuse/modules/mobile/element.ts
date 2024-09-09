import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class element
 * @memberof mobile
 */
export class ElementModule {
    private vlf = new VerboseLoggerFactory("mobile", "element");
    private ErrorHandler = new ErrorHandler();

    /**
   * @function isVisible
   * @memberOf mobile.element
   * @description Returns a boolean if the mobile element is visible to the user.
   * @param {Object} element - The element.
   * @param {Boolean} [strict=true] - If strict mode is enabled it will only return "true" if the element is visible on the mobile view and within the viewport.
   * If "false", it will be sufficient if the element is visible on the view but not inside the current viewport.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await mobile.element.isVisible("button01");
   * await mobile.element.isVisible(elem);
   */
  async isVisible(element: Element, strict: boolean = true): Promise<boolean> {
    const vl = this.vlf.initLog(this.isVisible);
    try {
      if (strict) {
        return element.isDisplayedInViewport();
      } else {
        return element.isDisplayed();
      }
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }



}
export default new ElementModule();