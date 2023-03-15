import sourceModel from "../models/sourceModel.js";

const getAllSources = async (req, res) => {
  try {
    const allSources = await sourceModel.find({});
    res.status(200).json({
      number: allSources.length,
      allSources,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong with the server",
    });
  }
};
const getSourcesByPain = async (req, res) => {
  try {
    const requestedSources = await sourceModel
      .find({ relatedPain: { $in: [req.query.relatedPain] } })
      .exec();
    if (requestedSources.length === 0) {
      res.status(200).json({
        msg: "Pas de source correspondants à la recherche",
      });
    } else {
      res.status(200).json({
        number: requestedSources.length,
        requestedSources,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Problème serveur",
    });
  }
};
const addSource = async (req, res) => {
  const {
    author,
    editor,
    year,
    edition,
    relatedPain,
    title,
    url,
    isFootnote,
    category,
  } = req.body;

  try {
    const newSource = new sourceModel({
      author,
      editor,
      year,
      edition,
      relatedPain,
      title,
      url,
      isFootnote,
      category,
    });
    const savedSource = await newSource.save();

    res.status(201).json({
      msg: "new source added successfully",
      source: {
        author: savedSource.author,
        editor: savedSource.editor,
        year: savedSource.year,
        edition: savedSource.edition,
        relatedPain: savedSource.relatedPain,
        title: savedSource.title,
        url: savedSource.url,
        isFootnote: savedSource.isFootnote,
        category: savedSource.category,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new source",
    });
  }
};

export { getAllSources, getSourcesByPain, addSource };
