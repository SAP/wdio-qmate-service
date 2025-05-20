import { LocatorDebug } from "../utils/LocatorDebug";

export abstract class BaseFilter {
  public filter(rawElementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    // needed for backward compatibility
    let elementProperties = rawElementProperties;
    if (typeof rawElementProperties?.mProperties === "object") {
      elementProperties = {
        ...rawElementProperties,
        ...rawElementProperties.mProperties
      } as ElementProperties;
      delete elementProperties.mProperties;
    }

    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = this._doFiltering(elementProperties, controls);
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }

  public abstract _doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[];
}
