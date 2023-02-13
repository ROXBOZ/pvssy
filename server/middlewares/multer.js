import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  console.log("file>>>>", file);
  let extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    console.log("wrong extension");
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
});

export { multerUpload };
