async function validateChecked(selector) {
  const isSelected = await ui5.element.getPropertyValue(selector, "selected");
  common.assertion.expectEqual(isSelected, true);
}

module.exports = {
  validateChecked
};
