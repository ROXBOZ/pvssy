import express from "express";
import {
  imageUpload,
  addUser,
  logUser,
  getProfile,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";
import jwt from "../middlewares/jwt.js";

const router = express.Router();

router.get("/profile", jwt, getProfile);
router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", addUser);
router.post("/login", logUser);

export default router;
