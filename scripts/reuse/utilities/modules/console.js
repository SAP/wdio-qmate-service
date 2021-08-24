/* eslint-disable no-console */
/* eslint-disable indent */
/**
 * @class console
 * @memberof utilities
 */
const Console = function () {

  /**
   * @function log
   * @memberOf utilities.console
   * @description Logs a message to the console in the given color.
   * @param {String} message - The message to log.
   * @param {String} [textColor] - The color of the text: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta".
   * @param {String} [backgroundColor] - The color of the background: "black, white", "red", "yellow", "green", "blue", "cyan", "magenta".
   * @param {String} [brightness] - Adjusts the brightness of the color: "bright", "dim". Leave empty for default.
   * @example utilities.console.log("The document has been saved.", "green");
   */
  this.log = function (message, textColor, backgroundColor, brightness) {
    let colorValue = "";

    if (textColor) {
      const textColorValue = getColorValue(textColor);
      colorValue = textColorValue;
    }
    if (backgroundColor) {
      const backgroundColorValue = getBackgroundColorValue(backgroundColor);
      colorValue = colorValue + backgroundColorValue;
    }
    if (brightness) {
      const brightnessValue = getBrightnessValue(brightness);
      colorValue = colorValue + brightnessValue;
    }

    console.log(colorValue, message + "\x1b[0m");
  };

  /**
   * @function error
   * @memberOf utilities.console
   * @description Logs a error message to the console in red.
   * @param {String} message - The message to log.
   * @example utilities.console.error("Error: Please investigate.");
   */
  this.error = function (message) {
    let colorValue = getColorValue("red");
    console.error(colorValue, message + "\x1b[0m");
  };

  /**
   * @function warn
   * @memberOf utilities.console
   * @description Logs a warning message to the console in yellow.
   * @param {String} message - The message to log.
   * @example utilities.console.warn("Optional step not executed.");
   */
  this.warn = function (message) {
    let colorValue = getColorValue("yellow");
    console.warn(colorValue, message + "\x1b[0m");
  };

  /**
   * @function success
   * @memberOf utilities.console
   * @description Logs a success message to the console in green.
   * @param {String} message - The message to log.
   * @example utilities.console.success("The document has been saved.");
   */
  this.success = function (message) {
    let colorValue = getColorValue("green");
    console.log(colorValue, message + "\x1b[0m");
  };

  /**
   * @function info
   * @memberOf utilities.console
   * @description Logs a info message to the console in cyan.
   * @param {String} message - The message to log.
   * @example utilities.console.success("The document has been saved.");
   */
  this.info = function (message) {
    let colorValue = getColorValue("cyan");
    console.log(colorValue, message + "\x1b[0m");
  };

  const colors = [{
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
    }
  ];

  function getColorValue(key) {
    const object = colors.filter(obj => {
      return obj.key === key;
    })[0];

    if (object.length !== 0) {
      return object.value;
    } else {
      return "";
    }
  }

  function getBackgroundColorValue(key) {
    const object = colors.filter(obj => {
      return obj.key === key;
    })[0];

    if (object.length !== 0) {
      return object.valueBg;
    } else {
      return "";
    }
  }

  function getBrightnessValue(key) {
    let value = "";

    switch (key) {
      case "bright":
        value = "\x1b[1m";
        break;
      case "dim":
        value = "\x1b[2m";
        break;
      default:
        value = "";
        break;
    }

    return value;
  }

};
module.exports = new Console();