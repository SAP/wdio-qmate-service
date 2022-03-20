"use strict";
/**
 * @class date
 * @memberof ui5
 */
const DateModule = function () {

  // =================================== PICK ===================================
  /**
   * @function pick
   * @memberOf ui5.date
   * @description Picks the passed date using the "DatePicker" with the given selector.
   * @param {Selector} selector - The selector describing the element.
   * @param {Date} date - The date object.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @example const today = await common.date.calculate("today");
   * await ui5.date.pick(selector, date);
   */
  this.pick = async function (selector, date, index = 0) {
    let id = await ui5.element.getId(selector, index);
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      id = id.replace("-icon", "");
    }

    const tempSelector = {
      "elementProperties" : {
        "metadata" : "sap.m.DatePicker",
        "id" : id
      }
    };

    await _openDatePicker(tempSelector);
    await _selectDate(tempSelector, date);
  };

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
  this.pickRange = async function (selector, range, index = 0) {
    let id = await ui5.element.getId(selector, index);
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      id = id.replace("-icon", "");
    }

    const tempSelector = {
      "elementProperties" : {
        "metadata" : "sap.m.DateRangeSelection",
        "id" : id
      }
    };
    await _openDatePicker(tempSelector);
    await _selectDate(tempSelector, range[0]);
    await _selectDate(tempSelector, range[1]);
  };

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
  this.fillRange = async function (selector, range, index = 0) {
    const value = range[0] + " - " + range[1];
    await ui5.userInteraction.clearAndFill(selector, value, index);
  };


  // =================================== HELPER ===================================
  async function _openDatePicker(selector) {
    const id = selector.elementProperties.id;
    const icon = await nonUi5.element.getById(`${id}-icon`);
    await nonUi5.userInteraction.click(icon);
  }

  async function _selectDate(selector, date) {
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
        if (year < yearMin) {
          const prev = await nonUi5.element.getById(`${id}-cal--Head-prev`);
          await nonUi5.userInteraction.click(prev);
        } else if (year > yearMax) {
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

    const dayPick = await nonUi5.element.getByCss(`[id="${id}-cal"] .sapUiCalItem[data-sap-day="${util.formatter.formatDate(date, "yyyymmdd")}"] .sapUiCalItemText`);
    await nonUi5.userInteraction.click(dayPick);
  }

};
module.exports = new DateModule();