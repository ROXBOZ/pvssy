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
});

const painModel = mongoose.model("pain", painSchema);
export default painModel;
