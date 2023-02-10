import mongoose from "mongoose";

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
  aides: {
    type: Object,
    required: true,
    intro: {
      type: String,
    },
    gyné: {
      type: String,
    },
    kiné: {
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
