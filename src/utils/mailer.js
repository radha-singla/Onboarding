const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "radha.apptunix@gmail.com",
    pass: "ntzo yzoi ulnt maxk",
  },
});


module.exports.sendEmail = async (to , otp) => {
  try {
    const info = await transporter.sendMail({
      from: "radha.apptunix@gmail.com",
      to: to,
      subject: "practice purpose",
      text: `testing purpose msg ${otp} ` ,
    });
    console.log("send successfully");
  } catch (error) {
    console.log(error);
  }
};
