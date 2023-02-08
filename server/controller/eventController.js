import eventModel from "../models/eventModel.js";

const getAllEvents = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const allEvents = await eventModel.find({});
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

const getEventsByRegion = async (req, res) => {
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
export { getEventsByRegion };
