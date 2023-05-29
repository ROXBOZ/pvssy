import painModel from "../models/painModel.js";

const getAllPains = async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*"); //
  try {
    console.log("process.env.PORT :", process.env.PORT);
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
  // res.header("Access-Control-Allow-Origin", "*");
  const {
    name,
    def,
    img,
    diag,
    sympt,
    auto,
    pro,
    why,
    body,
    norms,
    routine,
    libido,
    consent,
    mental,
    parenthood,
    checkup,
    pleasure,
    tags,
    shemaDef1,
    shemaDef2,
  } = req.body;

  try {
    const newPain = new painModel({
      name,
      img,
      def,
      diag,
      sympt,
      auto,
      pro,
      why,
      body,
      norms,
      routine,
      libido,
      consent,
      mental,
      parenthood,
      checkup,
      pleasure,
      tags,
      shemaDef1,
      shemaDef2,
    });
    const savedPain = await newPain.save();
    // res.header("Access-Control-Allow-Origin", "*");
    res.status(201).json({
      msg: "new pain added successfully",
      pain: {
        name: savedPain.name,
        img: savedPain.img,
        tags: savedPain.tags,
        shemaDef1: savedPain.shemaDef1,
        shemaDef2: savedPain.shemaDef2,
        medical: {
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

        sexo: {
          body: savedPain.body,
          norms: savedPain.norms,
          routine: savedPain.routine,
          libido: savedPain.libido,
          consent: savedPain.consent,
          mental: savedPain.mental,
          parenthood: savedPain.parenthood,
          checkup: savedPain.checkup,
          pleasure: savedPain.pleasure,
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
  // res.header("Access-Control-Allow-Origin", "*");
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
