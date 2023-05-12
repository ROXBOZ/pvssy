import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  isPending: {
    type: Boolean,
    // required: true,
  },

  title: {
    type: String,
    // required: true,
    // unique: true,
  },

  eventIsOneDay: {
    type: Boolean,
  },

  eventDateStart: {
    type: Date,
  },

  eventDateEnd: {
    type: Date,
    required: function () {
      return !this.eventIsOneDay;
    },
  },

  eventTimeStart: {
    type: String,
    required: function () {
      return this.eventIsOneDay;
    },
  },

  eventTimeEnd: {
    type: String,
    required: function () {
      return this.eventIsOneDay;
    },
  },

  organizer: {
    type: String,
  },

  organizerWebsite: {
    type: String,
  },

  organizerContact: {
    type: String,
  },

  shortDef: {
    type: String,
  },

  longDef: {
    type: String,
  },

  isOnline: {
    type: Boolean,
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

  isFreeEntry: {
    type: Boolean,
  },

  admissionFee: {
    type: Number,
    required: function () {
      return this.isUniquePrice && !this.isFreeEntry;
    },
  },
  admissionFeeMin: {
    type: Number,
    required: function () {
      return !this.isUniquePrice && !this.isFreeEntry;
    },
  },
  admissionFeeMax: {
    type: Number,
    required: function () {
      return !this.isUniquePrice && !this.isFreeEntry;
    },
  },
});
const eventModel = mongoose.model("event", eventSchema);
export { eventModel };
