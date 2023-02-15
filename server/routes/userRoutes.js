import express from "express";
import { imageUpload } from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";
import { addUser } from "../controller/userController.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", addUser);

export default router;
