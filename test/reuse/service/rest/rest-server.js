/**
 * Rest server used to test service.rest API
 * GET calls don't require authentication
 * All other calls accept basic authentication
 * Server shuts down automatically if idle for 60 seconds
 */
/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const process = require("node:process");
const defaultUser = "restuser";
const defaultPassword = "restpassword";

function handle(signal) {
  console.log(`Received ${signal}`);
  process.exit();
}

let lastRequestTime = (new Date()).getTime();

setInterval(() => {
  // if there are no requests for 60 seconds, shutdown gracefully
  const currentTime = (new Date()).getTime();
  if ((currentTime - lastRequestTime) > 60000 && server.listenerCount() == 0) {
    process.exit();
  }
}, 1000);

process.on("SIGINT", handle);
process.on("SIGTERM", handle);

function isAuthorized(req, res) {
  if (req.method === "GET") {
    return true;
  } else {
    return checkAuthHeader(req, res);
  }
}
function checkAuthHeader(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).jsonp("Missing authorization header");
    return false;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Basic") {
    res.status(401).jsonp("Incorrect authorization scheme");
    return false;
  }

  if (!token) {
    res.status(401).jsonp("Missing token");
    return false;
  }
  const [username, password] = Buffer.from(token, "base64").toString().split(":");
  if (username !== defaultUser && password !== defaultPassword) {
    res.status(401).jsonp("Invalid login credentials, please try again");
    return false;
  }
  return true;
}
server.use(middlewares);
server.use((req, res, next) => {
  lastRequestTime = (new Date()).getTime();
  if (isAuthorized(req, res)) {
    next(); // continue to JSON Server router
  }
});
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running at port 3000");
});