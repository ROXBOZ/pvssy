import express from "express";
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
import contactRoutes from "./routes/contactRoutes.js";
import sourceRoutes from "./routes/sourceRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import jwtStrategy from "./utils/passport.js";

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
    const res = await mongoose.connect(process.env.DB);
    if (res) {
      console.log(`Connection to Mongo DB established on port ${port}`);
      console.log("res :", res);
      return true;
    }
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

  const allowedUrls = [
    "https://pvssy-frontend.vercel.app",
    "http://localhost:3000",
    "https://www.pvssy-talk.com/",
    "https://www.pvssy-talk.org/",
    "https://www.pvssy-talk.ch/",
  ];

  const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowedUrls.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

  app.use(cors(corsOptionsDelegate));

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
  app.use("/api/exercises", exerciseRoutes);
  app.use("/api/contacts", contactRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
};

async function controller() {
  addMiddlewares();
  loadRoutes();

  try {
    const connected = await mongoDBConnexion();
    connected && startServer();
  } catch (error) {
    console.log("errooor :", error);
  }
}
controller();
export default app;
