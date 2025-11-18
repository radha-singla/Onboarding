require("dotenv").config({ override: true });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDb } = require("./db/config");
const cluster = require("cluster");
const os = require("os");
const Message = require("./constant/message").en;

if (cluster.isPrimary) {
  console.log(`master ${process.pid} is running`);

  const numCpus = os.cpus().length;
  console.log(numCpus);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on("online", (worker) => {
    console.log(`worker ${worker.process.pid} is online`);
  });
  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Initialize Express app
  const app = express();

  //Middleware code
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
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
}

//re_fts5CShz_Dxb2XbzbGDECDFJW8KQNL8Yt