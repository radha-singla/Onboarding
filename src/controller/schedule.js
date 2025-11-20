const schedule = require("node-schedule");
const Message = require("../constant/message").en;
const { cronSend } = require("../utils/mailer");

module.exports.createJobs = async (date, message) => {
  try {
    const scheduleDate = new Date(date);

    if (isNaN(scheduleDate)) {
      throw new Error("invaid date format");
    }
   
    schedule.scheduleJob(scheduleDate, () => {
      console.log("message send");
      cronSend(message);
    });
    return {
      message: Message.JOB_SEND,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
