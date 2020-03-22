const yup = require("yup");
const debug = require("debug")("app:dev");

const userValidation = async (req, res, next) => {
  const validate = await yupValidation(req.body);
  debug("User Schema is Valid: ", validate);

  if (!validate) {
    res.status(400).send({
      error: "Please fill all fields correctly"
    });
  } else {
    next();
  }
};

const yupValidation = async values => {
  const userSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    age: yup
      .number()
      .integer()
      .moreThan(0)
  });

  try {
    const validateSchema = await userSchema.isValid(values);
    return validateSchema;
  } catch (error) {
    debug("Error: ", error);
  }
};

module.exports = userValidation;
