const morgan = require("morgan");

const devLogger = (req, res, next) => {
  try {
    const morganLogger = morgan("tiny");
    morganLogger(req, res, next);
  } catch (error) {
    next();
  }
};

module.exports = devLogger;
