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

const multerUpload = multer({ storage });

export default multerUpload;
