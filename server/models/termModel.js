import mongoose from "mongoose";

const termSchema = new mongoose.Schema({
  termName: {
    type: String,
    required: true,
  },

  termDef: {
    type: String,
    required: true,
  },
});

const termModel = mongoose.model("term", termSchema);
export default termModel;
