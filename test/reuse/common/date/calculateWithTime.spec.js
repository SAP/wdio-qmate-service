"use strict";

describe("date - calculateWithTime - without parameters", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime();
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDateWithTime(dateAct, dateExp);
  });
});

function verifyDateWithTime(dateAct, dateExp) {
  common.assertion.expectEqual(dateAct.getFullYear(), dateExp.getFullYear());
  common.assertion.expectEqual(dateAct.getMonth(), dateExp.getMonth());
  common.assertion.expectEqual(dateAct.getDate(), dateExp.getDate());
  common.assertion.expectEqual(dateAct.getHours(), dateExp.getHours());
  common.assertion.expectEqual(dateAct.getMinutes(), dateExp.getMinutes());
  common.assertion.expectEqual(dateAct.getSeconds(), dateExp.getSeconds());
}
