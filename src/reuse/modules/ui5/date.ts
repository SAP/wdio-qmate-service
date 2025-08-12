"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import { DateFormats } from "../util/constants/formatter.constants";
import { Ui5Selector } from "./types/ui5.types";

type PickerMetadata = "sap.m.DatePicker" | "sap.m.DateTimePicker" | "sap.m.DateRangeSelection";

class DatePickerSelectorParams {
  selector: Ui5Selector = { elementProperties: { metadata: "sap.m.DatePicker" } };
  index: number = 0;
  metadata: PickerMetadata = "sap.m.DatePicker";
}

/**
 * @class date
 * @memberof ui5
 */
export class DateModule {
  private vlf = new VerboseLoggerFactory("ui5", "date");

  // =================================== PICK ===================================
  /**
   * @function pick
   * @memberOf ui5.date
   * @description Picks the passed date using the "DatePicker" with the given selector.
   * @param {Selector} selector - The selector describing the element.
   * @param {Date} date - The date object.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example const today = await common.date.calculate("today");
   * await ui5.date.pick(selector, today);
   */
  async pick(selector: any, date: Date, index: number = 0) {
    const vl = this.vlf.initLog(this.pick);
    vl.log(`Picking date ${date} for selector ${selector}`);
    const datePickerSelector = await this._constructDatePickerSelector({ selector, index, metadata: "sap.m.DatePicker" });
    await this._openDatePicker(datePickerSelector);
    await this._selectDate(datePickerSelector, date);
  }

  /**
   * @function pickRange
   * @memberOf ui5.date
   * @description Picks the passed date range using the "DatePicker" with the given selector.
   * Note that this will only work within the current month!
   * @param {Selector} selector - The selector describing the element.
   * @param {Object[]} range - The array of date objects containing start- and end date.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example const start = await common.date.calculate("2020, 9, 20");
   * const end = await common.date.calculate("2021, 1, 3");
   * const range = [start, end];
   * await ui5.date.pickRange(selector, range);
   */
  async pickRange(selector: any, range: Date[], index = 0) {
    const vl = this.vlf.initLog(this.pickRange);
    vl.log(`Picking date range ${range} for selector ${selector}`);
    const datePickerSelector = await this._constructDatePickerSelector({ selector, index, metadata: "sap.m.DateRangeSelection" });
    await this._openDatePicker(datePickerSelector);
    await this._selectDate(datePickerSelector, range[0]);
    await this._selectDate(datePickerSelector, range[1]);
  }

  /**
   * @function pickWithTime
   * @memberOf ui5.date
   * @description Picks the passed date with time using the "DateTimePicker" with the given selector.
   * @param {Selector} selector - The selector describing the element.
   * @param {Date} date - The date object.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example const tomorrowMorning = await common.date.calculateWithTime("tomorrow", "09:30:45");
   * await ui5.date.pickWithTime(selector, tomorrowMorning);
   */
  async pickWithTime(selector: any, date: Date, index = 0) {
    const vl = this.vlf.initLog(this.pickWithTime);
    vl.log(`Picking date with time ${date} for selector ${selector}`);
    const datePickerSelector = await this._constructDatePickerSelector({ selector, index, metadata: "sap.m.DateTimePicker" });
    await this._openDatePicker(datePickerSelector);
    await this._selectDate(datePickerSelector, date);
    await this._selectTime(date);
    await this._clickOk();
  }

  // =================================== FILL ===================================
  /**
   * @function fillRange
   * @memberOf ui5.date
   * @description Enters the passed date range to the date input with the given selector by providing the start- and end date.
   * @param {Selector} selector - The selector describing the element.
   * @param {Object[]} range - The array of date objects containing start- and end date.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @example const start = await common.date.calculate("2020, 9, 20", "dd.mm.yyyy");
   * const end = await common.date.calculate("2021, 1, 3", "dd.mm.yyyy");
   * const range = [start, end];
   * await ui5.date.fillRange(selector, range);
   */
  async fillRange(selector: any, range: Date[], index: number = 0) {
    const vl = this.vlf.initLog(this.fillRange);
    const value = range[0] + " - " + range[1];
    await ui5.userInteraction.clearAndFill(selector, value, index);
  }

  // =================================== HELPER ===================================
  private async _constructDatePickerSelector(params: DatePickerSelectorParams) {
    let id = await ui5.element.getId(params.selector, params.index);
    if (params.selector.elementProperties.metadata === "sap.ui.core.Icon") {
      id = id.replace("-icon", "");
    }
    return {
      elementProperties: {
        metadata: params.metadata,
        id: id
      }
    };
  }

