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
const postId = 444;

describe("service.rest.delete - expect to DELETE 444 as response", function () {
  let originalPost;

  it("Preparation", async function () {
    const res = await service.rest.get(`${browser.config.baseUrl}/posts/${postId}`);
    originalPost = res.data;
  });

  it("Execution & Validation", async function () {
    const res = await service.rest.delete(`${browser.config.baseUrl}/posts/${postId}`, config);
    await common.assertion.expectEqual(res.status, 200);
    await common.assertion.expectEqual(res.statusText, "OK");
    await common.assertion.expectEqual(res.data, {});
  });

  it("Cleanup", async function () {
    await service.rest.post(`${browser.config.baseUrl}/posts`, originalPost, config);
  });

});

describe("service.rest.delete - expect DELETE request to fail with status code '404'", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.delete(`${browser.config.baseUrl}/posts/00`, config))
      .rejects.toThrow("Not Found - Request failed with status code 404");
  });

});

describe("service.rest.delete - Expect DELETE request to fail with 'Unauthorized - Request failed with status code 401'", function () {
  
  it("Execution & Validation", async function () {
    await expect(service.rest.delete(`${browser.config.baseUrl}/posts/${postId}`, invalidConfig))
      .rejects.toThrow("Unauthorized - Request failed with status code 401");
  });

});