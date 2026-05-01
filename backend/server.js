require("dotenv").config();
const express = require("express");
const http = require("http");
const config = require("./config/config");
const logger = require("./utils/logger");
const dbConnection = require("./config/database");
const { setupMiddleware } = require("./middlewares/setup");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const { setupRoutes } = require("./routes");
const { initializeSocket } = require("./utils/socket");
const { runSeeders } = require("./utils/seeder");

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = config.PORT;

    // ✅ Test route
    // this.app.get("/", (req, res) => {
    //   res.send("API is running...");
    // });
  }

  async initialize() {
    try {
      await dbConnection.connect();

      setupMiddleware(this.app);
      setupRoutes(this.app);

      this.app.use(notFound);
      this.app.use(errorHandler);

      initializeSocket(this.server);

      logger.info("Server Initialization Successful");
    } catch (error) {
      logger.error("Server initialization failed: ", error);
      process.exit(1);
    }
  }
  async start() {
    await this.initialize();
    this.server.listen(this.port, async () => {
      logger.info(`server is running on ${this.port}...`);

      setTimeout(async () => {
        await runSeeders();
      }, 2000);
    });
    this.setupGracefulShutdown();
  }
  setupGracefulShutdown() {
    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} recieved. Starting gracegul shutdown...`);
      this.server.close(async () => {
        logger.info("HTTP server closed");
        await dbConnection.disconnect();
        logger.info("Graceful shutdown completed");
        process.exit(0);
      });
    };
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  }
}

const appServer = new Server();
appServer.start();

module.exports = appServer.app;
