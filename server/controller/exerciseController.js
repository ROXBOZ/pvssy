import exerciseModel from "../models/exerciseModel.js";

const getAllExercises = async (req, res) => {
  try {
    const allExercises = await exerciseModel.find({});
    res.status(200).json({
      number: allExercises.length,
      allExercises,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong with the server",
    });
  }
};
const getExercisesByPain = async (req, res) => {
  try {
    const requestedExercises = await exerciseModel
      .find({ relatedPain: { $in: [req.query.relatedPain] } })
      .exec();
    if (requestedExercises.length === 0) {
      res.status(200).json({
        msg: "Pas d'exercice correspondants à la recherche",
      });
    } else {
      res.status(200).json({
        number: requestedExercises.length,
        requestedExercises,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

const addExercise = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { title, img, intro, howto, prealable, relatedPain } = req.body;

  try {
    const newExercise = new exerciseModel({
      title,
      img,
      intro,
      howto,
      prealable,
      relatedPain,
    });

    const savedExercise = await newExercise.save();

    res.status(201).json({
      msg: "New exercise added successfully",
      event: savedExercise,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "You cannot add a new exercise",
    });
  }
};

export { getAllExercises, getExercisesByPain, addExercise };
