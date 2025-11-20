const Controller = require("../controller");

module.exports.createJobs = async (req, res, next) => {
  try {
    const { date, message } = req.body;
    const result = await Controller.createJobs(date, message);
    return res.success(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
