/**
 * @class element
 * @memberof nonUi5
 */
const Element = function () {

  // =================================== PROPERTIES ===================================
  /**
   * @function isVisible
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is visible to the user.
   * @param {Object} element - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.element.isVisible(elem);
   */
  this.isVisible = async function (element) {
    return element.isDisplayedInViewport();
  };

  /**
   * @function isElementPresent
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is present at the DOM or not.
   * @param {Object} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.element.isElementPresent(elem);
   */
  this.isElementPresent = async function (elem) {
    return elem.isExisting();
  };

  /**
   * @function isPresentByCss
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is present at the DOM or not.
   * @param {String} css - The CSS selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example await nonUi5.element.isPresentByCss(".button01");
   */
  this.isPresentByCss = async function (css, index = 0, timeout = 30000) {
    try {
      let elements;

      await browser.waitUntil(async function () {
        elements = await $$(css);
        return elements.length > index;
      }, {
        timeout: timeout
      });

      return elements[index].isExisting();
    } catch (error) {
      return false;
    }
  };

  /**
   * @function isPresentByXPath
   * @memberOf nonUi5.element
   * @description returns a boolean if the element is present at the DOM or not.
   * @param {String} xpath - The XPath describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean}
   * @example await nonUi5.element.isPresentByXPath(".//*[text()='Create']");
   */
  this.isPresentByXPath = async function (xpath, index = 0, timeout = 30000) {
    return this.isPresentByCss(xpath, index, timeout);
  };

};
module.exports = new Element();