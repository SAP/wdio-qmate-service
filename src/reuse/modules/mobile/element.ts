import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { resolveMobileSelectorOrElement } from "../../helper/elementResolving";

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
   * @param {Element} element - The Mobile Ui element.
   * @param {boolean} [strict=true] - If strict mode is enabled it will only return "true" if the element is visible on the mobile view and within the viewport.
   * If "false", it will be sufficient if the element is visible on the view but not inside the current viewport.
   * @returns {boolean} Returns true or false.
   * @example
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

  /**
   * @function isPresent
   * @memberof mobile.element
   * @description Returns a boolean if the element is present at the DOM or not. It might be hidden.
   * @param {Element} element - The element.
   * @returns {boolean} Returns true or false.
   * @example
   * await mobile.element.isPresent(elem);
   */
  async isPresent(element: Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isPresent);
    return element.isExisting();
  }

  /**
   * @function waitToBePresent
   * @memberof mobile.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {number} [timeout = 30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example
   * await mobile.element.waitToBePresent(".input01");
   * await mobile.element.waitToBePresent("#button12");
   * await mobile.element.waitToBePresent("p:first-child");
   */
  async waitToBePresent(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<boolean> {
    const vl = this.vlf.initLog(this.waitToBePresent);
    try {
      vl.log(`wdio.waitForExist invocation for selector ${selector}`);
      await $(selector).waitForExist({
        timeout: timeout,
        interval: 100,
        timeoutMsg: `Timeout '${+timeout / 1000}s' by waiting for element is present.`
      });
      return true;
    } catch (error) {
      this.ErrorHandler.logException(error);
      return false;
    }
  }

  /**
   * @function waitToBeVisible
   * @memberof mobile.element
   * @description Waits until the element with the given selector is visible.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example
   * await mobile.element.waitToBeVisible(".input01");
   * await mobile.element.waitToBeVisible("#button12");
   * await mobile.element.waitToBeVisible("p:first-child");
   */
  async waitToBeVisible(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<boolean> {
    const vl = this.vlf.initLog(this.waitToBeVisible);
    try {
      vl.log(`wdio.waitForDisplayed invocation for selector ${selector}`);
      await $(selector).waitForDisplayed({
        timeout: timeout,
        interval: 100,
        timeoutMsg: `Timeout '${+timeout / 1000}s' by waiting for element is displayed.`
      });
      return true;
    } catch (error) {
      this.ErrorHandler.logException(error);
      return false;
    }
  }

  /**
   * @function waitToBeClickable
   * @memberof mobile.element
   * @description Waits until the element with the given selector is clickable.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example
   * await mobile.element.waitToBeClickable(".input01");
   * await mobile.element.waitToBeClickable("#button12");
   * await mobile.element.waitToBeClickable("p:first-child");
   */
  async waitToBeClickable(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<boolean> {
    const vl = this.vlf.initLog(this.waitToBeClickable);
    try {
      vl.log(`wdio.waitForClickable invocation for selector ${selector}`);
      await $(selector).waitForClickable({
        timeout: timeout,
        interval: 100,
        timeoutMsg: `Timeout '${+timeout / 1000}s' by waiting for element is clickable.`
      });
      return true;
    } catch (error) {
      this.ErrorHandler.logException(error);
      return false;
    }
  }

  /**
   * @function isSelected
   * @memberof mobile.element
   * @description Returns a boolean if the element (e.g. checkbox) is selected.
   * @param {Element | string} elementOrSelector - The element.
   * @returns {boolean} Returns true or false.
   * @example
   * const isSelected = await mobile.element.isSelected(elem);
   */
  async isSelected(elementOrSelector: Element | string): Promise<boolean> {
    const vl = this.vlf.initLog(this.isSelected);

    const element = await resolveMobileSelectorOrElement(elementOrSelector);
    return await element.isSelected();
  }

  /**
   * @function waitToBeEnabled
   * @memberof mobile.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example
   * await mobile.element.waitToBeEnabled(".input01");
   * await mobile.element.waitToBeEnabled("#button12");
   * await mobile.element.waitToBeEnabled("p:first-child");
   */
  async waitToBeEnabled(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<boolean> {
    const vl = this.vlf.initLog(this.waitToBeEnabled);
    try {
      vl.log(`wdio.waitTotoBeEnabled invocation for selector ${selector}`);
      await $(selector).toBeEnabled({
        timeout: timeout,
        interval: 100,
        timeoutMsg: `Timeout '${+timeout / 1000}s' by waiting for element is enabled.`
      });
      return true;
    } catch (error) {
      this.ErrorHandler.logException(error);
      return false;
    }
  }
}
export default new ElementModule();
