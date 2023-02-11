import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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

  // online event : 1 object with two strings > online boolean and link
  // or 1 boolean online/offline and an object access link, email, tel
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

  // onsite event : 1 object with street, city and region // online switch off onsite
  adresse: {
    type: String,
  },

  city: {
    type: String,
  },

  // entry object with email and tel and entry fee. If no entry fee, entry is free

  email: {
    type: String,
  },

  tel: {
    type: String,
  },

  entryFee: {
    type: Number,
  },
});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;
