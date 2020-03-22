const config = require("config");
const debug = require("debug")("app:dev");
const server = require("./src/server");
const port = config.get("port");

server.listen(port, debug(`Server is listening on port ${port}...`));
