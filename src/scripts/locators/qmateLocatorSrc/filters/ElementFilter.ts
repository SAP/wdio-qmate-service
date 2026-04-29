import { AncestorFilter } from "./AncestorFilter";
import { DescendantFilter } from "./DescendantFilter";
import { SiblingFilter } from "./SiblingFilter";
import { PropertiesFilter } from "./PropertiesFilter";
import { ChildFilter } from "./ChildFilter";
import { ParentFilter } from "./ParentFilter";
import { PrevSiblingFilter } from "./PrevSiblingFilter";
import { NextSiblingFilter } from "./NextSiblingFilter";
import { BaseFilter } from "./BaseFilter";
import { FilterFactory } from "../utils/FilterFactory";
import { Ui5Selector } from "../../../../reuse/modules/ui5/types/ui5.types";

type Constructor<Class = {}> = new (...arg: any[]) => Class
const filtersMap: {prop: keyof Ui5Selector, filter: Constructor<BaseFilter>}[] = [
  {prop: "ancestorProperties", filter: AncestorFilter},
  {prop: "descendantProperties", filter: DescendantFilter},
  {prop: "siblingProperties", filter: SiblingFilter},
  {prop: "parentProperties", filter: ParentFilter},
  {prop: "childProperties", filter: ChildFilter},
  {prop: "prevSiblingProperties", filter: PrevSiblingFilter},
  {prop: "nextSiblingProperties", filter: NextSiblingFilter},
]

export class ElementFilter extends BaseFilter {
  protected doFiltering(controls: UI5Control[]): UI5Control[] {
    const props = this.elementProperties as ElementProperties;
    let filteredControls = this.filterFactory.getInstance(PropertiesFilter, props).filter(controls);
    for(const {prop, filter} of filtersMap) {
      filteredControls = this.filterFactory.getInstance(filter, props[prop]).filter(filteredControls);
    }
    return filteredControls;
  }

  public doCheckSingle(control: UI5Control): boolean {
    const props = this.elementProperties as ElementProperties;
    let pass = this.filterFactory.getInstance(PropertiesFilter, props).checkSingle(control);
    for(const {prop, filter} of filtersMap) {
      pass &&= this.filterFactory.getInstance(filter, props[prop]).checkSingle(control);
    }
    return pass;
  }

  public static filterBySelector(ui5Selector: UI5Selector, controls: UI5Control[]): UI5Control[] {
    const filterFactory = new FilterFactory();

    let validUi5Controls = filterFactory.getInstance(ElementFilter, ui5Selector.elementProperties).filter(controls);
    for(const {prop, filter} of filtersMap) {
      validUi5Controls = filterFactory.getInstance(filter, ui5Selector[prop]).filter(validUi5Controls);
    }
    return validUi5Controls;
  }
}
