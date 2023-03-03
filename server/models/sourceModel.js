import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  author: {
    type: Array,
  },

  editor: {
    type: String,
  },

  year: {
    type: String,
  },

  edition: {
    type: String,
  },

  relatedPain: {
    type: Array,
  },
});

const sourceModel = mongoose.model("source", sourceSchema);
export default sourceModel;
