import mongoose from "mongoose";

const painSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  def: {
    type: Array,
  },
  diag: {
    type: Array,
  },
  sympt: {
    type: Array,
  },
  why: {
    type: Array,
  },
  auto: {
    type: Array,
  },
  proIntro: {
    type: Array,
  },
  pros: [
    {
      proTitle: {
        type: String,
      },
      proDef: {
        type: Array,
      },
    },
  ],

  body: {
    type: Array,
  },

  norms: {
    type: Array,
  },

  routine: {
    type: Array,
  },

  libido: {
    type: Array,
  },

  charge: {
    type: Array,
  },

  consent: {
    type: Array,
  },

  mental: {
    type: Array,
  },

  parenthood: {
    type: Array,
  },

  checkup: {
    type: Array,
  },

  treatment: {
    type: Array,
  },

  pleasure: {
    type: Array,
  },

  tags: {
    type: Array,
  },

  shemaDef1: {
    type: Array,
  },

  shemaDef2: {
    type: Array,
  },
});

const painModel = mongoose.model("pain", painSchema);
export default painModel;
