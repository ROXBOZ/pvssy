import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },

  date: {
    type: Number,
    required: true,
  },

  shortDef: {
    type: String,
    required: true,
  },

  longDef: {
    type: String,
  },

  onLine: {
    type: Boolean,
    required: true,
  },

  Adresse: {
    type: String,
  },

  City: {
    type: String,
  },

  Contact: {
    type: Array,
    required: true,
  },

  FreeEntry: {
    type: Boolean,
    required: true,
  },
  /// Entry Fee only if FreeEntry = false
  EntryFee: {
    type: Number,
    required: true,
  },

  Categories: {
    type: Array,
    required: true,
  },

  Pains: {
    type: Array,
  },
});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;

// {
//     "_id": { "$oid": "63e2664dbab569835dbac956" },
//     "id" : 1,
//         "title": "Test Event",
//             "date" : 080720232000,
//                 "shortDef" : "very short def about the event",
//                     "longDef" : "quite long def about the event",
//                         "onLine" : false,
//                             "Adresse" : "Rue du Lac 20",
//                                 "City" : "Renens",
//                                     "Contact" : ["roxboz@gmail.com", "+49 17 438 64 312"]
//     "FreeEntry" : false,
//         "EntryFee" : "20",
//             "Categories" : "Community"
//     "Pains" : ["xx", "yy"]
// }
