import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  region: {
    type: String,
  },
  specialities: {
    type: Array,
  },
  tel: {
    type: String,
  },
});
const contactModel = mongoose.model("contact", contactSchema);
export { contactModel };
