import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
  },

  date: {
    type: Date,
    required: true,
  },

  shortDef: {
    type: String,
    required: true,
  },

  longDef: {
    type: String,
  },

  online: {
    type: Boolean,
    required: true,
  },

  onlineMeeting: {
    type: String,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  email: {
    type: String,
  },

  tel: {
    type: String,
  },

  entryFee: {
    type: Number,
  },

  // imgCover: {
  //   type: String,
  //   required: true,
  // },

  // imgCaption: {
  //   type: String,
  //   required: true,
  // },

  // imgCredits: {
  //   type: String,
  // },
});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;
