"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

type UserInfo = {
  Id: string;
  Name: string;
};

export class UserLocks {
  // Private Properties
  private vlf = new VerboseLoggerFactory("util", "userLocks");
  private _srvUserLockInstance: any = null;
  private _srvEshInstance: any = null;

  private _requestOptions = {
    Client: "",
    UserId: "",
    SessionId: "*" // Default to all sessions
  };

  // Public Functions
  /**
   * @function getNumberOfLockEntries
   * @memberOf util.userLocks
   * @description Fetches the number of lock entries for the given user.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @param {String} [technicalUserId] - The technical user ID.
   * @returns {Promise<Number>} The number of lock entries.
   * @example const lockCount = await util.userLocks.getNumberOfLockEntries("user", "password");
   */
  public async getNumberOfLockEntries(user: string, password: string, technicalUserId?: string): Promise<number> {
    // If technicalUserId is not provided, fetch it from the user info
    if (!technicalUserId) {
      await this._initializeSearchService(user, password);
      const userInfo = await this._fetchUserInfo();
      technicalUserId = userInfo.Id;
      user = userInfo.Name;
    }

    await this._initializeUserLockService(user, password);
    this._requestOptions.Client = this._extractClientFromUrl(browser.config.params.systemUrl);
    this._requestOptions.UserId = technicalUserId;

    const locks = await this._getLockEntries();
    const lockCount = locks.NumberOfLocks;

    if (lockCount > 0) {
      util.console.warn(`User '${user}' with ID '${technicalUserId}' has ${lockCount} lock/s.`);
    } else {
      util.console.success(`User '${user}' with ID '${technicalUserId}' has no locks.`);
    }

    return lockCount;
  }

  /**
   * @function deleteExistingLockEntries
   * @memberOf util.userLocks
   * @description Deletes the existing lock entries for the given user.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @param {String} [technicalUserId] - The technical user ID.
   * @example await util.userLocks.deleteExistingLockEntries("user", "password");
   */
  public async deleteExistingLockEntries(user: string, password: string, technicalUserId?: string): Promise<void> {
    const lockCount = await this.getNumberOfLockEntries(user, password, technicalUserId);
    if (lockCount > 0) {
      await this._deleteLockEntries();
    }
  }

  // Private Functions
  private async _initializeService(instance: any, urlSegment: string, user: string, password: string = "Welcome1!"): Promise<any> {
    if (!instance) {
      const params = browser.config.params;
      if (!params?.systemUrl || !user || !password) {
        throw new Error("System URL or credentials are missing in the config file.");
      }

      try {
        instance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/sap/${urlSegment}`, user, password);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to initialize service: ${errorMessage}`);
      }
    }
    return instance;
  }

  private async _initializeUserLockService(user: string, password: string): Promise<void> {
    this._srvUserLockInstance = await this._initializeService(this._srvUserLockInstance, "APS_IAM_MUS_V2UI", user, password);
  }

  private async _initializeSearchService(user: string, password: string): Promise<void> {
    this._srvEshInstance = await this._initializeService(this._srvEshInstance, "ESH_SEARCH_SRV", user, password);
  }

  private async _fetchUserInfo(): Promise<UserInfo> {
    try {
      const users = await service.odata.get(this._srvEshInstance, "Users", {});
      return users[0] as UserInfo;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }
  }

  private _extractClientFromUrl(url: string): string {
    const match = url.match(/(?<=[a-zA-Z]{3}-)\d+/);
    if (match) return match[0];
    throw new Error("Client number not found in the URL");
  }

  private async _getLockEntries(): Promise<any> {
    return service.odata.get(this._srvUserLockInstance, "Session", this._requestOptions);
  }

  private async _deleteLockEntries(): Promise<void> {
    const response = await service.odata.callFunctionImport(this._srvUserLockInstance, "delete_session", this._requestOptions, true);

    const sapMessage = JSON.parse(response.headers.get("sap-message"));
    if (sapMessage?.message === "Sessions deleted successfully") {
      util.console.success(`Locks for user '${this._requestOptions.UserId}' have been deleted.`);
    }
  }
}

export default new UserLocks();
