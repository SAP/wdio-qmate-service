"use strict";
import * as path from "path";
import fs from "fs";

/**
 * @class component
 * @memberof util
 * @description This class provides functions for writing component tests with qmate-proxy-service
 */
export class Component {
  private _entryPointFolderPath = "./entrypoints";

  /**
   * @function loadEntryPoint
   * @memberOf util.component
   * @description Will be called in component test scripts. Returns a previously stored entry point object for sharing information (like a draft id) between preparation and the actual component tests.
   * @param {String} [folderPath="./entrypoints"] - Custom folder path where entry points are stored.
   * @returns {Object} The data object of the stored entry point.
   * @example const entryPoint = util.component.loadEntryPoint();
   */
  async loadEntryPoint(folderPath = this._entryPointFolderPath): Promise<any> {
    // Will be called in component scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes("prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    return await util.data.readDataFromFile(path.resolve(folderPath, `${componentSpecIdentifier}.entrypoint.json`));
  }

  /**
   * @function storeEntryPoint
   * @memberOf util.component
   * @description Will be called in preparation scripts before component tests. Stores an entry point object for sharing information (like a draft id) between preparation and the actual component tests.
   * @param {Object} data - The data object of the entry point to store.
   * @param {String} [folderPath="./entrypoints"] - Custom folder path where entry points are stored.
   * @example const entryPoint = util.component.storeEntryPoint({"draftId": "0123456789"});
   */
  async storeEntryPoint(data: any, folderPath = this._entryPointFolderPath): Promise<void> {
    // Will be called in preparation scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes("prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    if (!fs.existsSync(path.resolve(folderPath))) {
      fs.mkdirSync(path.resolve(folderPath));
    }

    await util.data.writeDataToFile(path.resolve(folderPath, `${componentSpecIdentifier}.entrypoint.json`), data);
  }
}

export default new Component();
