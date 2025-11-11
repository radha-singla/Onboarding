require("dotenv").config({ override: true });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDb } = require("./db/config");
const Message = require("./constant/message").en;

// Initialize Express app
const app = express();

//Middleware code
app.use(express.json());
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(require("./middleware/res"));
app.use("/api", require("./router"));

app.get("/data", (req, res) => {
  res.json({ message: "CORS is enabled for all!" });
});

app.get("/", (req, res) => {
  res.send("Project is live on Render!");
});
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
