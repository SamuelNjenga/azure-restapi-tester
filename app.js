/**
 * Setup express
 */
const express = require("express");

/**
 * Setup Morgan
 */
const morgan = require("morgan");

const path = require("path");

/**
 * Setup body parser
 */
const bodyParser = require("body-parser");

/**
 * Setup CORS
 */
const cors = require("cors");

/**
 * rate limiter
 */
const rateLimit = require("express-rate-limit");

/**
 * Routes
 */
const routes = require("./src/main/routes/index");

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  // origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 1000,
});

app.use("/api/", apiLimiter);

app.use("/api/v1/", routes);

module.exports = app;
