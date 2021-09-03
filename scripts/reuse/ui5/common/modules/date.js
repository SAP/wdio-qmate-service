/**
 * @class date
 * @memberof ui5.common
 */
const DateCalc = function () {

  async function openDatePicker(selector) {
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      await ui5.common.userInteraction.click(selector);
    } else if (selector.elementProperties.metadata === "sap.m.DatePicker") {
      const id = await ui5.common.locator.getElementId(selector);
      const icon = await non_ui5.common.locator.getElementById(`${id}-icon`);
      await non_ui5.common.userInteraction.click(icon);
    }
  }

  async function selectDate(selector, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const currentDate = ui5.common.date.getToday();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();

    let found = false;

    let id = await ui5.common.locator.getElementId(selector);
    if (selector.elementProperties.metadata === "sap.ui.core.Icon") {
      id = id.replace("-icon", "");
    }

    if (day === currentDay && month === currentMonth && year === currentYear) {
      return await non_ui5.common.userInteraction.pressEnter();
    } else {

      if (month !== currentMonth) {
        const monthOverview = await non_ui5.common.locator.getElementById(`${id}-cal--Head-B1`);
        await non_ui5.common.userInteraction.click(monthOverview);

        const monthPick = await non_ui5.common.locator.getElementByCss(`[id*="${id}-cal--MP-m${month}"]`);
        await non_ui5.common.userInteraction.click(monthPick);
      }

      if (year !== currentYear) {
        const yearOverview = await non_ui5.common.locator.getElementById(`${id}-cal--Head-B2`);
        await non_ui5.common.userInteraction.click(yearOverview);

        while (!found) {
          const yearSpanElem = await non_ui5.common.locator.getElementById(`${id}-cal--Head-B2`);
          const yearSpan = await yearSpanElem.getText();
          const yearMin = yearSpan.slice(0, 4);
          const yearMax = yearSpan.slice(7, 11);
          if (year < yearMin) {
            const prev = await non_ui5.common.locator.getElementById(`${id}-cal--Head-prev`);
            await non_ui5.common.userInteraction.click(prev);
          } else if (year > yearMax) {
            const next = await non_ui5.common.locator.getElementById(`${id}-cal--Head-next`);
            await non_ui5.common.userInteraction.click(next);
          } else {
            found = true;
          }
        }
        const yearPick = await non_ui5.common.locator.getElementByCss(`[id*="${id}-cal--YP-y${year}"]`);
        await non_ui5.common.userInteraction.click(yearPick);
      }

      const dayPick = await non_ui5.common.locator.getElementByCss(`[id="${id}-cal"] .sapUiCalItem[data-sap-day="${utilities.formatter.formatDate(date, "yyyymmdd")}"] .sapUiCalItemText`);
      return await non_ui5.common.userInteraction.click(dayPick);
    }
  }

  /**
   * @function pickDate
   * @memberOf ui5.common.date
   * @description Picks the passed date with the DatePicker.
   * @param {Selector} selector - The selector describing the element.
   * @param {Date} date - The date object.
   * @example const today = await ui5.common.date.calculateDate("today");
   * await ui5.common.date.pickDate(selector, date);
   */
  this.pickDate = async function (selector, date) {
    if (arguments[2]) {
      console.log("The parameter 'clickIcon' is deprecated and will be removed in the future.");
    }
    await openDatePicker(selector);
    await selectDate(selector, date);
  };

  /**
   * @function pickDateRange
   * @memberOf ui5.common.date
   * @description Picks the passed date range with the DatePicker.
   * Note that this will only work within the current month!
   * @param {Selector} selector - The selector describing the element.
   * @param {Array} range - The array of date objects containing start- and end date.
   * @example const start = await ui5.common.date.calculateDate("2020, 9, 20");
   * const end = await ui5.common.date.calculateDate("2021, 1, 3");
   * const range = [start, end];
   * await ui5.common.date.pickDateRange(selector, range);
   */
  this.pickDateRange = async function (selector, range) {
    await openDatePicker(selector);
    await selectDate(selector, range[0]);
    await selectDate(selector, range[1]);
  };

  /**
   * @function fillDateRange
   * @memberOf ui5.common.date
   * @description Fills the passed date range by passing the start- and end date.
   * @param {Selector} selector - The selector describing the element.
   * @param {Array} range - The array of date objects containing start- and end date.
   * @example const start = await ui5.common.date.calculateDate("2020, 9, 20", "dd.mm.yyyy");
   * const end = await ui5.common.date.calculateDate("2021, 1, 3", "dd.mm.yyyy");
   * const range = [start, end];
   * await ui5.common.date.fillDateRange(selector, range);
   */
  this.fillDateRange = async function (selector, range) {
    const value = range[0] + " - " + range[1];
    await ui5.common.userInteraction.clearAndFill(selector, value);
  };



};
module.exports = new DateCalc();