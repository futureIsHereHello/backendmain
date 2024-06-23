const joi = require("joi");

const validateSignup = (payload) => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });

  const result = schema.validate(payload);
  return result;
};

module.exports = { validateSignup };
