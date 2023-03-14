import mongoose from "mongoose";

const painSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
    unique: true,
  },
  def: {
    type: Array,
    required: true,
  },
  diag: {
    type: Array,
    required: true,
  },
  sympt: {
    type: Array,
    required: true,
  },
  why: {
    type: Array,
    required: true,
  },
  auto: {
    type: Array,
    required: true,
  },
  pro: {
    intro: {
      type: Array,
    },
    gyne: {
      type: Array,
    },
    kine: {
      type: Array,
    },
    psyc: {
      type: Array,
    },
    sexo: {
      type: Array,
    },
  },
  body: {
    type: Array,
    required: true,
  },

  norms: {
    type: Array,
    required: true,
  },

  routine: {
    type: Array,
    required: true,
  },

  libido: {
    type: Array,
    required: true,
  },

  consent: {
    type: Array,
    required: true,
  },

  mental: {
    type: Array,
    required: true,
  },

  parenthood: {
    type: Array,
    required: true,
  },

  checkup: {
    type: Array,
    required: true,
  },

  pleasure: {
    type: Array,
    required: true,
  },
});

const painModel = mongoose.model("pain", painSchema);
export default painModel;
