import painModel from "../models/painModel.js";

const getAllPains = async (req, res) => {
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
  const { name, def, diag, sympt, auto, pro, why } = req.body;

  try {
    const newPain = new painModel({ name, def, diag, sympt, auto, pro, why });
    const savedPain = await newPain.save();

    res.status(201).json({
      msg: "new pain added successfully",
      pain: {
        name: savedPain.name,
        def: savedPain.def,
        diag: savedPain.diag,
        sympt: savedPain.sympt,
        sympt: savedPain.why,
        auto: savedPain.auto,
        pro: {
          intro: savedPain.pro.intro,
          gyne: savedPain.pro.gyne,
          kine: savedPain.pro.kine,
          psyc: savedPain.pro.psyc,
          sexo: savedPain.pro.sexo,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "you can't add a new pain",
    });
  }
};

const getOnePain = async (req, res) => {
  const name = req.params.name;

  try {
    const pain = await painModel.findOne({ name: name }).exec();
    if (!pain) {
      return res.status(404).json({ msg: "Pain not found" });
    }
    res.json(pain);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, msg: "Something went wrong with the server" });
  }
};

export { getAllPains, addPain, getOnePain };
