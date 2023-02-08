import express from "express";
import { getAllEvents } from "../controller/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);

export default router;
