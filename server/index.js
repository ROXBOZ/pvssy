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

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log(`Connection to Mongo DB established on port ${port}`);
    addMiddlewares();
    loadRoutes();
    startServer();
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error);
  });

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
  ];

  const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowedUrls.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
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
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
};

// import express from "express";
// import cors from "cors";
// import * as dotenv from "dotenv";
// dotenv.config();
// import mongoose from "mongoose";
// import passport from "passport";
// import cloudinaryConfig from "./config/cloudinaryConfig.js";
// import painRoutes from "./routes/painRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import termRoutes from "./routes/termRoutes.js";
// import sourceRoutes from "./routes/sourceRoutes.js";
// import exerciseRoutes from "./routes/exerciseRoutes.js";
// import jwtStrategy from "./utils/passport.js";

// const app = express();
// const port = process.env.PORT || 5000;
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// const mongoDBConnexion = async () => {
//   mongoose.set("strictQuery", false);
//   try {
//     await mongoose.connect(process.env.DB);
//     console.log(`Connection to Mongo DB established on port ${port}`);
//   } catch (error) {
//     console.log("error connecting to MongoDB");
//   }
// };

// const addMiddlewares = () => {
//   app.use(express.json());
//   app.use(
//     express.urlencoded({
//       extended: true,
//     })
//   );

//   const allowedUrls = [
//     "https://pvssy-frontend.vercel.app",
//     "http://localhost:3000",
//   ];

//   const corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     if (allowedUrls.indexOf(req.header("Origin")) !== -1) {
//       corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     } else {
//       corsOptions = { origin: false }; // disable CORS for this request
//     }
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   };
//   //
//   // const corsOptions2 = {
//   //   origin: "https://pvssy-frontend.vercel.app",
//   //   optionsSuccessStatus: 200,
//   // };
//   // app.use(cors({ origin: allowedUrls }));
//   app.use(cors(corsOptionsDelegate));
//   // app.use(cors(corsOptions2));
//   cloudinaryConfig();
//   app.use(passport.initialize());
//   passport.use(jwtStrategy);
// };

// const loadRoutes = () => {
//   app.use("/api/pains", painRoutes);
//   app.use("/api/events", eventRoutes);
//   app.use("/api/users", userRoutes);
//   app.use("/api/terms", termRoutes);
//   app.use("/api/sources", sourceRoutes);
//   app.use("/api/exercises", exerciseRoutes);
// };

// const startServer = () => {
//   app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
//   });
// };

// async function controller() {
//   addMiddlewares(); // always add middlewares before loading routes
//   loadRoutes();

//   // PUT THE MONGODBCONNEXION IN TRY AND CATCH (4)
//   try {
//     await mongoDBConnexion();
//   } catch (error) {
//     console.log("error :", error);
//   }

//   startServer();
// }
// controller();
