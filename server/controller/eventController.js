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
  // res.header("Access-Control-Allow-Origin", "*");
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

// add event
const addEvent = async (req, res) => {
  const {
    title,
    date,
    shortDef,
    longDef,
    online,
    onlineMeeting,
    address,
    city,
    email,
    tel,
    entryFee,
    imgCover,
    imgCaption,
    imgCredits,
  } = req.body;

  try {
    const newEvent = new eventModel({
      title,
      date,
      shortDef,
      longDef,
      online,
      onlineMeeting,
      address,
      city,
      email,
      tel,
      entryFee,
      imgCover,
      imgCaption,
      imgCredits,
    });
    const savedEvent = await newEvent.save();

    res.status(201).json({
      msg: "new event added successfully",
      event: {
        title: savedEvent.title,
        date: savedEvent.date,
        shortDef: savedEvent.shortDef,
        longDef: savedEvent.longDef,
        online: savedEvent.online,
        onlineMeeting: savedEvent.onlineMeeting,
        address: savedEvent.address,
        city: savedEvent.city,
        email: savedEvent.email,
        tel: savedEvent.tel,
        entryFee: savedEvent.entryFee,
        imgCover: savedEvent.imgCover,
        imgCaption: savedEvent.imgCaption,
        imgCredits: savedEvent.imgCredits,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new event",
    });
  }
};

// delete event
const deleteEvent = async (req, res) => {
  const { _id } = req.body;

  try {
    const existingEvent = await eventModel.findOne({
      _id: _id,
    });

    if (existingEvent) {
      await eventModel.findOneAndDelete({
        _id: _id,
      });

      res.status(200).json({
        msg: "Event deleted successfully",
      });
    } else {
      res.status(404).json({
        msg: "Event not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error during delete",
      error: error,
    });
  }
};

export {
  getAllEvents,
  getUpcomingEvents,
  getArchivedEvents,
  getEventsByRegion,
  addEvent,
  deleteEvent,
};
