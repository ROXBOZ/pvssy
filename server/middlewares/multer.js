import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  let extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    cb(null, false);
  }
  cb(null, true);
};

const multerUpload = multer({
  storage,
  fileFilter,
});

export { multerUpload };
