import mongoose from "mongoose";

const painSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  def: {
    type: String,
    required: true,
  },
});

const painModel = mongoose.model("pain", painSchema);
export default painModel;