  private async _openDatePicker(selector: Ui5Selector) {
    const vl = this.vlf.initLog(this._openDatePicker);
    const id = selector.elementProperties.id;
    const icon = await nonUi5.element.getById(`${id}-icon`);
    await nonUi5.userInteraction.click(icon);
  }

  private async _selectDate(selector: Ui5Selector, date: Date) {
    const vl = this.vlf.initLog(this._selectDate);
    const year = date.getFullYear();
    const month = date.getMonth();

    let found = false;

    const id = selector.elementProperties.id;

    const value = await ui5.element.getValue(selector);

    const currentDate = new Date(value);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (year !== currentYear) {
      const yearOverview = await nonUi5.element.getById(`${id}-cal--Head-B2`);
      await nonUi5.userInteraction.click(yearOverview);

      while (!found) {
        const yearSpanElem = await nonUi5.element.getById(`${id}-cal--Head-B2`);
        const yearSpan = await yearSpanElem.getText();
        const yearMin = yearSpan.slice(0, 4);
        const yearMax = yearSpan.slice(7, 11);
        if (year < Number(yearMin)) {
          const prev = await nonUi5.element.getById(`${id}-cal--Head-prev`);
          await nonUi5.userInteraction.click(prev);
        } else if (year > Number(yearMax)) {
          const next = await nonUi5.element.getById(`${id}-cal--Head-next`);
          await nonUi5.userInteraction.click(next);
        } else {
          found = true;
        }
      }
      const yearPick = await nonUi5.element.getByCss(`[id*="${id}-cal--YP-y${year}"]`);
      await nonUi5.userInteraction.click(yearPick);
    }

    if (month !== currentMonth) {
      const monthOverview = await nonUi5.element.getById(`${id}-cal--Head-B1`);
      await nonUi5.userInteraction.click(monthOverview);

      const monthPick = await nonUi5.element.getByCss(`[id*="${id}-cal--MP-m${month}"]`);
      await nonUi5.userInteraction.click(monthPick);
    }

    const dayPick = await nonUi5.element.getByCss(`[id="${id}-cal"] .sapUiCalItem[data-sap-day="${util.formatter.formatDate(date, DateFormats.YEAR_MONTH_DAY_PLAIN)}"] .sapUiCalItemText`);
    await nonUi5.userInteraction.click(dayPick);
  }

  private async _selectTime(date: Date) {
    const vl = this.vlf.initLog(this._selectTime);
    await this._selectAmPm(date.getHours() < 12 ? "AM" : "PM");
    await this._selectHours(date.getHours());
    await this._selectMinutes(date.getMinutes());
    await this._selectSeconds(date.getSeconds());
  }

  private async _clickOk() {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.DateTimePicker.Group",
        "metadata": "sap.m.Button",
        "text": "OK"
      }
    };
    await ui5.userInteraction.click(selector);
  }

  private async _selectAmPm(amPm: "AM" | "PM") {
    const vl = this.vlf.initLog(this._selectAmPm);
    const amPmSelector = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "text": amPm
      }
    };
    await ui5.userInteraction.click(amPmSelector);
  }

  private async _selectHours(hours: number) {
    const vl = this.vlf.initLog(this._selectHours);
    await ui5.userInteraction.click({
      "elementProperties": {
        "metadata": "sap.m.internal.ToggleSpinButton",
        "id": "*Clocks-btnH"
      }
    });
    await common.userInteraction.pressKey(
      util.formatter.addRemoveLeadingZeros(
        (hours % 12).toString(),
        2
      )
    );
  }

  private async _selectMinutes(minutes: number) {
    const vl = this.vlf.initLog(this._selectMinutes);
    await ui5.userInteraction.click({
      "elementProperties": {
        "metadata": "sap.m.internal.ToggleSpinButton",
        "id": "*Clocks-btnM"
      }
    });
    await common.userInteraction.pressKey(
      util.formatter.addRemoveLeadingZeros(minutes.toString(), 2)
    );
  }

  private async _selectSeconds(seconds: number) {
    const vl = this.vlf.initLog(this._selectSeconds);
    try {
      await ui5.userInteraction.click({
        "elementProperties": {
          "metadata": "sap.m.internal.ToggleSpinButton",
          "id": "*Clocks-btnS"
        }
      });
      await common.userInteraction.pressKey(util.formatter.addRemoveLeadingZeros(seconds.toString(), 2));
    } catch (error) {
      vl.log("Cannot select seconds on this calendar, moving on.");
    }
  }
}
export default new DateModule();
