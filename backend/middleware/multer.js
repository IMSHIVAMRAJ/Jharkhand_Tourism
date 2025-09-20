const multer = require("multer");

const storage = multer.diskStorage({}); // memory se direct bhejenge cloudinary ko

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or image files are allowed!"), false);
  }
};

module.exports = multer({ storage, fileFilter });
