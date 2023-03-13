import mongoose from "mongoose";

const termSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true,
  },

  def: {
    type: Array,
    required: true,
  },

  relatedPain: {
    type: Array,
    required: true,
  },

  imgUrl: {
    type: String,
  },
});

const termModel = mongoose.model("term", termSchema);
export default termModel;
