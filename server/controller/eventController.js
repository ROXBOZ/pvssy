import eventModel from "../models/eventModel.js";

const today = new Date();
today.setHours(0, 0, 0, 0);

// get all events
const getAllEvents = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const allEvents = await eventModel.find({}).exec();
    res.status(200).json({
      number: allEvents.length,
      allEvents,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

// get future events
const getUpcomingEvents = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // handling error if there are no event planned.
  try {
    const upcomingEvents = await eventModel
      .find({ date: { $gte: today } })
      .exec();
    res.status(200).json({
      number: upcomingEvents.length,
      upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

// get passed events

const getArchivedEvents = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // handling error if there are no event planned.
  try {
    const archivedEvents = await eventModel
      .find({ date: { $lt: today } })
      .exec();
    res.status(200).json({
      number: archivedEvents.length,
      archivedEvents,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

// get FUTURE event by regions
const getEventsByRegion = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const requestedEvents = await eventModel
      .find({ region: req.params.region })
      .exec();
    if (requestedEvents.length === 0) {
      res.status(200).json({
        msg: "Pas d'évènements dans cette région",
      });
    } else {
      res.status(200).json({
        number: requestedEvents.length,
        requestedEvents,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

export { getAllEvents };
export { getUpcomingEvents };
export { getArchivedEvents };
export { getEventsByRegion };
