/**
* @class formatter
* @memberof ui5.common
*/
const Formatter = function () {

  /**
  * @function addRemoveLeadingZeros
  * @memberOf ui5.common.formatter
  * @description Adds or removes leading zeros to the passed item number to format it to the needed format of the id.
  * @param {Integer} number - The number of the element (e.g. 1, 2 / 10, 20).
  * @param {Integer} length - The length of the needed id. Purchase Order Item -> 5, Schedule Line -> 4, Account Assignment -> 2.
  * @returns {String} The formatted id.
  * @example let itemNumber = await ui5.common.formatter.addRemoveLeadingZeros(10, 5);
  */
  this.addRemoveLeadingZeros = function (number, length) {
    const zero = "0";
    const char = zero.repeat(length) + number;
    return char.slice(- length);
  };

};
module.exports = new Formatter();
