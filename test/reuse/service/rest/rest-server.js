const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const defaultUser = "restuser";
const defaultPassword = "restpassword";

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
    console.log("Missing authorization header");
    res.status(401).jsonp("Missing authorization header");
    return false;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Basic") {
    console.log("Incorrect authorization scheme "+scheme);
    res.status(401).jsonp("Incorrect authorization scheme");
    return false;
  }

  if (!token) {
    console.log("Missing token");
    res.status(401).jsonp("Missing token");
    return false;
  }
  const [username, password] = Buffer.from(token, "base64").toString().split(":");
  if (username !== defaultUser && password !== defaultPassword) {
    console.log(`${username},${password}`);
    res.status(401).jsonp("Invalid login credentials, please try again");
    return false;
  }
  return true;
}
server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req, res)) { // add your authorization logic here
    next(); // continue to JSON Server router
  }
});
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running at port 3000");
});