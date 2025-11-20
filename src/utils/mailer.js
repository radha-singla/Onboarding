const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const Model = require("../model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//  SEND VERIFY EMAIL
module.exports.sendVerifyEmail = async (to, token) => {
  try {
    const verifyLink = `http://localhost:3000/api/user/verify/${token}`;
    const templatePath = path.join(__dirname, "../view/index.ejs");

    const htmlContent = await ejs.renderFile(templatePath, { verifyLink });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Verify your Email",
      html: htmlContent,
    });

    console.log("Verification email sent");
  } catch (error) {
    console.log(error);
  }
};

//  SEND RESET PASSWORD EMAIL

module.exports.sendResetEmail = async (to, token) => {
  try {
    const resetLink = `http://localhost:3000/api/user/reset/${token}`;
    const templatePath = path.join(__dirname, "../view/reset.ejs");

    const htmlContent = await ejs.renderFile(templatePath, { resetLink });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset your Password",
      html: htmlContent,
    });

    console.log("Reset password email sent");
  } catch (error) {
    console.log(error);
  }
};

//SEND CRON

module.exports.cronSend = async (message) => {
  try {
  console.log(Model.users);
  
    const users = await Model.users.find()
    if(!users.length){
      console.log("user not found");
      return;
      
    }
    for (let user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "cron Alert",
        text: message,
      });
      console.log("email send to ", user.email);
    }
  } catch (error) {
    console.log(error);
  }
};
