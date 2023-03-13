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

  howto: {
    type: Array,
    required: true,
  },
  relatedPain: {
    type: Array,
    required: true,
  },
});

const exerciseModel = mongoose.model("exercise", exerciseSchema);
export default exerciseModel;
