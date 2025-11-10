"use strict";

const errorRegexp = /Expected.*substring.*|Received string.*/;

describe("assertion - expectToContain", function () {
  it("Execution & Verification - Should pass when value1 contains value2 (simple case)", function () {
    common.assertion.expectToContain("foo bar baz", "bar");
  });

  it("Execution & Verification - Should pass when value1 contains value2 with extra whitespace", function () {
    common.assertion.expectToContain("foo   bar    baz", "bar");
  });

  it("Execution & Verification - Should pass when value2 has extra whitespace", function () {
    common.assertion.expectToContain("foo bar baz", "  bar  ");
  });

  it("Execution & Verification - Should pass when both values have extra whitespace", function () {
    common.assertion.expectToContain("   foo   bar    baz   ", "   bar   ");
  });

  it("Execution & Verification - Should fail when value1 does not contain value2", function () {
    expect(() => common.assertion.expectToContain("foo bar baz", "qux")).toThrow(errorRegexp);
  });

  it("Execution & Verification - Should pass when value2 is empty string", function () {
    common.assertion.expectToContain("foo bar baz", "");
  });

  it("Execution & Verification - Should pass when value1 and value2 are identical", function () {
    common.assertion.expectToContain("foo", "foo");
  });

  it("Execution & Verification - Should treat null and undefined as empty strings", function () {
    // "" contains "" (should pass)
    common.assertion.expectToContain(null, null);
    common.assertion.expectToContain(undefined, undefined);
    common.assertion.expectToContain(null, "");
    common.assertion.expectToContain("", undefined);

    // "foo" does not contain "" (should pass, since "" is always contained)
    common.assertion.expectToContain("foo", null);
    common.assertion.expectToContain("foo", undefined);

    // "" does not contain "foo" (should fail)
    expect(() => common.assertion.expectToContain(null, "foo")).toThrow(errorRegexp);
    expect(() => common.assertion.expectToContain(undefined, "foo")).toThrow(errorRegexp);
  });
});
