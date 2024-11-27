"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class userLocks
 * @memberof util
 */

export class UserLocks {
  private vlf = new VerboseLoggerFactory("util", "userLocks");
  private _srvUserLockInstance = null;
  private _srvEshInstance = null;
  private async initUserLockService(user: string, password: string = "Welcome1!"): Promise<any> {
    if (!this._srvUserLockInstance) {
      const vl = this.vlf.initLog(await this.initUserLockService);
      const params = browser.config.params;
      if (params?.systemUrl && user && password) {
        try {
          this._srvUserLockInstance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/sap/APS_IAM_MUS_V2UI`, user, password);
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
  private async initEnterpriseSearchHelpService(user: string, password: string = "Welcome1!"): Promise<any> {
    if (!this._srvEshInstance) {
      const vl = this.vlf.initLog(await this.initEnterpriseSearchHelpService);
      const params = browser.config.params;
      if (params?.systemUrl && user && password) {
        try {
          this._srvEshInstance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/sap/ESH_SEARCH_SRV`, user, password);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Failed to initialize Search Service: ${error.message}.`);
          } else {
            throw new Error("Failed to initialize Search Service");
          }
        }
      } else {
        throw new Error("System URL is missing in the config file.");
      }
    }
  }

  public async getLockEntries(user: string, password: string, technicalUserId: string): Promise<any> {
    const vl = this.vlf.initLog(await this.getLockEntries);
    if (technicalUserId === undefined) {
      await this.initEnterpriseSearchHelpService(user, password);
    }
    await this.initUserLockService(user, password);
    const client = this._extractClient(browser.config.params.systemUrl);
    const resEsh = await service.odata.get(this._srvEshInstance, "Users", {});
    const userId = resEsh[0].Id;
    const userName = resEsh[0].Name;
    const resLocks = await service.odata.get(this._srvUserLockInstance, "Session", {
      Client: client,
      UserId: userId,
      SessionId: "*"
    });
    if (resLocks.NumberOfLocks.length > 0) {
      util.console.success(`User '${userName}' with ID '${userId}' has ${resLocks.length} locks.`);
      //TODO: Implement deletion of lock entries
    } else {
      util.console.success(`User '${userName}' with ID '${userId}' has no locks.`);
    }
  }
  private _extractClient(url: string): string {
    const match = url.match(/(?<=[a-zA-Z]{3}-)\d+/);
    if (match) {
      return match[0];
    } else {
      throw new Error("Client number not found in the URL");
    }
  }
}
export default new UserLocks();
