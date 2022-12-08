"use strict";
import * as path from "path";

/**
 * @class component
 * @memberof util
 * @description This class provides functions for writing component tests with qmate-proxy-service
 */
export class Component {
  /**
   * @function loadEntryPoint
   * @memberOf util.component
   * @description Will be called in component test scripts. Returns a previously stored entry point object for sharing information (like a draft id) between preparation and the actual component tests.
   * @returns {Object} The data object of the stored entry point.
   * @example const entryPoint = util.component.loadEntryPoint();
   */
  async loadEntryPoint(): Promise<any> {
    // Will be called in component scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes("prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    return await util.data.readDataFromFile(`${componentSpecIdentifier}.entrypoint.json`);
  }

  /**
   * @function storeEntryPoint
   * @memberOf util.component
   * @description Will be called in preparation scripts before component tests. Stores an entry point object for sharing information (like a draft id) between preparation and the actual component tests.
   * @param {Object} The data object of the stored entry point.
   * @example const entryPoint = util.component.storeEntryPoint({"draftId": "0123456789"});
   */
  async storeEntryPoint(data: any): Promise<void> {
    // Will be called in preparation scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes("prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    await util.data.writeDataToFile(`${componentSpecIdentifier}.entrypoint.json`, data);
  }
}

export default new Component();
