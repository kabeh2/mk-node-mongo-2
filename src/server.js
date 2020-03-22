const helmet = require("helmet");
const debug = require("debug")("app:dev");
const express = require("express");
require("./db/mongoose");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(helmet());

module.exports = server;
