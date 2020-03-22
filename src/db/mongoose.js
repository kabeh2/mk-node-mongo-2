const config = require("config");
const mongoose = require("mongoose");

const dbConfig = config.get("dbConfig");

mongoose.connect(
  `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
);
