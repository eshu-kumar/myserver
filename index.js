const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const resolvers = require("./graphql/resolvers/index.js");
const typeDefs = require("./graphql/typeDefs/index.js");
const http = require("http");
const cors = require("cors");
const { createConnection } = require("./db/mongoose");
const auth = require("./middleware/auth");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");
const lectureRouter = require("./routers/lecture");
const closeServer = require("./utility/closeServer");
const setUpWebSocketServer = require("./web-socket-server.js");
//creating mongoose database connection
createConnection();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(userRouter);
app.use(courseRouter);
app.use(lectureRouter);
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server.start();
  app.use(
    "/graphql",
    cors(),
    auth,
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
})();

(async () => {
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
})();
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
//setting up web socket server
setUpWebSocketServer();

app.post("/close-server", cors(), async (req, res) => {
  //we will add auth in this later
  //this closes the server gracefully its like closing the shop gracefully not sudden if you close suddenly all the http connections
  //db connections will remain opened
  closeServer(server, 0, 10000);
  res.status(404).send({
    message: "Server closed , you will be notified once it restarts",
    isError: false,
  });
});
