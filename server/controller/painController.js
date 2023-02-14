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

const addPain = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("req.body", req.body);
  const { name, def, diag, sympt, auto, pro } = req.body;
  // console.log("req.body", req.body);
  try {
    const newPain = new painModel({ name, def, diag, sympt, auto, pro });
    const savedPain = await newPain.save();
    res.status(201).json({
      msg: "new pain added successfully",
      user: {
        name: savedPain.name,
        def: savedPain.def,
        diag: savedPain.diag,
        sympt: savedPain.sympt,
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

export { getAllPains, addPain };
