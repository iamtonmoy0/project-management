const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 3001;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

server.use(auth);
server.use(router);

server.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
