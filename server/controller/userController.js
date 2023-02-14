import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { passwordEncryption } from "../utils/bcrypt.js";

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);
  try {
    const imgUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "pvssy-avatar",
    });
    console.log("imgUpload", imgUpload);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      msg: "woop woop, image downloaded",
      userAvatar: imgUpload.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "oh no, upload went wrong",
    });
  }
};

const signup = async (req, res) => {
  console.log("req.body", req.body);
  const { userName, userEmail, userPassword, userAvatar } = req.body;

  try {
    const existingUser = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    console.log("existingUser :>> ", existingUser);

    if (existingUser) {
      res.status(500).json({
        msg: "ups, email already in use....you might have an account and forgot",
      });
    } else {
      const hashedPassword = await passwordEncryption(req.body.userPassword);
      console.log("hashedPassword", hashedPassword);
      const newUser = new userModel({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: hashedPassword,
        userAvatar: req.body.userAvatar,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "signup successful",
          user: {
            userName: savedUser.userName,
            userEmail: savedUser.userEmail,
            userAvatar: savedUser.userAvatar,
          },
        });
      } catch (error) {
        res.status(400).json({ msg: "error during signup", error: error });
      }
    }
  } catch (error) {
    console.log("error registering user", error);
  }
};

export { imageUpload, signup };
