"use strict";
const qs = require("querystring");
let payload;

describe("service.rest.patch - PATCH 'title' and 'author'", function () {
  it("Preperation", async function () {
    payload = {
      "id": 99,
      "title": "patched",
      "author": "m4rv1n"
    };
  });

  it("Execution & Validation", async function () {
    const res = await service.rest.patch(`${browser.config.baseUrl}/posts/99`, payload);
    common.assertion.expectEqual(res.status, 200);
    common.assertion.expectEqual(res.statusText, "OK");
    common.assertion.expectEqual(res.data.title, "patched");
    common.assertion.expectEqual(res.data.author, "m4rv1n");
  });

});

describe("service.rest.patch - PATCH against not existing entitySet", function () {
  it("Execution & Validation", async function () {
    await expect(service.rest.patch(`${browser.config.baseUrl}/notExistingEntitySet`, {}))
      .rejects.toThrow("Not Found - Request failed with status code 404");
  });
});