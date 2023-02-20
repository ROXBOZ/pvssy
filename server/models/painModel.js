import mongoose, { isValidObjectId } from "mongoose";

const painSchema = new mongoose.Schema({
  name: {
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
      type: String,
    },
    gyne: {
      type: String,
    },
    kine: {
      type: String,
    },
    psyc: {
      type: String,
    },
    sexo: {
      type: String,
    },
  },
});

const painModel = mongoose.model("pain", painSchema);
export default painModel;
