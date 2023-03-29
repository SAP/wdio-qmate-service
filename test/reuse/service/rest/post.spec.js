"use strict";

const payload = {
  id: 199,
  title: "qmate-service",
  author: "marvin"
};
const config = {
  auth: {
    username: "restuser",
    password: "restpassword"
  }
};
const invalidConfig = {
  auth: {
    username: "restuser-invalid",
    password: "restpassword-invalid"
  }
};

describe("service.rest.post - POST 'qmate-service' as a new entry", function () {
  
  it("Execution & Validation", async function () {
    const res = await service.rest.post(`${browser.config.baseUrl}/posts`, payload, config);
    common.assertion.expectEqual(res.status, 201);
    common.assertion.expectEqual(res.statusText, "Created");
    common.assertion.expectEqual(res.data.id, payload.id);
  });
  
  it("Cleanup", async function () {
    await service.rest.delete(`${browser.config.baseUrl}/posts/${payload.id}`, config);
  });

});

describe("service.rest.post - Expect POST request to fail with '500' due to duplicate id", function () {
  
  it("Preparation", async function () {
    await service.rest.post(`${browser.config.baseUrl}/posts`, payload, config);
  });
  
  it("Execution & Validation", async function () {
    await expect(service.rest.post(`${browser.config.baseUrl}/posts`, payload, config))
      .rejects.toThrow("Internal Server Error - Request failed with status code 500");
  });
  
  it("Cleanup", async function () {
    await service.rest.delete(`${browser.config.baseUrl}/posts/${payload.id}`, config);
  });

});

describe("service.rest.post - POST against not existing entitySet", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.post(`${browser.config.baseUrl}/notExistingEntitySet`, {}, config))
      .rejects.toThrow("Not Found - Request failed with status code 404");
  });

});

describe("service.rest.post - Expect POST request to fail with 'Unauthorized - Request failed with status code 401'", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.post(`${browser.config.baseUrl}/posts`, payload, invalidConfig))
      .rejects.toThrow("Unauthorized - Request failed with status code 401");
  });
  
});
