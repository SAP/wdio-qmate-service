"use strict";
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
const payload = {
  "id": 222,
  "title": "qmate-service-updated-by-put",
  "author": "m4rv1n"
};

describe("service.rest.put", function () {
  let originalPost;
  
  it("Preparation", async function () {
    const res = await service.rest.get(`${browser.config.baseUrl}/posts/${payload.id}`);
    originalPost = res.data;
  });
  
  it("Execution & Validation", async function () {    
    const res = await service.rest.put(`${browser.config.baseUrl}/posts/${payload.id}`, payload, config);
    common.assertion.expectEqual(res.status, 200);
    common.assertion.expectEqual(res.statusText, "OK");
    common.assertion.expectEqual(res.data.title, payload.title);
    common.assertion.expectEqual(res.data.author, payload.author);
  });
  
  it("Cleanup", async function () {
    await service.rest.patch(`${browser.config.baseUrl}/posts/${payload.id}`, originalPost, config);
  });

});

describe("service.rest.put - PUT against not existing entitySet", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.put(`${browser.config.baseUrl}/notExistingEntitySet`, {}, config))
      .rejects.toThrow("Not Found - Request failed with status code 404");
  });

});

describe("service.rest.put - Expect PUT request to fail with 'Unauthorized - Request failed with status code 401'", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.put(`${browser.config.baseUrl}/posts/${payload.id}`, payload, invalidConfig))
      .rejects.toThrow("Unauthorized - Request failed with status code 401");
  });
  
});