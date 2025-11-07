const joi = require("joi");
const { enums } = require("../constant/enum");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

module.exports.userSignupValidation = joi
  .object({
    email: joi.string().pattern(emailRegex).optional(),
    phone: joi.string().pattern(phoneRegex).optional(),
    countryCode: joi.string().when("phone", {
      is: joi.exist(),
      then: joi.required(),
      otherwise: joi.forbidden(),
    }),
  })
  .or("email", "phone");

module.exports.verifySchema = joi
  .object({
    email: joi.string().pattern(emailRegex).optional(),
    phone: joi.string().pattern(phoneRegex).optional(),
    password: joi.string().required().min(4).max(20),
    otp: joi.number().required(),
    countryCode: joi.string().when("phone", {
      is: joi.exist(),
      then: joi.required(),
      otherwise: joi.forbidden(),
    }),
  })
  .or("email", "phone");

module.exports.updateProfileValidation = joi.object({
  fullName: joi.string(),
  email: joi.string().pattern(emailRegex).optional(),
  phone: joi.string().pattern(phoneRegex).optional(),
  password: joi.string().min(4).max(20),
  gender: joi.number().valid(...Object.values(enums.gender)),
  countryCode: joi.string().when("phone", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.forbidden(),
  }),
});

module.exports.loginValidation = joi.object({
  email: joi.string().pattern(emailRegex).optional(),
  phone: joi.string().pattern(phoneRegex).optional(),
  password: joi.string().min(4).max(20),

  
});
