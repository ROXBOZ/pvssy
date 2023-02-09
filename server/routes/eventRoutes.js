import express from "express";
import { getAllEvents } from "../controller/eventController.js";
import { getUpcomingEvents } from "../controller/eventController.js";
import { getArchivedEvents } from "../controller/eventController.js";
import { getEventsByRegion } from "../controller/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/archived", getArchivedEvents);
router.get("/:region", getEventsByRegion);

export default router;
