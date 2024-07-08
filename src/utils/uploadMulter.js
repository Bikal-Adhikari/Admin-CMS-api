import multer from "multer";

const imgFolderPath = "public/img/product";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = "";
    const fullFileName = Date.now() + "-" + file.originalname;
    cb(error, fullFileName);
  },
});

const limits = {
  fileSize: 1 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only images allowed"), false);
  }
  cb(null, true);
};
const multerUpload = multer({ storage, limits, fileFilter });

export default multerUpload;
