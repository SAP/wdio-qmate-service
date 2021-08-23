function checkIfAnElementIsUnique(element, elements) {
  expect(elements.length).toBe(1);
  expect(element.elementId).toEqual(elements[0].elementId);
}

module.exports = { checkIfAnElementIsUnique };