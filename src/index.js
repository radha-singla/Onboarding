require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const { connectDb } = require("./db/config");
const Message = require("./constant/message").en



// Initialize Express app
const app = express();

//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(require("./middleware/res"));
app.use("/api", require("./router"));

app.use((error, req, res, next) => {
  console.log(error);
  return res
    .status(error.status || 400)
    .json({ message: error.message || Message.INTERNAL_SERVER_ERROR });
});

app.listen(process.env.PORT, () => {
  console.log(`server connected successfully ${process.env.PORT}`);
  connectDb();
});
