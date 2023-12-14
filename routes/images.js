const express = require("express");
const multer = require("multer");
const path = require("path");


const router = express.Router();

const { imageController } = require("../controllers");

const storage = multer.diskStorage({
  destination: "upload/upload-images",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

const MAX_IMAGE_UPLOAD_LIMIT = 100;

// This route handles the HTTP POST request to add a new category.
router.post(
  "/multiple-upload",
  upload.array("images", MAX_IMAGE_UPLOAD_LIMIT),
  imageController.multipleImageUpload
);

module.exports = router;
