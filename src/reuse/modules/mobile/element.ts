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
   * @memberof mobile.element
   * @description Returns a boolean if the mobile element is visible to the user.
   * @param {Object} element - The Mobile Ui element.
   * @param {Boolean} [strict=true] - If strict mode is enabled it will only return "true" if the element is visible on the mobile view and within the viewport.
   * If "false", it will be sufficient if the element is visible on the view but not inside the current viewport.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await mobile.element.isVisible("button01");
   * await mobile.element.isVisible(elem);
   */
  async isVisible(element: WebdriverIO.Element, strict: boolean = true): Promise<boolean> {
    const vl = this.vlf.initLog(this.isVisible);
    try {
      if (strict) {
        return element.isDisplayed({ withinViewport: true });
      } else {
        return element.isDisplayed();
      }
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function isPresent
   * @memberof mobile.element
   * @description Returns a boolean if the element is present at the DOM or not. It might be hidden.
   * @param {Object} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example
   * await mobile.element.isPresent(elem);
   */
  async isPresent(element: WebdriverIO.Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isPresent);
    return element.isExisting();
  }

  /**
   * @function waitToBePresent
   * @memberof mobile.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBePresent(".input01");
   * @example await mobile.element.waitToBePresent("#button12");
   * @example await mobile.element.waitToBePresent("p:first-child");
   */
  async waitToBePresent(selector: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.waitToBePresent);
    try {
      vl.log(`wdio.waitForExist invocation for selector ${selector}`);
      await $(selector).waitForExist({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function waitToBeVisible
   * @memberof mobile.element
   * @description Waits until the element with the given selector is visible.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBeVisible(".input01");
   * @example await mobile.element.waitToBeVisible("#button12");
   * @example await mobile.element.waitToBeVisible("p:first-child");
   */
  async waitToBeVisible(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.waitToBeVisible);
    try {
      vl.log(`wdio.waitForDisplayed invocation for selector ${selector}`);
      await $(selector).waitForDisplayed({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function waitToBeClickable
   * @memberof mobile.element
   * @description Waits until the element with the given selector is clickable.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBeClickable(".input01");
   * @example await mobile.element.waitToBeClickable("#button12");
   * @example await mobile.element.waitToBeClickable("p:first-child");
   */
  async waitToBeClickable(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.waitToBeClickable);
    try {
      vl.log(`wdio.waitForClickable invocation for selector ${selector}`);
      await $(selector).waitForClickable({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function isSelected
   * @memberof mobile.element
   * @description Returns a boolean if the element (e.g. checkbox) is selected.
   * @param {Object} elem - The element.
   * @returns {boolean}
   * @example const elem = await mobile.element.getById("elem01");
   * const isSelected = await mobile.element.isSelected(elem);
   */
  async isSelected(elem: WebdriverIO.Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isSelected);
    return elem.isSelected();
  }
}
export default new ElementModule();
