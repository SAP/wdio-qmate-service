import {FilterFactory} from "../utils/FilterFactory";
import { LocatorDebug } from "../utils/LocatorDebug";

export abstract class BaseFilter {
  elementProperties: ElementProperties;
  filterFactory: FilterFactory;
  results: { [controlId: string]: boolean };

  constructor(filterFactory:FilterFactory, rawElementProperties: ElementProperties | undefined) {
    this.elementProperties = this.convertRawElementPropertiesToElementProperties(rawElementProperties);
    this.filterFactory = filterFactory;
    this.results = {};
  }

  private convertRawElementPropertiesToElementProperties(rawElementProperties: ElementProperties | undefined): ElementProperties {
    // needed for backward compatibility
    let elementProperties = { ...rawElementProperties };
    if (typeof rawElementProperties?.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      } as ElementProperties;
      delete elementProperties.mProperties;
    }
    return elementProperties;
  }

  public filter(controls: UI5Control[]): UI5Control[] {
    if (Object.keys(this.elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = this._doFiltering(controls);
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }

  protected _doFiltering(controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => this.checkSingle(control));
  }

  public checkSingle(control: UI5Control): boolean {
    if (Object.keys(this.elementProperties).length === 0) {
      return true;
    }
    if (!control) {
      return false;
    }
    const controlID = control.getId();
    if (!this.results.hasOwnProperty(controlID)) {
      this.results[controlID] = this._doCheckSingle(control);
    }
    return this.results[controlID];
  }

  protected abstract _doCheckSingle(control: UI5Control): boolean;
}
