import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import painRoutes from "./routes/painRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoDBConnexion = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.DB);
    console.log(`Connection to Mongo DB established on port ${port}`);
  } catch (error) {
    console.log("error connecting to MongoDB");
  }
};

const loadRoutes = () => {
  app.use("/api/pains", painRoutes);
  app.use("/api/events", eventRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
};

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  let corsOptions = {
    origin: "http://localhost.3000",
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(cors);
};

(async function controller() {
  await mongoDBConnexion();
  loadRoutes();
  startServer();
  addMiddlewares();
})();
