//"use strict";

import { VerboseLoggerFactory } from "./verboseLogger";

/**
 * @class ElementHighlight
 * @memberof helper
 */

export class ElementHighlight {
  private vlf = new VerboseLoggerFactory("util", "elementHighlight");

  /**
   * @function getElementHighlightData
   * @memberof helper
   * @description - It is used to get the element highlight data based on the action method matched
   * @returns -  Promise object
   * @param {string} actionName - action name is required
   * @example await elementHighlight.getElementHighlightData("click");
   */
  async getElementHighlightData(actionName: string): Promise<any> {
    const vl = this.vlf.initLog(this.getElementHighlightData);

    let elementHighlightConfig = browser.config.params.highlightElements;
    let elementHighlightDefaultConfig: { enable: boolean; color: string; duration: number } = {
      enable: false,
      color: "red",
      duration: 1000
    };

    if (elementHighlightConfig && elementHighlightConfig.enable) {
      let actions = elementHighlightConfig.actions;

      if (!actions) throw new Error("Please specify the actions key in element highlight config object");

      if (Array.isArray(actions)) {
        for (let action of actions) {
          if (!(typeof action == "string" && typeof actionName == "string"))
            throw new Error(`Please provide the method name '${action}/${actionName}' in string format`);

          if (action.toLowerCase().trim().includes(actionName.trim())) {
            elementHighlightConfig = this._getElementHighlightColorAndDuration(elementHighlightConfig, elementHighlightDefaultConfig);
            return this._getElementHighlightConfig(true, elementHighlightConfig.color, elementHighlightConfig.duration);
          }
        }
      } else if (typeof actions === "string" && typeof actionName === "string") {
        if (actions.toLowerCase().trim().includes(actionName.trim())) {
          elementHighlightConfig = this._getElementHighlightColorAndDuration(elementHighlightConfig, elementHighlightDefaultConfig);
          return this._getElementHighlightConfig(true, elementHighlightConfig.color, elementHighlightConfig.duration);
        }
      } else {
        throw new Error(`Please provide the method name '${actions}/${actionName}' in string format`);
      }
    }
    return elementHighlightDefaultConfig;
  }

  // =================================== HELPER ===================================

  private _getElementHighlightConfig(enabled: boolean, colorName: string, timeout: number): any {
    return {
      enable: enabled,
      color: colorName,
      duration: timeout
    };
  }

  private _getElementHighlightColorAndDuration(elementHighlightConfig: any, elementHighlightDefaultConfig: any): any {
    elementHighlightConfig.color = elementHighlightConfig.hasOwnProperty("color")
      ? elementHighlightConfig.color
      : elementHighlightDefaultConfig.color;
    elementHighlightConfig.duration = elementHighlightConfig.hasOwnProperty("duration")
      ? elementHighlightConfig.duration
      : elementHighlightDefaultConfig.duration;
    return elementHighlightConfig;
  }
}

export default new ElementHighlight();
