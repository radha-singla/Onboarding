require("dotenv").config({ override: true });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDb } = require("./db/config");
const cluster = require("cluster");
const os = require("os");
const Message = require("./constant/message").en;
const path = require("path");

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
  // Connect DB in the worker
  const express = require("express");
  const cors = require("cors");
  const morgan = require("morgan");
  const path = require("path");
  const { connectDb } = require("./db/config");

  const app = express();

  connectDb()
    .then(() => {
      console.log("Database connected successfully");

      app.set("view engine", "ejs");
      app.set("views", path.join(__dirname, "view"));

      app.use(express.json());
      app.use(
        cors({
          origin: "*",
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
        })
      );
      app.use(express.urlencoded({ extended: true }));
      app.use(morgan("dev"));
      app.use(require("./middleware/res"));
      app.use("/api", require("./router"));

      app.listen(process.env.PORT, () => {
        console.log(`Server connected successfully ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.error("DB connection failed in worker", err);
      process.exit(1);
    });
}
