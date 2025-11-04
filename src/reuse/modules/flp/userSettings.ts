"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class userSettings
 * @memberof flp
 */

export class UserSettings {
  private vlf = new VerboseLoggerFactory("util", "userSettings");
  private _srvInstance = null;

  /**
   * @private
   * @function _initS4UserSettingService
   * @memberOf flp.userSettings
   * @description Initializes the S4 User Setting Service.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings._initS4UserSettingService("user", "password");
   * @returns {Promise<void>} A promise that resolves when the service has been initialized.
   */
  private async _initS4UserSettingService(user: string, password: string): Promise<void> {
    if (!this._srvInstance) {
      const vl = this.vlf.initLog(await this._initS4UserSettingService);
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

  /**
   * @function setLanguageFromUserSettings
   * @memberOf flp.userSettings
   * @description Sets the environment variable 'USER_SETTINGS_LANG_KEY' language from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setLanguageFromUserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the language has been set.
   */
  public async setLanguageFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setLanguageFromUserSettings);
    await this._initS4UserSettingService(user, password);
    process.env.USER_SETTINGS_LANG_KEY = await this._getLanguageResponse(this._srvInstance);
    util.console.info(`Language Key: ${process.env.USER_SETTINGS_LANG_KEY} was set.`);
  }

  /**
   * @function setDateFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Sets the environment variable 'USER_SETTINGS_DATE_FORMAT' date format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setDateFormatFromUserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the date format has been set.
   */
  public async setDateFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setDateFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    process.env.USER_SETTINGS_DATE_FORMAT = await this._getDateFormatsResponse(this._srvInstance); //removes: the whitespace characters 0-* and the brackets including the content of the brackets.
    util.console.info(`Date Format: ${process.env.USER_SETTINGS_DATE_FORMAT} was set.`);
  }
  /**
   * @function setTimeFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Sets the environment variable 'USER_SETTINGS_DATE_FORMAT' time format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setTimeFormatFromUserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the time format has been set.
   */
  public async setTimeFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    process.env.USER_SETTINGS_TIME_FORMAT = await this._getTimeFormatResponse(this._srvInstance);
    util.console.info(`Time Format: ${process.env.USER_SETTINGS_TIME_FORMAT} was set.`);
  }

  /**
   * @function setTimeZoneFromUserSettings
   * @memberOf flp.userSettings
   * @description Sets the environment variable 'USER_SETTINGS_TIME_ZONE' time zone from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setTimeZoneFromUserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the time zone has been set.
   */
  public async setTimeZoneFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setTimeZoneFromUserSettings);
    await this._initS4UserSettingService(user, password);
    const res = await service.odata.get(this._srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
    process.env.USER_SETTINGS_TIME_ZONE = await this._getTimeZoneResponse(this._srvInstance);
    util.console.info(`Time Zone: ${process.env.USER_SETTINGS_TIME_ZONE} was set.`);
  }

  /**
   * @function setNumberFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Sets the environment variable 'USER_SETTINGS_NUMBER_FORMAT' number format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setNumberFormatFromUserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the number format has been set.
   */
  public async setNumberFormatFromUserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setNumberFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    process.env.USER_SETTINGS_NUMBER_FORMAT = await this._getNumberFormatResponse(this._srvInstance);
    util.console.info(`Number Format: ${process.env.USER_SETTINGS_NUMBER_FORMAT} was set.`);
  }

  /**
   * @function setS4UserSettings
   * @memberOf flp.userSettings
   * @description Sets the user settings for S4.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example await flp.userSettings.setS4UserSettings("user", "password");
   * @returns {Promise<void>} A promise that resolves when the user settings have been set.
   */
  public async setS4UserSettings(user: string, password: string) {
    const vl = this.vlf.initLog(this.setS4UserSettings);
    try {
      await this._initS4UserSettingService(user, password);
      await this.setDateFormatFromUserSettings(user, password);
      await this.setLanguageFromUserSettings(user, password);
      await this.setNumberFormatFromUserSettings(user, password);
      await this.setTimeFormatFromUserSettings(user, password);
      await this.setTimeZoneFromUserSettings(user, password);
    } catch (error) {
      vl.log(`Function: 'setUserSettingsForS4' failed: Unable to set the UserSettings: ${error}`);
    }
  }

  /**
   * @function getLanguageFromUserSettings
   * @memberOf flp.userSettings
   * @description Gets the language from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example const language = await flp.userSettings.getLanguageFromUserSettings("user", "password");
   * @returns {Promise<String>} The language from user settings.
   */
  public async getLanguageFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getLanguageFromUserSettings);
    await this._initS4UserSettingService(user, password);
    return await this._getLanguageResponse(this._srvInstance);
  }

  /**
   * @function getDateFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Gets the date format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example const dateFormat = await flp.userSettings.getDateFormatFromUserSettings("user", "password");
   * @returns {Promise<String>} The date format from user settings.
   */
  public async getDateFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getDateFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    return await this._getDateFormatsResponse(this._srvInstance);
  }

  /**
   * @function getTimeFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Gets the time format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example const timeFormat = await flp.userSettings.getTimeFormatFromUserSettings("user", "password");
   * @returns {Promise<String>} The time format from user settings.
   */
  public async getTimeFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getTimeFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    return await this._getTimeFormatResponse(this._srvInstance);
  }

  /**
   * @function getTimeZoneFromUserSettings
   * @memberOf flp.userSettings
   * @description Gets the time zone from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example const timeZone = await flp.userSettings.getTimeZoneFromUserSettings("user", "password");
   * @returns {Promise<String>} The time zone from user settings.
   */
  public async getTimeZoneFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getTimeZoneFromUserSettings);
    await this._initS4UserSettingService(user, password);
    return await this._getTimeZoneResponse(this._srvInstance);
  }

  /**
   * @function getNumberFormatFromUserSettings
   * @memberOf flp.userSettings
   * @description Gets the number format from user settings.
   * @param {String} user - The username for authentication.
   * @param {String} password - The password for authentication.
   * @example const numberFormat = await flp.userSettings.getNumberFormatFromUserSettings("user", "password");
   * @returns {Promise<String>} The number format from user settings.
   */
  public async getNumberFormatFromUserSettings(user: string, password: string): Promise<string> {
    const vl = this.vlf.initLog(this.getNumberFormatFromUserSettings);
    await this._initS4UserSettingService(user, password);
    return await this._getNumberFormatResponse(this._srvInstance);
  }

  /**
   * @private
   * @function _getTimeZoneResponse
   * @memberOf flp.userSettings
   * @description Gets the time zone from user settings.
   * @param {Object} srvInstance - The service instance.
   * @example const timeZone = await flp.userSettings._getTimeZoneResponse(srvInstance);
   * @returns {Promise<String>} The time zone from user settings.
   * @throws {Error} Thrown if the time zone could not be retrieved.
   */
  private async _getTimeZoneResponse(srvInstance: any): Promise<string> {
    try {
      const res = await service.odata.get(srvInstance, "UserProfileProperties", { id: "TIME_ZONE", shellType: "FLP" });
      return res.value.replace("/", ", ");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Time Zone from User Settings: ${error.message}.`);
      } else {
        throw new Error("Failed to get Time Zone from User Settings.");
      }
    }
  }

  /**
   * @private
   * @function _getTimeFormatResponse
   * @memberOf flp.userSettings
   * @description Gets the time format from user settings.
   * @param {Object} srvInstance - The service instance.
   * @example const timeFormat = await flp.userSettings._getTimeFormatResponse(srvInstance);
   * @returns {Promise<String>} The time format from user settings.
   * @throws {Error} Thrown if the time format could not be retrieved.
   */
  private async _getTimeFormatResponse(srvInstance: any): Promise<string> {
    try {
      const res = await service.odata.get(srvInstance, "UserProfileProperties", { id: "TIME_FORMAT", shellType: "FLP" });
      const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "TIME_FORMAT", shellType: "FLP", value: res.value });
      return resUserData.description.replace(/\s*\(.*?\)$/, "");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Time Format from User Settings: ${error.message}.`);
      } else {
        throw new Error("Failed to get Time Format from User Settings.");
      }
    }
  }

  /**
   * @private
   * @function _getDateFormatsResponse
   * @memberOf flp.userSettings
   * @description Gets the date format from user settings.
   * @param {Object} srvInstance - The service instance.
   * @example const dateFormat = await flp.userSettings._getDateFormatsResponse(srvInstance);
   * @returns {Promise<String>} The date format from user settings.
   * @throws {Error} Thrown if the date format could not be retrieved.
   */
  private async _getDateFormatsResponse(srvInstance: any): Promise<string> {
    try {
      const res = await service.odata.get(srvInstance, "UserProfileProperties", { id: "DATE_FORMAT", shellType: "FLP" });
      const resUserData = await service.odata.get(this._srvInstance, "UserProfilePropertyValues", { id: "DATE_FORMAT", shellType: "FLP", value: res.value });
      return resUserData.description.replace(/\s*\(.*?\)$/, "");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Date Format from User Settings: ${error.message}.`);
      } else {
        throw new Error("Failed to get Date Format from User Settings.");
      }
    }
  }

  /**
   * @private
   * @function _getLanguageResponse
   * @memberOf flp.userSettings
   * @description Gets the language from user settings.
   * @param {Object} srvInstance - The service instance.
   * @example const language = await flp.userSettings._getLanguageResponse(srvInstance);
   * @returns {Promise<String>} The language from user settings.
   * @throws {Error} Thrown if the language could not be retrieved.
   */
  private async _getLanguageResponse(srvInstance: any): Promise<string> {
    try {
      const res = await service.odata.get(srvInstance, "UserProfileProperties", { id: "LANGUAGE", shellType: "FLP" });
      return res.value;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Language from User Settings: ${error.message}.`);
      } else {
        throw new Error("Failed to get Language from User Settings.");
      }
    }
  }

  /**
   * @private
   * @function _getNumberFormatResponse
   * @memberOf flp.userSettings
   * @description Gets the number format from user settings.
   * @param {Object} srvInstance - The service instance.
   * @example const numberFormat = await flp.userSettings._getNumberFormatResponse(srvInstance);
   * @returns {Promise<String>} The number format from user settings.
   * @throws {Error} Thrown if the number format could not be retrieved.
   */
  private async _getNumberFormatResponse(srvInstance: any): Promise<string> {
    try {
      const res = await service.odata.get(srvInstance, "UserProfileProperties", { id: "NUMBER_FORMAT", shellType: "FLP" });
      const resUserData = await service.odata.get(srvInstance, "UserProfilePropertyValues", { id: "NUMBER_FORMAT", shellType: "FLP", value: res.value });
      return resUserData.description.replace(/\s*\(.*?\)$/, "");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Number Format from User Settings: ${error.message}.`);
      } else {
        throw new Error("Failed to get Number Format from User Settings.");
      }
    }
  }
}
export default new UserSettings();
