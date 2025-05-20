import { LocatorDebug } from "../utils/LocatorDebug";

export abstract class BaseFilter {
  public filter(elementProperties: ElementProperties | undefined, controls: UI5Control[]): UI5Control[] {
    if (!elementProperties || Object.keys(elementProperties).length === 0 || controls.length === 0) {
      return controls;
    }
    LocatorDebug.beginLog(this.constructor.name, controls.length);
    const filteredControls = this.doFiltering(elementProperties, controls);
    LocatorDebug.endLog(this.constructor.name, filteredControls.length);

    return filteredControls;
  }

  public abstract doFiltering(elementProperties: ElementProperties, controls: UI5Control[]): UI5Control[];
}
