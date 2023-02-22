import express from "express";
import {
  getAllEvents,
  getUpcomingEvents,
  getArchivedEvents,
  getEventsByRegion,
  addEvent,
  deleteEvent,
  //
  getPendingEvents,
  addPendingEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/pending", getPendingEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/archived", getArchivedEvents);
router.get("/:region", getEventsByRegion);
router.post("/all", addEvent);
router.post("/pending", addPendingEvent); //FIXME
router.delete("/all", deleteEvent);

export default router;
