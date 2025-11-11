const Model = require("../model");
const validation = require("../validation");
const Controller = require("../controller");

module.exports.signup = async (req, res, next) => {
  try {
    const { error } = validation.tempUserValidation.validate(req.body);
    if (error) {
      return res.validationField({ message: error.details[0].message });
    }
    const result = await Controller.signup(req.body);
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.verify = async (req, res, next) => {
  try {
    const { token1 } = req.params;
    if (!token1) {
      return res.validationField({ message: "Verification token is required" });
    }
    const result = await Controller.verify(token1);
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.send(`
        <div style="text-align:center;margin-top:50px;font-family:sans-serif">
          <h2> ${result.message}</h2>
          <p>Your account has been verified successfully.</p>
        </div>
      `);
    }
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { error } = validation.updateProfileValidation.validate(req.body);
    if (error) {
      return res.validationField({ message: error.details[0].message });
    }
    const { id } = req.user;
    const result = await Controller.updateProfile(id, req.body);
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { error } = validation.loginValidation.validate(req.body);
    if (error) {
      return res.validationField({ message: error.details[0].message });
    }
    const result = await Controller.login(req.body);
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const { id } = req.user;

    const result = await Controller.logout(id);
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.forgot = async (req, res, next) => {
  try {
    const result = await Controller.forgot(req.body);
    return res.success(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
