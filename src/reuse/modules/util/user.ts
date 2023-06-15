"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class user
 * @memberof util
 */

export class User {
  private vlf = new VerboseLoggerFactory("util", "user");
  private _srvInstance = null;

  private async _initForUserSetting(user: string, password: string): Promise<any> {
    const vl = this.vlf.initLog(this._initForUserSetting);
    this._srvInstance = await service.odata.init(`${browser.config.params.systemUrl}/sap/opu/odata/UI2/INTEROP`, user, password);
  }

  public async getLanguage(user: string, password: string) {
    const vl = this.vlf.initLog(this.getLanguage);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "LANGUAGE", shellType: "FLP" });
    process.env.USER_SETTINGS_LANG_KEY = res.value;
  }

  public async getDateFormat(user: string, password: string) {
    const vl = this.vlf.initLog(this.getDateFormat);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "DATE_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "DATE_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_DATE_FORMAT = resUserData.description;
  }

  public async getTimeFormat(user: string, password: string) {
    const vl = this.vlf.initLog(this.getTimeFormat);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "TIME_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_TIME_FORMAT = resUserData.description;
  }

  public async getTimeZone(user: string, password: string) {
    const vl = this.vlf.initLog(this.getTimeZone);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
    process.env.USER_SETTINGS_TIME_ZONE = res.value.replace("/", ", ");
  }

  public async getNumberFormat(user: string, password: string) {
    const vl = this.vlf.initLog(this.getNumberFormat);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "NUMBER_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "NUMBER_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_NUMBER_FORMAT = resUserData.description;
  }

  public async setUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setUserSettings);
    try {
      await this.getDateFormat(user, password);
      await this.getLanguage(user, password);
      await this.getNumberFormat(user, password);
      await this.getTimeFormat(user, password);
      await this.getTimeZone(user, password);
    } catch (error) {
      throw new Error("function: 'setUserSettings' failed: Unable to set the user settings.")
    }

  }
}
export default new User();
