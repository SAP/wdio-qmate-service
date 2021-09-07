/**
 * @class date
 * @memberof ui5
 */
const DateModule = function () {

  // =================================== PICK ===================================
  /**
   * @function pickDate
   * @memberOf ui5.date
   * @description Picks the passed date using the "DatePicker" with the given selector.
   * @param {Selector} selector - The selector describing the element.
   * @param {Date} date - The date object.
   * @example const today = await common.date.calculateDate("today");
   * await ui5.date.pickDate(selector, date);
   */
  this.pickDate = async function (selector, date) {
    await openDatePicker(selector);
    await selectDate(selector, date);
  };

  /**
   * @function pickDateRange
   * @memberOf ui5.date
   * @description Picks the passed date range using the "DatePicker" with the given selector.
   * Note that this will only work within the current month!
   * @param {Selector} selector - The selector describing the element.
   * @param {Object[]} range - The array of date objects containing start- and end date.
   * @example const start = await common.date.calculateDate("2020, 9, 20");
   * const end = await common.date.calculateDate("2021, 1, 3");
   * const range = [start, end];
   * await ui5.date.pickDateRange(selector, range);
   */
  this.pickDateRange = async function (selector, range) {
    await openDatePicker(selector);
    await selectDate(selector, range[0]);
    await selectDate(selector, range[1]);
  };

  // =================================== FILL ===================================
  /**
   * @function fillDateRange
   * @memberOf ui5.date
   * @description Enters the passed date range to the date input with the given selector by providing the start- and end date.
   * @param {Selector} selector - The selector describing the element.
   * @param {Object[]} range - The array of date objects containing start- and end date.
   * @example const start = await common.date.calculateDate("2020, 9, 20", "dd.mm.yyyy");
   * const end = await common.date.calculateDate("2021, 1, 3", "dd.mm.yyyy");
   * const range = [start, end];
   * await ui5.date.fillDateRange(selector, range);
   */
  this.fillDateRange = async function (selector, range) {
    const value = range[0] + " - " + range[1];
    await ui5.userInteraction.clearAndFill(selector, value);
  };


  // =================================== HELPER ===================================
  async function openDatePicker(selector) {
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      await ui5.userInteraction.click(selector);
    } else if (selector.elementProperties.metadata === "sap.m.DatePicker") {
      const id = await ui5.userInteraction.locator.getElementId(selector);
      const icon = await nonUi5.userInteraction.locator.getElementById(`${id}-icon`);
      await nonUi5.userInteraction.click(icon);
    }
  }

  async function selectDate(selector, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const currentDate = ui5.date.getToday();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();

    let found = false;

    let id = await ui5.userInteraction.locator.getElementId(selector);
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      id = id.replace("-icon", "");
    }

    if (day === currentDay && month === currentMonth && year === currentYear) {
      return await nonUi5.userInteraction.pressEnter();
    } else {

      if (month !== currentMonth) {
        const monthOverview = await nonUi5.userInteraction.locator.getElementById(`${id}-cal--Head-B1`);
        await nonUi5.userInteraction.click(monthOverview);

        const monthPick = await nonUi5.userInteraction.locator.getElementByCss(`[id*="${id}-cal--MP-m${month}"]`);
        await nonUi5.userInteraction.click(monthPick);
      }

      if (year !== currentYear) {
        const yearOverview = await nonUi5.userInteraction.locator.getElementById(`${id}-cal--Head-B2`);
        await nonUi5.userInteraction.click(yearOverview);

        while (!found) {
          const yearSpanElem = await nonUi5.userInteraction.locator.getElementById(`${id}-cal--Head-B2`);
          const yearSpan = await yearSpanElem.getText();
          const yearMin = yearSpan.slice(0, 4);
          const yearMax = yearSpan.slice(7, 11);
          if (year < yearMin) {
            const prev = await nonUi5.userInteraction.locator.getElementById(`${id}-cal--Head-prev`);
            await nonUi5.userInteraction.click(prev);
          } else if (year > yearMax) {
            const next = await nonUi5.userInteraction.locator.getElementById(`${id}-cal--Head-next`);
            await nonUi5.userInteraction.click(next);
          } else {
            found = true;
          }
        }
        const yearPick = await nonUi5.userInteraction.locator.getElementByCss(`[id*="${id}-cal--YP-y${year}"]`);
        await nonUi5.userInteraction.click(yearPick);
      }

      const dayPick = await nonUi5.userInteraction.locator.getElementByCss(`[id="${id}-cal"] .sapUiCalItem[data-sap-day="${util.formatter.formatDate(date, "yyyymmdd")}"] .sapUiCalItemText`);
      return await nonUi5.userInteraction.click(dayPick);
    }
  }

};
module.exports = new DateModule();