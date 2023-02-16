import express from "express";
import { imageUpload, addUser, logUser } from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", addUser);
router.post("/login", logUser);

export default router;
