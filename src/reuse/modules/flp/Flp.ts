import userSettings, { UserSettings } from "../flp/userSettings";
import userLocks, { UserLocks } from "../flp/userLocks";

export class Flp {
  userSettings: UserSettings = userSettings;
  userLocks: UserLocks = userLocks;
}

export default new Flp();
