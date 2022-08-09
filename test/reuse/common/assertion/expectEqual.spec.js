"use strict";

describe("assertion - expectEqual for a number", function () {
  it("Execution & Verification", function () {
    common.assertion.expectEqual(0, 0);
    expect(() => common.assertion.expectEqual(0, "0"))
      .toThrow(/Expect\w+|\d+"0"\w+|\d+Received\w+|\d+0/);
  });
});

describe("assertion - expectEqual for a boolean", function () {
  it("Execution & Verification", function () {
    common.assertion.expectEqual(true, true);

    expect(() => common.assertion.expectEqual(true, "true"))
      .toThrow(/Expect\w+|\d+"true"\w+|\d+Received\w+|\d+true/);
    expect(() => common.assertion.expectEqual(true, false))
      .toThrow(/Expect\w+|\d+false\w+|\d+Received\w+|\d+true/);
  });
});

describe("assertion - expectEqual for an object", function () {
  it("Execution & Verification", function () {
    common.assertion.expectEqual({
      property: "value"
    }, {
      property: "value"
    });

    expect(() => common.assertion.expectEqual({
      property: "value"
    }, {
      property: "value",
      anotherProp: "value"
    }))
      .toThrow(/"anotherProp": "value"/);
  });
});

describe("assertion - expectEqual for an array", function () {
  it("Execution & Verification", function () {
    common.assertion.expectEqual([1, 2, 3], [1, 2, 3]);
    common.assertion.expectEqual([{
      property: "value"
    }], [{
      property: "value"
    }]);

    expect(() => common.assertion.expectEqual([1, 2, ], [1, 2, 3]))
      .toThrow(/[1,2,3]/);
  });
});