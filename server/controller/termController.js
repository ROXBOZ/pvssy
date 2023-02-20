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

const getTermsByPain = async (req, res) => {
  // REVIEW
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "*");
  // res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "*");

  try {
    const requestedTerms = await termModel
      .find({ relatedPain: { $in: [req.query.relatedPain] } })
      .exec();
    if (requestedTerms.length === 0) {
      res.status(200).json({
        msg: "Pas de terme correspondants à la recherche",
      });
    } else {
      res.status(200).json({
        number: requestedTerms.length,
        requestedTerms,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};

const addTerm = async (req, res) => {
  const { term, def, relatedPain } = req.body;

  try {
    const newTerm = new termModel({ term, def, relatedPain });
    const savedTerm = await newTerm.save();

    res.status(201).json({
      msg: "new term added successfully",
      term: {
        term: savedTerm.term,
        def: savedTerm.def,
        relatedPain: savedTerm.relatedPain,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new term",
    });
  }
};

export { getAllTerms, getTermsByPain, addTerm };
