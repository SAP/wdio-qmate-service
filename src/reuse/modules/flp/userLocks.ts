"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

type UserInfo = {
  Id: string;
  Name: string;
};

/**
 * @class userLocks
 * @memberof flp
 */
export class UserLocks {
  // Private Properties
  private vlf = new VerboseLoggerFactory("util", "userLocks");
  private _srvUserLockInstance: any = null;
  private _srvEshInstance: any = null;

  private _requestOptions = {
    Client: "",
    UserId: "",
    SessionId: ""
  };

  // Public Functions
  /**
   * @function getNumberOfLockEntries
   * @memberOf flp.userLocks
   * @description Gets the number of lock entries for the given user.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @param {String} [technicalUserId] - The technical user ID.
   * @returns {Promise<Number>} The number of lock entries.
   * @example const lockCount = await flp.userLocks.getNumberOfLockEntries("user", "password");
   */
  public async getNumberOfLockEntries(user: string, password: string, technicalUserId?: string): Promise<number> {
    let resolvedUserId = technicalUserId;
    let resolvedUserName = user;

    if (!resolvedUserId) {
      // If no technicalUserId is provided, get it using the search service
      await this._initializeSearchService(user, password);
      const userInfo = await this._getUserInfo();
      resolvedUserId = userInfo.Id;
      resolvedUserName = userInfo.Name;
    }

    // Initialize the User Lock Service
    await this._initializeUserLockService(user, password);

    // Extract client and prepare request options
    const client = this._extractClientFromUrl(browser.config.params.systemUrl);
    this._initializeRequestOptions(client, resolvedUserId);

    const sessions = await this._getSession();
    const lockCount = this._getLockCount(sessions);

    if (lockCount > 0) {
      util.console.warn(`User '${resolvedUserName}' with ID '${resolvedUserId}' has ${lockCount} lock/s.`);
      //if there are locks, set the session ID to the first session, since it is needed for deletion.
      this._requestOptions.SessionId = this._getSessionId(sessions);
    } else {
      util.console.info(`User '${resolvedUserName}' with ID '${resolvedUserId}' has no locks.`);
    }
    return lockCount;
  }

  /**
   * @function deleteExistingLockEntries
   * @memberOf flp.userLocks
   * @description Deletes the existing lock entries for the given user.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @param {String} [technicalUserId] - The technical user ID.
   * @example await flp.userLocks.deleteExistingLockEntries("user", "password");
   */
  public async deleteExistingLockEntries(user: string, password: string, technicalUserId?: string): Promise<void> {
    const lockCount = await this.getNumberOfLockEntries(user, password, technicalUserId);
    if (lockCount > 0) {
      await this._deleteLockEntries();
    }
  }

  // Private Functions
  /**
   * @private
   * @function getLockCount
   * @memberOf flp.userLocks
   * @description Gets the number of locks for the user on the same session.
   * @param {Array} sessions - The sessions.
   * @returns {Number} The number of locks.
   * @example const lockCount = flp.userLocks.getLockCount(sessions);
   */
  private _getLockCount(sessions: Array<any>): number {
    if (sessions.length > 0) {
      return sessions[0].NumberOfLocks; //Always uses the first session.
    } else {
      return 0;
    }
  }

  /**
   * @private
   * @function _getSessionId
   * @memberOf flp.userLocks
   * @description Gets the session ID.
   * @param {Array} sessions - The sessions.
   * @returns {String} The session ID.
   * @example const sessionId = flp.userLocks.getSessionId(sessions);
   */
  private _getSessionId(sessions: Array<any>): string {
    return sessions[0].SessionId;
  }

