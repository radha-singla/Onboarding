const joi = require("joi");
const { enums } = require("../constant/enum");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const countryCodeRegex = /^\+\d{1,3}$/

module.exports.tempUserValidation = joi.object({
  fullName: joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.min": "Full name must be at least 3 characters long",
      "string.max": "Full name cannot exceed 50 characters",
    }),

  email: joi.string()
    .pattern(emailRegex)
    .lowercase()
    .optional()
    .messages({ "string.pattern.base": "Please enter a valid email address" }),

  gender: joi.number()
    .valid(...Object.values(enums.gender))
    .optional(),

  phone: joi.string()
    .pattern(phoneRegex)
    .optional()
    .messages({ "string.pattern.base": "Phone number must be 10 digits" }),

  countryCode: joi.string()
    .pattern(countryCodeRegex)
    .when("phone", {
      is: joi.exist(),
      then: joi.required(),
      otherwise: joi.forbidden(),
    })
    .messages({
      "string.pattern.base": "Invalid country code format (e.g., +91)",
    }),

  password: joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),

  isVerified: joi.boolean().default(false),
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

module.exports.forgotValidation = joi.object({
  email : joi.string().pattern(emailRegex)
})

module.exports.verifyOtpValidation = joi.object({
    email : joi.string().pattern(emailRegex).required(),
    otp : joi.number().required()
})

module.exports.resetValidation = joi.object({
      password : joi.string().required(),
      confirmPassword : joi.string().required()


})

