"use strict";

const payload = {
  id: 99,
  title: "qmate-service",
  author: "marvin"
};

describe("service.rest.post - POST 'qmate-service' as a new entry", function () {
  it("Execution & Validation", async function () {
    const res = await service.rest.post(`${browser.config.baseUrl}/posts`, payload);
    common.assertion.expectEqual(res.status, 201);
    common.assertion.expectEqual(res.statusText, "Created");
    common.assertion.expectEqual(res.data.id, 99);
  });
});

describe("service.rest.post - Expect POST request to fail with '500' due to duplicate id", function () {
  it("Execution & Validation", async function () {
    await expect(service.rest.post(`${browser.config.baseUrl}/posts`, payload)).rejects.toThrow("Internal Server Error - Request failed with status code 500");
  });
});

describe("service.rest.post - POST against not existing entitySet", function () {
  it("Execution & Validation", async function () {
    await expect(service.rest.post(`${browser.config.baseUrl}/notExistingEntitySet`, {})).rejects.toThrow("Not Found - Request failed with status code 404");
  });
});
