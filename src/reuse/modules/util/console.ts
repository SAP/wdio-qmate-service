"use strict";
/**
 * @class console
 * @memberof util
 */
export class Console {
  private colorReset = "\x1b[0m";
  /**
   * @function log
   * @memberOf util.console
   * @description Logs a message to the console in the given color.
   * @param {String} message - The message to log.
   * @param {String} [textColor] - The color of the text: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta".
   * @param {String} [backgroundColor] - The color of the background: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta".
   * @param {String} [brightness] - Adjusts the brightness of the color: "bright", "dim". Leave empty for default.
   * @example util.console.log("The document has been saved.", "green");
   */
  log(message: string, textColor?: string, backgroundColor?: string, brightness?: string) {
    let colorValue = "";

    if (textColor) {
      const textColorValue = this.getColorValue(textColor);
      colorValue = textColorValue;
    }
    if (backgroundColor) {
      const backgroundColorValue = this.getBackgroundColorValue(backgroundColor);
      colorValue = colorValue + backgroundColorValue;
    }
    if (brightness) {
      const brightnessValue = this.getBrightnessValue(brightness);
      colorValue = colorValue + brightnessValue;
    }

    console.log(colorValue, message + this.colorReset);
  }

  /**
   * @function error
   * @memberOf util.console
   * @description Logs a error message to the console in red.
   * @param {String} message - The message to log.
   * @example util.console.error("Error: Please investigate.");
   */
  error(message: string) {
    const colorValue = this.getColorValue("red");
    console.error(colorValue, message + this.colorReset);
  }

  /**
   * @function warn
   * @memberOf util.console
   * @description Logs a warning message to the console in yellow.
   * @param {String} message - The message to log.
   * @example util.console.warn("Optional step not executed.");
   */
  warn(message: string) {
    const colorValue = this.getColorValue("yellow");
    console.warn(colorValue, message + this.colorReset);
  }

  /**
   * @function success
   * @memberOf util.console
   * @description Logs a success message to the console in green.
   * @param {String} message - The message to log.
   * @example util.console.success("The document has been saved.");
   */
  success(message: string) {
    const colorValue = this.getColorValue("green");
    console.log(colorValue, message + this.colorReset);
  }

  /**
   * @function info
   * @memberOf util.console
   * @description Logs a info message to the console in cyan.
   * @param {String} message - The message to log.
   * @example util.console.success("The document has been saved.");
   */
  info(message: string) {
    const colorValue = this.getColorValue("cyan");
    console.log(colorValue, message + this.colorReset);
  }

  private colors = [
    {
      key: "black",
      value: "\x1b[30m",
      valueBg: "\x1b[40m",
    },
    {
      key: "white",
      value: "\x1b[37m",
      valueBg: "\x1b[47m",
    },
    {
      key: "red",
      value: "\x1b[31m",
      valueBg: "\x1b[41m",
    },
    {
      key: "green",
      value: "\x1b[32m",
      valueBg: "\x1b[42m",
    },
    {
      key: "yellow",
      value: "\x1b[33m",
      valueBg: "\x1b[30m\x1b[43m",
    },
    {
      key: "blue",
      value: "\x1b[34m",
      valueBg: "\x1b[44m",
    },
    {
      key: "magenta",
      value: "\x1b[35m",
      valueBg: "\x1b[45m",
    },
    {
      key: "cyan",
      value: "\x1b[36m",
      valueBg: "\x1b[30m\x1b[46m",
    },
  ];

  // =================================== HELPER ===================================
  private getColorValue(key: string) {
    const object = this.colors.find((obj) => obj.key === key);
    if (object === undefined) {
      return "";
    }
    return object.value;
  }

  private getBackgroundColorValue(key: string) {
    const object = this.colors.find((obj) => obj.key === key);
    if (object === undefined) {
      return "";
    }
    return object.valueBg;
  }

  private getBrightnessValue(key: string) {
    switch (key) {
      case "bright":
        return "\x1b[1m";
      case "dim":
        return "\x1b[2m";
      default:
        return "";
    }
  }
}
export default new Console();
