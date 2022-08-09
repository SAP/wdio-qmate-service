"use strict";

describe("service.rest.delete - expect to DELETE 99 as response", function () {

  it("Execution & Validation", async function () {
    const res = await service.rest.delete(`${browser.config.baseUrl}/posts/99`);
    await common.assertion.expectEqual(res.status, 200);
    await common.assertion.expectEqual(res.statusText, "OK");
    await common.assertion.expectEqual(res.data, {});
  });
});

describe("service.rest.delete - expect DELETE request to fail with status code '404'", function () {

  it("Execution & Validation", async function () {
    await expect(service.rest.delete(`${browser.config.baseUrl}/posts/00`))
      .rejects.toThrow(/Request failed with status code 404/);
  });

});