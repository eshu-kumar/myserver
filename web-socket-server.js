const WebSocket = require("ws");
const clients = new Set();
function setUpWebSocketServer() {
  // Create a WebSocket server
  const wsServer = new WebSocket.Server({ port: 5500 });

  wsServer.on("connection", (socket) => {
    console.log("Client connected");
    clients.add(socket);
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      console.log("Received message:", data);
      for (const client of clients) {
        client.send(JSON.stringify(data));
      }
    });

    socket.on("close", () => {
      clients.delete(socket);
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket server running on port 5500");
}
module.exports = setUpWebSocketServer;
