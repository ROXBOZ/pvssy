import mongoose, { isValidObjectId } from "mongoose";

const painSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  def: {
    type: Array,
    // type: [String],
    // required: true,
  },
  diag: {
    type: Array,
    // type: [String],
    // required: true,
  },
  auto: {
    type: Array,
    // type: [String],
    // required: true,
  },
  sympt: {
    type: Array,
    // type: [String],
    // required: true,
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
