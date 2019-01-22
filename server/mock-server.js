const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = 4201;

server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * @description Rewrite server responsed into a paged response object with total
 * count available in body of response
 */
router.render = (req, res) => {
  const count = res.get("X-Total-Count");
  res.jsonp({
    results: res.locals.data,
    totalCount: count
  });
};

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
