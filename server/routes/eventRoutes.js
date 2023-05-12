import express from "express";
import {
  getAllEvents,
  getUpcomingEvents,
  getArchivedEvents,
  getEventsByRegion,
  addEvent,
  deleteEvent,
  getApprovedEvents,
  getPendingEvents,
  approveEvent,
  getEventById,
  getEventByOrganizer,
} from "../controller/eventController.js";

const router = express.Router();
// GET
router.get("/all", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/archived", getArchivedEvents);
router.get("/approved", getApprovedEvents);
router.get("/pending", getPendingEvents);
router.get("/byRegion/:region", getEventsByRegion);
router.get("/byId/:_id", getEventById);
router.get("/byOrganizer/:organizerContact", getEventByOrganizer);

//POST
router.post("/all", addEvent);

//PUT
router.put("/byId/:_id", approveEvent);

//DELETE
router.delete("/all", deleteEvent);

export default router;
