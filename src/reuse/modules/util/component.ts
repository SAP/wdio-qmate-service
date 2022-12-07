"use strict";
import * as path from "path";

/**
 * @class data
 * @memberof util
 */
export class Component {
  async loadEntryPoint(): Promise<any> {
    // Will be called in component scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes(".prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    return await util.data.readDataFromFile(`${componentSpecIdentifier}.entrypoint.json`);
  }

  async storeEntryPoint(data: any): Promise<void> {
    // Will be called in prep scripts
    const componentSpec = runtime.specs.filter((spec: string) => {
      return !spec.includes(".prep.");
    })[0];
    const componentSpecIdentifier = path.basename(componentSpec).replaceAll(".spec.js", "");

    await util.data.writeDataToFile(`${componentSpecIdentifier}.entrypoint.json`, data);
  }
}

export default new Component();
