const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const requestLogger = require("./requestLogger");
const config = require("../config/config");

// runs once at server starts
const setupMiddleware = (app) => {
  app.use(
    //Adds security headers automatically. The cross-origin policy allows resources (like images) to be loaded across different origins.
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
    }),
  );

  const limiter = rateLimit({
    windowMs: config.RATE_LIMIT.WINDOW_MS,
    max: config.RATE_LIMIT.MAX_REQUESTS,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

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

  //A simple endpoint that returns server status — used by monitoring tools or load balancers to check if the server is alive. Returns uptime, timestamp, and environment.
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

//strict limiter for auth routes
const createAuthLimiter = () => {
  return rateLimit({
    windowMs: config.RATE_LIMIT.WINDOW_MS,
    max: config.RATE_LIMIT.AUTH_MAX_REQUESTS,
    message: {
      success: false,
      message: 'Too many authentication attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = { setupMiddleware, createAuthLimiter};
