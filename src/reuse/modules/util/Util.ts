import browser, { Browser } from "./browser";
import console, { Console } from "./console";
import data, { Data } from "./data";
import file, { File } from "./file";
import formatter, { Formatter } from "./formatter";
import functionModule, { FunctionModule } from "./function";
import system, { System } from "./system";
import component, { Component } from "./component";
import userSettings, { UserSettings } from "./userSettings";

interface DataHooksExtended extends Data {
  decrypt: (input: string | Array<string>, options?: { useBase64Input: boolean; useBase64Output: boolean; includeRepoUrl: boolean }) => string;
  privateKeyFound: boolean;
}

export class Util {
  browser: Browser = browser;
  console: Console = console;
  data: DataHooksExtended = data as DataHooksExtended;
  file: File = file;
  formatter: Formatter = formatter;
  function: FunctionModule = functionModule;
  system: System = system;
  component: Component = component;
  userSettings: UserSettings = userSettings;
}

export default new Util();
