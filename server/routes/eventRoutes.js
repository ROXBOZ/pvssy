import express from "express";
import {
  getAllEvents,
  getUpcomingEvents,
  getArchivedEvents,
  getEventsByRegion,
  addEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/archived", getArchivedEvents);
router.get("/:region", getEventsByRegion);
router.post("/all", addEvent);

export default router;
