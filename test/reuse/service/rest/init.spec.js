"use strict";
const config = {
  auth: {
    username: "restuser",
    password: "restpassword"
  }
};

describe("service.rest.init - expect to do GET request with default axios instance", function () {
  let axios;

  it("Preparation", async function () {
    axios = await service.rest.init();
  });

  it("Execution & Validation", async function () {
    const res = await axios.get(`${browser.config.baseUrl}/posts/99`);
    await common.assertion.expectEqual(res.data.title, "qmate-service");
  });

});

describe("service.rest.init - expect to do POST request with default axios instance", function () {
  let axios;
  let payload;

  it("Preparation", async function () {
    axios = await service.rest.init();
    payload = {
      id: 999,
      title: "axios-instance",
      author: "marvin"
    };
  });

  it("Execution & Validation", async function () {
    const res = await axios.post(`${browser.config.baseUrl}/posts`, payload, config);
    common.assertion.expectEqual(res.status, 201);
    common.assertion.expectEqual(res.statusText, "Created");
    common.assertion.expectEqual(res.data.id, payload.id);
  });

  it("Cleanup", async function () {
    await axios.delete(`${browser.config.baseUrl}/posts/${payload.id}`, config);
  });

});
