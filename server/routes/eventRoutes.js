import express from "express";
import { getAllEvents } from "../controller/eventController.js";
import { getEventsByRegion } from "../controller/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/:region", getEventsByRegion);

export default router;
