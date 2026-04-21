const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const requestLogger = require("../middleware/requestLogger");
const config = require("../config/config");

const setupMiddleware = (app) => {
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
    }),
  );

  const corsOptions = {
    origin: config.CORS.ORIGIN,
    credentials: config.CORS.CREDENTIALS,
    optionsSuccessStatus: 200,
    methods: config.CORS.METHODS,
    allowedHeaders: config.CORS.ALLOWED_HEADERS,
  };
  app.use(cors(corsOptions));

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use(requestLogger);
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
    });
  });
};

module.exports = { setupMiddleware };
