import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class gestures
 * @memberof mobile
 */
export class Gestures {
  private vlf = new VerboseLoggerFactory("mobile", "gestures");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function swipe
   * @memberof mobile.gestures
   * @description Swipe from one point to another on the screen.
   * @param {number} startX - The starting X coordinate of the swipe
   * @param {number} startY - The starting Y coordinate of the swipe
   * @param {number} endX - The ending X coordinate of the swipe
   * @param {number} endY - The ending Y coordinate of the swipe
   * @param {number} duration - The duration of the swipe in milliseconds (optional, default is 1000ms)
   * @returns {Promise<void>}
   */
  async swipe(startX: number, startY: number, endX: number, endY: number, duration: number = 1000): Promise<void> {
    const vl = this.vlf.initLog(this.swipe);
    try {
      await browser.touchPerform([
        { action: "press", options: { x: startX, y: startY } },
        { action: "wait", options: { ms: duration } }, // Wait for the duration of the swipe
        { action: "moveTo", options: { x: endX, y: endY } },
        { action: "release" }
      ]);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new Gestures();
