import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  isPending: {
    type: Boolean,
    required: true,
  },

  title: {
    type: String,
    required: true,
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

  isOnline: {
    type: Boolean,
    required: true,
  },

  onlineMeeting: {
    type: String,
    required: function () {
      return this.isOnline;
    },
  },

  address: {
    type: String,
    required: function () {
      return !this.isOnline;
    },
  },
  city: {
    type: String,
    required: function () {
      return !this.isOnline;
    },
  },
  region: {
    type: String,
    required: function () {
      return !this.isOnline;
    },
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
});
const eventModel = mongoose.model("event", eventSchema);
export { eventModel };
