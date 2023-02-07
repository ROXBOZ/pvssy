import painModel from "../models/painModel.js";

const getAllPains = async (req, res) => {
  try {
    const allPains = await painModel.find({});
    console.log("allPains", allPains);
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
