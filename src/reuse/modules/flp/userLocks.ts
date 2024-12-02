"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class userLocks
 * @memberof util
 */
type UserInfo = {
  Id: string;
  Name: string;
};
export class UserLocks {
  private vlf = new VerboseLoggerFactory("util", "userLocks");
  private _srvUserLockInstance = null;
  private _srvEshInstance = null;
  private _requestOptions: { Client: string; UserId: string; SessionId: string } = {
    Client: "",
    UserId: "",
    SessionId: ""
  };

  private async _initUserLockService(user: string, password: string = "Welcome1!"): Promise<any> {
    if (!this._srvUserLockInstance) {
      const vl = this.vlf.initLog(await this._initUserLockService);
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

  public async getNumberOfLockEntries(user: string, password: string, technicalUserId?: string): Promise<number> {
    const vl = this.vlf.initLog(await this.getNumberOfLockEntries);
    let resUserInfo = null;
    let userFullName = user;

    if (!technicalUserId) {
      await this.initEnterpriseSearchHelpService(user, password);
      resUserInfo = await this._getUserInfo();
      technicalUserId = resUserInfo.Id;
      userFullName = resUserInfo.Name;
    }

    await this._initUserLockService(user, password);
    const client = this._extractClient(browser.config.params.systemUrl);
    this._requestOptions = {
      Client: client,
      UserId: technicalUserId,
      SessionId: "*" //Get all locks for the user, since we just want to know if there is a lock at all.
    };

    const resLocks = await service.odata.get(this._srvUserLockInstance, "Session", this._requestOptions);
    if (resLocks.NumberOfLocks > 0) {
      util.console.warn(`User '${userFullName}' with ID '${this._requestOptions.UserId}' has ${resLocks.NumberOfLocks} lock/s.`);
      this._requestOptions.SessionId = resLocks.SessionId;
    } else {
      util.console.success(`User '${userFullName}' with ID '${this._requestOptions.UserId}' has no locks.`);
    }
    return resLocks.NumberOfLocks;
  }

  public async deleteExistingLockEntries(user: string, password: string, technicalUserId?: string): Promise<void> {
    const lockEntryCount = await this.getNumberOfLockEntries(user, password, technicalUserId);
    if (lockEntryCount > 0) {
      await this._deleteLockEntries();
    }
  }

  private async _getUserInfo(): Promise<UserInfo> {
    try {
      const res = await service.odata.get(this._srvEshInstance, "Users", {});
      return res[0] as UserInfo;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get user info: ${error.message}.`);
      } else {
        throw new Error("Failed to get user info");
      }
    }
  }

  private async _deleteLockEntries(): Promise<any> {
    const res = await service.odata.callFunctionImport(this._srvUserLockInstance, "delete_session", this._requestOptions, true);
    const sapMessage = JSON.parse(res.headers.get("sap-message"));
    if (sapMessage?.message === "Sessions deleted successfully") {
      util.console.success(`Locks for user '${this._requestOptions.UserId}' have been deleted.`);
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
