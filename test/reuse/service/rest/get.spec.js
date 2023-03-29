"use strict";

describe("service.rest.get - expect to GET 'qmate-service' as response", function () {

  it("Execution & Validation", async function () {
    const res = await service.rest.get(`${browser.config.baseUrl}/posts/99`);
    await common.assertion.expectEqual(res.data.title, "qmate-service");
  });

});

describe("service.rest.get - expect to GET request to fail with status code '404'", function () {

  it("Execution & Validation", async function () {
    await expect(service.rest.get(`${browser.config.baseUrl}/posts/00`))
      .rejects.toThrow("Not Found - Request failed with status code 404");
  });

});

describe("service.rest.get - expect error stacktrace to contain spec name", function () {

  it("Execution & Validation", async function () {
    try {
      await service.rest.get(`${browser.config.baseUrl}/posts/00`);
    } catch (error) {
      await expect(error.stack).toMatch(/get\.spec\.js/);
    }
  });

});