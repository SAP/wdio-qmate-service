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

  /**
   * @function getToday
   * @memberOf ui5.common.date
   * @description Returns the current day.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getToday("mm/dd/yyyy");
   */
  this.getToday = function (format = "object") {
    const date = new Date();
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getTomorrow
   * @memberOf ui5.common.date
   * @description Returns tomorrows date.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getTomorrow("mm/dd/yyyy");
   */
  this.getTomorrow = function (format = "object") {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getNextMonth
   * @memberOf ui5.common.date
   * @description Returns the current day one month later.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getNextMonth("mm/dd/yyyy");
   */
  this.getNextMonth = function (format = "object") {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousMonth
   * @memberOf ui5.common.date
   * @description Returns the current day one month before.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getPreviousMonth("mm/dd/yyyy");
   */
  this.getPreviousMonth = function (format = "object") {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getNextYear
   * @memberOf ui5.common.date
   * @description Returns the current day one year later.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getNextYear("mm/dd/yyyy");
   */
  this.getNextYear = function (format = "object") {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getPreviousYear
   * @memberOf ui5.common.date
   * @description Returns the current day one year before.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getPreviousYear("mm/dd/yyyy");
   */
  this.getPreviousYear = function (format = "object") {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return utilities.formatter.formatDate(date, format);
  };

  /**
   * @function getSpecificDate
   * @memberOf ui5.common.date
   * @description Returns a specific date based on your input.
   * @param {String} date - A specific date string.
   * @param {String} format - The expected format (mm/dd/yyyy, dd.mm.yyyy, dd/mm/yyyy, yyyymmdd, yyyy/mm/dd, dd.mm.yyyy.HH.MM, datetime, object).
   * @returns {String} The date in the passed format.
   * @example const date = await ui5.common.date.getSpecificDate("2020, 0, 17", "mm/dd/yyyy");
   */
  this.getSpecificDate = function (date, format = "object") {
    if (!date) {
      throw new Error("Function 'getSpecificDate' failed: No date was given.");
    }
    const parsedDate = Date.parse(date);
    const dateObject = new Date(parsedDate);
    return utilities.formatter.formatDate(dateObject, format);
  };

  /**
   * @function calculateDate
   * @memberOf ui5.common.date
   * @description Calculates the date depending on the input parameter.
   * @param {String} [date="today"] - Values possible: today, tomorrow, nextMonth, previousMonth, nextYear, lastYear
   * @param {String} [format="object"] - The expected format ("mm/dd/yyyy", "dd.mm.yyyy", "dd/mm/yyyy", "yyyymmdd", "yyyy/mm/dd", "datetime", "object").
   * @returns {String} The date in expected format.
   * @example const date = await ui5.common.date.calculateDate("today", "mm/dd/yyy");
   */
  this.calculateDate = function (date = "today", format = "object") {
    if (date === null) {
      date = "today";
    }
    if (format === null) {
      format = "object";
    }

    let calculatedDate;

    switch (date) {
      case "today":
        calculatedDate = this.getToday(format);
        break;
      case "tomorrow":
        calculatedDate = this.getTomorrow(format);
        break;
      case "nextMonth":
        calculatedDate = this.getNextMonth(format);
        break;
      case "previousMonth":
        calculatedDate = this.getPreviousMonth(format);
        break;
      // obsolete -> use previousMonth instead
      case "lastMonth":
        calculatedDate = this.getPreviousMonth(format);
        break;
      case "nextYear":
        calculatedDate = this.getNextYear(format);
        break;
      case "previousYear":
        calculatedDate = this.getPreviousYear(format);
        break;
      // obsolete -> use previousYear instead
      case "lastYear":
        calculatedDate = this.getPreviousYear(format);
        break;
      default:
        calculatedDate = this.getSpecificDate(date, format);
    }
    return calculatedDate;
  };

};
module.exports = new DateCalc();
