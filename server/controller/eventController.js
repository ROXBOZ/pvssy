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
      msg: "something went wrong with the server",
    });
  }
};

export { getAllEvents };
