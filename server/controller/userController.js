import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { passwordEncryption, verifyPassword } from "../utils/bcrypt.js";
import generateToken from "../utils/jwt.js";

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

const addUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    console.log("existingUser :>> ", existingUser);

    if (existingUser) {
      res.status(500).json({
        msg: "Email already in use",
      });
    } else {
      const hashedPassword = await passwordEncryption(req.body.userPassword);
      const newUser = new userModel({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: hashedPassword,
        userAvatar: req.body.userAvatar,
        userIsAdmin: req.body.userIsAdmin,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "signup successful",
          user: {
            userName: savedUser.userName,
            userEmail: savedUser.userEmail,
            userAvatar: savedUser.userAvatar,
            userIsAdmin: savedUser.userIsAdmin,
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

const logUser = async (req, res) => {
  try {
    // REVIEW
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "*");

    const existingUser = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (!existingUser) {
      res.status(401).json({ msg: "wrong email" });
    } else {
      const isPasswordMatch = await verifyPassword(
        req.body.userPassword,
        existingUser.userPassword
      );
      if (!isPasswordMatch) {
        res.status(401).json({ msg: "wrong password" });
      } else {
        const token = generateToken(existingUser._id);
        res.status(200).json({
          msg: "userController.js : you are logged in",
          user: {
            id: existingUser._id,
            userName: existingUser.userName,
            userEmail: existingUser.userEmail,
            userAvatar: existingUser.userAvatar,
          },
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const getProfile = async (req, res) => {
  console.log("req arrived");
  res.status(200).json({
    user: {
      userName: req.user.userName,
      userEmail: req.user.userEmail,
      userAvatar: req.user.userAvatar,
      userIsAdmin: req.user.userIsAdmin,
    },
  });
};

export { imageUpload, addUser, logUser, getProfile };
