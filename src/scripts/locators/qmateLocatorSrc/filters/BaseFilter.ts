import { LocatorDebug } from "../utils/LocatorDebug";

export abstract class BaseFilter {
  private convertRawElementPropertiesToElementProperties(rawElementProperties: ElementProperties | undefined): ElementProperties | undefined {
    // needed for backward compatibility
    let elementProperties = rawElementProperties;
    if (typeof rawElementProperties?.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      } as ElementProperties;
      delete elementProperties.mProperties;
    }
    return elementProperties;
  }

  public filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    const elementProperties = this.convertRawElementPropertiesToElementProperties(rawElementProperties);

    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = this._doFiltering(elementProperties, controls);
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }

  protected _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[] {
    return controls.filter((control) => this.checkSingle(elementProperties, control));
  }

  public checkSingle(rawElementProperties: ElementProperties | undefined, control: UI5Control): boolean {
    const elementProperties = this.convertRawElementPropertiesToElementProperties(rawElementProperties);
    if (!elementProperties || Object.keys(elementProperties).length === 0) {
      return true;
    }
    if (!control) {
      return false;
    }
    return this._doCheckSingle(elementProperties, control);
  }

  protected abstract _doCheckSingle(elementProperties: ElementProperties, control: UI5Control): boolean;
}
