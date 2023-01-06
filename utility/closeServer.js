const { createHttpTerminator } = require("http-terminator");
const { closeConnection } = require("../db/mongoose");
//this closes the server gracefully its like closing the shop gracefully not sudden
// if you close suddenly all the http connections
//db connections will remain opened
async function closeServer(server, code, timeout) {
  try {
    setTimeout(() => {
      console.log(`Forced shut down with exit code ${code}`);
      process.exit(code);
    }, timeout).unref();
    if (server.listening) {
      console.log("Terminating HTTP connections");
      const httpTerminator = createHttpTerminator({
        server,
      });
      await httpTerminator.terminate();
    }
    console.log("closing database connection");
    await closeConnection();
    console.log(`Exiting gracefully with code ${code}`);
    process.exit(code);
  } catch (error) {
    console.log("Error shutting down gracefully");
    console.log(error);
    console.log(`Forced shut down with exit code ${code}`);
    process.exit(code);
  }
}
module.exports = closeServer;
