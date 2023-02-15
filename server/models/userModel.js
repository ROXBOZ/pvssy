import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  userFirstname: {
    type: String,
  },

  userEmail: {
    type: String,
    required: true,
    unique: true,
  },

  userPassword: {
    type: String,
    required: true,
  },

  userAvatar: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
