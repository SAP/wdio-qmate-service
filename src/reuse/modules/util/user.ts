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

  public async setLanguageFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setLanguageFromUserSettings);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "LANGUAGE", shellType: "FLP" });
    process.env.USER_SETTINGS_LANG_KEY = res.value;
    vl.log(`Language Key: ${process.env.USER_SETTINGS_LANG_KEY} was set.`);
  }

  public async setDateFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setDateFormatFromUserSettings);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "DATE_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "DATE_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_DATE_FORMAT = resUserData.description;
    vl.log(`Date Format: ${process.env.USER_SETTINGS_DATE_FORMAT} was set.`);
  }

  public async setTimeFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeFormatFromUserSettings);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "TIME_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_TIME_FORMAT = resUserData.description;
    vl.log(`Time Format: ${process.env.USER_SETTINGS_TIME_FORMAT} was set.`);
  }

  public async setTimeZoneFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeZoneFromUserSettings);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
    process.env.USER_SETTINGS_TIME_ZONE = res.value.replace("/", ", ");
    vl.log(`Time Zone: ${process.env.USER_SETTINGS_TIME_ZONE} was set.`);
  }

  public async setNumberFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setNumberFormatFromUserSettings);
    if (!this._srvInstance) {
      await this._initForUserSetting(user, password);
    }
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "NUMBER_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "NUMBER_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_NUMBER_FORMAT = resUserData.description;
    vl.log(`Number Format: ${process.env.USER_SETTINGS_NUMBER_FORMAT} was set.`);
  }

  public async setUserSettingsForS4(user: string, password: string) {
    this.vlf.initLog(this.setUserSettingsForS4);
    try {
      await this.setDateFormatFromUserSettings(user, password);
      await this.setLanguageFromUserSettings(user, password);
      await this.setNumberFormatFromUserSettings(user, password);
      await this.setTimeFormatFromUserSettings(user, password);
      await this.setTimeZoneFromUserSettings(user, password);
    } catch (error) {
      util.console.warn(`Function: 'setUserSettingsForS4' failed: Unable to set the UserSettings: ${error}`);
    }
  }
}
export default new User();
