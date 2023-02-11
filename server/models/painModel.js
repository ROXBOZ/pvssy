import mongoose, { isValidObjectId } from "mongoose";

const painSchema = new mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   unique: true,
  //   required: true,
  // },

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
  },
  sympt: {
    type: Array,
  },

  pro: {
    type: Object,
    required: true,

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
