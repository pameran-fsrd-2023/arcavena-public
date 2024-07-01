const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + uuidv4() + path.extname(file.originalname));
  },
});

// config multer
const MulterUpload = multer({
  storage: storage,
});

module.exports = MulterUpload;
