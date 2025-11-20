// const cron = require("node-cron");
// const { cronSend } = require("../utils/mailer");
// const { connectDb } = require("../db/config");

// connectDb()
//   .then(() => {
//     console.log("db connected");
//     cron.schedule("* * * * *", async () => {
//       console.log("cron started");
//       await cronSend();
//     });
//   })
//   .catch((err) => {
//     console.log("db cannot connected", err);
//   });
