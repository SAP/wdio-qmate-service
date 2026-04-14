import { FilterFactory } from "../utils/FilterFactory";
import { LocatorDebug } from "../utils/LocatorDebug";

export abstract class BaseFilter {
  elementProperties: ElementProperties | ElementProperties[];
  filterFactory: FilterFactory;
  results: Map<string, boolean>;

  constructor(filterFactory: FilterFactory, rawElementProperties: ElementProperties | undefined) {
    this.elementProperties = this.convertRawElementPropertiesToElementProperties(rawElementProperties);
    this.filterFactory = filterFactory;
    this.results = new Map();
  }

  // Public
  public filter(controls: UI5Control[]): UI5Control[] {
    const isEmpty = Array.isArray(this.elementProperties) ? this.elementProperties.length === 0 : Object.keys(this.elementProperties).length === 0;
    if (isEmpty || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = this.doFiltering(controls);
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }

  public checkSingle(control: UI5Control): boolean {
    const isEmpty = Array.isArray(this.elementProperties) ? this.elementProperties.length === 0 : Object.keys(this.elementProperties).length === 0;
    if (isEmpty) {
      return true;
    }
    if (!control) {
      return false;
    }
    const controlID = control.getId();
    if (!this.results.has(controlID)) {
      this.results.set(controlID, this.doCheckSingle(control));
    }
    return this.results.get(controlID) as boolean;
  }

  // Protected
  protected abstract doCheckSingle(control: UI5Control): boolean;
  
  protected doFiltering(controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => this.checkSingle(control));
  }

  // Private
  private convertRawElementPropertiesToElementProperties(rawElementProperties: ElementProperties | ElementProperties[] | undefined): ElementProperties | ElementProperties[] {
    if (Array.isArray(rawElementProperties)) {
      return rawElementProperties;
    }
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
}
