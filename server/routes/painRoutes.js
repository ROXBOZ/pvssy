import express from "express";
import {
  getAllPains,
  addPain,
  //   editPain,
} from "../controller/painController.js";

const router = express.Router();

router.get("/all", getAllPains);
router.post("/all", addPain);
// router.post("/all", editPain);

export default router;
