// // const nodemailer = require("nodemailer");
// const emailjs = require("@emailjs/nodejs");
// require("dotenv").config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASSWORD,
// //   },
// // });

// module.exports.sendEmail = async (to, token) => {
//   try {
//     const verifyLink = `http://localhost:3000/api/user/verify/${token}`;
//     const templateParams = {
//       email: to,
//       link: verifyLink,
//     };
//     const data = await emailjs.send(
//       process.env.SERVICE_ID,
//       process.env.TEMPLATE_ID,
//       templateParams,
//       {
//         publicKey: process.env.PUBLIC_KEY,
//         privateKey: process.env.PRIVATE_KEY,
//       }
//     );
//     console.log("Email sent successfully:", data);
//     return data;
//     // const data = await transporter.sendMail({
//     //   from: "radha.apptunix@gmail.com",
//     //   to: to,
//     //   subject: "verify email ",
//     //   text: `Click the link to verify your email`,
//     //   html: `
//     //     <div style="font-family: Arial, sans-serif; color: #333;">
//     //       <h2>Email Verification</h2>
//     //       <p>Click the link below to verify your email:</p>
//     //       <a href="${verifyLink}" style="color: #1a73e8;">Verify Email</a>
//     //       <br><br>
//     //       <p>If you didn’t request this, please ignore this email.</p>
//     //     </div>
//     //   `,
//     // });
//     // console.log("send successfully", data);
//   } catch (error) {
//     console.log(error);
//   }
// };
