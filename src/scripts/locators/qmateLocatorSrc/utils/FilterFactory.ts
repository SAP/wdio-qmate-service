import { BaseFilter } from "../filters/BaseFilter";

// should take a class type and elementProperties and create an instance of the class
// if none has been created for the same class type and elementProperties
// if a class type has been created for the same elementProperties and class type, return the instance
export class FilterFactory {
  public instances: { [key: string]: BaseFilter } = {};

  public getInstance<T extends BaseFilter>(classType: new (...args: any[]) => T, elementProperties: ElementProperties|undefined): T {
    const key = `${classType.name}-${JSON.stringify(elementProperties)}`;
    if (!this.instances[key]) {
      this.instances[key] = new classType(this, elementProperties);
    }
    return this.instances[key] as T;
  }
}
