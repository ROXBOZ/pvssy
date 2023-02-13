import { v2 as cloudinary } from "cloudinary";
// import userModel from "../models/userModel";

const imageUpload = async (req, res) => {
  try {
    const imgUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "pvssy-avatar",
    });
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

// const signup = async (req, res) => {
//   console.log("req.body", req.body);
//   const existingUser = await userModel;
// };

export { imageUpload };
