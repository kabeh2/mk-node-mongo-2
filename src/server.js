const helmet = require("helmet");
const debug = require("debug")("app:dev");
const devLogger = require("./middleware/loggers/devLogger");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const express = require("express");
require("./db/mongoose");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(helmet());

if (server.get("env") === "development") {
  debug("Morgan Logger enabled...");
  server.use(devLogger);
}

// Routers
server.use("/api/users", userRouter);
server.use("/api/tasks", taskRouter);

module.exports = server;
