import express from "express";
const app = express();
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import painRoutes from "./routes/painRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import termRoutes from "./routes/termRoutes.js";
import sourceRoutes from "./routes/sourceRoutes.js";
import jwtStrategy from "./utils/passport.js";

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

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(jwtStrategy);
};

const loadRoutes = () => {
  app.use("/api/pains", painRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/terms", termRoutes);
  app.use("/api/sources", sourceRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
};

(async function controller() {
  await mongoDBConnexion();
  addMiddlewares(); // always add middlewares before loading routes
  loadRoutes();
  startServer();
})();