  /**
   * @private
   * @function _initializeService
   * @memberOf flp.userLocks
   * @description Initializes the service.
   * @param {Object} instance - The service instance.
   * @param {String} serviceName - The service name.
   * @param {String} user - The user name.
   * @param {String} [password] - The password.
   * @returns {Promise<Object>} The service instance.
   */
  private async _initializeService(instance: any, serviceName: string, user: string, password: string = "Welcome1!"): Promise<Object> {
    if (!instance) {
      const params = browser.config.params;
      if (!params?.systemUrl || !user || !password) {
        throw new Error("System URL or credentials are missing in the config file.");
      }

      try {
        instance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/sap/${serviceName}`, user, password);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to initialize service: ${errorMessage}`);
      }
    }
    return instance;
  }

  /**
   * @private
   * @function _initializeUserLockService
   * @memberOf flp.userLocks
   * @description Initializes the User Lock Service.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @returns {Promise<void>}
   */
  private async _initializeUserLockService(user: string, password: string): Promise<void> {
    this._srvUserLockInstance = await this._initializeService(this._srvUserLockInstance, "APS_IAM_MUS_V2UI", user, password);
  }

  /**
   * @private
   * @function _initializeSearchService
   * @memberOf flp.userLocks
   * @description Initializes the Search Service.
   * @param {String} user - The user name.
   * @param {String} password - The password.
   * @returns {Promise<void>}
   */
  private async _initializeSearchService(user: string, password: string): Promise<void> {
    this._srvEshInstance = await this._initializeService(this._srvEshInstance, "ESH_SEARCH_SRV", user, password);
  }

  /**
   * @private
   * @function _initializeRequestOptions
   * @memberOf flp.userLocks
   * @description Initializes the request options.
   * @param {String} client - The client number.
   * @param {String} userId - The user ID.
   * @param {String} [sessionId] - The session ID.
   * @returns {void}
   */
  private _initializeRequestOptions(client: string, userId: string, sessionId: string = "*"): void {
    this._requestOptions = {
      Client: client,
      UserId: userId,
      SessionId: sessionId
    };
  }

  /**
   * @private
   * @function _getUserInfo
   * @memberOf flp.userLocks
   * @description Gets the user info.
   * @returns {Promise<UserInfo>} The user info.
   * @throws {Error} If the user info cannot be retrieved.
   * @example const userInfo = await flp.userLocks._getUserInfo();
   * @example util.console.log(userInfo.Id);
   * @example util.console.log(userInfo.Name);
   */
  private async _getUserInfo(): Promise<UserInfo> {
    try {
      const users = await service.odata.get(this._srvEshInstance, "Users", {});
      return users[0] as UserInfo;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to get user info: ${errorMessage}`);
    }
  }

  /**
   * @private
   * @function _extractClientFromUrl
   * @memberOf flp.userLocks
   * @description Extracts the client number from the URL.
   * @param {String} url - The URL.
   * @returns {String} The client number.
   * @throws {Error} If the client number cannot be found in the URL.
   * @example const client = flp.userLocks.extractClientFromUrl("https://www-123.example.com");
   * @example console.log(client);
   * @example // Output: 123
   */
  private _extractClientFromUrl(url: string): string {
    const regex = /https:\/\/\w{3}-(\d{3})\./;
    const match = url.match(regex);
    if (match) return match[1];
    throw new Error("Client number not found in the URL");
  }

  /**
   * @private
   * @function _getSession
   * @memberOf flp.userLocks
   * @description Gets the session.
   * @returns {Promise<any>} The session.
   * @example const session = await flp.userLocks.getSession();
   */
  private async _getSession(): Promise<any> {
    return service.odata.get(this._srvUserLockInstance, "Session", {});
  }

  /**
   * @private
   * @function _deleteLockEntries
   * @memberOf flp.userLocks
   * @description Deletes the lock entries.
   * @returns {Promise<void>}
   * @example await flp.userLocks.deleteLockEntries();
   */
  private async _deleteLockEntries(): Promise<void> {
    const response = await service.odata.callFunctionImport(this._srvUserLockInstance, "delete_session", this._requestOptions, true);

    const sapMessage = JSON.parse(response.headers.get("sap-message"));
    if (sapMessage?.message === "Sessions deleted successfully") {
      util.console.info(`Locks for user '${this._requestOptions.UserId}' have been deleted.`);
    }
  }
}

export default new UserLocks();
