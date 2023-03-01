import { eventModel } from "../models/eventModel.js";

const today = new Date();
today.setHours(0, 0, 0, 0);

// GET

const getAllEvents = async (req, res) => {
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

const getUpcomingEvents = async (req, res) => {
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

const getArchivedEvents = async (req, res) => {
  try {
    const archivedEvents = await eventModel
      .find({ date: { $lt: today }, isPending: false })
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

const getEventById = async (req, res) => {
  try {
    const requestedEvents = await eventModel
      .find({ _id: req.params._id })
      .exec();
    if (requestedEvents.length === 0) {
      res.status(200).json({
        msg: "Pas d'évènements avec cet _id",
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

const getEventByOrganizer = async (req, res) => {
  try {
    const requestedEvents = await eventModel
      .find({ organizer: req.params.organizer })
      .exec();
    if (requestedEvents.length === 0) {
      res.status(200).json({
        msg: "Pas d'évènements avec cet organisateurice",
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

const getEventsByRegion = async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    const requestedEvents = await eventModel
      .find({ region: req.params.region, isPending: false })
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

const getApprovedEvents = async (req, res) => {
  try {
    const approvedEvents = await eventModel.find({ isPending: false }).exec();
    res.status(200).json({
      number: approvedEvents.length,
      approvedEvents,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

const getPendingEvents = async (req, res) => {
  try {
    const pendingEvents = await eventModel.find({ isPending: true }).exec();
    res.status(200).json({
      number: pendingEvents.length,
      pendingEvents,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

// POST

const addEvent = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const {
    isPending,
    title,
    date,
    organizer,
    organizerWebsite,
    organizerContact,
    shortDef,
    longDef,
    isOnline,
    onlineMeeting,
    address,
    city,
    region,
    email,
    tel,
    entryFee,
  } = req.body;

  try {
    const newEvent = new eventModel({
      isPending,
      title,
      date,
      organizer,
      organizerWebsite,
      organizerContact,
      shortDef,
      longDef,
      isOnline,
      onlineMeeting,
      address,
      city,
      region,
      email,
      tel,
      entryFee,
    });
    const savedEvent = await newEvent.save();

    res.status(201).json({
      msg: "new event added successfully",
      event: {
        isPending: savedEvent.isPending,
        title: savedEvent.title,
        date: savedEvent.date,
        organizer: savedEvent.organizer,
        organizerWebsite: savedEvent.organizerWebsite,
        organizerContact: savedEvent.organizerContact,
        shortDef: savedEvent.shortDef,
        longDef: savedEvent.longDef,
        isOnline: savedEvent.isOnline,
        onlineMeeting: savedEvent.onlineMeeting,
        address: savedEvent.address,
        city: savedEvent.city,
        region: savedEvent.region,
        email: savedEvent.email,
        tel: savedEvent.tel,
        entryFee: savedEvent.entryFee,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new event",
    });
  }
};

// PUT

const approveEvent = async (req, res) => {
  try {
    const existingEvent = await eventModel.findOne({ _id: req.params._id });

    if (existingEvent) {
      existingEvent.isPending = false;
      await existingEvent.save();

      res.status(200).json({
        msg: "Event is approved",
      });
    } else {
      res.status(404).json({
        msg: "Event not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error during modification",
      error: error,
    });
  }
};

//DELETE

const deleteEvent = async (req, res) => {
  // console.log("req.user :", req.user);
  const { _id } = req.body;

  try {
    const existingEvent = await eventModel.findOne({
      _id: _id,
    });

    if (existingEvent) {
      const deletedEvent = await eventModel.findOneAndDelete({
        _id: _id,
      });
      console.log("deletedEvent ::: :", deletedEvent);
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
  getApprovedEvents,
  getPendingEvents,
  approveEvent,
  getEventById,
  getEventByOrganizer,
};
