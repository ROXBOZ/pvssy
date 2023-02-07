import painModel from "../models/painModel.js";

const getAllPains = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const allPains = await painModel.find({});
    res.status(200).json({
      number: allPains.length,
      allPains,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong with the server",
    });
  }
};

export { getAllPains };
