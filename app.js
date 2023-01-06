const express = require("express");
const cors = require("cors");
const { createConnection } = require("./db/mongoose");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");
const closeServer = require("./utility/closeServer");

createConnection();
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(courseRouter);
const server = app.listen(port, () => {
  console.log("process id is ", process.pid);
  console.log(`my server running at ${port}`);
});

app.post("/", cors(), (req, res) => {
  console.log("request is ", req.body);
  res.status(201).send({ message: "You are at the Home api" });
});

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
