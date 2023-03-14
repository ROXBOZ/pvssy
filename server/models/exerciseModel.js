import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  goal: {
    type: String,
    required: true,
  },

  intro: {
    type: String,
  },

  howto: {
    type: Array,
    required: true,
  },

  conclusion: {
    type: String,
  },

  relatedPain: {
    type: Array,
    required: true,
  },
});

const exerciseModel = mongoose.model("exercise", exerciseSchema);
export default exerciseModel;
