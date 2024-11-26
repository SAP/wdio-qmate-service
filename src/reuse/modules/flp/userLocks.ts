"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class userLocks
 * @memberof util
 */

export class UserLocks {
  private vlf = new VerboseLoggerFactory("util", "userLocks");
  private _srvInstance = null;

  private async initUserLockService(user: string, password: string): Promise<any> {
    if (!this._srvInstance) {
      const vl = this.vlf.initLog(await this.initUserLockService);
      const params = browser.config.params;
      if (params?.systemUrl) {
        try {
          this._srvInstance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/sap/APS_IAM_MUS_V2UI`, user, password);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Failed to initialize S4 User Lock Service: ${error.message}.`);
          } else {
            throw new Error("Failed to initialize S4 User Lock Service");
          }
        }
      } else {
        throw new Error("System URL is missing in the config file.");
      }
    }
  }
}
export default new UserLocks();
