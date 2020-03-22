const yup = require("yup");
const debug = require("debug")("app:dev");

const taskValidation = async (req, res, next) => {
  const taskIsValid = await yupValidation(req.body);
  debug("Task Schema is Valid: ", taskIsValid);

  if (!taskIsValid) {
    res.status(400).send({
      error: "Please fill out fields correctly."
    });
  } else {
    next();
  }
};

const yupValidation = async values => {
  const taskValidation = yup.object().shape({
    title: yup.string(),
    description: yup.string().max(200)
  });

  try {
    const response = await taskValidation.isValid(values);
    return response;
  } catch (error) {
    debug("Error: ", error);
  }
};

module.exports = taskValidation;
