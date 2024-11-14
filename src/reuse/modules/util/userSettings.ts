"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class userSettings
 * @memberof util
 */

export class UserSettings {
  private vlf = new VerboseLoggerFactory("util", "user");
  private _srvInstance = null;

  private async initS4UserSettingService(user: string, password: string): Promise<any> {
    if (!this._srvInstance) {
      const vl = this.vlf.initLog(await this.initS4UserSettingService);
      const params = browser.config.params;
      if (params?.systemUrl) {
        try {
          this._srvInstance = await service.odata.init(`${params.systemUrl}/sap/opu/odata/UI2/INTEROP`, user, password);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Failed to initialize S4 User Setting Service: ${error.message}.`);
          } else {
            throw new Error("Failed to initialize S4 User Setting Service.");
          }
        }
      } else {
        throw new Error("System URL is missing in the config file.");
      }
    }
  }

  public async setLanguageFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setLanguageFromUserSettings);
    await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "LANGUAGE", shellType: "FLP" });
    process.env.USER_SETTINGS_LANG_KEY = res.value;
    util.console.info(`Language Key: ${process.env.USER_SETTINGS_LANG_KEY} was set.`);
  }

  public async setDateFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setDateFormatFromUserSettings);
    await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "DATE_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "DATE_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_DATE_FORMAT = resUserData.description.replace(/\s*\(.*?\)$/, ""); //removes: the whitespace characters 0-* and the brackets including the content of the brackets.
    util.console.info(`Date Format: ${process.env.USER_SETTINGS_DATE_FORMAT} was set.`);
  }

  public async setTimeFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeFormatFromUserSettings);
    await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "TIME_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_TIME_FORMAT = resUserData.description;
    util.console.info(`Time Format: ${process.env.USER_SETTINGS_TIME_FORMAT} was set.`);
  }

  public async setTimeZoneFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeZoneFromUserSettings);
    await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
    process.env.USER_SETTINGS_TIME_ZONE = res.value.replace("/", ", ");
    util.console.info(`Time Zone: ${process.env.USER_SETTINGS_TIME_ZONE} was set.`);
  }

  public async setNumberFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setNumberFormatFromUserSettings);
    await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "NUMBER_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "NUMBER_FORMAT", shellType: "FLP", value: res.value });
    process.env.USER_SETTINGS_NUMBER_FORMAT = resUserData.description;
    util.console.info(`Number Format: ${process.env.USER_SETTINGS_NUMBER_FORMAT} was set.`);
  }

  public async setS4UserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setS4UserSettings);
    try {
      await await this.initS4UserSettingService(user, password);
      await this.setDateFormatFromUserSettings(user, password);
      await this.setLanguageFromUserSettings(user, password);
      await this.setNumberFormatFromUserSettings(user, password);
      await this.setTimeFormatFromUserSettings(user, password);
      await this.setTimeZoneFromUserSettings(user, password);
    } catch (error) {
      vl.log(`Function: 'setUserSettingsForS4' failed: Unable to set the UserSettings: ${error}`);
    }
  }

  public async getLanguageFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getLanguageFromUserSettings);
    await await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "LANGUAGE", shellType: "FLP" });
    return res.value;
  }

  public async getDateFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getDateFormatFromUserSettings);
    await await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "DATE_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "DATE_FORMAT", shellType: "FLP", value: res.value });
    return resUserData.description.replace(/\s*\(.*?\)$/, "");
  }

  public async getTimeFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getTimeFormatFromUserSettings);
    await await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "TIME_FORMAT", shellType: "FLP", value: res.value });
    return resUserData.description;
  }

  public async getTimeZoneFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getTimeZoneFromUserSettings);
    await await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
    return res.value.replace("/", ", ");
  }

  public async getNumberFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getNumberFormatFromUserSettings);
    await await this.initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "NUMBER_FORMAT", shellType: "FLP" });
    const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "NUMBER_FORMAT", shellType: "FLP", value: res.value });
    return resUserData.description;
  }
}
export default new UserSettings();
