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

  userWebsite: {
    type: String,
  },

  userPassword: {
    type: String,
    required: true,
  },

  userAvatar: {
    type: String,
  },

  userIsAdmin: {
    type: Boolean,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
