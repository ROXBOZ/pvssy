import termModel from "../models/termModel.js";

const getAllTerms = async (req, res) => {
  try {
    const allTerms = await termModel.find({});
    res.status(200).json({
      number: allTerms.length,
      allTerms,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong with the server",
    });
  }
};

// getTermsByPain
const getTermsByName = async (req, res) => {
  try {
    const requestedTerm = await termModel.find({ term: req.query.term }).exec();
    if (requestedTerm.length === 0) {
      res.status(200).json({
        msg: "Pas de terme correspondants à la recherche",
      });
    } else {
      res.status(200).json({ requestedTerm });
    }
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

export { getAllTerms, getTermsByName };
