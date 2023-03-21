import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  img: {
    type: String,
  },

  intro: {
    type: String,
  },

  howto: {
    type: [
      {
        stepTitle: {
          type: String,
        },
        stepInstructions: {
          type: Array,
        },
      },
    ],
    required: true,
  },

  prealable: {
    type: Array,
  },

  relatedPain: {
    type: Array,
    required: true,
  },
});

const exerciseModel = mongoose.model("exercise", exerciseSchema);
export default exerciseModel;
