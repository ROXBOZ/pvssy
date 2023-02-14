import painModel from "../models/painModel.js";

const getAllPains = async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
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

const addPain = async (req, res) => {
  const { name, def } = req.body;
  try {
    const newPain = await newPain.save();
    res.status(201).json({
      msg: "new pain added successfully",
      user: {
        name: newPain.name,
        def: newPain.def,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new pain",
    });
  }
};

export { getAllPains, addPain };
