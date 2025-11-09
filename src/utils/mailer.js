const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports.sendEmail = async (to, token) => {
  try {
    const verifyLink = `http://localhost:3000/api/user/verify/${token}`;
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: "verify email ",
      text: `Click the link to verify your email`,
       html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Email Verification</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${verifyLink}" style="color: #1a73e8;">Verify Email</a>
          <br><br>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log("send successfully");
  } catch (error) {
    console.log(error);
  }
};
