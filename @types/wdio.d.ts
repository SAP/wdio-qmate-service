// common
type Coordinates = { x: number; y: number };
type Size = { width: number; height: number };

// addValue && setValie
type ValueType = string | number | string[] | number[];
type ValueOptions = { translateToUnicode: boolean };

// click
type ClickOptions = { button?: 0 | "left" | 1 | "middle" | 2 | "right"; x?: number; y?: number };

// dragAndDrop
type DragAndDropTarget = Element | Coordinates;
type DragAndDropOptions = { duration: number };

// getCSSProperty
type GetCSSPropertyReturn = { property: string; value: string; parsed: any };

// getLocation
type LocationPropType = "x" | "y";

// getSize
type GetSizeOptions = "width" | "height";

// moveTo
type MoveToOptions = { xOffset?: number; yOffset?: number };

// react$$
type ReactSelectorOptions = { props?: object; state?: any };

// waitFor
type WaitForOptions = { timeout?: number; reverse?: boolean; timeoutMsg?: string; interval?: number };

export interface Element {
  $(selector: any): Promise<Element>;
  $$(selector: any): Promise<Element[]>;
  addValue(value: ValueType, addValueOptions?: ValueOptions): Promise<void>;
  clearValue(): Promise<void>;
  click(options?: ClickOptions): Promise<void>;
  custom$$(strategyName: string, strategyArguments: any): Promise<Element[]>;
  custom$(strategyName: string, strategyArguments: any): Promise<Element>;
  doubleClick(): Promise<void>;
  dragAndDrop(target: DragAndDropTarget, options?: DragAndDropOptions): Promise<void>;
  getAttribute(attributeName: string): Promise<string>;
  getCSSProperty(cssProperty: string): Promise<GetCSSPropertyReturn>;
  getComputedLabel(): Promise<string>;
  getComputedRole(): Promise<string>;
  getHTML(): Promise<string>;
  getLocation(): Promise<Coordinates>;
  getLocation(prop: LocationPropType): Promise<number>;
  getProperty(property: string): Promise<string>;
  getSize(): Promise<Size>;
  getSize(prop?: GetSizeOptions): Promise<number>;
  getTagName(): Promise<string>;
  getText(): Promise<string>;
  getValue(): Promise<string>;
  isClickable(): Promise<boolean>;
  isDisplayed(): Promise<boolean>;
  isDisplayedInViewport(): Promise<boolean>;
  isEnabled(): Promise<boolean>;
  isEqual(el: Element): Promise<boolean>;
  isExisting(): Promise<boolean>;
  isFocused(): Promise<boolean>;
  isSelected(): Promise<boolean>;
  moveTo(options?: MoveToOptions): Promise<void>;
  nextElement(): Promise<Element>;
  parentElement(): Promise<Element>;
  previousElement(): Promise<Element>;
  react$$(selector: string, options?: ReactSelectorOptions): Promise<Element[]>;
  react$(selector: string, options?: ReactSelectorOptions): Promise<Element>;
  saveScreenshot(path: string): Promise<void>;
  scrollIntoView(options?: any): Promise<void>;
  selectByAttribute(attribute: string, value: string | number): Promise<void>;
  selectByIndex(index: number): Promise<void>;
  selectByVisibleText(text: string | number): Promise<void>;
  setValue(value: ValueType, options?: ValueOptions): Promise<void>;
  shadow$$(selector: string | Function): Promise<Element[]>;
  shadow$(selector: string | Function): Promise<Element>;
  waitForClickable(options?: WaitForOptions);
  waitForDisplayed(options?: WaitForOptions);
  waitForEnabled(options?: WaitForOptions);
  waitForExist(options?: WaitForOptions);
  waitUntil(condition: any, options?: WaitForOptions);

  // wdio-extensions
  getUI5Property(property: string): Promise<any>
  getBindingProperty(property: string): Promise<any>
  getBindingContextPath(): Promise<string>
}
