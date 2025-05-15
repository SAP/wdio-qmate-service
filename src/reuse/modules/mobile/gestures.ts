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
   * @description Swipe from one point to another on the screen,
   * Ensure that the provided coordinates are within the bounds of the screen to avoid unexpected behavior.
   * @param {number} startX - The starting X coordinate of the swipe
   * @param {number} startY - The starting Y coordinate of the swipe
   * @param {number} endX - The ending X coordinate of the swipe
   * @param {number} endY - The ending Y coordinate of the swipe
   * @param {number} [duration=1000] - The duration of the swipe in milliseconds (optional, default is 1000ms)
   * @returns {Promise<void>}
   * @example
   * // Swipes from left to right across the screen horizontally (useful for image carousels or galleries).
   * await mobile.gestures.swipe(100, 800, 800, 800);
   * // Swipes from bottom to top vertically to scroll down a list.
   * await mobile.gestures.swipe(300, 1000, 300, 400);
   * // Swipes from the top down to refresh content on a mobile app (common for pull-to-refresh).
   * await mobile.gestures.swipe(400, 200, 400, 800);
   */
  async swipe(startX: number, startY: number, endX: number, endY: number, duration: number = 1000): Promise<void> {
    const vl = this.vlf.initLog(this.swipe);
    try {
      // Validate input coordinates
      if (startX < 0 || startY < 0 || endX < 0 || endY < 0) {
        throw new Error(`Invalid coordinates: (${startX}, ${startY}) to (${endX}, ${endY}) must be non-negative.`);
      }

      // Log the swipe action for debugging
      vl.log(`Swiping from (${startX}, ${startY}) to (${endX}, ${endY}) over ${duration}ms`);

      await browser.touchPerform([
        { action: "press", options: { x: startX, y: startY } },
        { action: "wait", options: { ms: duration } }, // Wait for the duration of the swipe
        { action: "moveTo", options: { x: endX, y: endY } },
        { action: "release" }
      ]);

      vl.log("Swipe completed successfully...");
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function tap
   * @memberof mobile.gestures
   * @description Executes a tap at the given screen coordinates,
   * Ensure that the provided coordinates are within the bounds of the screen to avoid unexpected behavior.
   * @param {number} coordX - The horizontal screen coordinate for the tap.
   * @param {number} coordY - The vertical screen coordinate for the tap.
   * @returns {Promise<void>}
   * @example
   * await mobile.gestures.tap(100, 800);
   */
  async tap(coordX: number, coordY: number): Promise<void> {
    const vl = this.vlf.initLog(this.tap);
    try {
      // Input validation
      if (coordX < 0 || coordY < 0) {
        throw new Error(`Invalid coordinates: x (${coordX}) and y (${coordY}) must be non-negative.`);
      }
      // Log the tap action for debugging
      vl.log(`Initiating tap at coordinates (${coordX}, ${coordY}).`);

      await browser.touchPerform([{ action: "tap", options: { coordX, coordY } }]);

      vl.log("Coordinate tap completed successfully...");
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new Gestures();
