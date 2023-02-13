import express from "express";
import { imageUpload } from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);

export default router;
