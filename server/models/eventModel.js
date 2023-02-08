import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  // basic info
  title: {
    type: String,
    required: true,
    unique: true,
  },

  date: {
    type: Date,
    required: true,
  },

  // def
  shortDef: {
    type: String,
    required: true,
  },

  longDef: {
    type: String,
  },

  // online
  onLine: {
    type: Boolean,
    required: true,
  },

  meetingLink: {
    type: String,
    required: function () {
      return this.onLine;
    },
  },

  // adresse
  adresse: {
    type: String,
    required: function () {
      return !this.onLine;
    },
  },

  city: {
    type: String,
    required: function () {
      return !this.onLine;
    },
  },

  // contact
  email: {
    type: String,
  },

  tel: {
    type: String,
  },

  // entry and reservation
  freeEntry: {
    type: Boolean,
    default: false,
  },

  entryFee: {
    type: Number,
    required: function () {
      return !this.FreeEntry;
    },
  },

  //
  categories: {
    type: Array,
    required: true,
  },

  hightlight: {
    type: Boolean,
    required: true,
  },
});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;
